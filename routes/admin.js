//admin backend

const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment");

// 📌 GET: Fetch all appointments (Admin Dashboard)
router.get("/appointments", async (req, res) => {
    try {
        const appointments = await Appointment.find();
        res.json(appointments);
    } catch (error) {
        console.error("❌ Error fetching appointments:", error);
        res.status(500).json({ error: "Server error" });
    }
});

// 📌 DELETE: Cancel an appointment (Admin Only)
router.delete("/appointments/:id", async (req, res) => {
    try {
        await Appointment.findByIdAndDelete(req.params.id);
        res.json({ message: "🗑️ Appointment canceled!" });
    } catch (error) {
        res.status(500).json({ error: "Failed to cancel appointment" });
    }
});

module.exports = router;
