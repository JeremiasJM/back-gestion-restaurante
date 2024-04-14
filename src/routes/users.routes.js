import express from "express";
import userController from "../controllers/user.controller.js";

const router = express.Router();


router.get("/usuarios", userController.getAllUsers);

router.post("/registro", userController.registroUsuario);

router.delete("/delete/:id", userController.deleteUsuario);

router.put("/update/:id", userController.updateUser);

router.post("/login", userController.loginUsuario);


export default router; 