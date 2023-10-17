"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Gateway_1 = __importDefault(require("../models/Gateway"));
const createGateway = (req, res, next) => {
    const { serialNumber, name, ipv4Address, peripheralDevices } = req.body;
    const gateway = new Gateway_1.default({
        _id: new mongoose_1.default.Types.ObjectId(),
        serialNumber,
        name,
        ipv4Address,
        peripheralDevices,
    });
    return gateway
        .save()
        .then((gateway) => res.status(201).json({ gateway }))
        .catch((error) => res.status(500).json({ error }));
};
const readGateway = (req, res, next) => {
    const gatewayId = req.params.gatewayId;
    return Gateway_1.default.findById(gatewayId)
        .then((gateway) => gateway
        ? res.status(200).json({ gateway })
        : res.status(404).json({ message: "not found" }))
        .catch((error) => res.status(500).json({ error }));
};
const readAll = (req, res, next) => {
    return Gateway_1.default.find()
        .then((gateways) => res.status(200).json({ gateways }))
        .catch((error) => res.status(500).json({ error }));
};
const updateGateway = (req, res, next) => {
    const gatewayId = req.params.gatewayId;
    return Gateway_1.default.findById(gatewayId)
        .then((gateway) => {
        if (gateway) {
            gateway.set(req.body);
            return gateway
                .save()
                .then((gateway) => res.status(201).json({ gateway }))
                .catch((error) => res.status(500).json({ error }));
        }
        else {
            return res.status(404).json({ message: "not found" });
        }
    })
        .catch((error) => res.status(500).json({ error }));
};
const deleteGateway = (req, res, next) => {
    const gatewayId = req.params.gatewayId;
    return Gateway_1.default.findByIdAndDelete(gatewayId)
        .then((gateway) => gateway
        ? res.status(201).json({ gateway, message: "Deleted" })
        : res.status(404).json({ message: "not found" }))
        .catch((error) => res.status(500).json({ error }));
};
exports.default = {
    createGateway,
    readGateway,
    readAll,
    updateGateway,
    deleteGateway,
};
