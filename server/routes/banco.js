const Banco = require('../models/banco.model');
const express = require('express');
const bodyParser = require('body-parser');
const _ = require('underscore');
const conn = require('../config/db');
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())


app.post('/bancoagg',(req, res)=>{
    let data = new Banco(
        req.body.banco,
        req.body.cuenta,
        req.body.tipo,
        req.body.id_panaderia,
      );
    conn.query('INSERT INTO bancos SET ?', data, (err, result) => {
        if (err) {
            res.status(400).json({
                ok: false,
                err
            })
        }
        res.json({
            ok: true,
            result,
            message: 'Se ha agregado exitosamente'
        });
    })
})

app.post('/banco',(req, res) =>{
        let id_panaderia = req.body.id_panaderia
    conn.query('SELECT * FROM bancos WHERE id_panaderia = ?',id_panaderia,(err, result)=>{
        if(err){
            res.status(400).json({
                err
            });
        }
        res.json({
            result,
        })
    });
});

app.put('/bancoact',(req, res) =>{
    let idbanco = req.body.idbanco
    let data = _.pick(req.body,['banco','cuenta','tipo']);

conn.query('UPDATE bancos SET ? where idbanco = ? ', [data ,idbanco],(err, result)=>{
    if(err){
        res.status(400).json({
            ok: false,
            err
        });
    }
    res.json({
        ok:true,
        result,
        message: `Datos Actualizados Con exito!`
    })
})
})

app.delete('/bancodel',(req, res)=>{
    let idbanco = req.body.idbanco
conn.query('DELETE FROM bancos WHERE idbanco = ?',idbanco,(err, result)=>{
    if(err){
        res.status(400).json({
            ok: false,
            err
        });
    }
    res.json({
        result,
        message: `Cuenta Eliminada Con exito!`
    })
})
    
})
module.exports = app;