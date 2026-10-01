import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { api } from "../api";
import "./login.css";

export default function Settings() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const res = await api.put(`/auth/update/${user._id}`, { name, email });
      login(res.data.user, res.data.token); // update context and localStorage
      setMessage("Profile updated successfully!");
    } catch (err) {
      setMessage(err.response?.data?.message || "Update failed");
    }
    setLoading(false);
  };

  return (
    <div className="login-bg">
      <div className="login-container">
        <div className="login-card" style={{ minWidth: 340 }}>
          <button
            onClick={() => navigate(-1)}
            style={{
              background: "linear-gradient(90deg, #2563eb 60%, #7c3aed 100%)",
              color: "#fff",
              fontWeight: 600,
              fontSize: "1rem",
              border: "none",
              borderRadius: "8px",
              padding: "8px 16px",
              marginBottom: "18px",
              cursor: "pointer",
              boxShadow: "0 2px 8px rgba(37, 99, 235, 0.08)",
              transition: "background 0.2s, box-shadow 0.2s",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.background =
                "linear-gradient(90deg, #1d4ed8 60%, #6d28d9 100%)")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.background =
                "linear-gradient(90deg, #2563eb 60%, #7c3aed 100%)")
            }
          >
            ← Back
          </button>
          <div className="login-logo-wrap" style={{ marginBottom: 24 }}>
            <h2 className="login-title">Settings</h2>
            <p className="login-subtitle">Update your account details</p>
          </div>
          <form onSubmit={handleUpdate} style={{ width: "100%" }}>
            <input
              type="text"
              className="login-input"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              className="login-input"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              type="submit"
              className="login-btn"
              disabled={loading}
              style={{ marginBottom: 10 }}
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
            {message && (
              <p
                className={
                  message.includes("success") ? "login-subtitle" : "login-error"
                }
              >
                {message}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
