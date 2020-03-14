require('express-async-errors');
const express       = require('express');
const morgan        = require('morgan');
const helmet        = require('helmet');
const bodyParser    = require('body-parser');
const swaggerUi     = require('swagger-ui-express');

// mongodb
const { mongoDbConnect } = require('./database-connections/db.mongo');

// swagger
const swaggerDocument    = require('./swagger.json');

// routers file
const routerHealth  = require('./route/health-check');
const routerStudent = require('./route/v1/student');

// middle-wares
const ConfigLoaderMiddleware = require('./middlewares/config-loader');
const RouteNotFoundMiddleware = require('./middlewares/not-found');
const ExceptionHandlerMiddleware = require('./middlewares/exception-handler');

// rabbitmq if required producer & listener
// const { initiateRabbitMQ } = require('./queues/connection/rabbitmq');


const app = express();

// Connect to multiple DB's
if (process.env.NODE_ENV !== 'test') {

    // setup connections
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

// swagger ui
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// defining routes inside router or further distribution based on modules
app.use('/', routerHealth);
app.use('/', ConfigLoaderMiddleware, routerStudent);

// RouteNotFound and ExceptionHandler middle-wares must
// be the last ones to be registered
app.use(RouteNotFoundMiddleware);
app.use(ExceptionHandlerMiddleware);

module.exports = app;