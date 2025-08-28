import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { env } from "./config/env.js"
import { prisma } from './lib/prisma.js'
import { usersRouter } from './routes/users.js'

//Cargamos las variables definidas en .env (por ejemplo PORT=4000)
dotenv.config();

//Creamos una aplicación de express
const app = express(); 


//Habilitamos middleware (funciones que se ejecutan en cada peticion)
app.use(cors()); //Este middleware activa cors: sin esto el navegadr bloquearía las peticiones
app.use(express.json()); //Este middleware le dice a Express que atienda JSON en el body de las peticiones


// Ruta raíz muy simple DE PRUEBA
app.get("/", (req, res) => {
  res.send(`✅ Servidor funcionando en el puerto ${env.port}, modo ${env.nodeEnv}`);
});

// Cuando alguien accede a GET /kpis/summary → la API responde con un JSON mock DE PRUEBA DATOS FALSOS
app.get("/kpis/summary", (req, res) => {
  res.json({
    traffic: { sessions: 1200, users: 800, pageviews: 5000 },  // Datos falsos de tráfico
    sales: { orders: 45, revenue: 2500, conversionRate: 3.7 }, // Datos falsos de ventas
  });
});

// ----------------------------
// Monta el router de usuarios
// ----------------------------
// Todas las rutas definidas en usersRouter cuelgan de /users
app.use('/users', usersRouter)

// ----------------------------
// Arranque + cierre ordenado
// ----------------------------
process.on('SIGINT', async () => {
  await prisma.$disconnect()
  process.exit(0)
})
process.on('SIGTERM', async () => {
  await prisma.$disconnect()
  process.exit(0)
})

const PORT = env.port || 4000

//Podemos escuchar el servidor en el puerto definido, cuando arranca podemos verlo en la consola

app.listen(PORT, () => {
  console.log(`🚀 API CORRIENDO EN http://localhost:${env.port}`)
})