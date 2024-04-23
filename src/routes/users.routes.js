import express from "express";
import {
  getAllUsers,
  getUserById,
  loginUser,
  updateUser,
  deleteUser,
  disableUser,
  createUser,
  enableUser,
  generateCode,
  recuperapassword,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.delete("/delete/:id", deleteUser);
router.put("/update/:id", updateUser);
router.put("/disable/:id", disableUser);
router.put("/enable/:id", enableUser);
router.post("/generateCode", generateCode);
router.post("/recuperapassword", recuperapassword);

router.post("/registro", createUser);
router.post("/login", loginUser);

export default router;
