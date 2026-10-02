import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../api";
import "./dashboard.css";

function AlbumView() {
  const { id } = useParams(); // albumId from URL
  const [photos, setPhotos] = useState([]);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [modalPhoto, setModalPhoto] = useState(null);

  const fetchPhotos = React.useCallback(async () => {
    try {
      const res = await api.get(`/photos?albumId=${id}`);
      setPhotos(res.data);
    } catch (err) {
      console.error("Error fetching photos:", err);
    }
  }, [id]);

  useEffect(() => {
    fetchPhotos();
  }, [fetchPhotos]);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!title || !file) return;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("photo", file);
    formData.append("albumId", id);

    try {
      await api.post("/photos", formData);

      setTitle("");
      setFile(null);
      fetchPhotos();
    } catch (err) {
      console.error("Error uploading photo:", err);
    }
  };

  const deletePhoto = async (photoId) => {
    if (!window.confirm("Are you sure you want to delete this photo?")) return;

    try {
      await api.delete(`/photos/${photoId}`);
      fetchPhotos();
    } catch (err) {
      console.error("Error deleting photo:", err);
    }
  };

  return (
    <div
      className="dashboard-content"
      style={{ paddingTop: 24, paddingBottom: 32 }}
    >
      <h1
        className="dashboard-title"
        style={{
          textAlign: "center",
          marginBottom: 18,
          marginTop: 0,
          fontWeight: 700,
          fontSize: "1.5rem",
        }}
      >
        📸 Album Photos
      </h1>
      <form
        onSubmit={handleUpload}
        className="dashboard-new-album"
        style={{
          margin: "0 auto 32px auto",
          maxWidth: 500,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 14,
          minHeight: 120,
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 12,
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <label style={{ fontWeight: 500, color: "#374151", minWidth: 80 }}>
            Name
          </label>
          <input
            type="text"
            placeholder="Photo title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ flex: 2 }}
          />
        </div>
        <div
          style={{
            display: "flex",
            gap: 12,
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <label style={{ fontWeight: 500, color: "#374151", minWidth: 80 }}>
            Upload
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
            style={{
              flex: 2,
              padding: "10px 14px",
              border: "1px solid #d1d5db",
              borderRadius: "8px",
              fontSize: "1rem",
            }}
          />
        </div>
        <button
          type="submit"
          style={{
            background: "linear-gradient(90deg, #22c55e 60%, #4ade80 100%)",
            color: "#fff",
            fontWeight: 600,
            border: "none",
            borderRadius: "8px",
            padding: "8px 12px",
            cursor: "pointer",
            transition: "background 0.2s",
            width: 120,
            marginTop: 8,
          }}
        >
          Upload
        </button>
      </form>
      <div
        className="dashboard-album-list"
        style={{ margin: 0, justifyItems: "center", alignItems: "start" }}
      >
        {photos.map((photo) => (
          <div
            key={photo._id}
            className="dashboard-album-card"
            style={{
              padding: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              minHeight: 320,
            }}
          >
            <img
              src={`http://photo-album-msno.onrender.com${photo.url}`}
              alt={photo.title}
              style={{
                width: "100%",
                maxWidth: 320,
                height: "180px",
                objectFit: "cover",
                borderRadius: "16px 16px 0 0",
                margin: "0 auto",
                display: "block",
                cursor: "pointer",
              }}
              onClick={() => setModalPhoto(photo)}
            />
            <div
              className="dashboard-album-title"
              style={{ marginTop: 10, textAlign: "center" }}
            >
              {photo.title}
            </div>
            <div
              className="dashboard-album-actions"
              style={{ marginTop: 6, justifyContent: "center", gap: 10 }}
            >
              <button
                onClick={() => deletePhoto(photo._id)}
                className="dashboard-album-delete"
                style={{ fontSize: "0.95rem" }}
              >
                Delete
              </button>
              <button
                onClick={() => setModalPhoto(photo)}
                style={{
                  background: "#2563eb",
                  color: "#fff",
                  borderRadius: "6px",
                  padding: "6px 14px",
                  fontWeight: 600,
                  border: "none",
                  fontSize: "0.95rem",
                  marginLeft: 6,
                  cursor: "pointer",
                  transition: "background 0.2s",
                }}
              >
                View
              </button>
            </div>
          </div>
        ))}
      </div>
      {modalPhoto && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
          onClick={() => setModalPhoto(null)}
        >
          <img
            src={`http://localhost:5000${modalPhoto.url}`}
            alt={modalPhoto.title}
            style={{
              maxWidth: "90vw",
              maxHeight: "90vh",
              borderRadius: "18px",
              boxShadow: "0 8px 32px rgba(60,60,120,0.18)",
              background: "#fff",
            }}
          />
        </div>
      )}
    </div>
  );
}

export default AlbumView;
