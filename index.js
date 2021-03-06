const { json } = require('body-parser');
const cool = require('cool-ascii-faces');
const express = require('express');
const cors = require('cors')
const path = require('path');
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 5000;

express()
  .use(express.static(path.join(__dirname, 'public')))
  .use(bodyParser.urlencoded())
  .use(bodyParser.json())
  .use(cors())
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/api/scores/', async (req, res) => {
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM high_scores');
      const results = { 'results': (result) ? result.rows : null};
      res.send(results);
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })
  .post("/api/scores/", async (req, res) => {
    try {
      const p_name = req.body.player_name;
      const p_score = req.body.score;
      const client = await pool.connect();
      const result = await client.query(`INSERT INTO high_scores (player_name, score) VALUES ('${p_name}', ${p_score}) RETURNING *;`);
      const results = { 'results': (result) ? result.rows : null};
      res.send(results);
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});
