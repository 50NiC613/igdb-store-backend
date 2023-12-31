import express from "express";
import Logging from "./Logging";
import gatewayRoutes from "../routes/Gateway";
import peripheralRoutes from "../routes/Peripheral";
import { config } from "../config/config";

const router = express();

function createServer() {

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
  /** Rules */
  router.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization",
    );

    if (req.method == "OPTIONS") {
      res.header(
        "Access-Control-Allow-Methods",
        "PUT, POST, PATCH, DELETE, GET",
      );
      return res.status(200).json({});
    }

    next();
  });
  /** Routes */
  router.use("/gateways", gatewayRoutes);
  router.use("/peripherals", peripheralRoutes);

  /** Healthcheck */
  router.get("/ping", (req, res, next) =>
    res.status(200).json({ hello: "world" }),
  );
  /** Testt */
  router.get("/", (req, res, next) =>
    res.status(200).json({ gateway_server: "ok" }),
  );
  /** Error handling */
  router.use((req, res, next) => {
    const error = new Error("Not found");

    Logging.error(error);

    res.status(404).json({
      message: error.message,
    });
  });

  return router;
}
export default createServer;
