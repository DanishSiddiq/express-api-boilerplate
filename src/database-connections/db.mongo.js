const mongoose            = require('mongoose');
const { MONGO_CONNECTED } = require('../constants/info-constants');
const { config }          = require('../helper/config');

const { logErrDetails, logInfoDetails } = require('../helper/logger');

/**
 *
 * @param label
 */
const mongoDbConnect = (label = 'MongoDB') => {

  const mongoDsn  = config.get(`MONGO_DSN`, '');
  const mongoOpt  = config.get(`MONGO_OPT`, { poolSize: 5, useNewUrlParser: true });
  const options   = typeof mongoOpt === 'string' ? JSON.parse(mongoOpt) : mongoOpt;

  mongoose.Promise = global.Promise;
  mongoose.set('useCreateIndex', true);
  mongoose.set('useFindAndModify', false);

  // it can be done with try catch without callback
  mongoose.connect(mongoDsn, options, function (err) {
    if (err) {
      logErrDetails({ message: `${ label } connection not available`, error: err });
    }
  });

  // When successfully connected
  mongoose.connection.on('connected', function () {
    logInfoDetails({ message: `${ label } connected @ ${ mongoDsn }` });
  });

  // If the connection throws an error
  mongoose.connection.on('error', function (err) {
    logErrDetails({ message: `${ label } connection error @ ${ mongoDsn }`, error: err });
  });

  // When the connection is disconnected
  mongoose.connection.on('disconnected', function () {
    logInfoDetails({ message: `${ label } connection disconnected @ ${ mongoDsn }` });
  });
};

/**
 *
 * @returns {Promise<string|null>}
 */
const checkHealthMongoDb = async () => {
  if(mongoose && mongoose.connection && mongoose.connection.readyState) {
    return MONGO_CONNECTED;
  }

  // request new connection before leaving so next time health will have a ready connection
  mongoDbConnect('DCS');

  // returns null since connection opening might will take time in async mode
  return null;
};

/**
 * Gracefully closes the MongoDB connection
 */
const mongoDbDisconnect = () => {
  mongoose.connection.close(function () {
    logInfoDetails({ message: 'Mongoose default connection disconnected through app termination' })
  });
};

module.exports = {
  mongoDbConnect,
  checkHealthMongoDb,
  mongoDbDisconnect,
};
