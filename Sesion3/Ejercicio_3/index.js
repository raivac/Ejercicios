
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
});

let Libro = mongoose.model('libros', libroSchema);


/****************************** 3.3 EJERCICIO 3 *********************************/
let libro1 = new Libro({

    titulo: "El capitán Alatriste",
    editorial: "Alfaguara",
    precio: 15
});

libro1.save().then(resultado => {
    console.log("Libro añadido exitosamente: ", resultado);
}).catch(error => {
    console.log("Error al añadir el libro: ", error);
});


let libro2 = new Libro({

    titulo: "El juego de Ender",
    editorial: "Ediciones B",
    precio: 8.95
});

libro2.save().then(resultado => {
    console.log("Libro añadido exitosamente: ", resultado);
}).catch(error => {
    console.log("Error al añadir el libro: ", error);
});


/****************************** 3.4 EJERCICIO 4 (opcional) *********************************/
let libro3 = new Libro({

    titulo: "A",
    precio: 12
});

libro3.save().then(resultado => {
    console.log("Libro añadido exitosamente: ", resultado);
}).catch(error => {
    console.log("Error al añadir el libro: ", error);
});


/****************************** 3.5 EJERCICIO 5 *********************************/
Libro.find({
    precio:{$gte:10, $lte: 20}
}).then(resultado => {
    console.log('Resultado de la búsqueda por precio:', resultado);
}).catch(error => {
    console.log('Error en la búsqueda:', error);
});

//LIBRO 1
Libro.findById('639ae336ee9a861117c4c1b2').then(resultado => {
    console.log('Resultado de la búsqueda por ID:', resultado);
}).catch(error => {
    console.log('Error en la búsqueda:', error);
});

//LIBRO 2
Libro.findById('639ae336ee9a861117c4c1b3').then(resultado => {
    console.log('Resultado de la búsqueda por ID:', resultado);
}).catch(error => {
    console.log('Error en la búsqueda:', error);
});


/****************************** 3.6 EJERCICIO 6 *********************************/
//eliminaremos el libro 2
Libro.findByIdAndRemove('639ae336ee9a861117c4c1b3').then(resultado => {
    console.log("Libro eliminado con éxito:", resultado);
}).catch (error => {
    console.log("Error al eliminar el libro", error);
});


/****************************** 3.7 EJERCICIO 7 *********************************/
//modificaremos el precio del primer libro de 15 a 30
Libro.findByIdAndUpdate('639ae336ee9a861117c4c1b2',{
    $set: {precio: 30}},{new: true}).then(resultado => {
        console.log("Precio actualizado exitosamente: ",resultado);
}).catch(error => {
        console.log("Error al actualizar el precio", error);
});


/****************************** 3.8 EJERCICIO 8 (opcional) *********************************/
//modificaremos el primer libro otra vez ya que el segundo lo borramos anteriormente
Libro.findByIdAndUpdate('639ae336ee9a861117c4c1b2',{
    $set: {precio: 40}, $inc: {__v: 1}},{new: true}).then(resultado => {
        console.log("Precio y versión actualizados exitosamente: ",resultado);
}).catch(error => {
        console.log("Error al actualizar el precio o la versión", error);
});
