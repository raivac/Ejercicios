const os = require('os');
const express = require('express');

let app = express();

app.listen(8080);

//http://localhost:8080/fecha
app.get('/fecha',(req,res) => {
    const fecha = new Date();
    res.send(`Hoy es ${fecha.toLocaleDateString()}`);
});


//http://localhost:8080/usuario
app.get('/usuario',(req,res) => {
    const usuario = os.userInfo().username;
    res.send(`Usuario conectado ${usuario}`);
});