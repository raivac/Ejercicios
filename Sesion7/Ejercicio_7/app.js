const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const ejs = require('ejs');

const tareas = require(__dirname + '/routes/tareas');
const index = require(__dirname + '/routes/index');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/tareas');

let app = express();

// Por completar

//Cargar el motor de plantillas EJS
app.set('view engine', 'ejs');

//Definir la carpeta de contenido estático "/public"
app.use('/public', express.static(__dirname + '/public'));



app.listen(8080);