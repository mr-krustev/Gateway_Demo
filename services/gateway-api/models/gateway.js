const mongoose = require('mongoose')

const GatewaySchema = new mongoose.Schema({
    serialNumber: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    ipv4: {
        type: String,
        required: true
    },
    peripherals: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Peripheral"
    }
})

module.exports = mongoose.model("Gateway", GatewaySchema)