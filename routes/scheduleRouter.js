const express = require("express");
const router = express.Router();
const { createSchedules, getAllSchedules } = require("../controllers/scheduleController.js");

router.post("/", createSchedules);
router.get("/", getAllSchedules);

module.exports = router;
