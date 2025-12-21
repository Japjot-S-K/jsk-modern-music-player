import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import playlistRoutes from "./routes/playlists.js";


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/playlists", playlistRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Music Player API running");
});

// MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
