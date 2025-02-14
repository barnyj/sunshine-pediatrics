const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment"); // ✅ Ensure correct import

// 📌 GET: Retrieve all booked appointments
router.get("/", async (req, res) => {
    try {
        const appointments = await Appointment.find();
        res.json(appointments);
    } catch (error) {
        console.error("❌ Error fetching appointments:", error);
        res.status(500).json({ error: "Server error" });
    }
});

// 📌 POST: Book a new appointment
router.post("/", async (req, res) => {
    const { name, email, date, time } = req.body;

    try {
        const existing = await Appointment.findOne({ date, time });
        if (existing) {
            return res.status(400).json({ error: "Time slot already booked!" });
        }

        const newAppointment = new Appointment({ name, email, date, time });
        await newAppointment.save();
        res.json({ message: "✅ Appointment booked!", appointment: newAppointment });
    } catch (error) {
        res.status(500).json({ error: "Failed to book appointment" });
    }
});

// 📌 DELETE: Cancel an appointment
router.delete("/:id", async (req, res) => {
    try {
        await Appointment.findByIdAndDelete(req.params.id);
        res.json({ message: "🗑️ Appointment canceled!" });
    } catch (error) {
        res.status(500).json({ error: "Failed to cancel appointment" });
    }
});

module.exports = router;
