// routes/photoRoutes.js
import express from "express";
import multer from "multer";
import verifyToken from "../middleware/verifyToken.js";
import Photo from "../models/Photo.js";

const router = express.Router();

// Setup multer to store uploaded files in "uploads" folder
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// Upload photo
router.post("/", verifyToken, upload.single("photo"), async (req, res) => {
  const { albumId, title } = req.body;
  const file = req.file;

  if (!file) return res.status(400).json({ message: "No file uploaded" });

  const photo = new Photo({
    albumId,
    title,
    url: `/uploads/${file.filename}`,
  });

  await photo.save();
  res.status(201).json(photo);
});

// Get photos for album
router.get("/", verifyToken, async (req, res) => {
  const { albumId } = req.query;
  const photos = await Photo.find({ albumId });
  res.json(photos);
});

// Delete photo
router.delete("/:id", verifyToken, async (req, res) => {
  await Photo.findByIdAndDelete(req.params.id);
  res.json({ message: "Photo deleted" });
});

// ✅ Rename photo (update title)
router.put("/:id", verifyToken, async (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ message: "Title is required" });
  }

  try {
    const updatedPhoto = await Photo.findByIdAndUpdate(
      req.params.id,
      { title },
      { new: true }
    );

    if (!updatedPhoto) {
      return res.status(404).json({ message: "Photo not found" });
    }

    res.json(updatedPhoto);
  } catch (error) {
    console.error("Rename error:", error);
    res.status(500).json({ message: "Failed to rename photo" });
  }
});

export default router;
