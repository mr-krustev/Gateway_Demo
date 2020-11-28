const mongoose = require('mongoose')

const GatewaySchema = new mongoose.Schema({
    serialNumber: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    ipv4: {
        type: String,
        required: true,
        validate: function (v) {
            const invalidValues = v.split('.').every(x => !isNaN(x) && x <= 255)
            return invalidValues && /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/.test(v)
        }
    },
    peripherals: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Peripheral",
        }
    ]
})

module.exports = mongoose.model("Gateway", GatewaySchema)