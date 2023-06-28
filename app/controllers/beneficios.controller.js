import Beneficio from '../models/Beneficio.models.js';
import Usuario from '../models/Usuario.models.js';

export const getBeneficios = async (req, res) => {
	try {
		const beneficios = await Beneficio.findAll();
		res.send({ code: 200, data: beneficios });
	} catch (error) {
		res.status(500).send({
			code: 500,
			message: 'Error al consultar los beneficios.',
		});
	}
};
export const addBeneficios = async (req, res) => {
	try {
		let { nombre, tipoBeneficio, descripcion, descuento } = req.body;

		const nuevoBeneficio = await Beneficio.create({
			nombre,
			tipoBeneficio,
			descripcion,
			descuento,
		});

		res.status(201).send({
			code: 201,
			message: `Beneficio con ID: ${nuevoBeneficio.id} creado con éxito.`,
		});
	} catch (error) {
		console.log(error);
		res.status(500).send({ code: 500, message: error.message });
	}
};
export const addAsociacion = async (req, res) => {
	try {
		let { usuarioId, beneficioId } = req.body;
		let usuario = await Usuario.findByPk(usuarioId);
		let beneficio = await Beneficio.findByPk(beneficioId);
		if (!usuario) {
			res.status(400).send({
				code: 400,
				message: 'El usuario al que intenta vincular el beneficio no existe',
			});
		}
		if (!beneficio) {
			res.status(400).send({
				code: 400,
				message: 'El beneficio al que intenta vincular el usuario no existe',
			});
		}
		await usuario.addBeneficio(beneficio);
		res.status(201).send({
			code: 201,
			message: `Usuario ${usuario.nombre} vinculado al Beneficio ${beneficio.nombre}`,
		});
	} catch (error) {
		res.status(500).send({
			code: 500,
			message: 'Error al vincular beneficio-usuario',
			error,
		});
	}
};
