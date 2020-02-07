const express = require('express');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const uuidv1 = require('uuid/v1');
const errorPerso = require('./Model/errorPerso');
const { Pool } = require('pg');
const validator = require('validator');
const OpenApiValidator = require('express-openapi-validator').OpenApiValidator;

const app = express();
const poolLogin = {
            user: 'db_user',
            host: 'database',
            database: 'db_db',
            password: 'db_password'
          };

// ********** //
// MIDDELWARE //
// ********** //
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/* TODO OpenApiValidator
app.use(express.static(path.join(__dirname, 'public')));
const spec = path.join(__dirname, 'spec.json');
app.use('http://spec:8080/spec/', express.static(spec));

new OpenApiValidator({
  apiSpec: './spec.json',
  validateResponses: true
}).install(app);
*/

// ***************************** //
// Functions de gestion d'erreur //
// ***************************** //
function clientErrorHandler(err, req, res, next) {
    if(err.code<500)
    {
        res.status(err.code).send(err);
    }
    else
    {
        next(err);
    }
}
function errorHandler(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send("Internal serveur error");
}

// ************ //
// getAll Stars //
// ************ //
// Get all stars in database and return them
app.get("/api/stars", (req, res, next) => {
    try
    {
        const pool = new Pool(poolLogin);

        const query = {
            text: "SELECT id,name,galaxy,distance FROM stars;"
        }

        pool.query(query)
            .then(result => {
                pool.end();
                res.status(200).send(JSON.stringify(result.rows));
            }).catch(err => {
                    next(new errorPerso(500,err.stack));
        });
    }
    catch(err)
    {
        next(new errorPerso(500,err.stack));
    }
    
});

// ************* //
// getInfo Stars //
// ************* //
// Get star by UUID in database and return it
app.get("/api/stars/:id", (req, res, next) => {
    if(!validator.isUUID(req.params.id))
    {
        next(new errorPerso(400,"UUID Incorrect"));
    }
    else
    {
        try
        {
            const pool = new Pool(poolLogin);

            const query = {
                text: "SELECT id,name,galaxy,distance FROM stars WHERE id=$1;",
                values: [req.params.id],
            }

            pool.query(query)
                .then(result => {
                    pool.end();
                    if(result.rows.length <1)
                        next(new errorPerso(404));
                    else
                        res.status(200).send(JSON.stringify(result.rows[0]));
                }).catch(err => {
                    console.error(err.stack);
                    next(new errorPerso(500,err.stack));
            });
        }
        catch(err)
        {
            next(new errorPerso(500,err.stack));
        }
    }
});

// ************ //
// addStar Post //
// ************ //
// Add a new star in database and return it with the UUID
app.post("/api/stars", (req, res, next) => {
    let newStar = req.body;
    if(newStar
    && (newStar.name && !validator.isEmpty(newStar.name.trim()))
    && (newStar.galaxy && !validator.isEmpty(newStar.galaxy.trim()))
    && validator.isFloat(newStar.distance))
    {
        try
        {
            const pool = new Pool(poolLogin);
            const uuid = uuidv1();
            newStar.id = uuid;

            const query = {
                text: "INSERT INTO stars(id,name,galaxy,distance) VALUES($1, $2, $3, $4);",
                values: [newStar.id, newStar.name, newStar.galaxy, newStar.distance],
            }

            pool.query(query)
                .then(result => {
                    pool.end();
                    res.status(201).send(JSON.stringify(newStar));
                }).catch(err => {
                    next(new errorPerso(500,err.stack));
                });
        }
        catch(err)
        {
            next(new errorPerso(500,err.stack));
        }
    }
    else
    {
        next(new errorPerso(400));
    }
});

// ************** //
// DelStar Delete //
// ************** //
// Delete a star in database
app.delete("/api/stars/:id",(req,res,next)=>{
    if(!validator.isUUID(req.params.id))
    {
        next(new errorPerso(400,"UUID Incorrect"));
    }
    else
    {
        try
        {
            const pool = new Pool(poolLogin);

            const query = {
                text: "DELETE FROM stars WHERE id=$1;",
                values: [req.params.id],
            }

            console.log(req.params.id);
            pool.query(query)
                .then(result => {
                    pool.end();
                    if(result.rowCount <1)
                        next(new errorPerso(404));
                    else
                    {
                        res.status(204).send("Delete complete");
                    }
                }).catch(err => {
                    next(new errorPerso(500,err.stack));
                });
        }
        catch(err)
        {
            next(new errorPerso(500,err.stack));
        }
    }
});

// ************ //
// EditStar Put //
// ************ //
// Edit a star in database
app.put("/api/stars/:id",(req,res,next)=>{
    let newStar = req.body;
    let haveName =(newStar.name && !validator.isEmpty(newStar.name.trim()));
    let haveGalaxy = (newStar.galaxy && !validator.isEmpty(newStar.galaxy.trim()));
    let haveDistance = validator.isFloat(newStar.distance);
    if(newStar
    && validator.isUUID(req.params.id)
    && haveName
    && haveGalaxy
    && haveDistance)
    {
        try
        {
            const pool = new Pool(poolLogin);

            // Create query
            const query = {
                text: "UPDATE stars SET name=$1, galaxy=$2, distance=$3 WHERE id=$4;",
                values: [newStar.name,newStar.galaxy,newStar.distance,req.params.id]
            };

            pool.query(query)
                .then(result => {
                    pool.end();
                    if(result.rowCount <1)
                        next(new errorPerso(404));
                    else
                    {
                        res.status(200).send("Update complete");
                    }
                }).catch(err => {
                    next(new errorPerso(500,err.stack));
                });
        }
        catch(err)
        {
            next(new errorPerso(500,err.stack));
        }
    }
    else
    {
        next(new errorPerso(400));
    }
});

app.use(clientErrorHandler);
app.use(errorHandler);

module.exports = app;