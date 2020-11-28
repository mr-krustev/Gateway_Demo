const router = require('express').Router();


router.get('/gateways', (req, res) => {
    res.send('Reached gateways.')
});

router.post('/gateways', (req, res) => {

});

module.exports = router;