const router = require('express').Router();
const Gateway = require('../../models/Gateway')


router.get('/', (req, res) => {
    res.send('Reached gateways.')
});


// router.get('/{id}', (req, res) => {
//     res.send('Reached gateways.')
// });

router.post('/', async (req, res, next) => {
    try {
        const result = await Gateway.create(req.body)
        res.status(201).send(result)
    } catch (err) {
        console.log(err)
        next(err)
    }
});

module.exports = router;