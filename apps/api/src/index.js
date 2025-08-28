import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { env } from "./config/env.js"
import { prisma } from './lib/prisma.js'
import { apiRouter } from './routes/index.routes.js'
import { errorMiddleware } from './middlewares/error.middleware.js'

//Cargamos las variables definidas en .env (por ejemplo PORT=4000)
dotenv.config();

//Creamos una aplicación de express
const app = express(); 


//Habilitamos middleware (funciones que se ejecutan en cada peticion)
app.use(cors()); //Este middleware activa cors: sin esto el navegadr bloquearía las peticiones
app.use(express.json()); //Este middleware le dice a Express que atienda JSON en el body de las peticiones


// Ruta de salud o diagnóstico rápido del servidor (no es de dominio).
app.get("/", (req, res) => {
  res.send(`✅ Servidor funcionando en el puerto ${env.port}, modo ${env.nodeEnv}`);
});


// Montamos el enrutador principal de la API.
app.use('/', apiRouter)

// ❗ Manejador de errores al final
app.use(errorMiddleware)

const PORT = env.port || 4000

// Cierre ordenado
process.on('SIGINT', async () => { await prisma.$disconnect(); process.exit(0) })
process.on('SIGTERM', async () => { await prisma.$disconnect(); process.exit(0) })


//Podemos escuchar el servidor en el puerto definido, cuando arranca podemos verlo en la consola
app.listen(PORT, () => {
  console.log(`🚀 API CORRIENDO EN http://localhost:${env.port}`)
})