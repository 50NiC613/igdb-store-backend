import express from "express";
import * as mongoose from "mongoose";

const app = express();
const port = 3000;

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("¡Hola, mundo!");
});
let conectado = false;
// Conexión a la base de datos
mongoose
  .connect("mongodb://127.0.0.1:27017/gateway")
  .then(() => {
    conectado = true;
    console.log("Conexión a la base de datos establecida");
  })
  .catch((err) => console.log(err));

// Iniciar el servidor
if (conectado)
  app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
  });
