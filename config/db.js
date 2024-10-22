const { Sequelize } = require('sequelize');
require('dotenv').config({ path: 'variables.env' });

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,  // Para certificados autofirmados
        },
    },
    logging: false,  // Activar esto si quieres más información en consola
});

module.exports = sequelize;
