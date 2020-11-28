const mongoose = require('mongoose')

const PeripheralSchema = new mongoose.Schema({
    UID: {
        type: Number,
        required: true
    },
    vendor: {
        type: String,
        required: true
    },
    dateCreated: {
        type: Date,
        default: Date.now
    },
    gateway: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Gateway"
    }
})

module.exports = mongoose.model("Peripheral", PeripheralSchema)