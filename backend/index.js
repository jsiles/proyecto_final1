const express = require("express");
const { Sequelize } = require("sequelize");
const cors = require("cors");
const dotenv = require("dotenv");
const clienteRoutes = require("./routes/clienteRoutes");
const pedidoRoutes = require("./routes/pedidoRoutes");

// Cargar variables de entorno desde .env
dotenv.config();

// Configurar la app
const app = express();

// Configurar Sequelize con variables de entorno
const sequelize = new Sequelize(
  process.env.DB_NAME || "ejcodefirst",
  process.env.DB_USER || "postgres",
  process.env.DB_PASSWORD || "root",
  {
    host: process.env.DB_HOST || "127.0.0.1",
    dialect: "postgres",
  }
);

// Configurar CORS
const corsOptions = {
  origin: process.env.FRONTEND_URL || "*", // ejemplo: http://localhost:5173
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));

// Middlewares
app.use(express.json());
app.use("/clientes", clienteRoutes);
app.use("/pedidos", pedidoRoutes);

// Ruta base
app.get("/", (req, res) => {
  res.send("¡Bienvenido a la API! Usa /clientes o /pedidos para interactuar.");
});

// Conectar a la base de datos
sequelize.authenticate()
  .then(() => console.log("✅ Conectado a PostgreSQL"))
  .catch((err) => console.error("❌ Error al conectar con PostgreSQL:", err));

// Levantar servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en puerto ${PORT}`));
