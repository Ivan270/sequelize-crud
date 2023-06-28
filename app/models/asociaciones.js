import Usuario from './Usuario.models.js';
import Cuenta from './Cuenta.models.js';
import Transaccion from './Transacciones.models.js';
import Beneficio from './Beneficio.models.js';

/* 
============================================================
1. Asociación uno a muchos (un Usuario tiene muchas cuentas)
============================================================
*/
Usuario.hasMany(Cuenta, {
	// cuando elimine cuenta, trae una restriccion que no permita eliminar usuario
	onDelete: 'RESTRICT',
	// Cuando se actualice cuenta, tambien lo hará (en cascada) en usuario
	onUpdate: 'CASCADE',
	foreignKey: {
		allowNull: false,
		// SE LE PUEDE CAMBIAR EL NOMBRE AL FK
		// name: 'usuario_id',
	},
});
Cuenta.belongsTo(Usuario, {
	// Llave foránea (en este caso el id de usuario) no aceptará nulos
	foreignKey: {
		allowNull: false,
	},
});

Cuenta.hasOne(Transaccion, {
	foreignKey: 'id_cuenta_destino',
	as: 'destinatario',
	sourceKey: 'numeroCuenta',
});
Cuenta.hasOne(Transaccion, {
	foreignKey: 'id_cuenta_origen',
	as: 'remitente',
	sourceKey: 'numeroCuenta',
});

/* 
============================================================================== 
2. Asociación muchos a muchos (N:M - muchos usuarios pueden tener muchos beneficios)
==============================================================================
*/
Usuario.belongsToMany(Beneficio, {
	through: 'beneficioUsuario',
});
Beneficio.belongsToMany(Usuario, {
	through: 'beneficioUsuario',
});
