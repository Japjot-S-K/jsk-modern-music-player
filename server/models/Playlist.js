import mongoose from "mongoose";

const songSchema = new mongoose.Schema({
  id: String,
  title: String,
  artist: String,
  cover: String,
  previewUrl: String
});

const playlistSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    songs: [songSchema]
  },
  { timestamps: true }
);

export default mongoose.model("Playlist", playlistSchema);
