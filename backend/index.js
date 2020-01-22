const express = require('express');
const morgan = require('morgan');

const { Pool } = require('pg')

const app = express();

app.use(morgan('dev'));

app.get('/api/database/test', (req, res) => {
    const pool = new Pool({
        user: 'db_user',
        host: 'database',
        database: 'db_db',
        password: 'db_password'
      })
    pool.query('SELECT NOW()', (err, result) => {
        pool.end()
        res.send(`Il est ${result.rows[0].now}`)
    })
})

module.exports = app;