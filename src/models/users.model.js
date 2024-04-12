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
    password: {
      type: String,
      required: true,
    },
    admin: {
      type: Boolean,
      default: false,
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