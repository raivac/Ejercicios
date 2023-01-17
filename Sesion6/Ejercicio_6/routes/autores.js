/************************ EJERCICIO 4.1.5 *************************/
const express = require('express');
const bodyParser = require('body-parser');

let Autor = require(__dirname + '/../models/autor.js');

let router = express.Router();

//Listar todos los autores. Accederá por GET a la URI /autores
router.get('/autores', (req, res) => {

    Autor.find().then(resultado => {
        res.send(resultado);
    }).catch(error => {
        res.send([]);
    });
});

router.use(bodyParser.json());
//Insertar un nuevo autore. Accederá por POST a la URI /autores
router.post('/autores', (req, res) => {

    let nuevoAutor = new Autor({
        nombre: req.body.nombre,
        año: req.body.año,
        libroEscrito: req.body.libroEscrito
    });

    nuevoAutor.save().then(resultado => {
        res.send({ error: false, resultado: resultado });
    }).catch(error => {
        res.send({ error: true, mensajeError: "Error añadiendo el autor" });
    });
});


//Borrar un autor a partir de su id. Accederá por DELETE a la URI /autores/:id
router.delete('/autores/:id', (req, res) => {
    Autor.findByIdAndRemove(req.params.id).then(resultado => {
        if (resultado) {
            res.send({ error: false, resultado: resultado });
        }
        else {
            res.send({ error: true, mensajeError: "No se ha encontrado el autor" });
        }
    }).catch(error => {
        res.send({ error: true, mensajeError: "Error eliminando el autor" });
    });
});

module.exports = router;