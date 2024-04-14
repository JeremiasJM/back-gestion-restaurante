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
    contrasena: {
      type: String,
      required: true,
      minlength: 8,
      validate: {
        validator: function (contrasenaValida) {
          return contrasenaRegex.test(contrasenaValida);
        },
        message: "La contraseña debe contener al menos 8 caracteres, una letra mayúscula, una letra minúscula, un número y un carácter especial"
      }
    },
    admin: {
      type: Boolean,
      default: false
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