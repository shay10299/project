const winston = require('winston');
require('express-async-errors');


/**
 * Middlware to log all exceptions to a file with winston
 */
module.exports = function () {
  winston.handleExceptions(
    new winston.transports.File({ filename: 'uncaughtExceptions.log' }));

  process.on('unhandledRejection', (ex) => {
    throw ex;

  });

  winston.add(new winston.transports.File({ filename: 'logfile.log' }));


}