import { DataTypes } from 'sequelize';
import sequelize from '../database/database.js';

const Cuenta = sequelize.define(
	'cuentas',
	{
		// Columnas (propiedades) con definicion de tipo de datos y restricciones
		numeroCuenta: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			allowNull: false,
			primaryKey: true,
			validate: {
				isUUID: 4,
			},
		},
		tipoCuenta: {
			// Este tipo de dato solo permite que se entregue alguna de estas opciones
			type: DataTypes.ENUM('cta. cte.', 'cta. vista'),
			// SE PUEDE CAMBIAR EL NOMBRE DE LA COLUMNA
			// field: 'tipo_cuenta',
			allowNull: false,
		},
		balance: {
			type: DataTypes.DECIMAL(11, 2),
			defaultValue: 0,
			allowNull: false,
			validate: {
				notEmpty: true,
			},
			validate: {
				min: 0,
				isDecimal: true,
				not: /^-([0-9]+[-,])*[0-9]+$/,
			},
		},
	},
	// Columnas createdAt y updatedAt
	{
		timestamps: true,
		tableName: 'cuentas',
	}
);

export default Cuenta;
