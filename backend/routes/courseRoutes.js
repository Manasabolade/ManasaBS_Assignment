const express = require("express");
const Course = require("../models/Course");
const router = express.Router();

// Add a new course (Admin)
router.post("/add", async (req, res) => {
  try {
    const { title, description } = req.body;
    const course = new Course({ title, description });
    await course.save();
    res.status(201).json({ message: "Course added successfully", course });
  } catch (err) {
    res.status(500).json({ message: "Error adding course", error: err.message });
  }
});

// Get all courses (Student)
router.get("/", async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: "Error fetching courses" });
  }
});

// Enroll in a course (Student)
router.post("/enroll/:id", async (req, res) => {
  try {
    const { userId } = req.body;
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found" });

    if (!course.studentsEnrolled.includes(userId)) {
      course.studentsEnrolled.push(userId);
      await course.save();
    }

    res.json({ message: "Enrolled successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error enrolling", error: err.message });
  }
});

module.exports = router;