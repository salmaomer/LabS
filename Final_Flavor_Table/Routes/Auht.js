const express = require('express');
const axios =require('axios');

const route = express.Router();

const jwt = require('jsonwebtoken');
const bcrypt =require('bcrypt')

const pg = require('pg');
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL});

//---------------------Register---------------------------
route.post('/register',async (req,res) =>{
    const { username, email, password } = req.body;

    try {
        const hashpass = await bcrypt.hash(password, 10);
        const result = await pool.query(`
            INSERT INTO userinfo (username, email, password) 
            VALUES ($1, $2, $3) 
            RETURNING id, username`,
            [username, email, hashpass]
        );
        res.status(201).json(result.rows[0]);     
    } 
    catch (error) {
        if(error.code === '23505'){
            res.status(409).send("😱 The username already exists");
        }
        res.status(500).send("👾 Error");
   }
});

//---------------------Logging In---------------------------
route.post('/logging',async (req,res) =>{
    const { email, password } = req.body;

    try {
        const result = await pool.query(`
            SELECT * FROM userinfo WHERE email = $1`,
            [email]
        );
        const userdata = result.rows[0];
        if (!userdata) {
            return res.status(401).json({ message: "😱 User with that email does not exist" });
        }

        const isCompare = await bcrypt.compare(password, userdata.password);
        if (!isCompare) {
            return res.status(401).json({ message: "👾 Incorrect password" });
        }

        const token = jwt.sign(
            {id: userdata.id , username: userdata.username , email:userdata.email },
            process.env.SECRET_KEY,
            {expiresIn: '5d'}
        );
        res.status(200).json({token});        
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "👾 Internal Server Error" });  
    }
});

module.exports = route;
