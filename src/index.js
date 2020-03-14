require('express-async-errors');
const http = require('http');

const { config }                            = require('./helper/config');
const { handleExit, handleUncaughtErrors }  = require('./helper/fatal');
const { logInfoDetails, logErrDetails }     = require('./helper/logger');

const app = require('./app');
(async function() {
    try {

        handleUncaughtErrors();
        handleExit();

        const APP_PORT  = config.get('NODE_PORT', 3000);
        app.server      = http.createServer(app);
        app
        .server
        .listen(APP_PORT, () => {
            logInfoDetails({message: `Express boilerplate app listening on port:${APP_PORT}`});
        });

    } catch (err) {
        
        logErrDetails({ message: 'Express boilerplate server setup failed', error: err });
        process.exit(1);
    }
})();

module.exports = app;

