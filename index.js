import sequelize from './app/database/database.js';
import app from './app/app.js';

// Se importan los modelos para que se sincronicen con la BD
// import './app/models/Usuario.models.js';
// import './app/models/Cuenta.models.js';
// import './app/models/Transacciones.models.js';
// IMPORTAR ASOCIACIONES
import './app/models/asociaciones.js';
// GENERAR TABLA CUENTAS Y TRANSACCIONES

const main = async () => {
	try {
		// metodo authenticate comprueba que la conexion sea correcta
		await sequelize.authenticate();
		// Opciones de abajo se utilizan en desarrollo y NO en produccion
		// Sync sincroniza modelos definidos en app con BD
		// force:true borra datos y los vuelve a crear cada vez que sincroniza
		await sequelize.sync({ force: true, alter: true });

		const PORT = 3000;
		app.listen(PORT, () => {
			console.log('Escuchando en http://localhost:' + PORT);
		});
	} catch (error) {
		console.log('Ha ocurrido un error: ', error);
	}
};
main();
