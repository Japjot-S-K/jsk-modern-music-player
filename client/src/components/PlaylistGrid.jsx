import { FaTrash } from "react-icons/fa";

export default function PlaylistGrid({
  playlists,
  onCreate,
  onSelect,
  onDelete,
}) {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Your Playlists</h2>
        <button
          onClick={onCreate}
          className="bg-green-500 text-black px-4 py-1 rounded hover:bg-green-400"
        >
          + Create Playlist
        </button>
      </div>

      {playlists.length === 0 ? (
        <p className="text-gray-400">No playlists yet</p>
      ) : (
        <div className="grid grid-cols-4 gap-6">
          {playlists.map((playlist) => {
            const cover =
              playlist.songs.length > 0
                ? playlist.songs[
                    Math.floor(
                      Math.random() * playlist.songs.length
                    )
                  ].cover
                : "https://via.placeholder.com/300?text=Playlist";

            return (
              <div
                key={playlist._id}
                onClick={() => onSelect(playlist)}
                className="relative bg-neutral-900 rounded-lg p-3 hover:bg-neutral-800 cursor-pointer"
              >
                <img
                  src={cover}
                  alt={playlist.name}
                  className="rounded mb-3 aspect-square object-cover"
                />

                <p className="font-medium">{playlist.name}</p>
                <p className="text-xs text-gray-400">
                  {playlist.songs.length} songs
                </p>

                <FaTrash
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(playlist._id);
                  }}
                  className="absolute top-3 right-3 text-gray-400 hover:text-red-500"
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
