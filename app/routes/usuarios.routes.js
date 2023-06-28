import express from 'express';
import {
	getUsuarios,
	addUsuarios,
	updateUsuarios,
	deleteUsuarios,
	getUsuarioById,
	getUsuariosByEmail,
	addUsuarioCuenta,
} from '../controllers/usuarios.controller.js';
const router = express.Router();

router.get('/', getUsuarios);
router.get('/id/:id', getUsuarioById);
router.get('/email/:email', getUsuariosByEmail);
router.post('/', addUsuarios);
router.post('/nuevocliente', addUsuarioCuenta);
router.put('/id/:id', updateUsuarios);
router.delete('/id/:id', deleteUsuarios);

export default router;
