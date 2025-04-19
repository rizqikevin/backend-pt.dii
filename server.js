const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const ScheduleRouter = require("./routes/scheduleRouter");
const authRoutes = require("./routes/authRouter");

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/schedules", ScheduleRouter);

app.listen(PORT, () => {
  console.log(`server berjalan di http://localhost:5000`);
});

app.get("/", (req, res) => {
  res.send("API sudah berjalan");
});
