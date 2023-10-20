import { config } from "./config/config";
import Logging from "./library/Logging";
import * as mongoose from "mongoose";
import createServer from "./library/Server";
// Conexión a la base de datos
const app = createServer();
mongoose
  .connect(config.mongo.url + "gateways", {
    retryWrites: true,
    w: "majority",
  })
  .then(() => {
    Logging.info("Conexión a la base de datos gateway establecida");
  })
  .catch((err) => Logging.error(err));
// Iniciar el servidor
export const server = app.listen(config.server.port, () => {
  Logging.info(`Server is running on port ${config.server.port}`);
});
