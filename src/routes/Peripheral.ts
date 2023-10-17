import express from 'express';
import controller from '../controllers/Peripheral';
import { Schemas, ValidateJoi } from '../middleware/Joi';

const router = express.Router();

router.post('/create', ValidateJoi(Schemas.peripheral.create), controller.createPeripheral);
router.get('/get/:peripheralId', controller.readPeripheral);
router.get('/get/', controller.readAll);
router.patch('/update/:peripheralId', ValidateJoi(Schemas.peripheral.update), controller.updatePeripheral);
router.delete('/delete/:peripheralId', controller.deletePeripheral);

export = router;