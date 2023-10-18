"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const Gateway_1 = __importDefault(require("../controllers/Gateway"));
const Joi_1 = require("../middleware/Joi");
const router = express_1.default.Router();
router.post("/create", (0, Joi_1.ValidateJoi)(Joi_1.Schemas.gateway.create), Gateway_1.default.createGateway);
router.get("/get/:gatewayId", Gateway_1.default.readGateway);
router.get("/get/", Gateway_1.default.readAll);
router.patch("/update/:gatewayId", (0, Joi_1.ValidateJoi)(Joi_1.Schemas.gateway.update), Gateway_1.default.updateGateway);
router.delete("/delete/:gatewayId", Gateway_1.default.deleteGateway);
module.exports = router;
