
const express = require('express');
const axios = require('axios');

const routerss = express.Router();


/* Fetch The API For The Server Inside The Default Page */
/* It Support The Promises */
/* routeer.get => Because We Are In Routes Section */
routerss.get('/api/posts', async (req, res) => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts/5');
    res.json(response.data);
    console.log(response.data);
  } catch (e) {
    console.error('Error fetching data:', e.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

/* Export The Route */
module.exports = routerss;