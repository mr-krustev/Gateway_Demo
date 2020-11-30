const router = require('express').Router();

const setup = (app) => {
    app.use('/api/gateways', require('./controllers/gateways'))

    // not found middleware.
    app.use((req, res, next) => {
        const error = new Error("Not found");
        error.status = 404;
        next(error);
    });

    // error handler middleware
    app.use((error, req, res, next) => {
        console.log(error.message);
        res.status(error.status || 500).send({
            status: error.status || 500,
            message: error.message || 'Internal Server Error',
        });
    });
}

module.exports = setup;