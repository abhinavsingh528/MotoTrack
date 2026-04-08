const Vehicle = require("../models/Vehicle");

// Add Vehicle
exports.addVehicle = async (req, res) => {
    try{
        console.log("BODY:", req.body)
        const {name, number} = req.body;
        const vehicle = new Vehicle({name, number});
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
        const vehicles = await Vehicle.find();
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
        await Vehicle.findByIdAndDelete(id);

        res.json({message: "Vehicle deleted"})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

// Update Vehicle
exports.updateVehicle = async (req, res) => {
    try {
        const {id} = req.params;
        const {name, number, staus} = req.body;

        const updatedVehicle = await Vehicle.findByIdAndUpdate(id, {name, number, staus}, {new: true});
        res.json(updatedVehicle)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}