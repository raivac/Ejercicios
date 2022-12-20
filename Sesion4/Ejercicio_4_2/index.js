
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

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


app.use(bodyParser.json());

//Insertar un nuevo libro. Accederá por POST a la URI /libros
app.post('/libros', (req, res) => {

    let nuevoLibro = new Libro({
        titulo: req.body.titulo,
        editorial: req.body.editorial,
        precio: req.body.precio
    });

    nuevoLibro.save().then(resultado => {
        res.send({error: false, resultado: resultado});
    }).catch(error => {
        res.send({error: true,mensajeError: "Error añadiendo el libro"});
    });
});


//Modificar un libro a partir de su id. Accederá por PUT a la URI /libros/:id
app.put('/libros/:id', (req, res) => {
    Libro.findByIdAndUpdate(req.params.id, {
    $set: {
        titulo: req.body.titulo,
        editorial: req.body.editorial,
        precio: req.body.precio
    }
    }, {new: true}).then(resultado => {
        if (resultado){
            res.send({error: false, resultado: resultado});
        }
        else{
            res.send({error: true,mensajeError: "No se ha encontrado el libro"});
        }
    }).catch(error => {
        res.send({error: true,mensajeError:"Error actualizando el libro"});
    });
});

//Borrar un libro a partir de su id. Accederá por DELETE a la URI /libros/:id
app.delete('/libros/:id', (req, res) => {
    Libro.findByIdAndRemove(req.params.id).then(resultado => {
        if (resultado){
            res.send({error: false, resultado: resultado});
        }
        else{
            res.send({error: true,mensajeError: "No se ha encontrado el libro"});
        }
    }).catch(error => {
        res.send({error: true,mensajeError:"Error eliminando el libro"});
    });
});