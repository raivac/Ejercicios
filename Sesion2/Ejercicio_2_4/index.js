const moment = require('moment');


//Guarda en una variable la fecha y hora actuales.
let ahora = moment();


//Define una fecha anterior a la actual y posterior
let antes = moment("07/10/2015", "DD/MM/YYYY");
let despues = moment("07/10/2050", "DD/MM/YYYY");


//Imprime por consola cuántos años han pasado desde la fecha vieja a la actual.
let años = moment.duration(ahora.diff(antes)).years();

console.log("Desde el "+antes.format("DD/MM/YYYY")+" hasta el "+ahora.format("DD/MM/YYYY")+
" han pasado "+años+" años.");


//Saca por consola, de una forma similar, cuántos años y meses faltan para llegar a la fecha futura desde la actual
let años2 = moment.duration(despues.diff(ahora)).years();
let meses = moment.duration(despues.diff(ahora)).months();

console.log("Desde el "+ahora.format("DD/MM/YYYY")+" hasta el "+despues.format("DD/MM/YYYY")+
" faltan "+años2+" años y "+meses+" meses.");


//Muestra ahora por consola si la fecha vieja es, efectivamente, anterior a la actual.
if(antes.isBefore(ahora)){
    console.log("La fecha "+antes.format("DD/MM/YYYY")+" es anterior a "+ahora.format("DD/MM/YYYY"));
}else{
    console.log("La fecha "+antes.format("DD/MM/YYYY")+" NO es anterior a "+ahora.format("DD/MM/YYYY"));
}


//Finalmente, crea una fecha que sea exactamente dentro de un mes. Para ello, usa el método add, añadiendo un mes a la fecha actual. Saca esta fecha por pantalla, formateada como DD/MM/YYYY
let unMes = moment().add(1, 'months');

console.log("Dentro de un mes será "+unMes.format("DD/MM/YYYY"));