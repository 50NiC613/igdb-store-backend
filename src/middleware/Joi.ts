import Joi, { ObjectSchema } from "joi";
import JoiObjectId from "joi-objectid";
import { NextFunction, Request, Response } from "express";
import { IPeripheral } from "../models/Peripheral";
import { IGateway } from "../models/Gateway";
import Logging from "../library/Logging";

export const ValidateJoi = (schema: ObjectSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(req.body);

      next();
    } catch (error) {
      Logging.error(error);

      return res.status(422).json({ error });
    }
  };
};

export const Schemas = {
  peripheral: {
    create: Joi.object<IPeripheral>({
      uid: Joi.number().required(),
      vendor: Joi.string().required(),
      dateCreated: Joi.date().required(),
      status: Joi.string().required(),
    }),
    update: Joi.object<IPeripheral>({
      uid: Joi.number().required(),
      vendor: Joi.string().required(),
      dateCreated: Joi.date().required(),
      status: Joi.string().required(),
    }),
  },
  gateway: {
    create: Joi.object<IGateway>({
      ipv4Address: Joi.string()
        .regex(/\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/)
        .required(),
      peripheralDevices: Joi.array().items(JoiObjectId).required(),
      serialNumber: Joi.string().required(),
      name: Joi.string().required(),
    }),
    update: Joi.object<IGateway>({
      ipv4Address: Joi.string()
        .regex(/\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/)
        .required(),
      peripheralDevices: Joi.string().required(),
      serialNumber: Joi.string().required(),
      name: Joi.string().required(),
    }),
  },
};
