import request from "supertest";
import createServer from "../src/library/Server";
import Gateway from "../src/models/Gateway";
import mongoose from "mongoose";
import { server } from "../src/app";

afterAll(async () => {
  await mongoose.connection.close();
  server.close();
});

beforeEach(async () => {
  await Gateway.deleteMany({});
});

describe("createGateway", () => {
  it("should create a new gateway", async () => {
    const res = await request(server).post("/gateways/create").send({
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
    const res = await request(server).get("/gateways/get");
    expect(res.statusCode).toEqual(200);
  });
});
describe("gateways are json ", () => {
  it("should read all gateways as json", async () => {
    const res = await request(server)
      .get("/gateways/get")
      .set("Content-Type", "application/json");
    expect(res.statusCode).toEqual(200);
  });
});
