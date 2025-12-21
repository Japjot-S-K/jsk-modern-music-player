export default function SongCard({ song, onPlay, onAdd }) {
  return (
    <div
      className="bg-neutral-800 rounded-lg p-3 hover:bg-neutral-700 transition cursor-pointer"
    >
      <img
        src={song.artworkUrl100}
        alt={song.trackName}
        className="rounded mb-2 w-full"
      />

      <div className="font-semibold text-sm truncate">
        {song.trackName}
      </div>

      <div className="text-xs text-gray-400 truncate">
        {song.artistName}
      </div>

      <div className="flex gap-2 mt-2">
        <button
          onClick={() => onPlay(song)}
          className="text-xs bg-white text-black px-2 py-1 rounded"
        >
          ▶ Play
        </button>

        <button
          onClick={() => onAdd(song)}
          className="text-xs bg-green-500 px-2 py-1 rounded"
        >
          + Playlist
        </button>
      </div>
    </div>
  );
}
