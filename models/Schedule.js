const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema({
  doctor_id: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor" },
  doctor_name: String,
  day: String, // "monday"
  time_start: String,
  time_finish: String,
  quota: Number,
  status: Boolean,
  date: String, // "2025-04-22"
});

module.exports = mongoose.model("Schedule", scheduleSchema);
