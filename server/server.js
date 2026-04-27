const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const vehicleRoutes = require("./routes/vehicleRoutes")
const authRoutes = require("./routes/authRoutes")

dotenv.config();
connectDB();

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use("/api/vehicles", vehicleRoutes)
app.use("/api/auth", authRoutes)

// test route
app.get("/", (req, res) => {
  res.send("MotoTrack API is running 🚀");
});

const PORT = process.env.PORT || 5000;



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});