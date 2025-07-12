import React, { useState } from "react";
import "../styles.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [name, getName] = useState("");
  const [email, getEmail] = useState("");
  const [password, getPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSign(e) {
    e.preventDefault();
    try {
      const res = await axios.post("/info/signup", { name, email, password });
      console.log("Signup success:", res.data);
      if (res.data.success) {
        navigate("/main");
      }
    } catch (error) {
      setError(error.response?.data?.message || "SignUp failed");
      console.log("SignUp error");
      console.log(error);
    }
  }

  return (
    <div className="form-overlay">
      <div className="login-form">
        <h2>Sign Up</h2>
        <form onSubmit={handleSign}>
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            placeholder="John Doe"
            value={name}
            required
            name="name"
            onChange={(e) => getName(e.target.value)}
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="you@example.com"
            value={email}
            name="username"
            required
            onChange={(e) => getEmail(e.target.value)}
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="••••••••"
            name="password"
            value={password}
            required
            onChange={(e) => getPassword(e.target.value)}
          />

          <button type="submit" className="signup-form-button">
            Sign Up
          </button>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <p className="form-footer-text">
            Already have an account?{" "}
            <a href="/login" className="form-footer-link">
              Login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
