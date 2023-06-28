import Sequelize from 'sequelize';

const sequelize = new Sequelize('m7_d6_ejemplo_sequelize', 'postgres', '2103', {
	host: 'localhost',
	dialect: 'postgres',
});

export default sequelize;
