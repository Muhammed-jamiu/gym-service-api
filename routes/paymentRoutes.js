const express = require("express");
const router = express.Router();

const protect = require("../middlewares/protect");
const authorize = require("../middlewares/authorize");

const {
  makePayment,
  myPayments,
  getAllPayments,
  deletePayment,
  getpayment,
} = require("../controllers/paymentController");

// Member routes
router.post("/pay", protect, authorize("member"), makePayment);

//get payment
router.get("/pay/:id", protect, authorize("member"), getpayment);

//get payments
router.get("/my-payments", protect, authorize("member"), myPayments);

//delete  payment
router.delete("/pay/:id", protect, authorize("member"), deletePayment);

// Admin route
router.get("/all", protect, authorize("admin"), getAllPayments);

module.exports = router;
