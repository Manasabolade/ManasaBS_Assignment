import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/feedback")
      .then(res => setFeedbacks(res.data))
      .catch(err => console.error("Error fetching feedback", err));
  }, []);

  return (
 
  <div className="container">
    <h2>📝 All Student Feedback</h2>
    <ul>
      {feedbacks.map(fb => (
        <li key={fb._id} style={{ marginBottom: "10px" }}>
          <b>{fb.user?.name}</b> on <i>{fb.course?.title}</i>: {fb.comment}
        </li>
      ))}
    </ul>
  </div>
);
}


export default AdminFeedback;