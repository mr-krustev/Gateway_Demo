const router = require('express').Router();
const Gateway = require('../../models/Gateway')
const Peripheral = require('../../models/Peripheral')
const nanoid = require('nanoid/non-secure').customAlphabet('0123456789', 10)


router.get('/', async (req, res, next) => {
    try {
        const result = await Gateway.find({})
            .populate('peripherals')
            .lean();
        res.status(200).send(result);
    } catch (err) {
        console.log(err)
        next(err)
    }
});

// In case its needed to view specific peripheral.
// router.get('/:gateId/peripherals/:id', async (req, res, next) => {
//     try {
//         const gateway = await Gateway.findOne({ _id: req.params.gateId })
//             .populate('peripherals')
//             .lean();

//         // Since there is a maximum of 10 devices per gateway its should be less taxing to search them this way instead of searching all peripherals.
//         const device = gateway.peripherals.find(p => p._id == req.params.id);
//         if (!device) {
//             throw new Error('Device not found or not related to this gateway.')
//         }

//         res.status(200).send(device);
//     } catch (err) {
//         console.log(err)
//         next(err)
//     }
// });

router.get('/:gateId', async (req, res, next) => {
    try {
        const result = await Gateway.findOne({ _id: req.params.gateId })
            .populate('peripherals')
            .lean();
        res.status(200).send(result);
    } catch (err) {
        console.log(err)
        next(err)
    }
});

router.post('/', async (req, res, next) => {
    try {
        const result = await Gateway.create(req.body)
        res.status(201).send(result)
    } catch (err) {
        console.log(err)
        next(err)
    }
});


router.post('/:gateId/peripherals', async (req, res, next) => {
    try {
        const gateway = await Gateway.findOne({ _id: req.params.gateId });
        if (!gateway) {
            throw new Error('Gateway not found.')
        }

        if (gateway.peripherals.length >= 10) {
            throw new Error('Too many peripheral devices associated with gateway.')
        }

        // This could be improved but for the purpose of being a unique number, should suffice.
        req.body.UID = nanoid();
        req.body.dateCreated = Date.now();
        req.body.gateway = req.params.gateId;
        const result = await Peripheral.create(req.body);
        gateway.peripherals.push(result);
        gateway.save();

        res.status(201).send(result);
    } catch (err) {
        console.log(err);
        next(err);
    }
});

router.delete('/:gateId/peripherals/:id', async (req, res, next) => {
    try {
        const gateway = await (await Gateway.findOne({ _id: req.params.gateId }));
        if (!gateway) {
            throw new Error('Gateway not found.')
        }

        if (gateway.peripherals.length === 0) {
            throw new Error('No devices associated with current gateway.')
        }

        const result = await Peripheral.deleteOne({ _id: req.params.id });
        if (result.deletedCount === 0) {
            throw new Error('Device could not be found or has already been deleted.')
        }

        gateway.peripherals.splice(gateway.peripherals.indexOf(req.params.id), 1);
        gateway.save();

        const response = {
            message: 'Successfully deleted peripheral device.',
            id: req.params.id
        };
        res.status(201).send(response);
    } catch (err) {
        console.log(err);
        next(err);
    }
})

module.exports = router;