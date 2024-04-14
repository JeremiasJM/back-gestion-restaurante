import mongoose from "mongoose";
import { Schema } from "mongoose";
// REFINAMIENTO DE MODELADO DE GEORGINA
const userSchema = new Schema(
  {
    nombre: String,
    apellido: String,
    email: {
      type: String,
      required: true,
      unique: true,
    },
    contrasena: {
      type: String,
      required: true,
    },
    rol: {
      type: String,
      enum: ['admin', 'usuario'],
      required: true
    },
    estadoUsuario: {
      type: String,
      enum: ['aprobado', 'pendiente', 'suspendido'],
      default: 'pendiente'
    },
    isAprobado: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true, versionKey: false }
);

const UserModel = mongoose.model("User", userSchema);

export default UserModel;