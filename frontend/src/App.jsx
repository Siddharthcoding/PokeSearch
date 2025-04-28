import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const typeColors = {
  normal: 'bg-gray-400',
  fire: 'bg-red-500',
  water: 'bg-blue-500',
  grass: 'bg-green-500',
  electric: 'bg-yellow-400',
  ice: 'bg-blue-200',
  fighting: 'bg-red-700',
  poison: 'bg-purple-500',
  ground: 'bg-yellow-600',
  flying: 'bg-blue-300',
  psychic: 'bg-pink-500',
  bug: 'bg-green-400',
  rock: 'bg-yellow-700',
  ghost: 'bg-purple-700',
  dark: 'bg-gray-800',
  dragon: 'bg-indigo-600',
  steel: 'bg-gray-300',
  fairy: 'bg-pink-300'
};

const PokemonCard = ({ pokemon }) => (
  <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
    <div className="p-4 bg-gray-50">
      <img
        src={pokemon.sprite}
        alt={pokemon.name}
        className="w-32 h-32 mx-auto"
        onError={e => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/128' }}
      />
    </div>
    <div className="p-4">
      <h3 className="text-xl font-semibold text-gray-800 capitalize">{pokemon.name}</h3>
      <p className="text-sm text-gray-500 mb-2">#{pokemon.id.toString().padStart(3, '0')}</p>
      <div className="flex flex-wrap gap-2">
        {pokemon.types.map(type => (
          <span
            key={type}
            className={`${typeColors[type] || 'bg-gray-200'} text-white px-3 py-1 rounded-full text-sm capitalize`}
          >
            {type}
          </span>
        ))}
      </div>
    </div>
  </div>
);

const App = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [types, setTypes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const listResponse = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=150');
      const detailedPokemon = await Promise.all(
        listResponse.data.results.map(async (pokemon) => {
          const response = await axios.get(pokemon.url);
          return {
            id: response.data.id,
            name: response.data.name,
            sprite: response.data.sprites.front_default,
            types: response.data.types.map(t => t.type.name)
          };
        })
      );

      const typesResponse = await axios.get('https://pokeapi.co/api/v2/type');
      const filteredTypes = typesResponse.data.results
        .map(t => t.name)
        .filter(t => !['unknown', 'shadow'].includes(t));

      setPokemonList(detailedPokemon);
      setTypes(filteredTypes);
    } catch (err) {
      setError(
        err.response
          ? 'Failed to fetch data from the server. Please try again later.'
          : 'Network error. Please check your internet connection and retry.'
      );
    } finally {
      setLoading(false);
    }
  }, []);


  useEffect(() => {
    fetchData();
  }, [fetchData, retryCount]);


  const filteredPokemon = pokemonList.filter(pokemon => {
    const matchesSearch = pokemon.name.includes(searchTerm.toLowerCase());
    const matchesType = selectedType ? pokemon.types.includes(selectedType) : true;
    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-blue-600 mb-2">PokeSearch</h1>
        <p className="text-gray-600">Browse through 150 Pokémon</p>
      </header>

      <div className="max-w-4xl mx-auto mb-8 flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Search Pokémon..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={loading}
        />
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={loading}
        >
          <option value="">All Types</option>
          {types.map(type => (
            <option key={type} value={type} className="capitalize">{type}</option>
          ))}
        </select>
      </div>


      {loading && (
        <div className="min-h-[40vh] flex flex-col items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
          <span className="text-blue-600 font-medium">Loading Pokémon...</span>
        </div>
      )}

      {!loading && error && (
        <div className="min-h-[40vh] flex flex-col items-center justify-center text-red-500 text-xl">
          <span>{error}</span>
          <button
            onClick={() => setRetryCount(count => count + 1)}
            className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
          >
            Retry
          </button>
        </div>
      )}

      {!loading && !error && filteredPokemon.length === 0 && (
        <div className="text-center py-12">
          <div className="inline-block p-6 bg-white rounded-lg shadow-lg">
            <p className="text-gray-600 text-lg">No Pokémon found matching your criteria.</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedType('');
              }}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded transition hover:bg-blue-600"
            >
              Reset Filters
            </button>
          </div>
        </div>
      )}


      {!loading && !error && filteredPokemon.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {filteredPokemon.map(pokemon => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
