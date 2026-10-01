import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./login.css";

export default function Profile() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="login-bg">
      <div className="login-container">
        <div className="login-card" style={{ minWidth: 340 }}>
          <div className="login-logo-wrap" style={{ marginBottom: 24 }}>
            <h2 className="login-title">Profile</h2>
            <p className="login-subtitle">Your account details</p>
          </div>
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
          {user ? (
            <div style={{ width: "100%", textAlign: "left" }}>
              <div style={{ marginBottom: 18 }}>
                <strong>Name:</strong> <span>{user.name}</span>
              </div>
              <div style={{ marginBottom: 18 }}>
                <strong>Email:</strong> <span>{user.email}</span>
              </div>
              <div style={{ marginBottom: 18 }}>
                <strong>User ID:</strong> <span>{user._id}</span>
              </div>
              <button
                onClick={() => navigate("/settings")}
                style={{
                  background: "#fff",
                  color: "#2563eb",
                  fontWeight: 600,
                  fontSize: "1rem",
                  border: "1.5px solid #2563eb",
                  borderRadius: "8px",
                  padding: "8px 16px",
                  marginTop: "10px",
                  cursor: "pointer",
                  transition: "background 0.2s, color 0.2s",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = "#2563eb";
                  e.currentTarget.style.color = "#fff";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = "#fff";
                  e.currentTarget.style.color = "#2563eb";
                }}
              >
                Edit Details
              </button>
            </div>
          ) : (
            <p className="login-error">No user info available.</p>
          )}
        </div>
      </div>
    </div>
  );
}
