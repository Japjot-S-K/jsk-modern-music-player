import { useAuth } from "../context/AuthContext";
import { FaBars, FaHeadphones } from "react-icons/fa";

export default function Navbar({ onToggleSidebar }) {
  const { user, login, logout } = useAuth();

  const handleContactClick = () => {
    window.location.href =
      "mailto:japjotsingh.kashyap@gmail.com?subject=JSK Music Player Bug Report";
  };

  return (
    <header className="h-14 bg-neutral-900 flex items-center justify-between px-4 md:px-6 border-b border-neutral-800">
      
      {/* LEFT */}
      <div className="flex items-center gap-3">
        {/* ☰ MOBILE ONLY */}
        <button
          onClick={onToggleSidebar}
          className="md:hidden text-white"
        >
          <FaBars size={20} />
        </button>

        <div className="flex flex-col">
          <h1 className="text-lg font-bold tracking-wide">
            <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
              JSK
            </span>{" "}
            Music Player
          </h1>
          <span className="text-xs text-gray-400">
            © Japjot Singh Kashyap
          </span>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">
        {user ? (
          <>
            {/* 🎧 CONTACT ICON */}
            <button
              onClick={handleContactClick}
              title="Got a bug? Contact us"
              className="text-gray-300 hover:text-green-400 transition-colors"
            >
              <FaHeadphones size={18} />
            </button>

            {/* USER INFO */}
            <div className="hidden sm:flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-black font-bold">
                {user.displayName?.[0] || "U"}
              </div>
              <span className="text-sm text-gray-300">
                {user.displayName}
              </span>
            </div>

            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded text-sm font-medium"
            >
              Logout
            </button>
          </>
        ) : (
          <button
            onClick={login}
            className="bg-green-500 hover:bg-green-600 text-black px-4 py-1.5 rounded text-sm font-medium"
          >
            Login
          </button>
        )}
      </div>
    </header>
  );
}
