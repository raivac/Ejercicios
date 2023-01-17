const express = require('express');

let router = express.Router();

// Definir las rutas aquí
router.get('/', (req, res) => {
    res.render('index');
});

router.get('/ficha_tarea', (req, res) => {
    res.render('ficha_tarea');
});

router.get('/lista_tareas', (req, res) => {
    res.render('lista_tareas');
});

router.get('/nueva_tarea', (req, res) => {
    res.render('nueva_tarea');
});


module.exports = router