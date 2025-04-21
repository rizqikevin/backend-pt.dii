const dotenv = require("dotenv");
const moment = require("moment");
const Doctor = require("../models/Doctor");
const Schedule = require("../models/Schedule");
const connectDB = require("../config/db");

dotenv.config();
connectDB();

async function seed() {
  try {
    // await Doctor.deleteMany({});
    await Schedule.deleteMany({});

    // const doctors = [
    //   {
    //     name: "Dr. Sarah Salsabila",
    //     gender: "Female",
    //     birthdate: "1993-03-10",
    //     work_start_time: "13:00",
    //     work_end_time: "15:00",
    //   },
    //   {
    //     name: "Dr. Ahmad Nugraha",
    //     gender: "Male",
    //     birthdate: "1989-07-22",
    //     work_start_time: "08:00",
    //     work_end_time: "12:00",
    //   },
    //   {
    //     name: "Dr. Nabila Zahra",
    //     gender: "Female",
    //     birthdate: "1990-01-15",
    //     work_start_time: "09:00",
    //     work_end_time: "11:00",
    //   },
    //   {
    //     name: "Dr. Muhammad Rizki",
    //     gender: "Male",
    //     birthdate: "1995-06-30",
    //     work_start_time: "14:00",
    //     work_end_time: "16:00",
    //   },
    //   {
    //     name: "Dr. Dwi Hidayat",
    //     gender: "Male",
    //     birthdate: "1988-12-05",
    //     work_start_time: "10:00",
    //     work_end_time: "13:00",
    //   },
    // ];

    // await Doctor.insertMany(doctors);
    // const schedule = new Schedule({
    //   doctor_id: doctor._id,
    //   doctor_name: doctor.name,
    //   day: "Monday",
    //   time_start: "09:00",
    //   time_finish: "12:00",
    //   quota: 5,
    //   status: true,
    //   date: "2025-11-24"
    // });

    // await schedule.save();

    console.log("✅ Seed berhasil!");
    process.exit();
  } catch (err) {
    console.error("❌ Seed gagal:", err.message);
    process.exit(1);
  }
}

seed();
