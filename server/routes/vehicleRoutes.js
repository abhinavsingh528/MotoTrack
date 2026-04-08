const express = require("express");
const router = express.Router();
const {addVehicle, getVehicles, deleteVehicle, updateVehicle} = require("../controllers/vehicleController");

router.post("/", addVehicle);
router.get("/", getVehicles);
router.delete("/:id", deleteVehicle);
router.put("/:id", updateVehicle)
module.exports = router;
