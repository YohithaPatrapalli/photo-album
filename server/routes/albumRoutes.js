import express from "express";
import Album from "../models/Album.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/", verifyToken, async (req, res) => {
  try {
    const albums = await Album.find({ userId: req.userId }).sort({
      createdAt: -1,
    });
    res.json(albums);
  } catch (err) {
    res.status(500).json({ message: "Error fetching albums" });
  }
});

router.post("/", verifyToken, async (req, res) => {
  const { title } = req.body;
  try {
    const album = new Album({ title, userId: req.userId });
    await album.save();
    res.status(201).json(album);
  } catch (err) {
    res.status(500).json({ message: "Error creating album" });
  }
});

router.delete("/:id", verifyToken, async (req, res) => {
  try {
    await Album.deleteOne({ _id: req.params.id, userId: req.userId });
    res.json({ message: "Album deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting album" });
  }
});

export default router;
