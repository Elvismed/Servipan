const express = require('express');
const bodyParser = require('body-parser');
//const bcrypt = require('bcryptjs');
const conn = require('../config/db');
const _ = require('underscore');
const Panaderia = require('../models/panaderias.model');

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())


app.put('/perfadmin',(req, res)=>{
    let idpanaderia = req.body.idpanaderia
    let data = _.pick(req.body,['nombre_pan','correo','estado','ciudad']);
    
    conn.query('UPDATE panaderias SET ? where idpanaderia = ?', [data ,idpanaderia],(err, result)=>{
        if(err){
            res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok:true,
            result,
            message: `Datos Actualizado Correctamente!`
        })
    })
    })
    app.post('/perfiladmin', (req, res) => {
        let idpanaderia = req.body.idpanaderia;
    
        conn.query("SELECT * FROM panaderias WHERE idpanaderia = ?",idpanaderia , (err, result) => {
            if (err) {
                res.status(400).json({
                    err
                });
            }
    
            res.json({
                result
            });
        });
    });
module.exports = app;