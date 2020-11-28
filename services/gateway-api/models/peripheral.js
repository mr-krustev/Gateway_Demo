const mongoose = require('mongoose')

const PeripheralSchema = new mongoose.Schema({
    UID: {
        type: Number,
        unique: true
    },
    dateCreated: {
        type: Date,
        default: Date.now
    },
    vendor: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['offline', 'online'],
        default: 'offline'
    },
})

module.exports = mongoose.model("Peripheral", PeripheralSchema)