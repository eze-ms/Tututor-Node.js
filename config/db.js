const { Sequelize } = require('sequelize');
require('dotenv').config({ path: 'variables.env' });

const isProduction = process.env.NODE_ENV === 'production';

const sequelize = process.env.DATABASE_URL
     new Sequelize(process.env.DATABASE_URL, {
        dialect: 'postgres',
        dialectOptions: {
            ssl: isProduction ? {
                require: true,
                rejectUnauthorized: false,
            } : false,
        },
        logging: false,
    })

module.exports = sequelize;
