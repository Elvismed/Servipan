const express = require('express');
const bodyParser = require('body-parser');
//const bcrypt = require('bcryptjs');
const conn = require('../config/db');
const _ = require('underscore');

const Producto = require('../models/productos.model');



const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

app.post('/listaproducto',(req, res)=>{
    let idpanaderia = req.body.idpanaderia; 
    conn.query("SELECT * FROM productos INNER JOIN categorias on categorias.idcategoria = productos.idcategoria WHERE idpanaderia = ?", idpanaderia,(err, result) => {
        if(err) {
            res.status(400).json({
                err
            });
        }

        res.json({
            result,
           
    
        });
    });
})

app.post('/producto',(req, res)=>{
    let idcategoria = req.body.idcategoria;

    conn.query('SELECT * FROM productos WHERE idcategoria = ?',idcategoria,(err, result)=>{
        if(err){
            res.status(400).json({
                ok: false,
                err
            });
        }
        
         res.json({
            ok: true,
            result,
         });
    })
    
    
})

app.post('/datos',(req,res)=>{
    let idproducto = req.body.idproducto;
    conn.query('SELECT * FROM productos INNER JOIN panaderias ON productos.idpanaderia = panaderias.idpanaderia INNER JOIN categorias ON productos.idcategoria = categorias.idcategoria WHERE idproducto = ?',idproducto,(err,result)=>{
        if(err) {
            res.status(400).json({
                err
            });
        }

        res.json({
            result,
           
    
        });
    });
})
 






app.post('/prodagg', (req, res) => {
    let data = new Producto(
        req.body.nombre,
        req.body.precio,
        req.body.stock,
        req.body.idcategoria,
        req.body.idpanaderia);
        
    conn.query('INSERT INTO productos SET ?', data, (err, result) => {
        if(err) {
            res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            result,
            message: 'Se ha agregado exitosamente'
    
        });
    });
    
});
app.put('/prodact',(req, res)=>{
    let idproducto = req.body.ID;
    let data = _.pick(req.body,['nombre','precio','stock']);


    
    conn.query('UPDATE productos SET ? WHERE idproducto = ?', [data, idproducto],(err, result)=>{
        if(err){
            res.status(400).json({
                ok: false,
                err
            });
        }
        
         res.json({
            ok: true,
            result,
            message: `Producto fue cambiado`
         });
    })
    
    
})

app.delete('/prodeli', (req, res) => {
    let id = req.body.ID;

    conn.query("DELETE FROM productos where idproducto = ?", id,(err, result) =>{
        if(err) {
            res.status(400).json({
                err
            });
        }

        res.json({
            result,
            message: 'Producto eliminado exitosamente'
        });
    });
});
module.exports = app;