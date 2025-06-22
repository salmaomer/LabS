require("dotenv").config(); 
const express = require('express');

/* Import The CORS Library In NPM */
const cors = require('cors');

const app = express();

/* You Are Allowing All Domains To Hit Your End Points. */
app.use(cors());
/* Use CORS With Specific Options */
//app.use(cors(corsOptions));

/* Import The Axios Library In Node.js */
/* .default => This Line Ensures You Are Correctly Accessing The Default Export Of Axios */
//const axios = require('axios').default;

app.use(express.static('public'));

/* How Call The Routers File */
/* #1 Import The Home Route */
const homeRoute = require('./Routes/home');
const postsRoute = require('./Routes/posts');

/* #2 Use The Home Route */
app.use('/' ,homeRoute);
app.use('/test',postsRoute);


app.get('/about', (req, res) => {
    res.send('about page ❤️')
}); 

app.get('/search', (req, res) =>{
    const query = req.query.q; 
    res.send( `You searched for: ${query} `);
});

app.use((req ,res) =>{
  //res.status(404).send('Page Not Found');
  res.status(404).send("<a href='/home'> back </a>");
  //res.redirect('/home'); 
});

//-------------------------------------------------------------------------
/* Limitation What The Domain You Can Access Your API From */
/* var whitelist = ['http://example1.com', 'http://example2.com']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
} */

//-------------------------------------------------------------------------

const port = process.env.PORT || 3000;
app.listen(port, () => {
    /* This Callback Function Is Executed Once The Server Starts Successfully */
  console.log(`Example app listening on port http://localhost:${port}`)
});
