const express = require("express");
const router = express.Router();
const { createSchedules, getAllSchedules } = require("../controllers/scheduleController.js");
const auth = require("../middleware/auth.js");

router.post("/", auth, createSchedules);
router.get("/", auth, getAllSchedules);

module.exports = router;
