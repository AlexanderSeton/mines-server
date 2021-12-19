const cool = require('cool-ascii-faces');
const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/api/scores', async (req, res) => {
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
  .post("/api/scores", async (req, res) => {
    // check if request is actually being processed !!!
    // let p_name = req.body.player_name;
    // let p_score = req.body.score;
    try {
      // const client = await pool.connect();
      // const result = await client.query(`INSERT INTO high_scores (player_name, score) VALUES ('${req.body.player_name}', ${req.body.score}) RETURNING *;`);
      // const results = { 'results': (result) ? result.rows : null};
      res.send(req);
      // client.release();
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
