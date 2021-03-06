const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const { Client } = require("pg");

// const client = new Client ({
//     "user": "postgres",
//     "password": "password",
//     "host": "localhost",
//     "database": "game"
// })

// const client = new Client ({
//     "user": "bsmzwnkjsacwhz",
//     "password": "22e8702e00477bf50002fbead3902c49bdcb73862c1a5697938fb931bafccaaa",
//     "host": "ec2-34-247-118-233.eu-west-1.compute.amazonaws.com",
//     "database": "dc58nbgq3458fk",
//     "port": 5432,
//     dialect: "postgres",
//     dialectOptions: {
//         ssl: {
//             require: true, // This will help you. But you will see new error
//             rejectUnauthorized: false // This line will fix new error
//         }
//     }
// });

const client = new Client({
    connectionString: "postgres://bsmzwnkjsacwhz:22e8702e00477bf50002fbead3902c49bdcb73862c1a5697938fb931bafccaaa@ec2-34-247-118-233.eu-west-1.compute.amazonaws.com:5432/dc58nbgq3458fk",
    ssl: true,
});

client.connect()

// app.get("/api/scores", (req, res) => {
//     client.query("SELECT * FROM high_scores;")
//     .then(results => res.send(results.rows));
// })

app.get("/api/scores", (req, res) => {
    res.send('<h1>This is a test application</h1>');
})

app.post("/api/scores", (req, res) => {
    let p_name = req.body.player_name;
    let p_score = req.body.score;
    client.query(`INSERT INTO high_scores (player_name, score) VALUES ('${p_name}', ${p_score}) RETURNING *;`)
    .then(result => res.send(result.rows))
    })

app.listen(5432, () => {
    console.log("Listening on port")
});
