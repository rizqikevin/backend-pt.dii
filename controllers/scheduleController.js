const Doctor = require("../models/Doctor");
const Schedule = require("../models/Schedule");
const moment = require("moment");

const daysMap = {
  monday: 1,
  tuesday: 2,
  wednesday: 3,
  thursday: 4,
  friday: 5,
  saturday: 6,
  sunday: 0,
};

exports.createSchedules = async (req, res) => {
  try {
    const {
      doctor_id,
      day,
      time_start,
      time_finish,
      quota,
      status,
      date_range,
    } = req.body;

    if (
      !doctor_id ||
      !day ||
      !time_start ||
      !time_finish ||
      !quota ||
      !date_range
    ) {
      return res.status(400).json({ message: "Field tidak lengkap" });
    }

    // Ambil data dokter
    const doctor = await Doctor.findById(doctor_id);
    if (!doctor) {
      return res.status(404).json({ message: "Dokter tidak ditemukan" });
    }

    const [startDate, endDate] = date_range.split(" s/d ");
    const start = moment(startDate.trim());
    const end = moment(endDate.trim());

    const daysInMoment = daysMap[day.toLowerCase()];
    console.log(day.toLowerCase(), daysInMoment);
    if (!daysInMoment) {
      return res.status(400).json({ message: "Format hari tidak valid" });
    }

    let current = start.clone();
    const schedules = [];

    while (current.isSameOrBefore(end)) {
      if (current.day() === daysInMoment) {
        schedules.push({
          doctor_id,
          doctor_name: doctor.name,
          day,
          time_start,
          time_finish,
          quota,
          status,
          date: current.format("YYYY-MM-DD"),
        });
      }
      current.add(1, "days");
    }

    const savedSchedules = await Schedule.insertMany(schedules);
    const formatted = savedSchedules.map(sch => ({
      id: sch._id,
      doctor_id: sch.doctor_id,
      doctor_name: sch.doctor_name,
      day: sch.day,
      time_start: sch.time_start,
      time_finish: sch.time_finish,
      quota: sch.quota,
      status: sch.status,
      date: sch.date
    }));

    res.status(201).json({
      message: "Jadwal berhasil dibuat",
      data: formatted,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getAllSchedules = async (req, res) => {
  try {
    const schedules = await Schedule.find()
      // .populate("doctor_id", "name")
      .sort({ date: 1 });

    res.json({ message: "berhasil", body: schedules });
  } catch (err) {
    res.status(500).json({ message: "Gagal mengambil jadwal" });
  }
};
