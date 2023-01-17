const mongoose = require('mongoose');


/************************ EJERCICIO 4.1.2 *************************/

//comentarios
let comentarioSchema = new mongoose.Schema({

    fecha: {
        type: Date,
        default: Date.now,
        required: true,
        trim: true
    },
    nick: {
        type: String,
        required: true,
        minlength: 2,
        trim: true
    },
    comentario: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    }
});

//libros
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
    // autor: autorSchema,
    comentarios: [comentarioSchema]
});

let Libro = mongoose.model('libros', libroSchema);
module.exports = Libro;