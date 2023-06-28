import Cuenta from '../models/Cuenta.models.js';
import Usuario from '../models/Usuario.models.js';

export const getCuentas = async (req, res) => {
	try {
		const cuentas = await Cuenta.findAll({
			// Junto con info de cuenta mostrará información del usuario
			include: {
				model: Usuario,
				attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
			},
		});
		res.send({ code: 200, data: cuentas });
	} catch (error) {
		res.status(500).send({ code: 500, message: 'Error al consultar Cuentas' });
	}
};
export const addCuentas = async (req, res) => {
	try {
		let { tipoCuenta, balance, usuarioId } = req.body;
		// Valida existencia del usuario
		let usuario = await Usuario.findByPk(usuarioId);
		if (!usuario) {
			res.status(400).send({
				code: 400,
				message: 'El usuario al que intenta vincular la cuenta no existe',
				error,
			});
		}
		const nuevaCuenta = await Cuenta.create({
			tipoCuenta,
			balance,
			usuarioId,
		});
		// Metodo de abajo permite crear cuenta vinculada al usuario creado anteriormente (linea 22)
		// await usuario.addCuentas(nuevaCuenta);
		res.status(201).send({
			code: 201,
			data: nuevoUsuario,
			message: `Cuenta Num. ${nuevaCuenta.numeroCuenta} creada con éxito`,
		});
	} catch (error) {
		res
			.status(500)
			.send({ code: 500, message: 'Error al crear Usuario', error });
	}
};

// Funciones para ser usadas en transacciones: SUMAR Y RESTAR saldo
export const sumarDinero = async (id, amount) => {
	try {
		let cuentaEncontrada = await Cuenta.findByPk(id);
		let balance = cuentaEncontrada.dataValues.balance;
		console.log(balance);
		console.log(amount);
		let total = parseFloat(amount) + parseFloat(balance);
		console.log(total);
		let cuentaActualizada = await Cuenta.update(
			{ balance: total },
			{
				where: {
					id: id,
				},
			}
		);
		return cuentaActualizada;
	} catch (error) {
		return error;
	}
};

export const restarDinero = async (id, amount) => {
	try {
		let cuentaEncontrada = await Cuenta.findByPk(id);
		let balance = cuentaEncontrada.dataValues.balance;
		let total = parseFloat(balance) - parseFloat(amount);
		let cuentaActualizada = await Cuenta.update(
			{ balance: total },
			{
				where: {
					id: id,
				},
			}
		);
		return cuentaActualizada;
	} catch (error) {
		return error;
	}
};
