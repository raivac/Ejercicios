
/****************************** 3.1 EJERCICIO 1 *********************************/
const mongoose = require('mongoose');

//no se si hay que hacer algo mas en lo de las promesas ya que no se como van
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/libros');


/****************************** 3.2 EJERCICIO 2 *********************************/
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
    comentarios: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'comentario'
    }]
});

let Libro = mongoose.model('libros', libroSchema);


/***********************Sesion 5 EJERCICIO 1************************/

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


let autor1 = new Autor({

    nombre: "Raúl",
    año: 1997,
    libroEscrito: '63c53833e0faaec73befb922',
});

autor1.save().then(resultado => {
    console.log("Autor añadido exitosamente: ", resultado);
}).catch(error => {
    console.log("Error al añadir el autor: ", error);
});


let autor2 = new Autor({

    nombre: "Pep",
    año: 1990,
    libroEscrito: '63c53833e0faaec73befb923',
});

autor2.save().then(resultado => {
    console.log("Autor añadido exitosamente: ", resultado);
}).catch(error => {
    console.log("Error al añadir el Autor: ", error);
});

/***********************Sesion 5 EJERCICIO 2************************/

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

/***********************Sesion 5 EJERCICIO 3************************/

Libro.find().select('titulo precio').sort({precio: 1}).limit(3).then(resultado => {
    console.log("Busqueda Exitosa! ", resultado);
}).catch(error => {
    console.log("Error al buscar ", error);
});
