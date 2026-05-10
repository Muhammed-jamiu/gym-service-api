const Workout = require("../models/workout");

exports.createWorkout = async (req, res) => {
  const { member, exercises } = req.body;

  // Check if member exists
  const memberExists = await User.findById(member);

  if (!memberExists) {
    return res.status(404).json({
      message: "Member with the given ID was not found",
    });
  }

  // Ensure selected user is actually a member
  if (memberExists.role !== "member") {
    return res.status(400).json({
      message: "Selected user is not a member",
    });
  }

  const workout = await Workout.create({
    member,
    exercises,
  });

  res.status(201).json(workout);
};

exports.getWorkout = async (req, res) => {
  const workout = await Workout.findOne({
    member: req.user.id,
  });

  res.json(workout);
};

//     member: req.user.id,
