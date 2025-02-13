// define Appointment structure
const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    status: { type: String, default: "confirmed" }
});

module.exports = mongoose.model("Appointment", AppointmentSchema);
