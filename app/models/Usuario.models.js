import { DataTypes } from 'sequelize';
import sequelize from '../database/database.js';

const Usuario = sequelize.define(
	'usuarios',
	{
		// Columnas (propiedades) con definicion de tipo de datos y restricciones
		nombre: {
			type: DataTypes.STRING(50),
			allowNull: false,
			validate: {
				notEmpty: true,
			},
		},
		email: {
			type: DataTypes.STRING(50),
			allowNull: false,
			unique: true,
			validate: {
				isEmail: true,
				notEmpty: true,
			},
		},
		password: {
			type: DataTypes.STRING(50),
			allowNull: false,
			validate: {
				notEmpty: true,
			},
		},
		estado: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: true,
		},
	},
	// Columnas createdAt y updatedAt
	{ timestamps: true }
);

export default Usuario;
