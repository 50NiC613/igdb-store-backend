import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Peripheral from "../models/Peripheral";

const createPeripheral = (req: Request, res: Response, next: NextFunction) => {
  const { uid, vendor, dateCreated, status } = req.body;

  const peripheral = new Peripheral({
    _id: new mongoose.Types.ObjectId(),
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

const readPeripheral = (req: Request, res: Response, next: NextFunction) => {
  const peripheralId = req.params.peripheralId;

  return Peripheral.findById(peripheralId)
    .then((peripheral) =>
      peripheral
        ? res.status(200).json({ peripheral })
        : res.status(404).json({ message: "not found" }),
    )
    .catch((error) => res.status(500).json({ error }));
};

const readAll = (req: Request, res: Response, next: NextFunction) => {
  return Peripheral.find()
    .then((peripherals) => res.status(200).json({ peripherals }))
    .catch((error) => res.status(500).json({ error }));
};

const updatePeripheral = (req: Request, res: Response, next: NextFunction) => {
  const peripheralId = req.params.peripheralId;

  return Peripheral.findById(peripheralId)
    .then((peripheral) => {
      if (peripheral) {
        peripheral.set(req.body);

        return peripheral
          .save()
          .then((peripheral) => res.status(201).json({ peripheral }))
          .catch((error) => res.status(500).json({ error }));
      } else {
        return res.status(404).json({ message: "not found" });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

const deletePeripheral = (req: Request, res: Response, next: NextFunction) => {
  const peripheralId = req.params.peripheralId;

  return Peripheral.findByIdAndDelete(peripheralId)
    .then((peripheral) =>
      peripheral
        ? res.status(201).json({ peripheral, message: "Deleted" })
        : res.status(404).json({ message: "not found" }),
    )
    .catch((error) => res.status(500).json({ error }));
};

export default {
  createPeripheral,
  readPeripheral,
  readAll,
  updatePeripheral,
  deletePeripheral,
};
