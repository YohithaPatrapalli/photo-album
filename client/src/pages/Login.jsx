import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { api } from "../api";
import Navbar from "../components/Navbar";
import "./login.css";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await api.post("/auth/login", { email, password });
      login(res.data.user, res.data.token);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <>
      <Navbar />
      <div className="login-bg">
        <div className="login-container">
          <div className="login-card">
            <div className="login-logo-wrap" style={{ marginBottom: 24 }}>
              <h2 className="login-title">Sign In</h2>
              <p className="login-subtitle">
                Welcome back! Please login to your account.
              </p>
            </div>
            <form onSubmit={handleSubmit}>
              {error && <p className="login-error">{error}</p>}
              <input
                type="email"
                placeholder="Email"
                className="login-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
              <input
                type="password"
                placeholder="Password"
                className="login-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
              <button type="submit" className="login-btn">
                Login
              </button>
              <p className="login-register">
                Don't have an account?{" "}
                <Link to="/register" className="login-link">
                  Register
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
