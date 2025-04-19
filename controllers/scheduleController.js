const Doctor = require("../models/Doctor");
const Schedule = require("../models/Schedule");
const moment = require("moment");

const daysMap = {
  senin: "Monday",
  selasa: "Tuesday",
  rabu: "Wednesday",
  kamis: "Thursday",
  jumat: "Friday",
  sabtu: "Saturday",
  minggu: "Sunday",
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

    const hariDalamMoment = daysMap[day.toLowerCase()];
    if (!hariDalamMoment) {
      return res.status(400).json({ message: "Format hari tidak valid" });
    }

    let current = start.clone();
    const schedules = [];

    while (current.isSameOrBefore(end)) {
      if (current.format("dddd") === hariDalamMoment) {
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

    await Schedule.insertMany(schedules);

    res.status(201).json({
      message: "Jadwal berhasil dibuat",
      data: schedules,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getAllSchedules = async (req, res) => {
  try {
    const schedules = await Schedule.find()
      .populate("doctor_id", "name")
      .sort({ date: 1 });

    const formatted = schedules.map((item) => ({
      _id: item._id,
      doctor_name: item.doctor_id?.name || "N/A",
      day: item.day,
      date: item.date,
      time_start: item.time_start,
      time_finish: item.time_finish,
      quota: item.quota,
      status: item.status,
    }));

    res.json({ message: "berhasil", body: formatted });
  } catch (err) {
    res.status(500).json({ message: "Gagal mengambil jadwal" });
  }
};
