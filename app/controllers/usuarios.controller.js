import Usuario from '../models/Usuario.models.js';
import Cuenta from '../models/Cuenta.models.js';
import Beneficio from '../models/Beneficio.models.js';

// Validador de números
const validateNumber = (value) => {
	return /^\d*$/.test(value);
};

export const getUsuarios = async (req, res) => {
	try {
		const usuarios = await Usuario.findAll({
			include: [
				{
					model: Cuenta,
					as: 'cuentas',
				},
				{
					model: Beneficio,
					// through: beneficioUsuario[],
				},
			],
			attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
		});
		res.send({ code: 200, data: usuarios });
	} catch (error) {
		res.status(500).send({ code: 500, message: 'Error al consultar Usuarios' });
	}
};

export const addUsuarios = async (req, res) => {
	try {
		let { nombre, email, password } = req.body;
		const nuevoUsuario = await Usuario.create({
			nombre,
			email,
			password,
		});
		res.status(201).send({
			code: 201,
			data: nuevoUsuario,
			message: `Usuario ID:${nuevoUsuario.id} creado con éxito`,
		});
	} catch (error) {
		res
			.status(500)
			.send({ code: 500, message: 'Error al crear Usuario', error });
	}
};

export const addUsuarioCuenta = async (req, res) => {
	try {
		let { nombre, email, password, balance, tipoCuenta } = req.body;
		const nuevoPack = await Usuario.create(
			{
				nombre,
				email,
				password,
				cuentas: {
					balance,
					tipoCuenta,
				},
			},
			{
				include: [Cuenta],
			}
		);

		res.send({
			code: 201,
			data: nuevoPack,
			message: `Cliente ${nuevoPack.nombre} y su cuenta ${nuevoPack.cuentas[0].dataValues.tipoCuenta} creados con éxito`,
		});
	} catch (error) {
		res
			.status(500)
			.send({ code: 500, message: 'Error al crear Usuario con Cuenta', error });
	}
};

export const updateUsuarios = async (req, res) => {
	try {
		let { id } = req.params;
		// Valida que ID sea un numero
		if (!validateNumber(id)) {
			return res
				.status(500)
				.send({ code: 500, message: 'El ID proporcionado debe ser un número' });
		} else {
			let { nombre, email, password } = req.body;
			// Valida existencia del usuario
			let usuarioEncontrado = await Usuario.findByPk(id);
			if (usuarioEncontrado === null) {
				return res
					.status(404)
					.send({ code: 404, message: 'Usuario no existe' });
			} else {
				let usuarioActualizado = await Usuario.update(
					{ nombre, email, password },
					{
						where: {
							id: id,
						},
					}
				);
				res.status(200).send({
					code: 200,
					data: usuarioActualizado,
					message: `Usuario ID:${id} actualizado con éxito`,
				});
			}
		}
	} catch (error) {
		res
			.status(500)
			.send({ code: 500, message: 'No se pudo actualizar el usuario' });
	}
};

export const deleteUsuarios = async (req, res) => {
	try {
		let { id } = req.params;
		if (!validateNumber(id)) {
			return res
				.status(500)
				.send({ code: 500, message: 'El ID proporcionado debe ser un número' });
		}
		let encontrado = await Usuario.findByPk(id);
		if (!encontrado) {
			return res.status(404).send({ code: 404, message: 'Usuario no existe' });
		}
		await Usuario.destroy({
			where: {
				id,
			},
		});
		res.status(200).send({ code: 200, message: 'Usuario eliminado con éxito' });
	} catch (error) {
		res
			.status(500)
			.send({ code: 500, message: 'No se pudo eliminar el usuario' });
	}
};

export const getUsuarioById = async (req, res) => {
	try {
		let { id } = req.params;
		let encontrado = await Usuario.findByPk(id);
		if (encontrado === null) {
			return res.status(404).send({ code: 404, message: 'Usuario no existe' });
		} else {
			res.send({ code: 200, data: encontrado, message: 'Usuario encontrado' });
		}
	} catch (error) {
		res.status(500).send({ code: 500, message: 'Error al buscar usuario' });
	}
};

export const getUsuariosByEmail = async (req, res) => {
	try {
		let { email } = req.params;
		let encontrado = await Usuario.findAll({
			attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
			where: { email },
		});
		res.send({ code: 200, data: encontrado, message: 'Usuario encontrado' });
	} catch (error) {
		res
			.status(500)
			.send({ code: 500, message: 'Error al buscar usuario', error });
	}
};
