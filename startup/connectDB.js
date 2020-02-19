const { Sequelize } = require('sequelize');
const winston = require('winston')
require('./logging')()

let sequelize
const envConfigs = require('../database/config/config');
const env = process.env.NODE_ENV || 'development';
const config = envConfigs[env];

const connectToSequlize = async () => {
    let arrayOfModels = []
    sequelize = new Sequelize(config.url, config)
    arrayOfModels[0] = require("../database/models/user")(sequelize, Sequelize)
    try {
        await sequelize.authenticate();

        winston.log('Connection has been established successfully.');

    } catch (error) {
        winston.error('Unable to connect to the database:', error);
    }

    return arrayOfModels
}
module.exports = connectToSequlize