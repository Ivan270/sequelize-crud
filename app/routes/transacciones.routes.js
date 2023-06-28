import express from 'express';
import {
	getTransacciones,
	createTransaccion,
} from '../controllers/transacciones.controller.js';

const router = express.Router();

router.get('/', getTransacciones);
router.post('/', createTransaccion);

export default router;
