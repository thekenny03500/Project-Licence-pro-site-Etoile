const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const uuidv1 = require('uuid/v1');

const { Pool } = require('pg');
const validator = require('validator');

const app = express();
const poolLogin = {
            user: 'db_user',
            host: 'database',
            database: 'db_db',
            password: 'db_password'
          };

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ************ //
// getAll Stars //
// ************ //
// Get all stars in database and return them
app.get('/api/stars', (req, res) => {
    const pool = new Pool(poolLogin);

    const query = {
        text: 'SELECT id,name,galaxy,distance FROM stars;'
    }

    pool.query(query)
        .then(result => {
            pool.end();
            res.status(200).send(JSON.stringify(result.rows));
        }).catch(err => {
                console.error(err.stack);
                res.status(500);
        });
});

// ************* //
// getInfo Stars //
// ************* //
// Get star by UUID in database and return it
app.get('/api/stars/:id', (req, res) => {

    if(!validator.isUUID(req.params.id))
    {
        res.status(400).send('UUID Incorrect');
    }
    else
    {
        const pool = new Pool(poolLogin);

        const query = {
            text: 'SELECT id,name,galaxy,distance FROM stars WHERE id=$1;',
            values: [req.params.id],
        }

        pool.query(query)
            .then(result => {
                pool.end();
                if(result.rows.length <1)
                    res.status(404).send('Not found');
                else
                    res.status(200).send(JSON.stringify(result.rows[0]));
            }).catch(err => {
                console.error(err.stack);
                res.status(500);
            });
    }
});

// ************ //
// addStar Post //
// ************ //
// Add a new star in database and return it with the UUID
app.post('/api/stars', (req, res) => {
    let newStar = req.body;
    if(newStar
    && newStar.name
    && newStar.galaxy
    && newStar.distance)
    {
        const pool = new Pool(poolLogin);
        const uuid = uuidv1();
        newStar.id = uuid;

        const query = {
            text: 'INSERT INTO stars(id,name,galaxy,distance) VALUES($1, $2, $3, $4);',
            values: [newStar.id, newStar.name, newStar.galaxy, newStar.distance],
        }

        pool.query(query)
            .then(result => {
                pool.end();
                res.status(201).send(JSON.stringify(newStar));
            }).catch(err => {
                console.error(err.stack);
                res.status(500);
            });
    }
    else
    {
        res.status(400).send("invalid request");
    }
});

// ************** //
// DelStar Delete //
// ************** //
// Delete a star in database
app.delete('/api/stars/:id',(req,res)=>{
    if(!validator.isUUID(req.params.id))
    {
        res.status(400).send('UUID Incorrect');
    }
    else
    {
        const pool = new Pool(poolLogin);

        const query = {
            text: 'DELETE FROM stars WHERE id=$1;',
            values: [req.params.id],
        }

        console.log(req.params.id);
        pool.query(query)
            .then(result => {
                pool.end();
                if(result.rowCount <1)
                    res.status(404).send('Not found');
                else
                {
                    res.status(204).send('Delete complete');
                }
            }).catch(err => {
                console.error(err.stack);
                res.status(500);
            })
    }
});

module.exports = app;