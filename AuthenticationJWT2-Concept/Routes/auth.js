const express = require('express');

/* Importing Two Libraries : jsonwebtoken , bcrypt */
const jwt =require('jsonwebtoken');
const bcrypt =require ('bcrypt');

const routers = express.Router();
const pg = require('pg');


const RouteGuard = require('../middleware/verifyToken');

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

/* Test The RouteGuard */
routers.get("/secret", RouteGuard, async (req, res) => {
    res.send("Welcome to the protected route");
});

/* Create The Register */
routers.post("/register", async (req, res) => {
    const { username, password } = req.body;

    try {
        const hashpass = await bcrypt.hash(password,10);
        const result = await pool.query(      
            "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username",
            [username, hashpass]
        );
        res.status(201).json(result.rows[0]);
    } 
    catch (error) {
        if(error.code === '23505'){
            res.status(409).send("the user name It already exists");
        }
        res.status(500).send("Error");
    }
});

/* Create The Log In */ 
routers.post("/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        const userResult = await pool.query(      
           "SELECT * FROM users WHERE username = $1",
           [username]
        );
        const user = userResult.rows[0];
        if(!user) return res.status(401).send("Invalid User");

        const isCompare = await bcrypt.compare(password, user.password);
        if(!isCompare) return res.status(401).send("Invalid Credentials");
        
        const Token = jwt.sign(
            { id: user.id , username: user.username },
            process.env.SECRET_KEY,
            { expiresIn : "2h" } 
        );
        res.send({Token});
    } 
    catch (error) {
        res.status(500).send("Internal Server Error");
    }
});


module.exports = routers;