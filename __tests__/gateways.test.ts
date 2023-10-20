import request from "supertest";
import createServer from "../src/library/Server";
import Gateway from "../src/models/Gateway";
import { MongoMemoryServer } from "mongodb-memory-server";
import * as mongoose from "mongoose";
const app = createServer;

beforeAll(async () => {
  const mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoose.connection.close();
});

beforeEach(async () => {
  await Gateway.deleteMany({});
});

describe("createGateway", () => {
  it("should create a new gateway", async () => {
    const res = await request(app).post("/gateways/create").send({
      serialNumber: "123456",
      name: "Test Gateway",
      ipv4Address: "192.168.1.1",
      peripheralDevices: [],
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body.gateway.serialNumber).toEqual("123456");
    expect(res.body.gateway.name).toEqual("Test Gateway");
    expect(res.body.gateway.ipv4Address).toEqual("192.168.1.1");
    expect(res.body.gateway.peripheralDevices).toEqual([]);
  });
});

describe("getGateways", () => {
  it("should read all gateways", async () => {
    const res = await request(app).get("/gateways/get");
    expect(res.statusCode).toEqual(200);
  });
});
