const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { pool } = require('./config')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

const getScores = (request, response) => {
  pool.query('SELECT * FROM high_scores', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const addScore = (request, response) => {
  const { author, title } = request.body
  let p_name = request.body.player_name;
  let p_score = request.body.score;

  pool.query(
    `INSERT INTO high_scores (player_name, score) VALUES ('${p_name}', ${p_score}) RETURNING *;`,
    (error) => {
      if (error) {
        throw error
      }
      response.status(201).json({ status: 'success', message: 'Score added.' })
    }
  )
}

app
  .route('/api/scores')
  // GET endpoint
  .get(getScores)
  // POST endpoint
  .post(addScore)

// Start server
app.listen(5432, () => {
  console.log(`Server listening`)
})
