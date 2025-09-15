import React, { useEffect, useState } from "react";
import axios from "axios";

const StudentDashboard = () => {
  // ✅ State variables
  const [courses, setCourses] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [feedback, setFeedback] = useState({ courseId: "", comment: "" });
  const [message, setMessage] = useState("");

  // ✅ Fetch courses from backend
  useEffect(() => {
    axios.get("http://localhost:5000/api/courses")
      .then(res => setCourses(res.data))
      .catch(err => console.error("Error fetching courses", err));
  }, []);

  // ✅ Fetch existing feedbacks (optional)
  useEffect(() => {
    axios.get("http://localhost:5000/api/feedback")
      .then(res => setFeedbacks(res.data))
      .catch(err => console.error("Error fetching feedback", err));
  }, []);

  // ✅ Enroll course function
  const enrollCourse = (courseId) => {
    axios.post(`http://localhost:5000/api/enroll/${courseId}`)
      .then(res => setMessage("Enrolled successfully!"))
      .catch(err => setMessage("Enrollment failed!"));
  };

  // ✅ Submit feedback function
  const submitFeedback = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/api/feedback", feedback)
      .then(res => {
        setMessage("Feedback submitted!");
        setFeedback({ courseId: "", comment: "" });
      })
      .catch(err => setMessage("Feedback submission failed!"));
  };

  return (
    <div className="container">
      <h2>📚 Student Dashboard</h2>
      {message && <p>{message}</p>}

      <h3>Available Courses</h3>
      <ul>
        {courses.map(course => (
          <li key={course._id} style={{ marginBottom: "10px" }}>
            <b>{course.title}</b> - {course.description}
            <button onClick={() => enrollCourse(course._id)} style={{ marginLeft: "10px" }}>
              Enroll
            </button>
          </li>
        ))}
      </ul>

      <h3>Give Feedback</h3>
      <form onSubmit={submitFeedback}>
        <select
          value={feedback.courseId}
          onChange={(e) => setFeedback({ ...feedback, courseId: e.target.value })}
          required
        >
          <option value="">Select Course</option>
          {courses.map(course => (
            <option key={course._id} value={course._id}>
              {course.title}
            </option>
          ))}
        </select>
        <textarea
          placeholder="Write your feedback..."
          value={feedback.comment}
          onChange={(e) => setFeedback({ ...feedback, comment: e.target.value })}
          required
        />
        <button type="submit">Submit Feedback</button>
      </form>

      <h3>Previous Feedbacks</h3>
      <ul>
        {feedbacks.map(fb => (
          <li key={fb._id}>
            <b>{fb.courseTitle}</b>: {fb.comment}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentDashboard;
