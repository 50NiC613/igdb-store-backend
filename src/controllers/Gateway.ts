import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { Types } from "mongoose";
import Gateway from "../models/Gateway";
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
    .populate("peripheral")
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
};
