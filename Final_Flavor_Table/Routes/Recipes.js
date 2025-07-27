const express = require('express');
const axios =require('axios');

const route = express.Router();
//---------------------Random---------------------------
route.get('/random',async (req,res) => {
    try{
        const respons = await axios.get(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.API_KEY}&number=50`);
        res.json(respons.data);
        console.log("respons :",respons);
    }
    catch (e) {
        console.error('Error fetching data:', e.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
    
});


//---------------------Search---------------------------
route.get('/search',async (req,res) => {
    try{
        const ingredientsParam = req.query.q;
        if (!ingredientsParam) {
        return res.status(400).json({ error: 'No ingredients provided' });
        }
        const respons = await axios.get(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=${process.env.API_KEY}&ingredients=${ingredientsParam}&number=50`);
        res.json(respons.data);
        console.log("respons :",respons.json());
    }
    catch (e) {
        console.error('Error fetching data:', e.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = route;
