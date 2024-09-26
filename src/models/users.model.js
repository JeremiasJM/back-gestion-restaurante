import mongoose from "mongoose";
import { Schema } from "mongoose";
import { emailRegex } from '../helpers/emailRegex.js';
import { contrasenaRegex } from '../helpers/contrasenaRegex.js';

const userSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50
    },
    apellido: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [emailRegex, "El correo electrónico no es válido"]
    },
    password: {
      type: String,
      required: true,
      minlength: 8,    
    },
    admin: {
      type: Boolean,
      default: false
    },
    estado: {
      type: Boolean,
      default: true
    },
    cod_recuperacion: {
      type: String,
      default: null
    }
  },
  { timestamps: true, versionKey: false }
);

const UserModel = mongoose.model("User", userSchema);
export default UserModel;