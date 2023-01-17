/************************ EJERCICIO 4.1.3 *************************/


const express = require('express');
const bodyParser = require('body-parser');

let Libro = require(__dirname + '/../models/libro.js');

let router = express.Router();

//Listar todos los libros. Accederá por GET a la URI /libros
router.get('/libros', (req, res) => {

    Libro.find().then(resultado => {
        res.send(resultado);
    }).catch(error => {
        res.send([]);
    });
});


//Buscar un libro por su id. Accederá por GET a la URI /libros/:id
router.get('/libros/:id', (req, res) => {

    Libro.findById(req.params.id).then(resultado => {

        if (resultado) {
            res.send({ error: false, resultado: resultado });
        } else {
            res.send({ error: true, mensajeError: "No se han encontrado libos con ese id" });
        }
    }).catch(error => {
        res.send({ error: true, mensajeError: "ERROR" });
    });
});


router.use(bodyParser.json());

//Insertar un nuevo libro. Accederá por POST a la URI /libros
router.post('/libros', (req, res) => {

    let nuevoLibro = new Libro({
        titulo: req.body.titulo,
        editorial: req.body.editorial,
        precio: req.body.precio,
        autor:req.body.autor,
        comentarios: req.body.comentarios
    });

    nuevoLibro.save().then(resultado => {
        res.send({ error: false, resultado: resultado });
    }).catch(error => {
        res.send({ error: true, mensajeError: "Error añadiendo el libro" });
    });
});


//Modificar un libro a partir de su id. Accederá por PUT a la URI /libros/:id
router.put('/libros/:id', (req, res) => {
    Libro.findByIdAndUpdate(req.params.id, {
        $set: {
            titulo: req.body.titulo,
            editorial: req.body.editorial,
            precio: req.body.precio,
            autor:req.body.autor,
            comentarios: req.body.comentarios
        }
    }, { new: true }).then(resultado => {
        if (resultado) {
            res.send({ error: false, resultado: resultado });
        }
        else {
            res.send({ error: true, mensajeError: "No se ha encontrado el libro" });
        }
    }).catch(error => {
        res.send({ error: true, mensajeError: "Error actualizando el libro" });
    });
});

//Borrar un libro a partir de su id. Accederá por DELETE a la URI /libros/:id
router.delete('/libros/:id', (req, res) => {
    Libro.findByIdAndRemove(req.params.id).then(resultado => {
        if (resultado) {
            res.send({ error: false, resultado: resultado });
        }
        else {
            res.send({ error: true, mensajeError: "No se ha encontrado el libro" });
        }
    }).catch(error => {
        res.send({ error: true, mensajeError: "Error eliminando el libro" });
    });
});

module.exports = router;