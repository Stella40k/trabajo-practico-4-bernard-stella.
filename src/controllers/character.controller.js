//✩ aca reciben laas peticiones HTTP, se fija en la consulta y extrae el body
//para completarlo

//✩imortaciones :P
import { Character } from "../models/character.model.js"


//traer a todos los pj
export const characterController = async (req, res) =>{
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

//actualizacion de personajes
export const updateCharacter = async (req, res) =>{
    try {
        const { id } = req.params; //el id q metan sera del pj a actualizar 
        const { name, ki, race, gender, description} = req.body; //los dstos nuevos vendran en forma de cuerpo y en arrays

        const character = await Character.findByPk(id);
        if (!character) {
            return res.status(400).json({message: "Personaje no encontrado/No existente"});
        }

        //validacion de los datos nuevos q entren, tooooodo if else otra vez


        //si nombre se actualizo debe reemplazar al viejo y respetar el trim
        if(name) character.name = name.trim(); 

        //si ki exite o es igual a 0 va a actualizar el existente y tiene q ser entero
        if(ki || ki ===0) character.ki = parseInt(ki);

        //si race existe entonces lo va a cambiar por el nuevo y respetara el trim q es sin espacios
        if(race) character.race = race.trim();

        //aca valida la existencia de gender, se fija si estan intentando actualizarlo
        //compara el valor ingresado con MALE o FEMALE de la bd, en el caso de q no ingresen tal cual (con mayusculas)
        //le pongo toUpperCase q hace q cualquier parecido con esas palabras la hagan en mayuscula
        if(gender &&["MALE", "FEMALE"].includes(gender.toUpperCase())){
            character.gender = gender.toUpperCase();
            //si ingresa male, Male, MALE ingresa como valido y lo pone en mayus. si ingresa algun otro valor
            //no entra
        }

        //reemplaza la descripcion vieja y con el valor trim hace q evite errores de tabulaciones, espacios solos o 
        //espacios antes y despues del texto para evitar errores de busqueda
        if(description) character.description = description.trim()

        //espera los datos cambiados para guardar y mostrar el mensaje
        await character.save()
        res.status(200).json({message: "Personaje actualizado: ", character})

    } catch (error) {
        res.status(500).json({message: "Error en la actualizacion del pj", error:error.message})
    }
};

//eliminar un pj
export const deletCharacter = async(req, res) =>{
    try {
        //del req.params saca el id y guarda la id q venga en la ruta en la const id
        const { id } = req.params;

        //estoy buscando el pj con findbypk(id), estoy esperando q lo busqie en la bd y guardarlo en character
        const character = await Character.findByPk(id);

        if ((!character)) {
            return res.status(404).json({message: "Personaje no encontrado :("})
        }

        //elimina de la bd al pj q se busco
        await character.destroy()
        return res.status(200).jdon({message: "Personaje eliminado"})
    } catch (error) {
        return res.status(500).jsin({message: "Error al eliminar personaje", error: error.message});
    }

};

