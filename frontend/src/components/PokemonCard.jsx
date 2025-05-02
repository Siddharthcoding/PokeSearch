import React from "react";
import { Link } from "react-router-dom";
import { usePokemonContext } from "../contexts/PokemonContext";

const typeColors = {
  normal: "bg-gray-400 text-gray-900",
  fire: "bg-orange-500 text-white",
  water: "bg-blue-500 text-white",
  grass: "bg-green-500 text-white",
  electric: "bg-yellow-400 text-yellow-900",
  ice: "bg-cyan-200 text-cyan-900",
  fighting: "bg-red-700 text-white",
  poison: "bg-purple-500 text-white",
  ground: "bg-yellow-700 text-white",
  flying: "bg-sky-300 text-sky-900",
  psychic: "bg-pink-500 text-white",
  bug: "bg-lime-500 text-lime-900",
  rock: "bg-yellow-800 text-white",
  ghost: "bg-indigo-700 text-white",
  dark: "bg-gray-800 text-white",
  dragon: "bg-indigo-600 text-white",
  steel: "bg-gray-300 text-gray-900",
  fairy: "bg-pink-300 text-pink-900",
  stellar: "bg-gradient-to-r from-indigo-400 via-pink-400 to-yellow-300 text-white"
};

const gradientByType = {
  normal: "from-gray-100 via-gray-200 to-gray-400",
  fire: "from-orange-100 via-orange-300 to-orange-500",
  water: "from-blue-100 via-blue-300 to-blue-500",
  grass: "from-green-100 via-green-300 to-green-500",
  electric: "from-yellow-100 via-yellow-300 to-yellow-400",
  ice: "from-cyan-100 via-cyan-200 to-cyan-400",
  fighting: "from-red-100 via-red-300 to-red-700",
  poison: "from-purple-100 via-purple-300 to-purple-500",
  ground: "from-yellow-100 via-yellow-300 to-yellow-700",
  flying: "from-sky-100 via-sky-200 to-sky-400",
  psychic: "from-pink-100 via-pink-300 to-pink-500",
  bug: "from-lime-100 via-lime-300 to-lime-500",
  rock: "from-yellow-200 via-yellow-400 to-yellow-800",
  ghost: "from-indigo-100 via-indigo-300 to-indigo-700",
  dark: "from-gray-300 via-gray-500 to-gray-800",
  dragon: "from-indigo-200 via-indigo-400 to-indigo-700",
  steel: "from-gray-100 via-gray-200 to-gray-400",
  fairy: "from-pink-100 via-pink-200 to-pink-400",
  stellar: "from-indigo-200 via-pink-300 to-yellow-200",
  default: "from-gray-100 via-gray-200 to-gray-400"
};


const PokemonCard = ({ pokemon }) => {
  const { isFavorite, addToFavorites, removeFromFavorites } = usePokemonContext();
  const fav = isFavorite(pokemon.id);
  const mainType = pokemon.types[0];
  const gradient = gradientByType[mainType] || gradientByType.default;

  const toggleFavorite = () => {
    fav ? removeFromFavorites(pokemon.id) : addToFavorites(pokemon);
  };

  return (
    <div className={`rounded-2xl shadow-xl p-6 flex flex-col items-center bg-gradient-to-br ${gradient} transition-transform hover:-translate-y-1`}>
      <div className="bg-white rounded-full shadow-lg p-2 mb-2">
        <img
          src={pokemon.sprite}
          alt={pokemon.name}
          className="w-20 h-20 object-contain"
          loading="lazy"
        />
      </div>
      <h2 className="capitalize text-lg font-extrabold text-gray-900 mb-1 tracking-wide drop-shadow">{pokemon.name}</h2>
      <div className="flex flex-wrap justify-center gap-2 mb-4">
        {pokemon.types.map(type => (
          <span
            key={type}
            className={`text-xs font-bold px-3 py-1 rounded-full shadow ${typeColors[type] || "bg-gray-300 text-gray-900"}`}
          >
            {type}
          </span>
        ))}
      </div>
      <div className="flex justify-between items-center w-full">
        <Link
          to={`/pokemon/${pokemon.id}`}
          className="text-blue-600 hover:underline text-sm font-semibold"
        >
          Details
        </Link>
        <button
          onClick={toggleFavorite}
          className={`text-2xl transition-transform hover:scale-125 ${fav ? "text-yellow-400" : "text-gray-300"}`}
          title={fav ? "Remove from favorites" : "Add to favorites"}
        >
          {fav ? "★" : "☆"}
        </button>
      </div>
    </div>
  );
};

export default PokemonCard;
