require("dotenv").config();
const express = require("express");
// loading modules from the diiferent folder
const authRoutes = require("./routes/authRoutes");
const memberRoutes = require("./routes/memberRoutes");
const trainerRoutes = require("./routes/trainerRoutes");
const adminRoutes = require("./routes/adminRoutes");
const connectDB = require("./database/database");
const paymentRoutes = require("./routes/paymentRoutes");

const app = express();

//use middleware && routes section
app.use(express.json());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/member", memberRoutes);
app.use("/api/v1/trainer", trainerRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/payment", paymentRoutes);

// connecting to database and server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`APP listening on http://localhost:${PORT}`);
  //database connection section
  connectDB();
});
