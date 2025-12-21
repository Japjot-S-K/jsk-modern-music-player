import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import SearchResults from "./components/SearchResults";
import PlaylistGrid from "./components/PlaylistGrid";
import PlayerBar from "./components/PlayerBar";
import CreatePlaylistModal from "./components/CreatePlaylistModal";
import { FcGoogle } from "react-icons/fc";

import { searchSongs } from "./services/musicApi";
import {
  getPlaylists,
  createPlaylist,
  addSongToPlaylist,
  deletePlaylist,
  deleteSongFromPlaylist,
} from "./services/api";

import { useAuth } from "./context/AuthContext";

export default function App() {
  const { user, login } = useAuth();

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const [playlists, setPlaylists] = useState([]);
  const [activePlaylist, setActivePlaylist] = useState(null);

  const [queue, setQueue] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(null);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const currentSong = queue?.[currentIndex] || null;

  /* LOAD PLAYLISTS */
  useEffect(() => {
    if (user) {
      getPlaylists(user.uid).then(setPlaylists);
    }
  }, [user]);

  /* SEARCH */
  useEffect(() => {
    if (query.trim()) {
      searchSongs(query).then(setResults);
    } else {
      setResults([]);
    }
  }, [query]);

  /* CREATE PLAYLIST (MODAL) */
  const handleCreatePlaylist = async (name) => {
    const playlist = await createPlaylist(user.uid, name);
    setPlaylists((prev) => [...prev, playlist]);
  };

  /* DELETE PLAYLIST */
  const handleDeletePlaylist = async (playlistId) => {
    await deletePlaylist(playlistId);

    setPlaylists((prev) =>
      prev.filter((p) => p._id !== playlistId)
    );

    if (activePlaylist?._id === playlistId) {
      setActivePlaylist(null);
      setQueue([]);
      setCurrentIndex(null);
    }
  };

  /* ADD SONG */
  const handleAddSongToPlaylist = async (playlistId, song) => {
    const updated = await addSongToPlaylist(playlistId, song);

    setPlaylists((prev) =>
      prev.map((p) => (p._id === updated._id ? updated : p))
    );

    if (activePlaylist?._id === updated._id) {
      setActivePlaylist(updated);
    }
  };

  /* REMOVE SONG */
  const handleDeleteSong = async (playlistId, songId) => {
    const updated = await deleteSongFromPlaylist(
      playlistId,
      songId
    );

    setPlaylists((prev) =>
      prev.map((p) => (p._id === updated._id ? updated : p))
    );

    if (activePlaylist?._id === updated._id) {
      setActivePlaylist(updated);
      setQueue(updated.songs);
      setCurrentIndex(0);
    }
  };

  /* HOME RESET */
  const goHome = () => {
    setQuery("");
    setResults([]);
    setActivePlaylist(null);
    setSidebarOpen(false);
  };

  return (
    <div className="h-screen flex flex-col bg-black text-white">
      <Navbar
        onToggleSidebar={() => setSidebarOpen(true)}
        onHome={goHome}
        currentSong={currentSong}
        playlists={playlists}
        onAddToPlaylist={handleAddSongToPlaylist}
      />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          query={query}
          setQuery={setQuery}
          setQueue={setQueue}
          setCurrentIndex={setCurrentIndex}
          setActivePlaylist={setActivePlaylist}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <main className="flex-1 p-6 overflow-y-auto pb-28">

          {/* LOGGED OUT */}
          {!user && (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <h1 className="text-3xl font-bold mb-6">
                Login now to Experience the thrill!
              </h1>
              <button
                onClick={login}
                className="flex items-center gap-3 bg-white text-black px-6 py-3 rounded-full font-medium hover:bg-gray-100 transition"
              >
                <FcGoogle size={22} />
                Login with Google
              </button>
            </div>
          )}

          {/* SEARCH BAR */}
          {user && (
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search"
              className="w-full mb-4 bg-neutral-900 border border-neutral-700 px-4 py-2 rounded"
            />
          )}

          {/* SEARCH RESULTS */}
          {user && query && (
            <SearchResults
              songs={results}
              playlists={playlists}
              onPlay={(song) => {
                setQueue(results);
                setCurrentIndex(
                  results.findIndex((s) => s.id === song.id)
                );
              }}
              onAdd={handleAddSongToPlaylist}
            />
          )}

          {/* EMPTY STATE */}
          {user &&
            !query &&
            playlists.length === 0 &&
            !activePlaylist && (
              <div className="h-full flex flex-col items-center justify-center gap-6">
                <h2 className="text-2xl font-semibold">
                  Start browsing your favorite songs now!
                </h2>
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="bg-green-500 text-black px-6 py-2 rounded font-semibold"
                >
                  + Create Playlist
                </button>
              </div>
            )}

          {/* PLAYLIST VIEW */}
          {user && !query && activePlaylist && (
            <div>
              <h2 className="text-xl font-bold mb-4">
                {activePlaylist.name}
              </h2>

              {activePlaylist.songs.map((song, i) => (
                <div
                  key={song.id}
                  className="flex items-center justify-between bg-neutral-800 p-3 rounded mb-2"
                >
                  <div
                    onClick={() => {
                      setQueue(activePlaylist.songs);
                      setCurrentIndex(i);
                    }}
                    className="cursor-pointer"
                  >
                    {song.title}
                  </div>

                  <button
                    onClick={() =>
                      handleDeleteSong(activePlaylist._id, song.id)
                    }
                    className="text-red-400 text-sm"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* PLAYLIST GRID */}
          {user &&
            !query &&
            playlists.length > 0 &&
            !activePlaylist && (
              <PlaylistGrid
                playlists={playlists}
                onCreate={() => setShowCreateModal(true)}
                onSelect={setActivePlaylist}
                onDelete={handleDeletePlaylist}
              />
            )}
        </main>
      </div>

      {user && (
        <PlayerBar
          queue={queue}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          playlists={playlists}
          onAddToPlaylist={handleAddSongToPlaylist}
        />
      )}

      {/* 🎵 CREATE PLAYLIST MODAL */}
      <CreatePlaylistModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreate={handleCreatePlaylist}
      />
    </div>
  );
}
