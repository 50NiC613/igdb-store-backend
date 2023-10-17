"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Peripheral_1 = __importDefault(require("../models/Peripheral"));
const createPeripheral = (req, res, next) => {
    const { uid, vendor, dateCreated, status } = req.body;
    const peripheral = new Peripheral_1.default({
        _id: new mongoose_1.default.Types.ObjectId(),
        uid,
        vendor,
        dateCreated,
        status,
    });
    return peripheral
        .save()
        .then((peripheral) => res.status(201).json({ peripheral }))
        .catch((error) => res.status(500).json({ error }));
};
const readPeripheral = (req, res, next) => {
    const peripheralId = req.params.peripheralId;
    return Peripheral_1.default.findById(peripheralId)
        .populate("author")
        .then((peripheral) => peripheral
        ? res.status(200).json({ peripheral })
        : res.status(404).json({ message: "not found" }))
        .catch((error) => res.status(500).json({ error }));
};
const readAll = (req, res, next) => {
    return Peripheral_1.default.find()
        .then((peripherals) => res.status(200).json({ peripherals }))
        .catch((error) => res.status(500).json({ error }));
};
const updatePeripheral = (req, res, next) => {
    const peripheralId = req.params.peripheralId;
    return Peripheral_1.default.findById(peripheralId)
        .then((peripheral) => {
        if (peripheral) {
            peripheral.set(req.body);
            return peripheral
                .save()
                .then((peripheral) => res.status(201).json({ peripheral }))
                .catch((error) => res.status(500).json({ error }));
        }
        else {
            return res.status(404).json({ message: "not found" });
        }
    })
        .catch((error) => res.status(500).json({ error }));
};
const deletePeripheral = (req, res, next) => {
    const peripheralId = req.params.peripheralId;
    return Peripheral_1.default.findByIdAndDelete(peripheralId)
        .then((peripheral) => peripheral
        ? res.status(201).json({ peripheral, message: "Deleted" })
        : res.status(404).json({ message: "not found" }))
        .catch((error) => res.status(500).json({ error }));
};
exports.default = {
    createPeripheral,
    readPeripheral,
    readAll,
    updatePeripheral,
    deletePeripheral,
};
