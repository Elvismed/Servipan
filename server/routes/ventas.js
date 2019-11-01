const express = require('express');
const bodyParser = require('body-parser');
//const bcrypt = require('bcryptjs');
const conn = require('../config/db');
const _ = require('underscore');
const venta = require('../models/ventas.model');
const compra = require('../models/compras.model');
const nodemailer = require('nodemailer');

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


app.post('/pago', (req, res) => {

    let datos = req.body.datos;
    let bolivares = req.body.bolivares;
    let banco_emisor = req.body.banco_emisor;
    let nrefe = req.body.nrefe;
    let codigo_venta = req.body.codigo_venta;
    let correo = req.body.correo


    console.log(bolivares);
    console.log(banco_emisor);
    console.log(nrefe);
    console.log(codigo_venta);
    console.log(correo);
    
    datos.forEach(element => {
        element.banco_emisor = banco_emisor;
        element.nrefe = nrefe;
        element.codigo_venta = codigo_venta;

        let data = _.pick(element, ['cantidad', 'estatus', 'idpana','id_comprador', 'nombre_pro', 'total', 'banco_emisor', 'nrefe', 'codigo_venta']);
        conn.query('INSERT INTO ventas SET ?', data, (err, result) => {
            if (err) {
                res.status(400).json({
                    ok: false,
                    err
                });
            }
        });

    });

    const email = req.body.correo;
    const output =`
    <h1>Estimado Usuario, acaba de realizar una compra en nuestra aplicacion Servipan C.A </h1>
    <p> Nuestro equipo revisara su compra 
        a la brevedad posible para su cambio de estatus, este atento del proximo correo</p>
        `;
        process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
        const transporter = nodemailer.createTransport({
            
            service: 'gmail',
            auth: {
              type: 'OAuth2',
              user: 'servipantest@gmail.com',
              clientId: '500940244428-ojmotq0tlcsogta68r1snkvn6g005eh4.apps.googleusercontent.com',
              clientSecret: 'QSMO-Gz3Wp_Pgj0mPqQrQKTG',
              refreshToken: '1/M4bJr0X1wAzWrUqS9HXMjZpXTijphjdxB82Q8HxnIfA',
              accessToken: 'ya29.GluMB7sPe0UK4G1Ir3oqvquoTeX4MSrM3hTqJi-ctsdizC660ZVs2MSSIxTRyRSQvkFCFf6Yryk_J_FkCQenQ2qVK-EmJJXFRjz6ZJ7FdlOeU3IWtXFOvWIHqnKd',
              tls:{
                rejectUnauthorized: false
            }
            },
          });
          
          var mailOptions = {
            from: 'servipan <servipantest@gmail.com>',
            to: email,
            subject: 'Compra Iniciada Servipan',
            html: output
        }
        
        transporter.sendMail(mailOptions, (err, data) => {
            if (err) {
                return console.log('Error occurs');
            }
            return res.status(200).json({
                ok: true,
                data
            })
        });

    res.json({
        ok: true,
        message: 'Operacion realizada con exito'
    })

})


app.post('/ventas', (req, res) => {
    let idpana = req.body.idpana
    conn.query('SELECT idventa,codigo_venta,banco_emisor,nrefe FROM ventas WHERE idpana = ? ORDER BY idventa DESC', idpana, (err, result) => {
        if (err) {
            res.status(400).json({
                err
            });
        }
        res.json({
            result,
        })
    });
});
app.post('/detallesventa', (req, res) => {
    let idpana = req.body.idpana;
    let idventa = req.body.idventa;
    conn.query('SELECT * FROM ventas INNER JOIN panaderias on ventas.idpana = panaderias.idpanaderia INNER JOIN compradores on ventas.id_comprador = compradores.idcomprador WHERE idpana = ? AND idventa = ?',[idpana, idventa], (err, result) => {
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


app.post('/ventasServiPan', (req, res) => {
    conn.query('SELECT idventa,codigo_venta,banco_emisor,nrefe,estatus FROM ventas GROUP BY codigo_venta ORDER BY idventa DESC ',(err, result) => {
        if (err) {
            res.status(400).json({
                err
            });
        }
        res.json({
            result,
        })
    });
});

app.post('/detallesventaServiPan', (req, res) => {
    let codigo_venta = req.body.codigo_venta;
    conn.query('SELECT * FROM ventas INNER JOIN panaderias on ventas.idpana = panaderias.idpanaderia INNER JOIN compradores on ventas.id_comprador = compradores.idcomprador WHERE codigo_venta = ?', codigo_venta, (err, result) => {
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


app.put('/estatus',(req, res)=>{
    let idventa = req.body.idventa;
    let data = _.pick(req.body,['estatus']);
    let nombre_pro = req.body.nombre_pro;
    
    console.log(nombre_pro)
    
    conn.query('UPDATE ventas SET ? WHERE idventa = ?', [data, idventa],(err, result)=>{
        if(err){
            res.status(400).json({
                ok: false,
                err
            });
        }


    const email = req.body.email;
    const output1 =`
    <h1>Servipan C.A</h1> 
    <h2>Confirmacion de estado de compra ServiPan C.A </h2>
    <p>Datos de Compra</p>
        <ul>
        <li>Producto: ${nombre_pro}</li>
        <li>Cantidad: ${req.body.cantidad} </li>
        <li>Precio: ${req.body.total} </li>
        <li>Panaderia: ${req.body.nombre_pan} </li>
        <li>RIF: ${req.body.rif} </li>
        </ul>
    <h2>Estatus Final: ${req.body.estatus}</h2>    
        `;
        process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
        const transporter2 = nodemailer.createTransport({
            
            service: 'gmail',
            auth: {
              type: 'OAuth2',
              user: 'servipantest@gmail.com',
              clientId: '500940244428-ojmotq0tlcsogta68r1snkvn6g005eh4.apps.googleusercontent.com',
              clientSecret: 'QSMO-Gz3Wp_Pgj0mPqQrQKTG',
              refreshToken: '1/M4bJr0X1wAzWrUqS9HXMjZpXTijphjdxB82Q8HxnIfA',
              accessToken: 'ya29.GluMB7sPe0UK4G1Ir3oqvquoTeX4MSrM3hTqJi-ctsdizC660ZVs2MSSIxTRyRSQvkFCFf6Yryk_J_FkCQenQ2qVK-EmJJXFRjz6ZJ7FdlOeU3IWtXFOvWIHqnKd',
              tls:{
                rejectUnauthorized: false
            }
            },
          });
          
          var mailOptions = {
            from: 'servipan <servipantest@gmail.com>',
            to: email,
            subject: 'Confirmacion de estado de compra',
            html: output1
        }
        
        transporter2.sendMail(mailOptions, (err, data) => {
            if (err) {
                return console.log('Error occurs');
            }
            return res.status(200).json({
                ok: true,
                data
            })
        });

        
        const email_pan = req.body.email_pan;
    const output2 =`
    <h1>Servipan C.A</h1> 
    <h2>Confirmacion de estado de venta  de ${req.body.nombre_pan} </h2>
    <p>Datos de Compra</p>
        <ul>
        <li>Producto: ${req.body.nombre_pro}</li>
        <li>Cantidad: ${req.body.cantidad} </li>
        <li>Precio: ${req.body.total} </li>
        <li>Comprador: ${req.body.nombre} </li>
        <li>Cedula: ${req.body.cedula} </li>
        </ul>
    <h2>Estatus Final: ${req.body.estatus}</h2>    
        `;
        process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
        const transporter3 = nodemailer.createTransport({
            
            service: 'gmail',
            auth: {
              type: 'OAuth2',
              user: 'servipantest@gmail.com',
              clientId: '500940244428-ojmotq0tlcsogta68r1snkvn6g005eh4.apps.googleusercontent.com',
              clientSecret: 'QSMO-Gz3Wp_Pgj0mPqQrQKTG',
              refreshToken: '1/M4bJr0X1wAzWrUqS9HXMjZpXTijphjdxB82Q8HxnIfA',
              accessToken: 'ya29.GluMB7sPe0UK4G1Ir3oqvquoTeX4MSrM3hTqJi-ctsdizC660ZVs2MSSIxTRyRSQvkFCFf6Yryk_J_FkCQenQ2qVK-EmJJXFRjz6ZJ7FdlOeU3IWtXFOvWIHqnKd',
              tls:{
                rejectUnauthorized: false
            }
            },
          });
          
          var mailOptions = {
            from: 'servipan <servipantest@gmail.com>',
            to: email_pan,
            subject: 'Confirmacion de estado de venta',
            html: output2
        }
        
        transporter3.sendMail(mailOptions, (err, data) => {
            if (err) {
                return console.log('Error occurs');
            }
            return res.status(200).json({
                ok: true,
                data
            })
        });
        
         res.json({
            ok: true,
            result,
            message: `Estatus Modificado!`
         });
    })
    
    
})




module.exports = app;