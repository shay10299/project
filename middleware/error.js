const winston = require('winston');
/**
 * Catches errors between request and response
 */
module.exports = function (err, req, res, next) {
  winston.error(err.message, err);

  res.status(500).send(' failed.');

}