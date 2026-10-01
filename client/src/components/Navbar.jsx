import React from "react";
import logo from "../../public/vite.svg";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../pages/login.css";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav
      style={{
        width: "100%",
        background: "#fff",
        boxShadow: "0 2px 8px rgba(60,60,120,0.07)",
        padding: "0",
        marginBottom: 24,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 100,
        minHeight: 60,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 900,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 24px",
          gap: 0,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {/* Logo and avatar side by side */}
          <img
            src={logo}
            alt="Logo"
            style={{ width: 32, height: 32, marginRight: 4 }}
          />
          {user && (
            <img
              src={
                user.avatarUrl ||
                "https://ui-avatars.com/api/?name=" +
                  encodeURIComponent(user.name || "U") +
                  "&background=2563eb&color=fff&size=32"
              }
              alt="User Avatar"
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                marginRight: 8,
                border: "2px solid #2563eb",
              }}
            />
          )}
          <Link
            to={user ? "/" : "/login"}
            style={{
              textDecoration: "none",
              color: "#2563eb",
              fontWeight: 700,
              fontSize: 22,
              letterSpacing: -1,
            }}
          >
            My Photo Album
          </Link>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            marginRight: 0,
          }}
        >
          {user ? (
            <>
              <Link to="/profile" className="login-link">
                Profile
              </Link>
              <Link to="/settings" className="login-link">
                Settings
              </Link>
              <button
                onClick={() => {
                  logout();
                  navigate("/login");
                }}
                className="login-btn"
                style={{
                  width: "auto",
                  padding: "7px 18px",
                  margin: 0,
                  fontSize: 15,
                  background:
                    "linear-gradient(90deg, #2563eb 60%, #7c3aed 100%)",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  boxShadow: "0 2px 8px rgba(37, 99, 235, 0.08)",
                  cursor: "pointer",
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
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="login-link">
                Login
              </Link>
              <Link to="/register" className="login-link">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
