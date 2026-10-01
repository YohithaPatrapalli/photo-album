import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api";
import { useAuth } from "../context/AuthContext";
import "./dashboard.css";

function Dashboard() {
  const [albums, setAlbums] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const { user, logout } = useAuth();

  // Fetch albums for this user
  const fetchAlbums = async () => {
    try {
      const res = await api.get("/albums"); // token sent via api.js
      setAlbums(res.data);
    } catch (err) {
      console.error("Failed to fetch albums", err);
    }
  };

  useEffect(() => {
    fetchAlbums();
  }, []);

  // Add a new album
  const addAlbum = async () => {
    if (!newTitle.trim()) return;

    try {
      await api.post("/albums", { title: newTitle });
      setNewTitle("");
      fetchAlbums();
    } catch (err) {
      console.error("Failed to add album", err);
    }
  };

  // Delete album by ID
  const deleteAlbum = async (id) => {
    try {
      await api.delete(`/albums/${id}`);
      fetchAlbums();
    } catch (err) {
      console.error("Failed to delete album", err);
    }
  };

  return (
    <div className="dashboard-root">
      <aside className="dashboard-sidebar">
        <nav>
          <Link to="/">Dashboard</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/settings">Settings</Link>
        </nav>
      </aside>
      <main className="dashboard-main">
        <header
          className="dashboard-navbar"
          style={{ justifyContent: "center" }}
        >
          <span
            className="dashboard-user"
            style={{
              textAlign: "center",
              width: "100%",
              fontWeight: 600,
              fontSize: 22,
            }}
          >
            Welcome, {user?.name}!
          </span>
        </header>
        <div className="dashboard-content">
          <h1 className="dashboard-title" style={{ marginBottom: 24 }}>
            Your Albums
          </h1>
          <div className="dashboard-new-album">
            <input
              type="text"
              placeholder="New album title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
            <button onClick={addAlbum}>Add Album</button>
          </div>
          {albums.length === 0 ? (
            <p style={{ textAlign: "center", color: "#6b7280" }}>
              No albums yet. Add one!
            </p>
          ) : (
            <div className="dashboard-album-list">
              {albums.map((album) => (
                <div key={album._id} className="dashboard-album-card">
                  <div className="dashboard-album-title">{album.title}</div>
                  <div className="dashboard-album-date">
                    Created: {new Date(album.createdAt).toLocaleDateString()}
                  </div>
                  <div className="dashboard-album-actions">
                    <Link
                      to={`/album/${album._id}`}
                      className="dashboard-album-link"
                    >
                      View Album →
                    </Link>
                    <button
                      onClick={() => deleteAlbum(album._id)}
                      className="dashboard-album-delete"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
