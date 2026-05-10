const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  member: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  trainer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  date: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Booking", bookingSchema);
