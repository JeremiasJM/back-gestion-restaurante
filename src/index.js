import express from 'express';
import { PORT } from './config/config.js';
import cors from 'cors';
import "./db/db-connection.js";
import userRoutes from "./routes/users.routes.js"

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

/* COMENTARIO NECESARIO PARA PODER PROBAR LOS CONROLLERS
app.use("/api", userRoutes);
*/

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
});

