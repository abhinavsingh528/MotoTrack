const Vehicle = require("../models/Vehicle");

// Add Vehicle
exports.addVehicle = async (req, res) => {
    try{
        const {name, number} = req.body;
        const vehicle = new Vehicle({name, number});
        await vehicle.save();
        res.status(201).json(vehicle);
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
};

// Get All Vehicle
exports.getVehicles = async (req, res) => {
    try{
        const vehicles = await Vehicle.find();
        res.json(vehicles);
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
};