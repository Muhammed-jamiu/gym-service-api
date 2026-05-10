const Booking = require("../models/booking");

//cerate a booking for a trainer
exports.bookTrainer = async (req, res) => {
  const { trainer, date } = req.body;

  const booking = await Booking.create({
    member: req.user.id,
    trainer,
    date,
  });

  res.status(201).json(booking);
};

//view all bookings of a member
exports.myBookings = async (req, res) => {
  const bookings = await Booking.find({
    member: req.user.id,
  }).populate("trainer", "name email");

  res.json(bookings);
};

//delete a booking
exports.deleteBooking = async (req, res) => {
  const booking = await Booking.findById(req.params.id);

  if (!booking) {
    return res.status(404).json({ message: "Booking not found" });
  }
  await booking.deleteOne();

  res.json({ message: "Booking deleted" });
};

//update a booking
exports.updateBooking = async (req, res) => {
  const { date } = req.body;
  const booking = await Booking.findById(req.params.id);

  if (!booking) {
    return res.status(404).json({ message: "Booking not found" });
  }

  booking.date = date || booking.date;
  await booking.save();
  res.json(booking);
};

//Secure Delete so that only the member who created the booking can delete it

// exports.deleteBooking = async (req, res) => {
//   const booking = await Booking.findOne({
//     _id: req.params.id,
//     member: req.user.id,
//   });

//   if (!booking) {
//     return res.status(404).json({
//       message: "Booking not found",
//     });
//   }

//   await booking.deleteOne();

//   res.json({
//     message: "Booking deleted",
//   });
// };

//Secure Update so that only the member who created the booking can update it
// exports.updateBooking = async (req, res) => {
//   const { trainer, date } = req.body;

//   const booking = await Booking.findOne({
//     _id: req.params.id,
//     member: req.user.id,
//   });

//   if (!booking) {
//     return res.status(404).json({
//       message: "Booking not found",
//     });
//   }

//   booking.trainer = trainer || booking.trainer;
//   booking.date = date || booking.date;

//   await booking.save();

//   res.json({
//     message: "Booking updated",
//     data: booking,
//   });
// };
