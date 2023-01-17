
const mongoose = require('mongoose');

/***********************Sesion 5 EJERCICIO 2************************/

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/comentarios_subdocumentos');




//autores
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

    comentarios: [comentarioSchema]
});

let Libro = mongoose.model('libros', libroSchema);


let nuevoLibro = new Libro({
    titulo: "Libro con comentarios",
    editorial: "Nueva Editorial",
    precio: 15,
});

nuevoLibro.comentarios.push({nick: 'Ra97', comentario: 'muy buen libro!' });

nuevoLibro.comentarios.push({nick: 'Pep90', comentario: 'No me ha gustado' });

nuevoLibro.save().then(resultado => {
    console.log("Libro añadido exitosamente: ", resultado);
}).catch(error => {
    console.log("Error al añadir el libro: ", error);
});

