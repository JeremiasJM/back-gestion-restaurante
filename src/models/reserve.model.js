import mongoose from "mongoose";
import { Schema } from "mongoose";
import { horaRegex } from "../helpers/horaRegex.js";

const reserveSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },
    apellido: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },
    fecha: {
      type: Date,
      required: true,
      min: Date.now(),
    },
    hora: {
      type: String,
      required: true,
      match: horaRegex, // formato HH:MM
    },
    comensales: {
      type: Number,
      required: true,
      min: 1,
    },
    estadoReserva: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, versionKey: false }
);

const ReserveModel = mongoose.model("Reserve", reserveSchema);
export default ReserveModel;
