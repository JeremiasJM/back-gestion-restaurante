import { Schema } from "mongoose";
import { horaRegex } from '../helpers/horaRegex';

const reserveSchema = new Schema(
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
    fecha: {
      type: Date,
      required: true,
      min: Date.now()
    },
    hora: {
      type: String,
      required: true,
      match: horaRegex, // formato HH:MM
      validate: {
        validator: function (horaValida) {
          const horaReserva = parseInt(horaValida.substring(0, 2));
          return horaReserva >= 10 && horaReserva <= 20;
        },
        message: "Las reservas solo están disponibles entre las 10:00 y las 20:00 horas"
      }
    },
    comensales: {
      type: Number,
      required: true,
      min: 1
    },
    estadoReserva: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true, versionKey: false }
);

// Validación de disponibilidad de reservas para una fecha y hora específicas - consultar al equipo!
reserveSchema.pre('validate', async function (next) {
  const reservaExistente = await this.constructor.findOne({
    fecha: this.fecha,
    hora: this.hora
  });

  if (reservaExistente) {
    throw new Error('Ya existe una reserva para esta fecha y hora');
  }

  next();
});

const ReserveModel = mongoose.model("Reserve", reserveSchema);
export default ReserveModel;