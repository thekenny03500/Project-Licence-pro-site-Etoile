const express = require('express');
const morgan = require('morgan');

const { Pool } = require('pg');
const validator = require('validator');

const app = express();

app.use(morgan('dev'));

// getAll Stars
app.get('/api/stars', (req, res) => {
    const pool = new Pool({
        user: 'db_user',
        host: 'database',
        database: 'db_db',
        password: 'db_password'
      });

    pool.query('SELECT id,name,galaxy,distance FROM stars;', (err, result) => {
        pool.end();
        res.status(200).send(JSON.stringify(result.rows));
    });
});

// getInfo Stars
app.get('/api/stars/:id', (req, res) => {

    if(!validator.isUUID(req.params.id))
    {
        res.status(400).send('UUID Incorrect');
    }
    else
    {
        const pool = new Pool({
            user: 'db_user',
            host: 'database',
            database: 'db_db',
            password: 'db_password'
          });

        pool.query('SELECT id,name,galaxy,distance FROM stars WHERE id=\''+req.params.id+'\';', (err, result) => {
            pool.end();
            if(result.rows.length <1)
                res.status(404).send('Not found');
            else
                res.status(200).send(JSON.stringify(result.rows[0]));
        });
    }
});

// addStar Post
/*
app.post('/api/stars', (req, res) => {

    if()
    {
        res.status(400).send('UUID Incorrect');
    }
    else
    {
        const pool = new Pool({
            user: 'db_user',
            host: 'database',
            database: 'db_db',
            password: 'db_password'
          });

        pool.query('SELECT id,name,galaxy,distance FROM stars WHERE id=\''+req.params.id+'\';', (err, result) => {
            pool.end();
            if(result.rows.length <1)
                res.status(404).send('Not found');
            else
                res.status(200).send(JSON.stringify(result.rows[0]));
        });
    }
});*/

module.exports = app;