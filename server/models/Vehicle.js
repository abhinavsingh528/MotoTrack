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
        enum: ["active", "service", "completed"],
        default: "active",
    },
    services: [
        {
            date: {
                    type: Date,
                    default: Date.now,
                },
            cost: Number,
            description: String,
        }
    ],
    nextServiceDate: Date,
}, {timestamps: true});

const Vehicle = mongoose.model("Vehicle", vehicleSchema);
module.exports = Vehicle;