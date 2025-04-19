const mongoose = require("mongoose");

const DoctorSchema = new mongoose.Schema({
  name: String,
  gender: String,
  birthdate: Date,
  work_start_time: String,
  work_end_time: String,
});

module.exports = mongoose.model("Doctor", DoctorSchema);
