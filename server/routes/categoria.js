 const express = require('express');
const bodyParser = require('body-parser');
//const bcrypt = require('bcryptjs');
const conn = require('../config/db');
//const _ = require('underscore');
const Categoria = require('../models/categoria.model');
const Producto = require('../models/productos.model')
const Comprador = require('../models/compradores.model');

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

app.get('/categorias', (req, res) => {

    conn.query("SELECT * FROM categorias",(err, result) =>{
        if(err) {
            res.status(400).json({
                err
            });
        }

        res.json({
            result
        });
    });
});




app.get('/user/:id',(req, res) =>{
        let id_usuario = req.params.id
    conn.query('SELECT * FROM usuarios WHERE ?',id_usuario,(err, result)=>{
        if(err){
            res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok:true,
            result,
            message: `el usuario `
        })
    });
});

app.put('/user/:id',(req, res) =>{
    let id_usuario = req.params.id
    let data = _.pick(req.body,['nombre','email']);

conn.query('UPDATE usuarios SET ? where id_usuario = ?', [data ,id_usuario],(err, result)=>{
    if(err){
        res.status(400).json({
            ok: false,
            err
        });
    }
    res.json({
        ok:true,
        result,
        message: `Usuario ${id_usuario} fue cambiado`
    })
})
})

app.delete('/user/:id',(req, res)=>{
    let id_usuario = req.params.id
conn.query('DELETE FROM usuarios WHERE id_usuario = ?',id_usuario,(err, result)=>{
    if(err){
        res.status(400).json({
            ok: false,
            err
        });
    }
    res.json({
        ok:true,
        result,
        message: `El usuario fue eliminado`
    })
})
    
})
module.exports = app;