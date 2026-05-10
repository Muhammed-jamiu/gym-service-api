const express = require("express");
const router = express.Router();

const protect = require("../middlewares/protect");
const authorize = require("../middlewares/authorize");

const {
  bookTrainer,
  myBookings,
  updateBooking,
  deleteBooking,
} = require("../controllers/memberController");

router.get("/bookings", protect, authorize("member"), myBookings);

router.post("/book", protect, authorize("member"), bookTrainer);

router.put("/book/:id", protect, authorize("member"), updateBooking);

router.delete("/book/:id", protect, authorize("member"), deleteBooking);

module.exports = router;
