import express from "express";
import http from "http";
import * as mongoose from "mongoose";
import { config } from "./config/config";
const router = express();
const port = 3000;
import Logging from "./library/Logging";
// Ruta de prueba
router.get("/", (req, res) => {
  res.send("¡Hola, mundo!");
});
// Conexión a la base de datos
mongoose
  .connect(config.mongo.url + "gateway", { retryWrites: true, w: "majority" })
  .then(() => {
    Logging.info("Conexión a la base de datos gateway establecida");
    StartServer();
  })
  .catch((err) => Logging.error(err));

// Iniciar el servidor
const StartServer = () => {
  router.use((req, res, next) => {
    Logging.info(
      `Incoming - > Method: [${req.method}] - URL: [${req.url}] - IP [${req.socket.remoteAddress}]`,
    );
    res.on("finish", () => {
      Logging.info(
        `Incoming - > Method: [${req.method}] - URL: [${req.url}] - IP [${req.socket.remoteAddress}] - Status: [#{res.statusCode}]`,
      );
    });
    next();
  });
  router.use(express.urlencoded({ extended: true }));
  router.use(express.json());
};
