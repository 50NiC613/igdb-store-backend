"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const Peripheral_1 = __importDefault(require("../controllers/Peripheral"));
const Joi_1 = require("../middleware/Joi");
const router = express_1.default.Router();
router.post('/create', (0, Joi_1.ValidateJoi)(Joi_1.Schemas.peripheral.create), Peripheral_1.default.createPeripheral);
router.get('/get/:peripheralId', Peripheral_1.default.readPeripheral);
router.get('/get/', Peripheral_1.default.readAll);
router.patch('/update/:peripheralId', (0, Joi_1.ValidateJoi)(Joi_1.Schemas.peripheral.update), Peripheral_1.default.updatePeripheral);
router.delete('/delete/:peripheralId', Peripheral_1.default.deletePeripheral);
module.exports = router;
