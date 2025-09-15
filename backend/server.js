const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Backend server is running!");
});

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

const PORT = process.env.PORT || 5000;
// Routes
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
const courseRoutes = require("./routes/courseRoutes");
app.use("/api/courses", courseRoutes);
const feedbackRoutes = require("./routes/feedbackRoutes");
app.use("/api/feedback", feedbackRoutes);