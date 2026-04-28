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
    model: { 
        type: String 
    },
    year: { 
        type: Number 
    },
    odometer: {
        type: Number, default: 0 
    },
    insuranceExpiry: { 
        type: Date 
    },
    pucExpiry: { 
        type: Date 
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
    fuelLogs: [
        {
            date: { 
                type: Date,
                default: Date.now 
            },
            liters: { 
                type: Number, 
                required: true 
            },
            cost: { 
                type: Number, 
                required: true 
            },
            odometer: { 
                type: Number, 
                required: true 
            },
        }
    ],
    nextServiceDate: Date,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, {timestamps: true});

const Vehicle = mongoose.model("Vehicle", vehicleSchema);
module.exports = Vehicle;