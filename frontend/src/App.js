import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import StudentDashboard from "./pages/StudentDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import AdminFeedback from "./pages/AdminFeedback";
import "./App.css";


function App() {
  return (
    <Router>
      <div style={{ padding: "20px" }}>
        <nav>
          <Link to="/signup" style={{ marginRight: "10px" }}>Signup</Link>
          <Link to="/login" style={{ marginRight: "10px" }}>Login</Link>
          <Link to="/dashboard" style={{ marginRight: "10px" }}>Student</Link>
          <Link to="/admin"style={{ marginRight: "10px" }}>Admin</Link>
          <Link to="/feedbacks"style={{ marginRight: "10px" }}>Feedbacks</Link>

        </nav>

        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<StudentDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/feedbacks" element={<AdminFeedback />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;