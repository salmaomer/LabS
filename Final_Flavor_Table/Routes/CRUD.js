const express = require('express');
const axios =require('axios');

const route = express.Router();

const pg = require('pg');

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL});

//---------------------Create---------------------------
route.post('/create',async (req,res)=>{
    const { title, image, instructions, ingredients, readyin } = req.body;

    try {
        const result = await pool.query(
            `INSERT INTO favorite (title, image, instructions, ingredients, readyin)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *`,
            [title, image, instructions, ingredients, readyin]
        );
        res.status(201).json({message: "🎉 Recipe saved to DB",data : result.rows[0]});
    } 
    catch (error) {
        console.error("👾 DB Save Error:", error);
        res.status(500).json({ error: error.message }); 
    }
});

//---------------------Reade---------------------------
route.get('/reade',async (req,res)=>{
    try {
        const result = await pool.query(`SELECT * FROM favorite`);
        res.json(result.rows);
    } 
    catch (error) {
        console.error("👾 Fetch from DB Error:", error);
        res.status(500).json({ error: "👾 Failed to load recipes from DB" }); 
    }
});

//---------------------Update---------------------------
route.put('/update/:id', async(req,res)=>{
    const { id } = req.params;
    const { instructions, ingredients } = req.body;

    try {
        const result = await pool.query(
            `UPDATE favorite SET instructions = $1 and ingredients = $2 WHERE id = $3 
            RETURNING *`,
            [instructions, JSON.stringify(ingredients), id]
        );
        res.status(200).send('🎉 Updated successfully')
        
    } 
    catch (error) {
        console.error('👾 Error in DB update:', err); 
        res.status(500).send({ err: err.message });
    }
});

//---------------------Delete---------------------------
route.delete('/delete/:id',async (req,res)=>{
    const { id } = req.params;

    try {
        const result = await pool.query(
            `DELETE FROM favorite WHERE id = $1`,[ id ]
        );
        res.json({message : "🎉 Recipe deleted"});
    } 
    catch (error) {
        console.error("👾 Delete error:", error);
        res.status(500).json({ error: "👾 Failed to delete recipe" });        
    }

});

module.exports = route;
