import React from "react";
import { usePokemonContext } from "../contexts/PokemonContext";
import PokemonCard from "../components/PokemonCard";
import { Link } from "react-router-dom";

const FavoritesPage = () => {
  const { favorites } = usePokemonContext();

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-blue-50 py-10 px-2">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-500 to-blue-500 drop-shadow mb-2">
          Your Favorite Pokémon
        </h1>
        <Link
          to="/"
          className="inline-block px-6 py-2 rounded-full bg-gradient-to-r from-blue-400 to-pink-400 text-white font-semibold shadow hover:scale-105 transition"
        >
          ← Back to Home
        </Link>
      </header>
      {favorites.length === 0 ? (
        <div className="text-center text-gray-600 text-lg font-semibold mt-20">No favorites yet.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-6xl mx-auto bg-white/70 rounded-3xl shadow-xl p-8">
          {favorites.map(pokemon => (
            <div
              key={pokemon.id}
              className="animate-fadeIn"
              style={{ animationDelay: `${0.05 * favorites.indexOf(pokemon)}s` }}
            >
              <PokemonCard pokemon={pokemon} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
