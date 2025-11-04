require('dotenv').config();

import express from 'express';
import { AppRoutes } from './presentation/router';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 4000;

// Configuración básica: permite todas las solicitudes
app.use(cors());

// middelwares
app.use(express.json());


// rutas
app.use(AppRoutes.routes)


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});