const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require("morgan");
require('./config/config');
//middlewares
app.use(cors({
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
}));
app.use(morgan("dev"));
app.use(express.json());

//rutas
const pool = require("../server/config/db");


app.use(require('./routes/index'));

app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}`));