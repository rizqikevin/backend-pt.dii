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
  
      const doctor1 = new Doctor({
        name: "Dr. Rizqi Kevin",
        gender: "Male",
        birthdate: "1995-01-01",
        work_start_time: "09:00",
        work_end_time: "12:00"
      });
  
      const doctor2 = new Doctor({
        name: "Dr. Sarah Salsabila",
        username: "sarahs",
        password: "hashedpassword",
        gender: "Female",
        birthdate: "1993-03-10",
        work_start_time: "13:00",
        work_end_time: "15:00"
      });
  
      await doctor1.save();
      await doctor2.save();
  
      const schedule1 = new Schedule({
        doctor_id: doctor1._id,
        doctor_name: doctor1.name,
        day: "Monday",
        time_start: "09:00",
        time_finish: "12:00",
        quota: 5,
        status: true,
        date: "2025-11-24"
      });
  
      const schedule2 = new Schedule({
        doctor_id: doctor2._id,
        doctor_name: doctor2.name,
        day: "Wednesday",
        time_start: "13:00",
        time_finish: "15:00",
        quota: 3,
        status: true,
        date: "2025-11-26"
      });
  
      await schedule1.save();
      await schedule2.save();
  
      console.log("✅ Seed berhasil!");
      process.exit();
    } catch (err) {
      console.error("❌ Seed gagal:", err.message);
      process.exit(1);
    }
  }
  
  seed();
  
