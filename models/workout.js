const mongoose = require("mongoose");

const workoutSchema = new mongoose.Schema({
  member: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  exercises: [String],
});

module.exports = mongoose.model("Workout", workoutSchema);
