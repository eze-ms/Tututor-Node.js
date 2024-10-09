const { Sequelize } = require('sequelize')
require('dotenv').config({ path: 'variables.env' })

// Utilizar DATABASE_URL en lugar de variables individuales
const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true, // Esto es importante en Render si utiliza SSL
            rejectUnauthorized: false // Para evitar problemas con SSL
        }
    },
    logging: false
});

module.exports = sequelize;
