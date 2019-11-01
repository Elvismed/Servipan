const express = require('express');
const paypal = require('paypal-rest-sdk');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const conn = require('../config/db');
const nodemailer = require('nodemailer');
const Precio = require('../models/preciosmodel');


paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'AQZSTDZzg9mR6X0gmJo9zekCdWdVI1cq06_wED3m6mXZI1VcElg6NOl5ZR5x-kZa22RNZN_DCB0pw4ji',
    'client_secret': 'EKK9jP-enuq-ey8c6aZ8D5jvW3mu-CUWlqqvg87ZQBcGq9JVZjpDmNENrACuKo6UOhSKNWPtpMJHXhmN'
  });
const app = express();
app.use(express.static('public'))
app.set('views',__dirname+'/views/public');
app.engine('ejs',ejs.renderFile);
app.set('view engine','ejs');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 // AQZSTDZzg9mR6X0gmJo9zekCdWdVI1cq06_wED3m6mXZI1VcElg6NOl5ZR5x-kZa22RNZN_DCB0pw4ji client
 // EKK9jP-enuq-ey8c6aZ8D5jvW3mu-CUWlqqvg87ZQBcGq9JVZjpDmNENrACuKo6UOhSKNWPtpMJHXhmN secret
// parse application/json
app.use(bodyParser.json())

app.get('/home',(req,res)=>{
    res.render('index')
    
})

app.post('/total',(req, res)=>{
    let data = new Precio(
        req.body.precio,
      );
    conn.query('INSERT INTO precios SET ?',data,(err, result)=>{
        if(err){
            res.status(400).json({
                err
            });
        }
        res.json({
            result,
        })
    });
})

app.post("/pay",(req,res)=>{
    

    conn.query('SELECT * FROM precios ORDER BY idprecio DESC LIMIT 1',(err, result)=>{
        if(err){
            res.status(400).json({
                err
            });
        }
        let dolar = result[0].precio

        const create_payment_json = {
            "intent": "sale",
            "payer": {
                "payment_method": "paypal"
            },
            "redirect_urls": {
                "return_url": `https://polar-garden-73147.herokuapp.com/success`,
                "cancel_url":  `https://polar-garden-73147.herokuapp.com/cancel`
            },
            "transactions": [{
                "item_list": {
                    "items": [{
                        "name":"Productos ServiPan",
                        "sku": "001",
                        "price": dolar,
                        "currency": "USD",
                        "quantity": 1
                    }]
                },
                "amount": {
                    "currency": "USD",
                    "total":  dolar
                },
                "description": "Pago Servipan."
            }]
        };
        paypal.payment.create(create_payment_json, function (error, payment) {
            if (error) {
                throw error;
            } else {
                for(let i = 0;i < payment.links.length; i++){
                    if(payment.links[i].rel==='approval_url'){
                        res.redirect(payment.links[i].href);
                    }
                }
            }
        });
       
    });
    
    
})

   
app.get('/success', (req, res)=>{
    conn.query('SELECT * FROM precios ORDER BY idprecio DESC LIMIT 1',(err, result)=>{
        if(err){
           
            res.status(400).json({
                err
            });
        }
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




    let dolar = result[0].precio
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;
    const execute_payment_json ={
        "payer_id": payerId,
     "transactions":[{
         "amount":{
             "currency": "USD",
             "total": dolar
         }
     }]
    }
    paypal.payment.execute(paymentId, execute_payment_json, function(error ,payment){
        if(payment){
            res.render('success')
        }
    })
    })
   }) 
  
module.exports = app;