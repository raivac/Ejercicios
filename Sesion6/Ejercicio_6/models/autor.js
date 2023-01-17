/************************ EJERCICIO 4.1.4 *************************/

const mongoose = require('mongoose');


let autorSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        minlength: 2,
        trim: true
    },
    año: {
        type: Number,
        min: 0,
        max: 2000
    },
    libroEscrito: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'libro'
    }
});

let Autor = mongoose.model('autores', autorSchema);

module.exports = Autor;