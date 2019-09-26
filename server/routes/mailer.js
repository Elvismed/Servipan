const express = require('express');
const bodyParser = require('body-parser');
const conn = require('../config/db');
const ejs = require('ejs');
const nodemailer = require('nodemailer');

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.post('/mail2',(req,res)=>{
    const email = req.body.email;
    const output =`
    <h1>Servipan C.A</h1> 
    <h2>Confirmacion de estado de compra ServiPan C.A </h2>
    <p>Datos de Compra</p>
        <ul>
        <li>Producto: ${req.body.nombre_pro}</li>
        <li>Cantidad: ${req.body.cantidad} </li>
        <li>Precio: ${req.body.total} </li>
        <li>Panaderia: ${req.body.nombre_pan} </li>
        <li>RIF: ${req.body.rif} </li>
        </ul>
    <h2>Estatus Final: ${req.body.estatus}</h2>    
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
            subject: 'Confirmacion de estado de compra',
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
})
app.post('/mail3',(req,res)=>{
    const email = req.body.email;
    const output =`
    <h1>Servipan C.A</h1> 
    <h2>Confirmacion de estado de venta  de${req.body.nombre_pan} </h2>
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
            subject: 'Confirmacion de estado de venta',
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
})


app.post('/mail', (req,res)=>{
    const email = req.body.email;
    const output =`
    <h1>Acaba de iniciar una compra en nuestra aplicacion Servipan C.A </h1>
    <p> nuestro equipo revisara su compra 
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
})
    

module.exports = app ;  