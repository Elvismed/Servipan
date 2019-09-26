const express = require('express');
const bodyParser = require('body-parser');
//const bcrypt = require('bcryptjs');
const conn = require('../config/db');
const _ = require('underscore');
const Comprador = require('../models/compradores.model');



const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


app.post('/registro', (req, res) => {
    let data = new Comprador(
        req.body.cedula,
        req.body.pass,
        req.body.nombre,
        req.body.apellido,
        req.body.correo,
        req.body.estado,
        req.body.ciudad,
        req.body.genero
    );
    conn.query('INSERT INTO compradores SET ?', data, (err, result) => {
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

app.post('/login', (req, res) => {
    let cedula = req.body.cedula
    let pass = req.body.pass


    conn.query("SELECT * FROM compradores WHERE cedula = ? AND pass = ?", [cedula, pass], (err, result) => {


        let numRows = result.length;

        if (err) {
            res.status(400).json({
                err
            });
        }
        if (numRows == 0) {
            res.json({

                result,
                message: numRows,
                idcomprador: 0,
                
            });
        } else {
            res.json({

                result,
                message: numRows,
                idcomprador: result[0].idcomprador

            });
        }

    });
});


app.post('/loginAdmin', (req, res) => {
    let RIF = req.body.RIF
    let pass = req.body.Pass


    conn.query("SELECT * FROM panaderias WHERE rif = ? AND pass = ?", [RIF, pass], (err, result) => {


        let numRows = result.length;

        if (err) {
            res.status(400).json({
                err
            });
        }

        if (numRows == 0) {
            res.json({

                result,
                message: numRows,
                idpanaderia: 0
            });
        } else {
            res.json({

                result,
                message: numRows,
                idpanaderia: result[0].idpanaderia

            });
        }
    });
});

app.post('/perfil', (req, res) => {
    let idcomprador = req.body.idcomprador;

    conn.query("SELECT * FROM compradores WHERE idcomprador = ?",idcomprador , (err, result) => {
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

app.post('/correo', (req, res) => {
    let idcomprador = req.body.idcomprador;

    conn.query("SELECT correo FROM compradores WHERE idcomprador = ?",idcomprador , (err, result) => {
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

app.put('/perfedit', (req, res) => {
    let idcomprador = req.body.idcomprador
    let data = _.pick(req.body, ['nombre', 'apellido', 'correo', 'estado', 'ciudad', 'genero']);

    conn.query('UPDATE compradores SET ? where idcomprador = ?', [data, idcomprador], (err, result) => {
        if (err) {
            res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            result,
            message: `Usuario  fue cambiado`
        })
    })
})




module.exports = app;