export default function PlaylistSelectModal({
  playlists,
  onSelect,
  onClose
}) {
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-neutral-900 rounded-lg p-6 w-80">
        <h2 className="text-lg font-bold mb-4">Add to playlist</h2>

        <div className="space-y-2">
          {playlists.map((p) => (
            <button
              key={p._id}
              onClick={() => onSelect(p)}
              className="w-full text-left px-3 py-2 bg-neutral-800 hover:bg-neutral-700 rounded"
            >
              {p.name}
            </button>
          ))}
        </div>

        <button
          onClick={onClose}
          className="mt-4 w-full bg-red-500 text-black py-2 rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
