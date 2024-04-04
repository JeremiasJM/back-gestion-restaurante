import express from "express";
import userController from "../controllers/user.controller.js";

const router = express.Router();

//Get all users
router.get("/usuarios", userController.getAllUsers);



export default router; 