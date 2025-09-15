import React, { useState } from "react";
import axios from "axios";

const Signup = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/signup", form);
      localStorage.setItem("userId", res.data.userId);
      setMessage("Signup successful!");
    } catch (err) {
      setMessage(err.response?.data?.message || "Error signing up");
    }
  };

  return (
    <div className="container">
      <h2>Signup</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <select name="role" onChange={handleChange} required>
          <option value="">Select Role</option>
          <option value="student">Student</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;