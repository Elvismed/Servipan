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

app.post('/recuperacion', (req, res) => {
    let correo = req.body.correo;

    conn.query("SELECT pass from compradores where correo = ?",correo , (err, result) => {
        if (err) {
            res.status(400).json({
                err
            });
        }

        res.json({
            result,
        });

        let pass = result[0].pass
         const output =`
    <h1>Servipan C.A</h1> 
    <h2>Recuperacion de contraseña </h2>
    <p>ha solicitida la recuperacion de su contraseña, a continuacion 
        le daremos la contraseña que tenemos conocimiento relacionada 
        con esta direccion de correo electronico</p>
        <ul>
        <li>Contraseña: ${pass}</li>
        </ul>
        <h2>Atencion tecnica ServiPan</h2>  
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
            to: correo,
            subject: 'Recuperacion de contraseña',
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

    });
});

app.post('/recuperacionAdmin', (req, res) => {
    let correo = req.body.correo;

    conn.query("SELECT pass from panaderias where correo = ?",correo , (err, result) => {
        if (err) {
            res.status(400).json({
                err
            });
        }

        res.json({
            result,
        });

        let pass = result[0].pass
         const output =`
    <h1>Servipan C.A</h1> 
    <h2>Recuperacion de contraseña </h2>
    <p>ha solicitida la recuperacion de su contraseña, a continuacion 
        le daremos la contraseña que tenemos conocimiento relacionada 
        con esta direccion de correo electronico</p>
        <ul>
        <li>Contraseña: ${pass}</li>
        </ul>
        <h2>Atencion tecnica ServiPan</h2>  
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
            to: correo,
            subject: 'Recuperacion de contraseña',
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

    });
});





module.exports = app;