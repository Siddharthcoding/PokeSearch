import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { to: "/home", label: "Home" },
  { to: "/favorites", label: "Favorites" },
  { to: "/compare", label: "Compare" },
  { to: "/random", label: "Random" }
];

const Header = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-400 shadow-lg">
      <nav className="max-w-6xl mx-auto flex items-center justify-between py-3 px-4">
        <Link
          to="/"
          className="flex items-center gap-2 text-2xl font-extrabold tracking-tight text-white drop-shadow"
        >
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="16" fill="#fff"/><circle cx="16" cy="16" r="10" fill="#ef4444"/><circle cx="16" cy="16" r="5" fill="#fff" stroke="#ef4444" strokeWidth="2"/></svg>
          <span>PokeSearch</span>
        </Link>
        <ul className="hidden md:flex gap-2">
          {navLinks.map(link => (
            <li key={link.to}>
              <Link
                to={link.to}
                className={`
                  px-4 py-2 rounded-full font-semibold transition
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-white
                  ${
                    location.pathname === link.to
                      ? "bg-white text-pink-600 shadow"
                      : "bg-white/20 text-white hover:bg-white/40 hover:text-pink-900"
                  }
                `}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <button
          className="md:hidden p-2 rounded-full bg-white/20 text-white hover:bg-white/40 transition"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle navigation"
        >
          <svg width="24" height="24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 8h16M4 16h16"} />
          </svg>
        </button>
      </nav>
      {menuOpen && (
        <div className="md:hidden bg-gradient-to-r from-pink-500 via-red-500 to-yellow-400 shadow-lg">
          <ul className="flex flex-col gap-2 px-6 pb-4">
            {navLinks.map(link => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  onClick={() => setMenuOpen(false)}
                  className={`
                    block px-4 py-2 rounded-full font-semibold transition
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-white
                    ${
                      location.pathname === link.to
                        ? "bg-white text-pink-600 shadow"
                        : "bg-white/20 text-white hover:bg-white/40 hover:text-pink-900"
                    }
                  `}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
