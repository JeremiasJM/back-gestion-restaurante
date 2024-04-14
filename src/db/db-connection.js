import mongoose from "mongoose";
import { DB_CONNECTION } from "../config/config.js";

mongoose.connect(DB_CONNECTION);

mongoose.connection.on("connected", () => {
    console.log("Conectado a la Base de Datos de Rolling Food!")
});

mongoose.connection.on("error", (error) => {
    console.error(error);
});