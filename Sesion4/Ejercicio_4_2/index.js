
const express = require('express');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/libros');

let libroSchema = new mongoose.Schema({

    titulo: {
        type: String,
        required: true,
        minlength: 3,
        trim: true
    },
    editorial: {
        type: String,
        trim: true
    },
    precio: {
        type: Number,
        required: true,
        min: 0,
        trim: true
    },
});

let Libro = mongoose.model('libros', libroSchema);

let app = express();
app.listen(8080);

//Listar todos los libros. Accederá por GET a la URI /libros
app.get('/libros', (req, res) => {

    Libro.find().then(resultado => {
        res.send(resultado);
    }).catch (error => {
        res.send([]);
    });
});


//Buscar un libro por su id. Accederá por GET a la URI /libros/:id
app.get('/libros/:id', (req, res) => {

    Libro.findById(req.params.id).then(resultado => {
        
        if(resultado){
            res.send({error: false, resultado: resultado});
        }else{
            res.send({error: true,mensajeError: "No se han encontrado libos con ese id"});
        }
    }).catch (error => {
        res.send({error: true,mensajeError: "ERROR"});
    });
});

