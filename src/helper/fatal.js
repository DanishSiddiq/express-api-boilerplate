const { mongoDbDisconnect } = require('../database-connections/db.mongo');

/**
 * Makes sure that the process doesn't shut down
 * for any uncaught errors – and logs them to
 * for easier debugging.
 */
const handleUncaughtErrors = () => {
  process.on('unhandledRejection', (err) => {
    logErrDetails({ message: 'Unhandled Rejection', error: err });
  });

  process.on('uncaughtException', (err) => {
    logErrDetails({ message: 'Uncaught Exception', error: err });
  });
};

const handleExit = () => {
  // If the Node process ends, close the Mongoose connection
  process.on('SIGINT', () => {
    mongoDbDisconnect();
    process.exit(0);
  });

  process.on('exit', () => {
    mongoDbDisconnect();
    process.exit(0);
  });
};

module.exports = {
  handleUncaughtErrors,
  handleExit
};

