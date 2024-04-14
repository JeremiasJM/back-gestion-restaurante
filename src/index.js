import express from 'express';
import { PORT } from './config/config.js';
import cors from 'cors';
import userRouter from "./routes/users.routes.js";
import privateRouter from "./routes/private.route.js";
import reserveRouter from "./routes/reserve.route.js";


const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});a


app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
});


//Rutas
//rutas

app.use("/api",userRouter)
//app.use("/api", comprobacionJwt, privateRouter)
app.use("/api",reserveRouter)


