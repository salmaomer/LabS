const express = require('express');

/* Importing Two Libraries : jsonwebtoken , bcrypt */
const jwt =require('jsonwebtoken');
const bcrypt =require ('bcrypt');

const routers = express.Router();
const pg = require('pg');

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
 
/* Create The Register */
routers.post("/register", async (req, res) => {
    const { username, password } = req.body;

    try {
        /* Uses bcrypt To Hash The Password Securely Before Storing It In The Database.
        10 Is The Salt Rounds >> Higher Numbers Are More Secure But Slower. 10 Is Standard. */
        const hashpass = await bcrypt.hash(password,10);
        const result = await pool.query(      
            "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username",
            /* username And The Hashed Password (hashpass) Are Passed As Values. */
            [username, hashpass]
        );
        /* HTTP 201 Status ("Created") */
        res.status(201).json(result.rows[0]);
    } 
    catch (error) {
        /* Checks For A PostgreSQL-Specific Error Code 23505 */
        if(error.code === '23505'){
            /* HTTP 409 Conflict With A Message */
            res.status(409).send("the user name It already exists");
        }
        /* HTTP 500 Internal Server Error */
        res.status(500).send("Error");
    }
});

/* Create The Log In */ 
/* In Login We Use The post Not The get */
routers.post("/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        /* Sends A SQL Query To The PostgreSQL Database To Find The User By Their username. */
        const userResult = await pool.query(      
           "SELECT * FROM users WHERE username = $1",
           [username]
        );
        /* Gets The First User From The Query Result (since usernames should be unique).    
        rows[0] >> Contains The Actual User Data (like id, username, password, etc). */
        const user = userResult.rows[0];
        /* If No User Was Found (i.e. wrong username), Return A 401 (Unauthorized) With A Message. */
        if(!user) return res.status(401).send("Invalid User");

        /* Uses bcrypt To Compare The Plain Password The User Entered With The Hashed Password Stored In The Database. */
        const isCompare = await bcrypt.compare(password, user.password);
        /* If The Passwords Don’t Match, Return A 401 (Unauthorized) With Message. */
        if(!isCompare) return res.status(401).send("Invalid Credentials");
        
        /* Creates A JWT Token Using:
            User.id >> And Username As Payload.
            SECRET_KEY >> From Environment Variables To Sign The Token.
            expiresIn: "2h" >> Means The Token Will Expire In 2 Hours. */
        const Token = jwt.sign(
            { id: user.id , username: user.username },
            process.env.SECRET_KEY,
            { expiresIn : "2h" } 
        );
        
        /* Sends The Token Back To The Client In JSON Format. */
        res.send({Token});

    } 
    catch (error) {
        res.status(500).send("Internal Server Error");
    }
});


module.exports = routers;