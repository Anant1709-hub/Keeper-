import { useState } from "react";
import "../styles.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const navigate = useNavigate();
  const [email, getEmail] = useState("");
  const [password, getPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const res = await axios.post(
        "/info/login",
        { email, password },
        { withCredentials: true }
      );
      console.log("Login success:", res.data);
      if (res.data.success) {
        console.log("Hey");
        navigate("/main");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Login failed");
    }
  }

  return (
    <div className="form-overlay">
      <div className="login-form">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="you@example.com"
            value={email}
            name="email"
            required
            onChange={(e) => getEmail(e.target.value)}
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="••••••••"
            value={password}
            name="password"
            required
            onChange={(e) => getPassword(e.target.value)}
          />

          <button type="submit">Login</button>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
