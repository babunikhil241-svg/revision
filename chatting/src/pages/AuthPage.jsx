import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthPage = ({ setAuth }) => {
  const [isSignup, setIsSignup] = useState(false);
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const action = isSignup ? "signup" : "login";
    try {
      const res = await axios.post(
        `http://localhost/shine-api/auth.php?action=${action}`,
        form,
        { headers: { "Content-Type": "application/json" } }
      );

      if (res.data.status === "success") {
        if (isSignup) {
          alert("Account created! Now login.");
          setIsSignup(false);
        } else {
          setAuth(res.data.user);
          navigate("/AdminDashboard");
        }
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      alert("Server error! Make sure XAMPP is running.");
    }
  };

  return (
    <div style={styles.container}>
      {/* Background Hexagon Pattern */}
      <div style={styles.bgOverlay}>
        {[...Array(40)].map((_, i) => (
          <div key={i} className="hex-shape"></div>
        ))}
      </div>

      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
            100% { transform: translateY(0px); }
          }
          
          .hex-shape {
            width: 100px;
            height: 110px;
            background: rgba(37, 99, 235, 0.05);
            clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
            transition: all 0.5s ease;
            animation: float 6s infinite ease-in-out;
          }

          .hex-shape:hover {
            background: rgba(37, 99, 235, 0.2);
            transform: scale(1.2) rotate(10deg);
            cursor: pointer;
            box-shadow: 0 0 20px rgba(37, 99, 235, 0.4);
          }

          .auth-card {
            backdrop-filter: blur(10px);
            background: rgba(255, 255, 255, 0.9);
            border: 1px solid rgba(255, 255, 255, 0.3);
          }

          button:active { transform: scale(0.98); }
        `}
      </style>

      <div className="auth-card" style={styles.card}>
        <h2 style={styles.title}>{isSignup ? "Create Account" : "Shine Institute"}</h2>
        <p style={{textAlign: 'center', color: '#666', marginBottom: '20px'}}>
           {isSignup ? "Join our learning community" : "Admin Login Portal"}
        </p>

        <form onSubmit={handleSubmit} autoComplete="off">
          <label style={styles.label}>Username</label>
          <input
            type="text"
            placeholder="Enter username"
            required
            style={styles.input}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            value={form.username}
          />

          <label style={styles.label}>Password</label>
          <input
            type="password"
            placeholder="Enter password"
            required
            style={styles.input}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            value={form.password}
          />

          <button type="submit" style={styles.button}>
            {isSignup ? "Register Now" : "Sign In"}
          </button>
        </form>

        <p style={styles.footerText}>
          {isSignup ? "Already have an account? " : "Don't have an account? "}
          <span onClick={() => setIsSignup(!isSignup)} style={styles.link}>
            {isSignup ? "Login" : "Sign Up"}
          </span>
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "linear-gradient(135deg, #f4f7fe 0%, #e2e8f0 100%)",
    overflow: "hidden",
  },
  bgOverlay: {
    position: "absolute",
    width: "120%",
    height: "120%",
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
    opacity: 0.6,
  },
  card: {
    position: "relative",
    zIndex: 10,
    padding: "45px",
    borderRadius: "24px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
    width: "380px",
  },
  title: {
    textAlign: "center",
    color: "#1e3a8a",
    fontSize: "28px",
    fontWeight: "bold",
    marginBottom: "8px",
  },
  label: { fontSize: "13px", color: "#475569", fontWeight: "600" },
  input: {
    width: "100%",
    padding: "14px",
    margin: "8px 0 18px 0",
    border: "1px solid #cbd5e1",
    borderRadius: "12px",
    outline: "none",
    transition: "0.3s",
    background: "#f8fafc",
  },
  button: {
    width: "100%",
    padding: "14px",
    background: "linear-gradient(90deg, #2563eb, #1d4ed8)",
    color: "white",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "16px",
    boxShadow: "0 4px 12px rgba(37, 99, 235, 0.3)",
    marginTop: "10px",
  },
  footerText: { textAlign: "center", marginTop: "24px", fontSize: "14px", color: "#64748b" },
  link: { color: "#2563eb", cursor: "pointer", fontWeight: "bold", marginLeft: "5px" },
};

export default AuthPage;