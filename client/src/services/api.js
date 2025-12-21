const API_BASE = "https://jsk-music-backend.onrender.com/api";

// CREATE PLAYLIST
export async function createPlaylist(userId, name) {
  const res = await fetch(`${API_BASE}/playlists`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, name }),
  });
  return res.json();
}

// GET PLAYLISTS
export async function getPlaylists(userId) {
  const res = await fetch(`${API_BASE}/playlists/${userId}`);
  return res.json();
}

// ADD SONG
export async function addSongToPlaylist(playlistId, song) {
  const res = await fetch(
    `${API_BASE}/playlists/${playlistId}/song`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(song),
    }
  );
  return res.json();
}

// DELETE PLAYLIST
export async function deletePlaylist(playlistId) {
  const res = await fetch(
    `${API_BASE}/playlists/${playlistId}`,
    { method: "DELETE" }
  );
  return res.json();
}

// DELETE SONG
export async function deleteSongFromPlaylist(playlistId, songId) {
  const res = await fetch(
    `${API_BASE}/playlists/${playlistId}/song/${songId}`,
    { method: "DELETE" }
  );
  return res.json();
}
