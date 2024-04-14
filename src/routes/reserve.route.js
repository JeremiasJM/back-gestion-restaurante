import { Router } from "express";
import reserveController from "../controllers/reserve.controller.js";


const router = Router();

router.get("/reserves", reserveController.getReserves);

router.get("/reserve/:id", reserveController.getByIdReserve);

router.post("/reserve", reserveController.createReserve);

router.delete("/deleteReserve/:id", reserveController.deleteReserve);

router.put("/updateReserve/:id", reserveController.updateReserve);

export default router;