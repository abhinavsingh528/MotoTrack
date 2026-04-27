const express = require("express");
const router = express.Router();
const { addVehicle, getVehicles, deleteVehicle, updateVehicle, addService } = require("../controllers/vehicleController");
const auth = require("../middleware/authMiddleware");

router.post("/", auth, addVehicle);
router.get("/", auth, getVehicles);
router.delete("/:id", auth, deleteVehicle);
router.put("/:id", auth, updateVehicle);
router.post("/:id/service", auth, addService);

module.exports = router;