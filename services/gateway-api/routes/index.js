const router = require('express').Router();

const setup = (app) => {
    app.get('/', (req, res) => {
        res.send('Hello World!')
    });
    
    app.use('/api', require('./controllers/gateways'))
}

module.exports = setup;