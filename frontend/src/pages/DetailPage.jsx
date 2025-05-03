import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const typeGradients = {
  fire: "from-orange-200 via-orange-400 to-orange-500",
  water: "from-blue-200 via-blue-400 to-blue-500",
  grass: "from-green-200 via-green-400 to-green-500",
  electric: "from-yellow-200 via-yellow-400 to-yellow-500",
  bug: "from-lime-200 via-lime-400 to-lime-500",
  flying: "from-sky-200 via-sky-400 to-sky-500",
  psychic: "from-pink-200 via-pink-400 to-pink-500",
  poison: "from-purple-200 via-purple-400 to-purple-500",
  ghost: "from-indigo-200 via-indigo-400 to-indigo-500",
  rock: "from-yellow-300 via-yellow-500 to-yellow-700",
  ground: "from-yellow-200 via-yellow-400 to-yellow-500",
  ice: "from-cyan-100 via-cyan-300 to-cyan-500",
  dragon: "from-indigo-300 via-indigo-500 to-indigo-700",
  dark: "from-gray-400 via-gray-600 to-gray-800",
  steel: "from-gray-200 via-gray-400 to-gray-500",
  fairy: "from-pink-100 via-pink-300 to-pink-400",
  normal: "from-gray-100 via-gray-300 to-gray-400",
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

const DetailPage = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [evolutionChain, setEvolutionChain] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const speciesResponse = await axios.get(response.data.species.url);
        const evolutionResponse = await axios.get(speciesResponse.data.evolution_chain.url);

        const chain = [];
        let current = evolutionResponse.data.chain;
        while (current) {
          chain.push({
            name: current.species.name,
            url: current.species.url
          });
          current = current.evolves_to && current.evolves_to[0];
        }

        setPokemon({
          id: response.data.id,
          name: response.data.name,
          sprite: response.data.sprites.front_default,
          types: response.data.types.map(t => t.type.name),
          stats: response.data.stats.map(s => ({ name: s.stat.name, value: s.base_stat })),
          abilities: response.data.abilities.map(a => a.ability.name),
          moves: response.data.moves.map(m => m.move.name),
        });
        setEvolutionChain(chain);
      } catch (err) {
        setError("Failed to load Pokémon details.");
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonDetails();
  }, [id]);

  if (loading) return <div className="flex justify-center items-center min-h-[40vh]">Loading...</div>;
  if (error) return <div className="text-center text-red-600">{error}</div>;
  if (!pokemon) return <div className="text-center">Pokémon not found.</div>;

  const mainType = pokemon.types[0];
  const gradient = typeGradients[mainType] || typeGradients.default;

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 via-yellow-50 to-blue-50 flex items-center justify-center py-10 px-2">
      <div className={`w-full max-w-md rounded-3xl shadow-2xl p-8 bg-gradient-to-br ${gradient} flex flex-col items-center`}>
        <Link
          to="/home"
          className="inline-block mb-4 px-6 py-2 rounded-full bg-gradient-to-r from-blue-400 to-pink-400 text-white font-semibold shadow hover:scale-105 transition"
        >
          ← Back to Home
        </Link>
        <div className="bg-white rounded-full shadow-lg p-4 mb-4">
          <img src={pokemon.sprite} alt={pokemon.name} className="w-28 h-28 object-contain" />
        </div>
        <h2 className="capitalize text-3xl font-extrabold text-gray-900 mb-2 tracking-wide drop-shadow">{pokemon.name}</h2>
        <div className="flex gap-2 mb-4">
          {pokemon.types.map(type => (
            <span
              key={type}
              className={`text-xs font-bold px-3 py-1 rounded-full shadow ${typeColors[type] || "bg-gray-300 text-gray-900"}`}
            >
              {type}
            </span>
          ))}
        </div>
        <div className="w-full mt-2 flex flex-col gap-6">
          <div className="bg-black/20 rounded-xl p-4 shadow-inner">
            <h3 className="font-bold text-lg mb-2 text-white drop-shadow">Stats</h3>
            <ul className="space-y-1 text-white font-semibold">
              {pokemon.stats.map(stat => (
                <li key={stat.name} className="flex justify-between">
                  <span className="capitalize">{stat.name.replace("-", " ")}</span>
                  <span className="font-mono">{stat.value}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-2 text-white drop-shadow">Abilities</h3>
            <div className="flex flex-wrap gap-2">
              {pokemon.abilities.map(a => (
                <span key={a} className="bg-white/60 text-gray-900 rounded-full px-3 py-1 text-xs font-semibold shadow">{a}</span>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-2 text-white drop-shadow">Moves</h3>
            <div className="flex flex-wrap gap-2 max-h-24 overflow-y-auto">
              {pokemon.moves.slice(0, 20).map(m => (
                <span key={m} className="bg-white/60 text-gray-900 rounded-full px-3 py-1 text-xs capitalize font-semibold shadow">{m}</span>
              ))}
            </div>
            {pokemon.moves.length > 20 && (
              <div className="text-xs text-white/80 mt-1">...and {pokemon.moves.length - 20} more</div>
            )}
          </div>
          <div>
            <h3 className="font-bold text-lg mb-2 text-white drop-shadow">Evolution Chain</h3>
            <div className="flex gap-4 items-center">
              {evolutionChain.map((evo, idx) => (
                <React.Fragment key={evo.name}>
                  <span className="capitalize bg-white/60 text-gray-900 px-4 py-2 rounded-full font-semibold shadow">{evo.name}</span>
                  {idx < evolutionChain.length - 1 && (
                    <svg width="24" height="24" fill="none" stroke="currentColor" className="mx-1 text-white/60"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-4-4l4 4-4 4"/></svg>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DetailPage;
