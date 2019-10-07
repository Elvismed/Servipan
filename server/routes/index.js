const express = require('express');
const app = express();

app.use(require('../routes/authentication'));
app.use(require('./categoria'));
app.use(require('./comprador'));
app.use(require('./panaderia'));
app.use(require('./producto'));
app.use(require('./banco'));
app.use(require('./ventas'));
app.use(require('./compras'));
app.use(require('./paypal'));
app.use(require('./mailer'));
app.use(require('./recuperacion'));

module.exports = app;