import { Router } from "express";
import { getAllCharacter, createCharacter, deletCharacter,getCharacterById, updateCharacter } from "../controllers/character.controller";

export const routes = Router()

routes.get("/characters", getAllCharacter)
routes.get("/characters/:id", getCharacterById)
routes.post("/characters", createCharacter)
routes.put("/characters/:id", updateCharacter)
routes.delete("/characters/:id", deletCharacter)