const express = require("express");
const Feedback = require("../models/Feedback");
const router = express.Router();

// Submit feedback (Student)
router.post("/add", async (req, res) => {
  try {
    const { userId, courseId, comment } = req.body;
    const feedback = new Feedback({ user: userId, course: courseId, comment });
    await feedback.save();
    res.status(201).json({ message: "Feedback submitted", feedback });
  } catch (err) {
    res.status(500).json({ message: "Error submitting feedback", error: err.message });
  }
});

// Get all feedback (Admin)
router.get("/", async (req, res) => {
  try {
    const feedbacks = await Feedback.find()
      .populate("user", "name email")
      .populate("course", "title");
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ message: "Error fetching feedbacks" });
  }
  await axios.post("http://localhost:5000/api/feedback/add", {
  userId,
  courseId: feedback.courseId,
  comment: feedback.comment
});
});

module.exports = router;