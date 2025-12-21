const API_BASE = "https://jsk-music-backend.onrender.com";

// PLAYLISTS
export async function createPlaylist(userId, name) {
  const res = await fetch(`${API_BASE}/playlists`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, name }),
  });
  return res.json();
}

export async function getPlaylists(userId) {
  const res = await fetch(`${API_BASE}/playlists/${userId}`);
  return res.json();
}

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

// ❌ DELETE PLAYLIST
export async function deletePlaylist(playlistId) {
  const res = await fetch(
    `${API_BASE}/playlists/${playlistId}`,
    {
      method: "DELETE",
    }
  );
  return res.json();
}

// ❌ DELETE SONG FROM PLAYLIST
export async function deleteSongFromPlaylist(
  playlistId,
  songId
) {
  const res = await fetch(
    `${API_BASE}/playlists/${playlistId}/song/${songId}`,
    { method: "DELETE" }
  );
  return res.json();
}

