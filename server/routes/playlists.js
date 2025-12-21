import express from "express";
import Playlist from "../models/Playlist.js";

const router = express.Router();

/**
 * Create playlist
 */
router.post("/", async (req, res) => {
  try {
    const { userId, name } = req.body;

    const playlist = await Playlist.create({
      userId,
      name,
      songs: [],
    });

    res.status(201).json(playlist);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * Get playlists for user
 */
router.get("/:userId", async (req, res) => {
  try {
    const playlists = await Playlist.find({
      userId: req.params.userId,
    });
    res.json(playlists);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * Add song to playlist
 */
router.post("/:playlistId/song", async (req, res) => {
  try {
    const playlist = await Playlist.findById(
      req.params.playlistId
    );

    playlist.songs.push(req.body);
    await playlist.save();

    res.json(playlist);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * ❌ Delete playlist
 */
router.delete("/:playlistId", async (req, res) => {
  try {
    await Playlist.findByIdAndDelete(
      req.params.playlistId
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * ❌ Delete song from playlist
 */
router.delete("/:playlistId/song/:songId", async (req, res) => {
  try {
    const playlist = await Playlist.findById(
      req.params.playlistId
    );

    playlist.songs = playlist.songs.filter(
      (s) => s.id !== req.params.songId
    );

    await playlist.save();
    res.json(playlist);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
