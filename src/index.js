import express from 'express';
import { PORT } from './config/config.js';
import cors from 'cors';
import "./db/db-connection.js"

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});


app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
});

