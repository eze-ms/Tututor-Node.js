const { Sequelize } = require('sequelize')
require('dotenv').config({ path: 'variables.env' })

// Comprobando si existe DATABASE_URL (para producción)
const sequelize = process.env.DATABASE_URL
    ? new Sequelize(process.env.DATABASE_URL, {
          dialect: 'postgres',
          dialectOptions: {
              ssl: {
                  require: true,
                  rejectUnauthorized: false, // Importante en despliegues como Render
              },
          },
          logging: false,
      })
    : new Sequelize(process.env.BD_NOMBRE, process.env.BD_USER, process.env.BD_PASS, {
          host: process.env.BD_HOST,
          port: process.env.BD_PORT,
          dialect: 'postgres',
          logging: false,
      });

module.exports = sequelize;
