const express = require('express');
const bodyParser = require('body-parser');
//const bcrypt = require('bcryptjs');
const conn = require('../config/db');
const _ = require('underscore');
const compra = require('../models/compras.model');

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


app.post('/compras',(req, res) =>{
    let id_comprador = req.body.id_compra
conn.query('SELECT * FROM ventas WHERE id_comprador = ? GROUP BY codigo_venta ORDER BY idventa DESC',id_comprador,(err, result)=>{
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

app.post('/detallescompra', (req, res) => {
    let id_comprador = req.body.id_comprador;
    let codigo_venta = req.body.codigo_venta;
    console.log(id_comprador)
    console.log(codigo_venta)
    conn.query('SELECT * FROM ventas INNER JOIN panaderias on ventas.idpana = panaderias.idpanaderia INNER JOIN compradores on ventas.id_comprador = compradores.idcomprador WHERE id_comprador = ? AND codigo_venta = ?',[id_comprador, codigo_venta], (err, result) => {
        if (err) {
            res.status(400).json({
                err
            })
        }
        res.json({
            result
        })
    })

})




module.exports = app;