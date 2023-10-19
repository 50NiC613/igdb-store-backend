import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { Types } from "mongoose";
import Gateway from "../models/Gateway";
import Peripheral from "../models/Peripheral";

import Logging from "../library/Logging";
const createGateway = (req: Request, res: Response, next: NextFunction) => {
  const { serialNumber, name, ipv4Address, peripheralDevices } = req.body;

  const gateway = new Gateway({
    _id: new mongoose.Types.ObjectId(),
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

const readGateway = (req: Request, res: Response, next: NextFunction) => {
  const gatewayId = req.params.gatewayId;

  return Gateway.findById(gatewayId)
    .populate("peripheralDevices")
    .then((gateway) =>
      gateway
        ? res.status(200).json({ gateway })
        : res.status(404).json({ message: "not found" }),
    )
    .catch((error) => res.status(500).json({ error }));
};

const readAll = (req: Request, res: Response, next: NextFunction) => {
  return Gateway.find()
    .then((gateways) => res.status(200).json({ gateways }))
    .catch((error) => res.status(500).json({ error }));
};

const updateGateway = (req: Request, res: Response, next: NextFunction) => {
  const gatewayId = req.params.gatewayId;

  return Gateway.findById(gatewayId)
    .then((gateway) => {
      if (gateway) {
        gateway.set(req.body);

        return gateway
          .save()
          .then((gateway) => res.status(201).json({ gateway }))
          .catch((error) => res.status(500).json({ error }));
      } else {
        return res.status(404).json({ message: "not found" });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

const addPeripheralToGateway = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { gatewayId, peripheralId } = req.body;
  try {
    let gateway = await Gateway.findById(gatewayId);
    let peripheral = await Peripheral.findById(peripheralId);
    if (!gateway) {
      return res.status(404).json({ message: "Gateway not found" });
    }
    if (!peripheral) {
      return res.status(404).json({ message: "Peripheral not found" });
    }

    if (gateway.peripheralDevices.length >= 10) {
      return res
        .status(400)
        .json({
          message:
            "Gateway already has the maximum number of peripheral devices",
        });
    }
    gateway.peripheralDevices.push(peripheral._id);
    await gateway.save();
    return res
      .status(201)
      .json({ gateway, message: "Peripheral device added to gateway" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

const deleteGateway = (req: Request, res: Response, next: NextFunction) => {
  const gatewayId = req.params.gatewayId;

  return Gateway.findByIdAndDelete(gatewayId)
    .then((gateway) =>
      gateway
        ? res.status(201).json({ gateway, message: "Deleted" })
        : res.status(404).json({ message: "not found" }),
    )
    .catch((error) => res.status(500).json({ error }));
};

export default {
  createGateway,
  readGateway,
  readAll,
  updateGateway,
  deleteGateway,
  addPeripheralToGateway,
};
