const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        logging: true    
    }
);

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connected!');
    } catch (error) {
        console.error('Couldnt connect to db', error);
    }
};

module.exports = { sequelize, connectDB };