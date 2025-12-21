import { useEffect, useRef, useState } from "react";
import {
  FaPlay,
  FaPause,
  FaStepBackward,
  FaStepForward,
  FaPlus,
  FaTimes,
} from "react-icons/fa";

export default function PlayerBar({
  queue,
  currentIndex,
  setCurrentIndex,
  playlists,
  onAddToPlaylist,
}) {
  const audioRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [warning, setWarning] = useState("");

  const song = queue?.[currentIndex];

  useEffect(() => {
    if (!song || !song.previewUrl || !audioRef.current) return;

    const audio = audioRef.current;
    audio.pause();
    audio.src = song.previewUrl;
    audio.load();

    audio
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => setIsPlaying(false));
  }, [song]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true));
    }
  };

  const prev = () => currentIndex > 0 && setCurrentIndex(currentIndex - 1);
  const next = () =>
    currentIndex < queue.length - 1 &&
    setCurrentIndex(currentIndex + 1);

  const onTimeUpdate = () => {
    if (!audioRef.current) return;
    setProgress(audioRef.current.currentTime || 0);
    setDuration(audioRef.current.duration || 0);
  };

  const seek = (e) => {
    audioRef.current.currentTime = Number(e.target.value);
  };

  const handleAdd = (playlist) => {
    const exists = playlist.songs.some((s) => s.id === song.id);
    if (exists) {
      setWarning("Song already exists in this playlist");
      return;
    }

    onAddToPlaylist(playlist._id, song);
    setShowModal(false);
    setWarning("");
  };

  if (!song) {
    return (
      <div className="fixed bottom-0 left-0 right-0 h-20 bg-neutral-900 flex items-center px-4 text-gray-400">
        Select a song to play
      </div>
    );
  }

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 bg-neutral-900 border-t border-neutral-800 z-50">
        <audio ref={audioRef} onTimeUpdate={onTimeUpdate} />

        {/* MOBILE */}
        <div className="md:hidden flex flex-col items-center p-3 gap-2">
          <img src={song.cover} className="w-14 h-14 rounded" />
          <div className="text-center">
            <p className="text-sm font-medium">{song.title}</p>
            <p className="text-xs text-gray-400">{song.artist}</p>
          </div>

          <input
            type="range"
            min="0"
            max={duration || 0}
            value={progress}
            onChange={seek}
            className="w-full"
          />

          <div className="flex gap-6 items-center">
            <FaStepBackward onClick={prev} />
            {isPlaying ? (
              <FaPause onClick={togglePlay} />
            ) : (
              <FaPlay onClick={togglePlay} />
            )}
            <FaStepForward onClick={next} />
          </div>
        </div>

        {/* DESKTOP */}
        <div className="hidden md:flex h-20 px-4 items-center gap-4">
          <div className="flex items-center gap-3 w-1/4">
            <img src={song.cover} className="w-12 h-12 rounded" />
            <div>
              <p className="text-sm font-medium">{song.title}</p>
              <p className="text-xs text-gray-400">{song.artist}</p>
            </div>
          </div>

          <div className="flex flex-col items-center flex-1">
            <div className="flex gap-6 mb-1">
              <FaStepBackward onClick={prev} />
              {isPlaying ? (
                <FaPause onClick={togglePlay} />
              ) : (
                <FaPlay onClick={togglePlay} />
              )}
              <FaStepForward onClick={next} />
            </div>
            <input
              type="range"
              min="0"
              max={duration || 0}
              value={progress}
              onChange={seek}
              className="w-full"
            />
          </div>

          {/* 🔥 UPDATED ADD BUTTON (ONLY CHANGE) */}
          <div className="w-1/4 flex justify-end">
            <button
              onClick={() => setShowModal(true)}
              className="cool-add-btn"
            >
              <span className="cool-add-icon">
                <FaPlus size={12} />
              </span>
              <span>Add</span>
            </button>
          </div>
        </div>
      </div>

      {/* ADD TO PLAYLIST MODAL (UNCHANGED) */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-neutral-900 rounded-lg w-80 p-4">
            <div className="flex justify-between mb-3">
              <h3>Add to playlist</h3>
              <FaTimes onClick={() => setShowModal(false)} />
            </div>

            {warning && (
              <p className="text-sm text-red-400 mb-2">{warning}</p>
            )}

            {playlists.map((p) => (
              <div
                key={p._id}
                onClick={() => handleAdd(p)}
                className="cursor-pointer bg-neutral-800 p-2 rounded mb-2"
              >
                {p.name}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
