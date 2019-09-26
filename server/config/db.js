const mysql = require('mysql');
const {promisify} = require("util");
const {database} = require("./keys");

const pool = mysql.createPool(database);

pool.getConnection((err,connection) =>{
    if (err){
        if(err.code === "PROTOCOL_CONNECTION_LOST"){
            console.error("CONEXION CON LA BASE DE DATOS FUE CERRADA");
        }
        if(err.code === "ER_CON_COUNT_ERROR"){
            console.error("LA BASE DE DATOS POSEE VARIAS CONNECIONES ACTIVAS");
        }
        if(err.code === "ECONNREFUSED"){
            console.error("CONEXION CON LA BASE DE DATOS RECHAZADA");
        }
    }
    if(connection){
        connection.release();
        console.log("DB CONNECT");
    }
    return;
});

pool.query = promisify(pool.query);

module.exports = pool;