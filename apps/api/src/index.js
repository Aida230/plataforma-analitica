import express from "express";
import cors from "cors";
import dotenv from "dotenv";

//Cargamos las variables definidas en .env (por ejemplo PORT=4000)
dotenv.config();

//Creamos una aplicación de express
const app = express(); 

//Habilitamos middleware (funciones que se ejecutan en cada peticion)

app.use(cors()); //Este middleware activa cors: sin esto el navegadr bloquearía las peticiones

app.use(express.json()); //Este middleware le dice a Express que atienda JSON en el body de las peticiones


// Ruta raíz muy simple DE PRUEBA
app.get("/", (req, res) => {
  res.send("✅ Servidor funcionando en el puerto 4000");
});

// Cuando alguien accede a GET /kpis/summary → la API responde con un JSON mock DE PRUEBA
app.get("/kpis/summary", (req, res) => {
  res.json({
    traffic: { sessions: 1200, users: 800, pageviews: 5000 },  // Datos falsos de tráfico
    sales: { orders: 45, revenue: 2500, conversionRate: 3.7 }, // Datos falsos de ventas
  });
});

const PORT = process.env.PORT || 4000

//Podemos escuchar el servdor en el puerto definido, cuando arranca podemos verlo en la consola

app.listen(PORT, () => {
  console.log(`🚀 API CORRIENDO EN http://localhost:${PORT}`)
})