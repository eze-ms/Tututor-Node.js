const { Sequelize } = require('sequelize');
require('dotenv').config({ path: 'variables.env' });

const isProduction = process.env.NODE_ENV === 'production';

const sequelize = process.env.DATABASE_URL
    ? new Sequelize(process.env.DATABASE_URL, {
        dialect: 'postgres',
        dialectOptions: {
            ssl: isProduction ? {
                require: true,
                rejectUnauthorized: false,
            } : false,
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
