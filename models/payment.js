const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    member: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      required: true,
    },

    amount: {
      type: Number,
      required: true,
      default: 50000,
    },

    status: {
      type: String,
      enum: ["pending", "paid", "fail"],
      default: "pending",
      lowercase: true,
    },

    paymentMethod: {
      type: String,
      enum: ["card", "transfer", "cash"],
      required: true,
    },
    currency: {
      type: String,
      enum: ["USD", "EUR", "GBP", "NGN"],
      default: "USD",
      uppercase: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Payment", paymentSchema);
