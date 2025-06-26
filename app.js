//✩ importaciones
import "dotenv/config";//✩ aca estoy usando env y las activo con config, puedo usar las variables
import express from "express";



const app = express(); /*✩ todo lo de express esta guardado en 
app (enrutamiento, esucha, middel) */

const PORT = process.env.PORT;

app.use(CharacterRoutes)

//✩ aca digo q el server esccucha tal puerto
app.listen(PORT, () =>{
    console.log(`Se esta escuchando el server en el puerto ${PORT}`)
});

