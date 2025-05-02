import React, { useState } from "react";
import { usePokemonContext } from "../contexts/PokemonContext";

const typeGradients = {
  fire: "from-orange-200 via-orange-400 to-orange-600",
  water: "from-blue-200 via-blue-400 to-blue-600",
  grass: "from-green-200 via-green-400 to-green-600",
  electric: "from-yellow-200 via-yellow-400 to-yellow-600",
  bug: "from-lime-200 via-lime-400 to-lime-600",
  flying: "from-sky-200 via-sky-400 to-sky-600",
  psychic: "from-pink-200 via-pink-400 to-pink-600",
  poison: "from-purple-200 via-purple-400 to-purple-600",
  ghost: "from-indigo-200 via-indigo-400 to-indigo-600",
  rock: "from-yellow-300 via-yellow-500 to-yellow-700",
  ground: "from-yellow-200 via-yellow-400 to-yellow-600",
  ice: "from-cyan-100 via-cyan-300 to-cyan-500",
  dragon: "from-indigo-300 via-indigo-500 to-indigo-700",
  dark: "from-gray-400 via-gray-600 to-gray-800",
  steel: "from-gray-200 via-gray-400 to-gray-600",
  fairy: "from-pink-100 via-pink-300 to-pink-500",
  normal: "from-gray-100 via-gray-300 to-gray-500",
  default: "from-gray-100 via-gray-200 to-gray-400"
};

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
};

const ComparisonTool = () => {
  const { allPokemon } = usePokemonContext();
  const [firstId, setFirstId] = useState("");
  const [secondId, setSecondId] = useState("");

  const first = allPokemon.find(p => p.id === Number(firstId));
  const second = allPokemon.find(p => p.id === Number(secondId));

  return (
    <div>
      <h2 className="text-2xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-blue-500 text-center tracking-wide">
        Select and Compare Pokémon
      </h2>

      <div className="flex flex-col md:flex-row gap-4 mb-8 justify-center">
      <select
            value={firstId}
            onChange={e => setFirstId(e.target.value)}
            className="w-full md:w-80 p-3 mb-2 md:mb-0 rounded-xl border border-gray-300 bg-white text-gray-900 shadow focus:ring-2 focus:ring-pink-400 focus:border-pink-400 appearance-none transition"
            >
            <option value="">Select First Pokémon</option>
            {allPokemon.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
            ))}
      </select>

      <select
        value={firstId}
        onChange={e => setSecondId(e.target.value)}
        className="w-full md:w-80 p-3 mb-2 md:mb-0 rounded-xl border border-gray-300 bg-white text-gray-900 shadow focus:ring-2 focus:ring-pink-400 focus:border-pink-400 appearance-none transition"
        >
        <option value="">Select Second Pokémon</option>
        {allPokemon.map(p => (
            <option key={p.id} value={p.id}>{p.name}</option>
        ))}
      </select>

      </div>
      <div className="flex flex-col md:flex-row gap-8 justify-center items-start">
        {[first, second].map((pokemon, idx) =>
          pokemon ? (
            <div
              key={pokemon.id}
              className={`
                flex-1 min-w-[260px] max-w-xs p-6 rounded-2xl shadow-xl
                bg-gradient-to-br ${typeGradients[pokemon.types[0]] || typeGradients.default}
                backdrop-blur-md
                flex flex-col items-center
                transition-transform hover:-translate-y-1
              `}
            >
              <div className="bg-white rounded-full shadow-lg p-2 mb-2">
                <img
                  src={pokemon.sprite}
                  alt={pokemon.name}
                  className="w-20 h-20 object-contain"
                  loading="lazy"
                />
              </div>
              <h3 className="capitalize text-xl font-extrabold text-gray-900 mb-1 tracking-wide drop-shadow">{pokemon.name}</h3>
              <div className="flex gap-2 mb-3">
                {pokemon.types.map(type => (
                  <span
                    key={type}
                    className={`text-xs font-bold px-3 py-1 rounded-full shadow ${typeColors[type] || "bg-gray-300 text-gray-900"}`}
                  >
                    {type}
                  </span>
                ))}
              </div>
              <a
                href={`/pokemon/${pokemon.id}`}
                className="text-blue-600 hover:underline text-sm font-semibold mb-4"
              >
                Details
              </a>
              <ul className="w-full bg-white/60 dark:bg-zinc-800/60 rounded-xl p-4 shadow-inner text-sm space-y-1">
                {pokemon.stats.map(s => (
                  <li key={s.name} className="flex justify-between">
                    <span className="capitalize font-semibold text-gray-700 dark:text-gray-200">{s.name.replace("-", " ")}</span>
                    <span className="font-mono font-bold text-gray-900 dark:text-white">{s.value}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div
              key={idx}
              className="flex-1 min-w-[260px] max-w-xs p-6 rounded-2xl shadow bg-gray-100 dark:bg-zinc-800 flex flex-col items-center justify-center text-gray-400"
            >
              <span className="text-6xl mb-2">?</span>
              <span className="text-lg font-semibold">Select a Pokémon</span>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default ComparisonTool;
