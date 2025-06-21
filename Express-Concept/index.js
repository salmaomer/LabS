/* This Code For Astablish An APIs Publish It Into Server(Local) */

/* Importing dotenv to load environment variables from .env file */
require("dotenv").config(); 

/* 1-Importing Express */

/* Imports The Express module, which Is A Web Framework For Node.js */
const express = require('express');

/* 2-Creating An Express Application */

/* This Initializes An Express Application Instance */
/* You Use app To Define Routes, Middleware, and Configure Your Server Behavior */
const app = express();

/* This For Require The All Public File */ 
/* Now Be Accessed Directly By It's Name In The URL */
/* This Registers Static File Serving As Middleware */
/* express.static('public') Is A built-in Express Middleware */
app.use(express.static('public'));

/* 4-Defining A Route */

/* This Defines A GET Route For The Root Path ('/') Of The Server.*/
/* req => Request: Contains Data About The HTTP Request.*/
/* res => Response: Used To Send A Response Back To The Client. */
app.get('/', (req, res) => {
    /* When A Client Makes A GET Request To '/', The Server Sends Dack The Response 'My World!' */
  res.send('My World ❤️')
});


app.get('/home', (req, res) => {
    /* When Someone Goes To http://localhost:3000/home, The Server Will:
    Use res.sendFile() To Send The File home.html.
    __dirname Gives The Absolute Path To The Current Directory, Ensuring It Finds The File Correctly. */
    res.sendFile(__dirname + '/public/home.html');
});


app.get('/about', (req, res) => {
    res.send('about page ❤️')
}); 

/* req.query → An Object That Contains All Query Parameters In The URL.
req.query.q → Accesses The Value Of The q Parameter */
app.get('/search', (req, res) =>{
    const query = req.query.q; 
    /* ?q=value */
    res.send( `You searched for: ${query} `);
});

/* This The Next Route That Will Be Called If The Previous Routes Do Not Match */
app.use((req ,res) =>{
  /* This Handles Any Requests That Do Not Match The Defined Routes */
  //res.status(404).send('Page Not Found');
  /* Redirects To The Home Page */
  //res.status(404).send("<a href='/home'> back </a>");
  /* That حrofessional Way */
  res.redirect('/home'); 
});
   


//-------------------------------------------------------------------------
/* 3-Define A Port Number */

/* Specifies The Port Number On Which The Server Will Listen For Incoming Requests */
/* Call The .env File And Get The Secret Port Number */
const port = process.env.PORT;


/* 5-Starting The Server */

/* This Starts The Server And Makes It Listen For Incoming Requests On The Specified Port */
app.listen(port, () => {
    /* This Callback Function Is Executed Once The Server Starts Successfully */
  console.log(`Example app listening on port ${port}`)
});
