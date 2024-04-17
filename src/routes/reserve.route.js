import express from "express";
import {getReserves,getByIdReserve,createReserve,deleteReserve,updateReserve} from "../controllers/reserve.controller.js";


const router = express.Router();

router.get("/", getReserves);

router.get("/:id", getByIdReserve);

router.post("/create", createReserve);

router.delete("/delete/:id", deleteReserve);

router.put("/update/:id", updateReserve);

export default router;