import React, { useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [form, setForm] = useState({ title: "", description: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/courses/add", form);
      setMessage(res.data.message);
      setForm({ title: "", description: "" });
    } catch (err) {
      setMessage("Error adding course");
    }
  };

  return (
  
  <div className="container">
    <h2>🛠 Admin Dashboard</h2>
    {message && <p>{message}</p>}

    <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
      <input
        type="text"
        name="title"
        placeholder="Course Title"
        value={form.title}
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        placeholder="Course Description"
        value={form.description}
        onChange={handleChange}
        required
      />
      <button type="submit">Add Course</button>
    </form>
  </div>
);
}

export default AdminDashboard;