/* this the only one import like this */
require('dotenv').config();
/* use Express to create a web server, define routes, handle HTTP requests */
const express = require('express');
/* It controls which origins (websites) are allowed to access resources on your server.
By default, browsers block requests from different origins for security reasons >> cors allows you to manage that behavior. */
const cors = require('cors');
/* which provides tools to work with file and directory paths in a safe and consistent way */
const path = require('path');
const pg = require('pg');

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL});

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname,'Public')));



//---------------------Home---------------------------
app.get('/',(req,res) => {
    res.sendFile(path.join(__dirname,'Public','Index.html'));
});

//---------------------Random---------------------------
const RandomPage = require('./Routes/Recipes');
app.use('/recipes',RandomPage);
app.get('/random',(req,res)=>{
    res.sendFile(path.join(__dirname,'Public','Random.html'));
});


//---------------------Search---------------------------
const SearchPage = require('./Routes/Recipes');
app.use('/recipes',SearchPage);
app.get('/search',(req,res) => {
    res.sendFile(path.join(__dirname,'Public','Search.html'));
});


//---------------------Favorite---------------------------
const FavoritePage = require('./Routes/Recipes');
app.use('/recipes',FavoritePage);
app.get('/favorite',(req,res) => {
    res.sendFile(path.join(__dirname,'Public','Favorite.html'));
});


//---------------------CRUD---------------------------
const CRUD = require('./Routes/CRUD');
app.use('/CRUD',CRUD);


//---------------------Authentication---------------------------
const Auth = require('./Routes/Auht');
app.use('/connect',Auth); 


//---------------------PAGE ERROR---------------------------
app.use((req,res) => {
    res.redirect('/');
});  


//---------------------PORT---------------------------
const port = process.env.PORT || 3000;

// app.listen(port ,() => {
//     console.log(`Server running on port ${port}`);
// });
pool.connect()
  .then((client) => {
    return client
      .query("SELECT current_database(), current_user")
      .then((res) => {
        client.release();

        const dbName = res.rows[0].current_database;
        const dbUser = res.rows[0].current_user;

        console.log(
          `Connected to PostgreSQL as user '${dbUser}' on database '${dbName}'`
        );

        console.log(`App listening on port http://localhost:${port}`);
      });
  })
  .then(() => {
    app.listen(port);
  })
  .catch((err) => {
    console.error("Could not connect to database:", err);
  });


