require("dotenv").config();  

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json()); // ✅ Ensure JSON parsing is loaded before routes
app.use(cors());

// ✅ Root Route (To confirm server is running)
app.get("/", (req, res) => {
    res.send("🚀 Server is running successfully!");
});

// ✅ Debugging Route: List Registered Routes
app.get("/debug-routes", (req, res) => {
    res.json({
        routes: app._router.stack
            .filter(r => r.route)
            .map(r => r.route.path)
    });
});

// ✅ Import Appointment Routes
try {
    console.log("📌 Attempting to load /appointments route...");
    const appointmentRoutes = require("./routes/appointments"); 
    app.use("/appointments", appointmentRoutes);
    console.log("✅ /appointments route successfully loaded!");
} catch (error) {
    console.error("❌ Error loading /appointments route:", error);
}

// ✅ MongoDB Connection
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("✅ MongoDB Connected"))
    .catch(err => console.error("❌ MongoDB Connection Error:", err));

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
