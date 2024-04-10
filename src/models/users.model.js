import mongoose from "mongoose";
import { Schema } from "mongoose";

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
  },
  { timestamps: true, versionKey: false }
);

const UserModel = mongoose.model("User", userSchema);

export default UserModel;