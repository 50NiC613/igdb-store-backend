"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const mongoose = __importStar(require("mongoose"));
const config_1 = require("./config/config");
const router = (0, express_1.default)();
const Logging_1 = __importDefault(require("./library/Logging"));
const Gateway_1 = __importDefault(require("./routes/Gateway"));
// Conexión a la base de datos
mongoose
    .connect(config_1.config.mongo.url + "gateway", { retryWrites: true, w: "majority" })
    .then(() => {
    Logging_1.default.info("Conexión a la base de datos gateway establecida");
    StartServer();
})
    .catch((err) => Logging_1.default.error(err));
// Iniciar el servidor
const StartServer = () => {
    router.use((req, res, next) => {
        Logging_1.default.info(`Incoming - > Method: [${req.method}] - URL: [${req.url}] - IP [${req.socket.remoteAddress}]`);
        res.on("finish", () => {
            Logging_1.default.info(`Incoming - > Method: [${req.method}] - URL: [${req.url}] - IP [${req.socket.remoteAddress}] - Status: [#{res.statusCode}]`);
        });
        next();
    });
    router.use(express_1.default.urlencoded({ extended: true }));
    router.use(express_1.default.json());
};
/** Rules */
router.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method == "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});
/** Routes */
router.use("/gateways", Gateway_1.default);
//router.use('/books', bookRoutes);
/** Healthcheck */
router.get("/ping", (req, res, next) => res.status(200).json({ hello: "world" }));
/** Testt */
router.get("/", (req, res, next) => res.status(200).json({ prueba: "ok" }));
/** Error handling */
router.use((req, res, next) => {
    const error = new Error("Not found");
    Logging_1.default.error(error);
    res.status(404).json({
        message: error.message,
    });
});
http_1.default
    .createServer(router)
    .listen(config_1.config.server.port, () => Logging_1.default.info(`Server is running on port ${config_1.config.server.port}`));
