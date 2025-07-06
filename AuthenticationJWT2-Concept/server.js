require("dotenv").config(); 
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.static('public'));

const pg = require('pg');

app.use(express.json());

const client = new pg.Client(process.env.DATABASE_URL);

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });


/* Routes */
// const homeRoute = require('./Routes/home');
// const postsRoute = require('./Routes/posts');
const SQLcrud = require('./Routes/sqlcrud');
const auth = require('./Routes/auth');

// app.use('/' ,homeRoute);
// app.use('/test',postsRoute);
app.use('/pets',SQLcrud);
app.use('/users',auth);


/* 404 Hadle */
app.use((req ,res) =>{
  //res.status(404).send('Page Not Found');
  res.status(404).send("<a href='/home'> back </a>");
  //res.redirect('/home'); 
});

//-------------------------------------------------------------------------

const port = process.env.PORT || 3000;

/* #4 Connect To Your PostgreSQL Database */
/* pool.connect() >>
Using The pg.Pool To Connect.
It Checks If A Connection Can Be Established Before Starting Your Server.
*/
// pool.connect()
// /* .then(() => { ... }) >>
// If The Database Connection Is Successful, It Starts The Express Server*/
//   .then(() => {
//     /* This Means: "Start the app only after the database is connected." */
//     app.listen(port, () => {
//       console.log(`Example app listening on port http://localhost:${port}`)
//     });
//   })
//   /* .catch((err) => { ... }) >>
//   If Connecting To The Database Fails, This Block Runs. */
//   .catch((err) => {
//     console.error("Could not connect to database:", err);
//   });
  

pool.connect()
  /* You Successfully Got A Client */
  .then((client) => {
    /* Now You Ask The Database:“Hey, what’s your name (database)? And who am I logged in as (user)? */
    return client.query("SELECT current_database(), current_user")
      /* You Finished Asking. */
      .then((res) => {
        /* Now You Give The Connection Back To The pool So Others Can Use It.
        It’s Like “returning a library book when you’re done.” */
        /* You Should Not Call client.end() On pooled Connections.
        Instead, You Should Only Call client.release() To Return The Connection To The Pool For Reuse. */
        client.release();

        /* You Print Info To Confirm Everything Is Good: “I’m connected to this database with this user.” */
        const dbName = res.rows[0].current_database;
        const dbUser = res.rows[0].current_user;
        console.log(`Connected to PostgreSQL as user '${dbUser}' on database '${dbName}'`);

        console.log(`App listening on port http://localhost:${port}`);
      });
  })

  /* Now That Everything Is OK, You Start The App. */
  .then(() => {
    app.listen(port);
  })

  /* If Something Went Wrong (like the database is off). */
  .catch((err) => {
    console.error("Could not connect to database:", err);
  });


