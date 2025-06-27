//✩ aca reciben laas peticiones HTTP, se fija en la consulta y extrae el body
//para completarlo

//✩imortaciones :P
import { Character } from "../models/character.model.js"


//traer a todos los pj
export const charactergetController = async (req, res) =>{
    try {
        const characters = await Character.findAll();
        res.status(200).json(characters)
    } catch (error) {
        res.status(500).json({error: "No se pudo traer a todos los personajes"})
    }
};

//traer a UN pj
export const getCharacterById = async(req, res) =>{
    try {
        const character = Character.findByPk(req.params.id);
        if (!character) {
            return res.status(404).json({message: "Personaje no encontrado"});
        }
    } catch (error) {
        return res.status(404).json({error: "No se pudo traer al personaje"});
    }
};

//creacion de pjs
export const createCharacter = async (req, res) => {
    try {
        let {name, Ki, race, gender, description} = req.body; //aca estoy recibiendo los datos del usuario
         //validaciones 

          //validacion para q pongan si o si algo

        if (!name || !Ki || !race || !gender || !description) {
         return res.status(400).json({message: "Completar campo obligatorio"});
        }

        //validacion para q no metan espacios vacios en los strings
        if (!name || name.trim() ===""){
          return res.status(400).json({message: "No se permiten campos vacios"});
        }
        if (!race || race.trim() ===""){
        return res.status(400).json({message: "No se permiten campos vacios"});
        }
        if (!description || description.trim() ===""){
        return res.status(400).json({message: "No se permiten campos vacios"});
        }

        //validacion ki
        if (!Ki && Ki !=='number') {
        return res.status(400).json({message: "Ingresar numeros enteros"});
        }

        //validacion ppara genero

        if (!gender || !["MALE", "FEMALE"].includes(gender)){ //.includes(gender) se fija si lo q
        //ingresaron este entre las opciones (f o m nms), si no esta tira error
        return res.status(400).json({message: "Elegir solo FEMALE o MALE"});
        }

        //validacion o aviso para cuando repiten pj
        const existingCharacter = await Character.findOne({ where: { name: formattedName } });
		if (existingCharacter) {
            return res.status(400).json({ message: "Personaje ya existente" });
		}

        const newCharacter = {
            name: formattedName,
            Ki: formattedKi,
            race: formattedRace,
            gender: formattedGender,
            description:formattedDescription
        };
        const character = await Character.create(newCharacter);
        res.status(200).json({message: `Personaje creado con exito!${character}`});

    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Error en el servidor! D:"});
    }
};

