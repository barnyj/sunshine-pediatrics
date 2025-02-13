const path = require("path");
require("dotenv").config({ path: __dirname + "/.env" });

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// ✅ Serve the client folder properly (ensure booking page loads)
app.use(express.static(path.join(__dirname, "../client")));

// ✅ Ensure `/booking` correctly serves booking.html
app.get("/booking", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/booking-app/booking.html"));
});

// ✅ Import and use routes
const appointmentRoutes = require("./routes/appointments");
app.use("/appointments", appointmentRoutes);

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("✅ MongoDB Connected"))
    .catch(err => console.error("❌ MongoDB Connection Error:", err));

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
