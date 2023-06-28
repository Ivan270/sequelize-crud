import express from 'express';
import {
	getBeneficios,
	addBeneficios,
	addAsociacion,
} from '../controllers/beneficios.controller.js';
const router = express.Router();

router.get('/', getBeneficios);
router.post('/', addBeneficios);
router.post('/asociar', addAsociacion);
router.get('/asociar', addAsociacion);

export default router;
