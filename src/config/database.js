import { Sequelize } from "sequelize";
import "dotenv/config";

//✩ sequielize es con lo q hare los modelos, al exportar trabajare con tooodo esto:
export const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST ,
        dialect: process.env.DB_DIALECT
    });

export const connect = async() => {
    try {
        await sequelize.authenticate();
        //✩"espera q seque verifique la bd"
/*         await sequelize.sync({force:false})
 */        //✩ "cada q se agruegen caracteristicas sincroniza los cambios con la bd".
        // no modifica lo q ya esta, agrega lo q falta, si fuera force: true
        // borra todo y las hace de 0
        //✩ comprueba de q se creo bien la bd
        console.log("Conexion con exito")
    } catch (error) {
        console.log("Error en la conexion a la bd :(", error)
    }
}