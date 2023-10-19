import express from "express";
import controller from "../controllers/Gateway";
import { Schemas, ValidateJoi } from "../middleware/Joi";

const router = express.Router();

router.post(
  "/create",
  ValidateJoi(Schemas.gateway.create),
  controller.createGateway,
);
router.get("/get/:gatewayId", controller.readGateway);
router.get("/get/", controller.readAll);
router.patch(
  "/update/:gatewayId",
  ValidateJoi(Schemas.gateway.update),
  controller.updateGateway,
);
router.patch(
  "/addPeripheral/",
  controller.addPeripheralToGateway,
);
router.delete("/delete/:gatewayId", controller.deleteGateway);

export = router;
