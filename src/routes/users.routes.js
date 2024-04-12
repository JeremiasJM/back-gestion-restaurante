import express from "express";
import userController from "../controllers/user.controller.js";

const router = express.Router();

//Get all users
router.get("/usuarios", userController.getAllUsers);


//Registro
router.post("/registro", userController.registroUsuario);

// Delete user
router.delete("/delete/:id", userController.deleteUsuario);

// Update user

router.put("/update/:id", userController.updateUser);

// Login

router.post("/login", userController.loginUsuario);



export default router; 