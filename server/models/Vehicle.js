const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    number: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: "active",
    },
}, {timestamps: true});

const Vehicle = mongoose.model("Vehicle", vehicleSchema);
module.exports = Vehicle;