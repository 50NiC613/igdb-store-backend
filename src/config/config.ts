import dotenv from "dotenv";
dotenv.config();
const MONGO_USERNAME = process.env.MONGO_USERNAME || "";
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || "";
const MONGO_URL = "mongodb://127.0.0.1:27017/";
const GATEWAY_SERVER_PORT = process.env.GATEWAY_SERVER_PORT
  ? Number(process.env.GATEWAY_SERVER_PORT)
  : 9090;
  const PERIPHERAL_SERVER_PORT = process.env.PERIPHERAL_SERVER_PORT
  ? Number(process.env.PERIPHERAL_SERVER_PORT)
  : 9091;
export const config = {
  mongo: {
    url: MONGO_URL,
  },
  gateway_server: {
    port: GATEWAY_SERVER_PORT,
  },
  peripheral_server: {
    port: PERIPHERAL_SERVER_PORT,
  }
};
