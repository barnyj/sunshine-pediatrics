require("dotenv").config();  // ✅ Use CommonJS instead of ES6 import

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// ✅ Ensure MONGO_URI is loaded
if (!process.env.MONGO_URI) {
    console.error("❌ MONGO_URI is missing in environment variables");
    process.exit(1);
}

// ✅ Import Appointment Routes
const appointmentRoutes = require("./routes/appointments");
app.use("/appointments", appointmentRoutes);

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("✅ MongoDB Connected"))
    .catch(err => console.error("❌ MongoDB Connection Error:", err));

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
