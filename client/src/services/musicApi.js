export async function searchSongs(query) {
  if (!query || query.trim() === "") return [];

  const res = await fetch(
    `https://itunes.apple.com/search?term=${encodeURIComponent(
      query
    )}&media=music&limit=12`
  );

  const data = await res.json();

  return data.results
    .filter((s) => s.previewUrl) // 🔐 only playable tracks
    .map((s) => ({
      id: s.trackId,
      title: s.trackName,
      artist: s.artistName,
      cover: s.artworkUrl100,
      previewUrl: s.previewUrl, // ✅ FIXED KEY
    }));
}
