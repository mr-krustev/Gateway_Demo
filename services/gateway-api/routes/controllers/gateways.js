const router = require('express').Router();
const gatewayDal = require('../../dals/gateway-dal')

router.get('/', async (req, res, next) => {
    try {
        const result = await gatewayDal.getAllGateways();
        res.status(200).send(result);
    } catch (err) {
        next(err)
    }
});

router.get('/:gateId', async (req, res, next) => {
    try {
        const result = await gatewayDal.getSpecificGateway(req.params.gateId);
        if (!result) {
            const error = new Error("Gateway not found");
            error.status = 404;

            return next(error);
        }

        res.status(200).send(result);
    } catch (err) {
        next(err)
    }
});

router.post('/', async (req, res, next) => {
    try {
        const result = await gatewayDal.addGateway(req.body);
        res.status(201).send(result)
    } catch (err) {
        next(err)
    }
});

router.delete('/:gateId', async (req, res, next) => {
    try {
        const result = await gatewayDal.removeGateway(req.params.gateId);
        const response = {
            message: 'Successfully deleted gateway device.',
            id: req.params.id
        };
        res.status(294).send(response);
    } catch (err) {
        next(err)
    }
})


router.post('/:gateId/peripherals', async (req, res, next) => {
    try {
        const result = await gatewayDal.addPeripheral(req.params.gateId, req.body);
        res.status(201).send(result);
    } catch (err) {
        next(err);
    }
});

router.delete('/:gateId/peripherals/:id', async (req, res, next) => {
    try {
        const result = await gatewayDal.removePeripheral(req.params.gateId, req.params.id);
        const response = {
            message: 'Successfully deleted peripheral device.',
            id: req.params.id
        };
        res.status(204).send(response);
    } catch (err) {
        next(err);
    }
})

module.exports = router;