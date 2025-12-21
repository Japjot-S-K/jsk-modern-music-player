export default function SearchResults({
  songs,
  playlists,
  onPlay,
  onAdd,
}) {
  if (!songs || songs.length === 0) {
    return <p className="text-gray-400">No results found</p>;
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Search Results</h2>

      <div className="grid grid-cols-4 gap-4">
        {songs.map((song, index) => (
          <div
            key={`${song.id}-${index}`} // ✅ FIXED KEY
            className="bg-neutral-900 p-3 rounded hover:bg-neutral-800"
          >
            <img
              src={song.cover}
              className="rounded mb-2"
              alt={song.title}
            />

            <p className="font-medium">{song.title}</p>
            <p className="text-sm text-gray-400">{song.artist}</p>

            <div className="flex gap-2 mt-2">
              <button
                onClick={() => onPlay(song)}
                className="bg-green-500 text-black px-3 py-1 rounded"
              >
                Play
              </button>

              <select
                onChange={(e) =>
                  onAdd(e.target.value, {
                    id: song.id,
                    title: song.title,
                    artist: song.artist,
                    cover: song.cover,
                    previewUrl: song.previewUrl, // ✅ required
                  })
                }
                className="bg-black border border-gray-700 text-sm"
              >
                <option>Add to playlist</option>
                {playlists.map((p) => (
                  <option key={p._id} value={p._id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
