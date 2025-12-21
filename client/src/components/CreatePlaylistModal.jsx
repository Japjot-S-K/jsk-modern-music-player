export default function CreatePlaylistModal({
  isOpen,
  onClose,
  onCreate,
}) {
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.playlist.value.trim();
    if (!name) return;

    onCreate(name);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* OVERLAY */}
      <div
        className="absolute inset-0 bg-black/70"
        onClick={onClose}
      />

      {/* MODAL */}
      <div className="relative bg-neutral-900 text-white rounded-lg p-6 w-full max-w-sm shadow-xl">
        <h2 className="text-xl font-semibold mb-4">
          Create New Playlist
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="playlist"
            placeholder="Playlist name"
            autoFocus
            className="w-full bg-neutral-800 border border-neutral-700 px-4 py-2 rounded"
          />

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm text-gray-400 hover:text-white"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-green-500 text-black px-4 py-2 rounded font-medium hover:bg-green-600"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
