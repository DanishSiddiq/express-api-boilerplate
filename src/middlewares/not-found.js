const ApiProblem = require('express-api-problem');
const HttpStatus = require('http-status-codes');

/**
 * Called for any requests for which no
 * handler was found.
 * @param req
 * @param res
 * @param err
 * @constructor
 */
const RouteNotFoundMiddleware = (req, res, err) => {
  throw new ApiProblem(HttpStatus.NOT_FOUND, 'Route not found');
};

module.exports = RouteNotFoundMiddleware;
