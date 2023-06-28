import Cuenta from '../models/Cuenta.models.js';
import Transaccion from '../models/Transacciones.models.js';
import { sumarDinero, restarDinero } from './cuentas.controller.js';

export const getTransacciones = async (req, res) => {
	try {
		const transacciones = await Transaccion.findAll();
		res.send({ code: 200, data: transacciones });
	} catch (error) {
		res
			.status(500)
			.send({ code: 500, message: 'Error al consultar Transaccion' });
	}
};

export const createTransaccion = async (req, res) => {
	try {
		let { glosa, monto, origen, destinatario } = req.body;
		let nuevaTransaccion = await Transaccion.create({
			glosa,
			monto,
			id_cuenta_origen: origen,
			id_cuenta_destino: destinatario,
		});
		await restarDinero(origen, monto);
		await sumarDinero(destinatario, monto);
		res.status(200).send({
			code: 200,
			data: nuevaTransaccion,
			message: 'Transacción realizada con éxito',
		});
	} catch (error) {
		res
			.status(500)
			.send({ code: 500, message: 'No se pudo crear la transacción', error });
	}
};
