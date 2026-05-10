const express = require("express");
const router = express.Router();

const protect = require("../middlewares/protect");
const authorize = require("../middlewares/authorize");

const {
  createWorkout,
  getWorkout,
} = require("../controllers/trainerController");

router.post("/workout", protect, authorize("trainer"), createWorkout);

router.get("/my-workout", protect, authorize("member"), getWorkout);

module.exports = router;
