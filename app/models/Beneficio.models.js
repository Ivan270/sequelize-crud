import { DataTypes } from 'sequelize';
import sequelize from '../database/database.js';

const Beneficio = sequelize.define(
	'beneficios',
	{
		nombre: {
			type: DataTypes.STRING(50),
			allowNull: false,
			unique: true,
			validate: {
				notEmpty: true,
			},
		},
		tipoBeneficio: {
			type: DataTypes.ENUM('salud', 'educacion', 'viajes', 'financiero'),
			allowNull: false,
		},
		descripcion: {
			type: DataTypes.STRING(1000),
			allowNull: false,
			validate: {
				notEmpty: true,
			},
		},
		descuento: {
			type: DataTypes.DECIMAL(4, 2),
			defaultValue: 0,
			allowNull: false,
			validate: {
				min: 0,
				max: 100,
				isDecimal: true,
			},
		},
	},
	// Columnas createdAt y updatedAt
	{ timestamps: false, tableName: 'beneficios' }
);

export default Beneficio;
