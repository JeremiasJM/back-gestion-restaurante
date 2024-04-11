import mongoose from "mongoose";
const { Schema } = mongoose;

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
      isAdmin: {
        type: Boolean,
        default: false
      }
    },
    estadoUsuario: {
      isAprobado: {
        type: Boolean,
        default: false
      }
    }
  },
  { timestamps: true, versionKey: false }
);

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
