import { useEffect, useState } from "react";
import { FaHome, FaTimes } from "react-icons/fa";
import { searchSongs } from "../services/musicApi";

const CATEGORIES = [
  { label: "Top Hits", term: "top hits" },
  { label: "Top Indie", term: "indie" },
  { label: "Top Pop", term: "pop" },
  { label: "Top EDM", term: "edm" },
  { label: "Top Chill", term: "chill" },
];

export default function Sidebar({
  query,
  setQuery,
  setQueue,
  setCurrentIndex,
  setActivePlaylist,
  isOpen,
  onClose,
}) {
  const [rows, setRows] = useState({});

  useEffect(() => {
    async function loadRows() {
      const data = {};
      for (const cat of CATEGORIES) {
        const res = await searchSongs(cat.term);
        data[cat.label] = res.slice(0, 15);
      }
      setRows(data);
    }
    loadRows();
  }, []);

  const playSong = (songs, index) => {
    setQueue(songs);
    setCurrentIndex(index);
    if (onClose) onClose();
  };

  return (
    <>
      {/* MOBILE OVERLAY */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed md:static z-50 md:z-auto
          top-0 left-0 w-64
          h-screen
          bg-black text-white
          transform transition-transform
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
          flex flex-col
          border-r border-neutral-800
        `}
      >
        {/* FIXED TOP SECTION */}
        <div className="p-4 shrink-0">
          <div className="flex items-center justify-between mb-4 md:hidden">
            <span className="font-semibold text-lg">Menu</span>
            <button onClick={onClose} className="p-1">
              <FaTimes size={20} />
            </button>
          </div>

          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search"
            className="w-full bg-neutral-900 text-white p-2 rounded mb-4 focus:outline-none focus:ring-1 focus:ring-green-500"
          />

          <button
            onClick={() => {
              setQuery("");
              setActivePlaylist(null);
              if (onClose) onClose();
            }}
            className="flex items-center gap-2 hover:text-green-400 transition-colors font-medium"
          >
            <FaHome /> Home
          </button>
        </div>

        {/* SCROLLABLE CONTENT WITH HIDDEN SCROLLBAR */}
        <div
          className="
            flex-1
            overflow-y-auto 
            px-4 pb-24 
            space-y-6
            scrollbar-hide /* Custom CSS Class */
          "
        >
          {CATEGORIES.map((cat) => {
            const songs = rows[cat.label] || [];
            if (!songs.length) return null;

            return (
              <div key={cat.label}>
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                  {cat.label}
                </h4>

                <div className="relative overflow-hidden group">
                  <div className="flex gap-3 animate-scroll hover:pause-animation">
                    {songs.concat(songs).map((song, i) => (
                      <img
                        key={`${song.id}-${i}`}
                        src={song.cover}
                        alt={song.title}
                        onClick={() =>
                          playSong(songs, i % songs.length)
                        }
                        className="w-20 h-20 rounded shadow-md cursor-pointer hover:scale-105 transition transform duration-200"
                      />
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </aside>
    </>
  );
}