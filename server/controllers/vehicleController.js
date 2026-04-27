const Vehicle = require("../models/Vehicle");

// Add Vehicle
exports.addVehicle = async (req, res) => {
    try{
        // console.log("BODY:", req.body)
        const {name, number, nextServiceDate} = req.body;
        const vehicle = new Vehicle({name, number, nextServiceDate, userId: req.user.id,});
        await vehicle.save();
        res.status(201).json(vehicle);
    }
    catch(error){
        console.log("ERROR:", error)
        res.status(500).json({message: error.message});
    }
};

// Get All Vehicle
exports.getVehicles = async (req, res) => {
    try{
        const vehicles = await Vehicle.find({userId: req.user.id });
        res.json(vehicles);
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
};

// Delete Vehicle
exports.deleteVehicle = async (req, res) => {
    try {
        const {id} = req.params;
        await Vehicle.findOne({ _id: id, userId: req.user.id });

        res.json({message: "Vehicle deleted"})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

// Update Vehicle
exports.updateVehicle = async (req, res) => {
    try {
        const {id} = req.params;
        const {name, number, status} = req.body;

        const updatedVehicle = await Vehicle.findOneAndUpdate({ _id: id, userId: req.user.id }, {name, number, status}, {new: true});
        res.json(updatedVehicle)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

// Add Service 
exports.addService = async (req, res) => {
    try {
        const {id} = req.params;
        const {cost, description} = req.body;
        const vehicle = await Vehicle.findOne({ _id: id, userId: req.user.id });

        vehicle.services.push({
            cost, 
            description,
        })

        await vehicle.save();

        res.json(vehicle);
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
}