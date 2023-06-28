import express from 'express';
import { getCuentas, sumarDinero } from '../controllers/cuentas.controller.js';
const router = express.Router();

router.get('/', getCuentas);
router.post('/id/:id', sumarDinero);

export default router;
