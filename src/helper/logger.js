const cmn = require('./common');

/**
 *
 * @param message
 * @param error
 * @param additionalData
 */
const logErrDetails = ({ message = '', error = {}, additionalData }) => {
  logMsg({
    level: 'ERROR',
    message,
    error,
    ...(additionalData ? { additionalData } : {}),
  });
};

/**
 *
 * @param message
 * @param additionalData
 */
const logInfoDetails = ({ message = '', additionalData = {} }) => {
  logMsg({
    level: 'INFO',
    message,
    ...(additionalData ? { additionalData } : {}),
  });
};

/**
 *
 * @param logObj
 */
const logMsg = (logObj) => {
  let logObject = {
    ...logObj,
    '@ts': new Date().toISOString(),
  };
  console.log(JSON.stringify(logObject, cmn.replaceErrors));

  // free mem-leak
  logObject = null;
};

module.exports = { logErrDetails,  logInfoDetails };
