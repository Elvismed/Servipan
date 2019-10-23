const express = require('express');
const paypal = require('paypal-rest-sdk');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const conn = require('../config/db');
const Precio = require('../models/preciosmodel');
paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'AQZSTDZzg9mR6X0gmJo9zekCdWdVI1cq06_wED3m6mXZI1VcElg6NOl5ZR5x-kZa22RNZN_DCB0pw4ji',
    'client_secret': 'EKK9jP-enuq-ey8c6aZ8D5jvW3mu-CUWlqqvg87ZQBcGq9JVZjpDmNENrACuKo6UOhSKNWPtpMJHXhmN'
  });
const app = express();
app.set('views',__dirname+'/views');
app.engine('ejs',ejs.renderFile);
app.set('view engine','ejs');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 // AQZSTDZzg9mR6X0gmJo9zekCdWdVI1cq06_wED3m6mXZI1VcElg6NOl5ZR5x-kZa22RNZN_DCB0pw4ji client
 // EKK9jP-enuq-ey8c6aZ8D5jvW3mu-CUWlqqvg87ZQBcGq9JVZjpDmNENrACuKo6UOhSKNWPtpMJHXhmN secret
// parse application/json
app.use(bodyParser.json())

app.get('/home',(req,res)=>{
    res.render('index');
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
        if(error){
            console.log(error.response);
            throw error;
        }else{
            res.render('success')
            res.json(payment)
            console.log(res)
           
        }
    })
    })
   }) 
module.exports = app;