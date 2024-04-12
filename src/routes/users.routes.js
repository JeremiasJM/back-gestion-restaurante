import express from "express";
import userController from "../controllers/user.controller.js";

const router = express.Router();

//Get all users
router.get("/usuarios", userController.getAllUsers);

/* COMENTARIO NECESARIO PARA PODER PROBAR LOS CONROLLERS
// Register
router.post("/register", userController.createUser);

// Login
router.post("/login", userController.loginUser);

//Update
router.put("/update/:id", userController.updateUser);

//Delete
router.delete("/delete/:id", userController.deleteUser);

//Get user
router.get("/user/:email", userController.getUser);

//Disable user
router.put("/disable/:id", userController.disableUser);
*/
export default router; 