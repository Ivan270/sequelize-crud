import express from 'express';
import usuariosRoutes from './routes/usuarios.routes.js';
import cuentasRoutes from './routes/cuentas.routes.js';
import transaccionesRoutes from './routes/transacciones.routes.js';
import beneficiosRoutes from './routes/beneficios.routes.js';

const app = express();

app.use(express.json());

// Definicion de rutas
app.use('/api/v1/usuarios', usuariosRoutes);
app.use('/api/v1/cuentas', cuentasRoutes);
app.use('/api/v1/transacciones', transaccionesRoutes);
app.use('/api/v1/beneficios', beneficiosRoutes);

export default app;
