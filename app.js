//✩ importaciones
import "dotenv/config";//✩ aca estoy usando env y las activo con config, puedo usar las variables
import express from "express";
import { connect } from "./src/config/database.js"; 


const app = express(); /*✩ todo lo de express esta guardado en 
app (enrutamiento, esucha, middel) */

const port = process.env.port;


//✩ aca digo q el server esccucha tal puerto
app.listen(port, () =>{
    console.log(`Se esta escuchando el server en el puerto ${port}`)
});

connect()
