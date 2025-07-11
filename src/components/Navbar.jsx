import React from "react";
import "../home.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">Keeper 📝</div>
      <ul className="nav-links">
        <li>
          <a href="#features">Features</a>
        </li>
        <li>
          <a href="#about">About</a>
        </li>
        <li>
          <a href="#contact">Contact</a>
        </li>
        <li>
          <a className="cta" href="/notes">
            My Notes
          </a>
        </li>
      </ul>
      <div className="auth-buttons">
        <a href="/login" className="auth-btn">
          Login
        </a>
        <a href="/register" className="auth-btn register">
          Register
        </a>
      </div>
    </nav>
  );
}

export default Navbar;
