// patient backend

const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment");

// 📌 GET: Retrieve a patient's upcoming appointments
router.get("/:email/appointments", async (req, res) => {
    try {
        const appointments = await Appointment.find({ email: req.params.email });
        res.json(appointments);
    } catch (error) {
        console.error("❌ Error fetching patient appointments:", error);
        res.status(500).json({ error: "Server error" });
    }
});

// 📌 PUT: Reschedule an appointment
router.put("/appointments/:id", async (req, res) => {
    const { date, time } = req.body;
    try {
        const updatedAppointment = await Appointment.findByIdAndUpdate(
            req.params.id,
            { date, time },
            { new: true }
        );
        res.json(updatedAppointment);
    } catch (error) {
        res.status(500).json({ error: "Failed to reschedule appointment" });
    }
});

// 📌 DELETE: Cancel an appointment
router.delete("/appointments/:id", async (req, res) => {
    try {
        await Appointment.findByIdAndDelete(req.params.id);
        res.json({ message: "🗑️ Appointment canceled!" });
    } catch (error) {
        res.status(500).json({ error: "Failed to cancel appointment" });
    }
});

module.exports = router;
