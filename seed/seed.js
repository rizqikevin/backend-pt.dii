const dotenv = require("dotenv");
const moment = require("moment");
const Doctor = require("../models/Doctor");
const Schedule = require("../models/Schedule");
const connectDB = require("../config/db");

dotenv.config();
connectDB();


async function seed() {
    try {
  
      await Doctor.deleteMany({});
      await Schedule.deleteMany({});
  
      const doctor = new Doctor({
        name: "Dr. Sarah Salsabila",
        gender: "Female",
        birthdate: "1993-03-10",
        work_start_time: "13:00",
        work_end_time: "15:00"
      });

      await doctor.save();
  
      const schedule = new Schedule({
        doctor_id: doctor._id,
        doctor_name: doctor.name,
        day: "Monday",
        time_start: "09:00",
        time_finish: "12:00",
        quota: 5,
        status: true,
        date: "2025-11-24"
      });
  
      await schedule.save();
  
      console.log("✅ Seed berhasil!");
      process.exit();
    } catch (err) {
      console.error("❌ Seed gagal:", err.message);
      process.exit(1);
    }
  }
  
  seed();
  
