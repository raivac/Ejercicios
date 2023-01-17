/************************ EJERCICIO 4.1.7 *************************/


// Librerías externas
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


// Enrutadores
const libros = require(__dirname + '/routes/libros');
const autores = require(__dirname + '/routes/autores');


//Conexion a la BD
mongoose.Promise = global.Promise;
mongoose.set('strictQuery', false);

let app = express();

// Carga de middleware y enrutadores
app.use(bodyParser.json());
app.use('/libros', libros);
app.use('/autores', autores);

// Puesta en marcha del servidor
app.listen(8080);

