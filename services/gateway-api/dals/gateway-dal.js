const Gateway = require('../models/Gateway')
const Peripheral = require('../models/Peripheral')
const nanoid = require('nanoid/non-secure').customAlphabet('0123456789', 10)

async function getAllGateways() {
    return Gateway.find({})
        .populate('peripherals')
        .lean();
}

async function getSpecificGateway(id) {
    return Gateway.findOne({ _id: id })
        .populate('peripherals')
        .lean();
}

async function addGateway(gateway) {
    return Gateway.create(gateway);
}

async function addPeripheral(gatewayID, peripheral) {
    const gateway = await Gateway.findOne({ _id: gatewayID });
    if (!gateway) {
        const error = new Error("Gateway not found");
        error.status = 404;

        return next(error);
    }

    if (gateway.peripherals.length >= 10) {
        const error = new Error("Too many peripheral devices associated with gateway.");
        error.status = 404;

        return next(error);
    }

    peripheral.UID = nanoid();
    peripheral.dateCreated = Date.now();
    peripheral.gateway = gatewayID;
    const result = await Peripheral.create(peripheral);
    gateway.peripherals.push(result);
    gateway.save();

    return result;
}

async function removePeripheral(gatewayID, peripheralID) {
    const gateway = await (await Gateway.findOne({ _id: gatewayID }));
    if (!gateway) {
        const error = new Error("Gateway not found.");
        error.status = 404;

        return next(error);
    }

    if (gateway.peripherals.length === 0) {
        const error = new Error("No devices associated with current gateway.");
        error.status = 404;

        return next(error);
    }

    const result = await Peripheral.deleteOne({ _id: peripheralID });
    if (result.deletedCount === 0) {
        const error = new Error("Device could not be found or has already been deleted.");
        error.status = 404;

        return next(error);
    }

    gateway.peripherals.splice(gateway.peripherals.indexOf(peripheralID), 1);
    gateway.save();

    return result;
}


module.exports = {
    getAllGateways,
    getSpecificGateway,
    addGateway,
    addPeripheral,
    removePeripheral
}