import express from 'express';
import { PORT } from './config/config.js';
import cors from 'cors';
import privateRouter from "./routes/private.route.js";
import reserveRouter from "./routes/reserve.route.js";
import {methodNotAllowedHandler} from "./middleware/method.middleware.js"
import "./db/db-connection.js";
import userRoutes from "./routes/users.routes.js"
import comprobacionJwt from "./middleware/comprobacionJwt.js"

const app = express();
app.use(cors());
app.use(express.json());

export const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
};

app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.use("/api/user", userRoutes)
app.use("/api/reserve", reserveRouter);
app.use("/api",comprobacionJwt, privateRouter);
app.use(methodNotAllowedHandler);
/* COMENTARIO NECESARIO PARA PODER PROBAR LOS CONROLLERS
app.use("/api", userRoutes);
*/
// Middleware de manejo de errores

// Usar el middleware de manejo de errores

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
});


//Rutas
//rutas

//app.use("/api", comprobacionJwt, privateRouter)



