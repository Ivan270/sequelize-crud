import { DataTypes } from 'sequelize';
import sequelize from '../database/database.js';

const Transaccion = sequelize.define(
	'transacciones',
	{
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4,
		},
		glosa: {
			type: DataTypes.STRING(100),
		},
		monto: {
			type: DataTypes.FLOAT(11, 2),
			defaultValue: 0,
			allowNull: false,
			validate: {
				notEmpty: true,
				not: /^-([0-9]+[-,])*[0-9]+$/,
			},
		},
	},
	{ timestamps: true }
);

export default Transaccion;
