const User = require("../models/user");

exports.getAllUsers = async (req, res) => {
  const users = await User.find().select("-password");

  // if database is empty
  if (!users) {
    return res.status(404).json({ message: "Database is Empty" });
  }

  res.status(200).json({ message: "All Users" });
};

exports.deleteUser = async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  await user.deleteOne();

  res.status(200).json({ message: "User", data: user });
};
