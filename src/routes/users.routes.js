import express from "express";
import userController from "../controllers/user.controller.js";

const router = express.Router();


router.get("/usuarios", userController.getAllUsers);


router.post("/registro", userController.registroUsuario);

router.delete("/delete/:id", userController.deleteUsuario);

router.put("/update/:id", userController.updateUser);

router.post("/login", userController.loginUsuario);

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

export default router; 