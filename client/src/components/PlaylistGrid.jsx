import { FaTrash, FaMusic } from "react-icons/fa";

export default function PlaylistGrid({
  playlists,
  onCreate,
  onSelect,
  onDelete,
}) {
  // ✅ SAFE COVER PICKER
  const getPlaylistCover = (playlist) => {
    if (!playlist.songs || playlist.songs.length === 0) {
      return null;
    }

    const randomSong =
      playlist.songs[Math.floor(Math.random() * playlist.songs.length)];

    return randomSong?.cover || null;
  };

  return (
    <div>
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Your Playlists</h2>

        <button
          onClick={onCreate}
          className="bg-green-500 hover:bg-green-600 text-black px-4 py-2 rounded font-medium"
        >
          + Create Playlist
        </button>
      </div>

      {/* EMPTY STATE */}
      {(!playlists || playlists.length === 0) && (
        <p className="text-gray-400">No playlists yet</p>
      )}

      {/* GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {playlists.map((playlist) => {
          const cover = getPlaylistCover(playlist);

          return (
            <div
              key={playlist._id}
              className="bg-neutral-900 rounded-lg p-3 hover:bg-neutral-800 transition cursor-pointer group"
              onClick={() => onSelect(playlist)}
            >
              {/* COVER */}
              <div className="relative w-full h-40 rounded-md overflow-hidden mb-3">
                {cover ? (
                  <img
                    src={cover}
                    alt={playlist.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center
                                  bg-gradient-to-br from-neutral-700 to-neutral-900">
                    <FaMusic className="text-gray-400 text-3xl mb-2" />
                    <span className="text-gray-400 text-sm">
                      Empty Playlist
                    </span>
                  </div>
                )}

                {/* DELETE BUTTON */}
                {onDelete && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(playlist._id);
                    }}
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100
                               bg-black/60 p-2 rounded hover:bg-red-600 transition"
                  >
                    <FaTrash className="text-white text-sm" />
                  </button>
                )}
              </div>

              {/* INFO */}
              <p className="font-medium truncate">{playlist.name}</p>
              <p className="text-sm text-gray-400">
                {playlist.songs?.length || 0} songs
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

