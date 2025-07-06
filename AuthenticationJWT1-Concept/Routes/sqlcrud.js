const express = require('express');

const routeer = express.Router();
const pg = require('pg');

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

/* Show All */
routeer.get("/showAll", async (req, res) => {
  try {
    /* result >> Will Store The Result Of The query, Which Includes Metadata And A Rows Array. */
    /* pool.query(...) >> Executes An SQL Command Using A PostgreSQL Connection pool. */
    /* "SELECT * FROM pets" >> SQL Statement To Fetch All Rows From The Pets Table. */
    const result = await pool.query("SELECT * FROM pets");
    /* res.json(...) >> Sends A JSON Response Back To The Client. */
    /* result.rows >> This Contains All The Rows Fetched From The Pets Table, As An Array Of Objects. */
    res.json(result.rows);
  } catch (error) {
    /* res.status(500) >> Sets The HTTP Status Code To 500 (Internal Server Error). */
    res.status(500).send("Error fetching");
  }
});


/* Insert */
/* .post(..) >> This Function Use On Add New Row Of Data */
routeer.post("/add", async (req, res) => {
  /* Uses Destructuring To Extract The Properties name, type, age, And owned From The Incoming JSON Body. */
  const { name, type, age, owned } = req.body;

  try {
    const result = await pool.query(
      /* INSERT INTO pets (...) >> Adds A New Row To The pets Table. */
      /* VALUES ($1, $2, $3, $4) >> Uses Parameterized Placeholders To Prevent SQL Injection. */
      /* RETURNING * >> After Inserting, This Tells PostgreSQL To Return The Newly Added Row */
      /* [name, type, age, owned] >> The Array Provides Values For The Placeholders. */
      "INSERT INTO pets (name, type, age, owned) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, type, age, owned]
    );
    /* res.status(201) >> Sends An HTTP 201 Status Code, Meaning “Created”. */
    /* .json(result.rows[0]) >> Sends The Inserted Row Back To The Client As JSON.*/
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).send("Error");
  }
});

/* router.put(...) >> Defines a PUT route handler, used for updating existing data. */
/* "/update/:id" >> :id is a route parameter (e.g. /update/3 means id = 3). */
routeer.put("/update/:id", async (req, res) => {
  /* Extracts the id from the route. For /update/3, id = "3". */
  const { id } = req.params;
  /* Destructures the request body to get the new values for the fields you're updating. */
  const { name, type, age, owned } = req.body;

  try {
    /* pool.query(...) >> Executes the SQL query to update the row with the given id. */
    const result = await pool.query(
      /* RETURNING * >> Returns the updated row from the database. */
      "UPDATE pets SET name=$1, type=$2, age=$3, owned=$4 WHERE id=$5 RETURNING *",
      [name, type, age, owned, id]
    );

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).send("Error");
  }
});


module.exports = routeer;