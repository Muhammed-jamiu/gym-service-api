const Payment = require("../models/payment");
const Booking = require("../models/booking");

// Make payment
exports.makePayment = async (req, res) => {
  try {
    const { bookingId, amount, paymentMethod, status, currency } = req.body;

    const booking = await Booking.findOne({
      // we use this approach so that one member will not work with other member ID
      _id: bookingId,
      member: req.user.id,
    });

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    const payment = await Payment.create({
      member: req.user.id,
      booking: bookingId,
      amount,
      paymentMethod,
      status,
      currency,
    });

    await payment.save();

    res.status(201).json({
      message: "Payment successful",
      data: payment,
    });
  } catch (error) {
    console.log(error.message);
  }
};

//delete payment
exports.deletePayment = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);

    if (!payment) {
      return res
        .status(404)
        .json({ message: "payment with the given ID was not found" });
    }

    await payment.deleteOne();

    res.status(200).json({ data: payment });
  } catch (error) {
    console.log(error.message);
  }
};

//view payment
exports.getpayment = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);

    if (!payment) {
      return res
        .status(404)
        .json({ message: "payment with the given ID was not found" });
    }

    res.json({ message: "User", data: payment });
  } catch (error) {
    console.log(error.message);
  }
};
// View my payments
exports.myPayments = async (req, res) => {
  try {
    const payments = await Payment.find({
      member: req.user.id,
    }).populate("booking");

    if (!payments) {
      return res.status(404).json({ message: "No payments Found" });
    }

    res.status(200).json(payments);
  } catch (error) {
    console.log(error.message);
  }
};

// Admin view all payments
exports.getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find()
      .populate("member", "name email")
      .populate("booking");

    res.status(200).json({ data: payments });
  } catch (error) {
    console.log(error.message);
  }
};
