const ApiProblem = require('express-api-problem');
const HttpStatus = require('http-status-codes');

/**
 * for authorization layer
 * @param req
 * @param res
 * @param next
 * @constructor
 */
const ConfigLoaderMiddleware = (req, res, next) => {
  /** @type {{ apiKey }} */
  const params = {
    ...req.body,
    ...req.query,
  };

  res.header({
    'x-connection-id': 'abcdefghijklmnopqrstuvwxzy' // just an example to set key in the header
  });

  // If key is provided then check for its configuration
  if (params.apiKey && params.apiKey === 'test-authorization-key') {
    throw new ApiProblem(HttpStatus.FORBIDDEN, 'Unauthorized', 'Invalid apiKey received');
  }

  next();
};

module.exports = ConfigLoaderMiddleware;
