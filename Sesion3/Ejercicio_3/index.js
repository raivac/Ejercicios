const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/libros');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/libros');