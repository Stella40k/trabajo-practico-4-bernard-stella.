import { sequelize } from "../config/database.js";
import { DataTypes} from "sequelize";

export const Character =  sequelize.define( "Character", {
    id: {
        type:DataTypes.INTEGER,    //✩ tipo de dato: entero
        allowNull:false,           //✩ se permite vacio: no
        unique:true                //✩ unico: si (no se repite :P)
    },
    name: {
        type:DataTypes.STRING(50), //✩ tipo de dato: entero
        allowNull:false,           //✩ se permite vacio: no
        unique: true               //✩ unico: si (no se repite :P)
    },
    Ki:{
        type:DataTypes.INTEGER,   //✩ tipo de dato: entero
        allowNull:false,          //✩ se permite vacio: no
    },
    race: {
        type:DataTypes.STRING(20), //✩ tipo de dato: entero
        allowNull:false,           //✩ se permite vacio: no
    },
    gender: {
        type:DataTypes.ENUM("FEMALE", "MALE"),//✩ tipo de dato: parecido al boolean, en vez de v o f podes elegir solo uno y pueden ser tomado como female(1) y male(2) (CREO)
        allowNull:false,                      //✩ se permite vacio: no
    },
    description:{
        type:DataTypes.STRING(250),//✩ tipo de dato: texto
        allowNull:false,           //✩ se permite vacio: no
    }
})