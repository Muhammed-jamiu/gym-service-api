const express = require("express");
const router = express.Router();

const protect = require("../middlewares/protect");
const authorize = require("../middlewares/authorize");

const { getAllUsers, deleteUser } = require("../controllers/adminController");

router.get("/users", protect, authorize("admin"), getAllUsers);

router.delete("/user/:id", protect, authorize("admin"), deleteUser);

module.exports = router;
