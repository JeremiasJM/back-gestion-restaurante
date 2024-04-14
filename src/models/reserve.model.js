import mongoose from "mongoose";
import { Schema } from "mongoose";

const reserveSchema = new Schema(
  {
    nombre: String,
    apellido: {
      type: String,
      required: true
    },
    fecha: {
      type: Date,
      required: true
    },
    hora: {
      type: String,
      required: true
    },
    comensales: {
      type: Number,
      required: true
    },
    estadoReserva: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true, versionKey: false }
);

const ReserveModel = mongoose.model("Reserve", reserveSchema);

export default ReserveModel;