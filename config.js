require('dotenv').config()

const { Pool } = require('pg')

const connectionString = "postgres://bsmzwnkjsacwhz:22e8702e00477bf50002fbead3902c49bdcb73862c1a5697938fb931bafccaaa@ec2-34-247-118-233.eu-west-1.compute.amazonaws.com:5432/dc58nbgq3458fk"

const pool = new Pool({
  connectionString: connectionString,
  ssl: true,
})

module.exports = { pool }
