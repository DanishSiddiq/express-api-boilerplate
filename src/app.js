const express = require('express');
const http = require('http');
const morgan = require('morgan');
const helmet = require('helmet');
const bodyParser = require('body-parser');
require('express-async-errors');

// const { initiateRabbitMQ } = require('./queues/connection/rabbitmq');
const { mongoDbConnect } = require('./database-connections/db.mongo');
const { handleExit, handleUncaughtErrors } = require('./helper/fatal');
const { logInfoDetails, logErrDetails } = require('./helper/logger');

// routers file
const routerHealth = require('./route/health-check');
const routerStudent = require('./route/v1/student');

const { config } = require('./helper/config');

// middle-wares
const ConfigLoaderMiddleware = require('./middlewares/config-loader');
const RouteNotFoundMiddleware = require('./middlewares/not-found');
const ExceptionHandlerMiddleware = require('./middlewares/exception-handler');

const app = express();

(async function() {
    try {

        handleUncaughtErrors();
        handleExit();

        // Connect to multiple DB's
        if (process.env.NODE_ENV !== 'test') {

            // setup multiple connections
            mongoDbConnect('DCS');

            // queue listener
            // initiateRabbitMQ();
        }

        // helmet for security purpose
        app.use(helmet());
        app.disable('x-powered-by');

        // logger
        app.use(morgan('tiny'));
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json({ limit: '5mb' }));

        // defining routes inside router or further distribution based on modules
        app.use('/', routerHealth);
        app.use('/', ConfigLoaderMiddleware, routerStudent);

        // RouteNotFound and ExceptionHandler middle-wares must
        // be the last ones to be registered
        app.use(RouteNotFoundMiddleware);
        app.use(ExceptionHandlerMiddleware);

        app.server = http.createServer(app);
        const APP_PORT = config.get('NODE_PORT', 3000);
        app.server.listen(APP_PORT, () => {
            logInfoDetails({message: `Express boilerplate app listening on port:${APP_PORT}`});
        });
    } catch (err) {
        logErrDetails({ message: 'Express boilerplate server setup failed', error: err });
        process.exit(1);
    }
})();



module.exports = app;

