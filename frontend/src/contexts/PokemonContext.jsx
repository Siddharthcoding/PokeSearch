import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import axios from 'axios';

export const PokemonContext = createContext();

export const usePokemonContext = () => useContext(PokemonContext);

// Utility function to fetch data in batches
async function batchFetch(urls, batchSize = 20) {
  const results = [];
  for (let i = 0; i < urls.length; i += batchSize) {
    const batch = urls.slice(i, i + batchSize);
    const batchResults = await Promise.all(batch.map(url => axios.get(url).then(res => res.data)));
    results.push(...batchResults);
  }
  return results;
}

export const PokemonProvider = ({ children }) => {
  const [pokemonList, setPokemonList] = useState([]);
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [sorting, setSorting] = useState({ field: 'id', order: 'asc' });
  const [pagination, setPagination] = useState({ page: 1, perPage: 10 });

  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('favorites')) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const listResponse = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=150');
      const urls = listResponse.data.results.map(pokemon => pokemon.url);
      
      // Use batching instead of naive Promise.all
      const detailedData = await batchFetch(urls, 15);
      
      const detailedPokemon = detailedData.map(response => ({
        id: response.id,
        name: response.name,
        sprite: response.sprites.front_default,
        types: response.types.map(t => t.type.name),
        stats: response.stats.map(s => ({ name: s.stat.name, value: s.base_stat })),
        abilities: response.abilities.map(a => a.ability.name),
        moves: response.moves.map(m => m.move.name),
      }));

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

  useEffect(() => { fetchData(); }, [fetchData]);

  const filteredPokemon = useMemo(() => {
    return pokemonList.filter(pokemon => {
      const matchesSearch = pokemon.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTypes =
        selectedTypes.length === 0 ||
        selectedTypes.some(type => pokemon.types.includes(type)); // <-- use some() for OR logic
      return matchesSearch && matchesTypes;
    });
  }, [pokemonList, searchTerm, selectedTypes]);
  
  const sortedPokemon = useMemo(() => {
    const sorted = [...filteredPokemon];
    if (sorting.field === 'name') {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sorting.field === 'id') {
      sorted.sort((a, b) => a.id - b.id);
    }
    if (sorting.order === 'desc') sorted.reverse();
    return sorted;
  }, [filteredPokemon, sorting]);

  const paginatedPokemon = useMemo(() => {
    const start = (pagination.page - 1) * pagination.perPage;
    return sortedPokemon.slice(start, start + pagination.perPage);
  }, [sortedPokemon, pagination]);

  const toggleType = useCallback((type) => {
    setSelectedTypes(prev => prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]);
    setPagination(prev => ({ ...prev, page: 1 }));
  }, []);

  const changeSorting = useCallback((field, order) => setSorting({ field, order }), []);
  const changePage = useCallback((page) => setPagination(prev => ({ ...prev, page })), []);
  const changePerPage = useCallback((perPage) => setPagination({ page: 1, perPage }), []);

  const addToFavorites = useCallback((pokemon) => {
    setFavorites(prev => prev.find(p => p.id === pokemon.id) ? prev : [...prev, pokemon]);
  }, []);
  const removeFromFavorites = useCallback((id) => {
    setFavorites(prev => prev.filter(p => p.id !== id));
  }, []);
  const isFavorite = useCallback((id) => favorites.some(p => p.id === id), [favorites]);

  // Calculate filtered count for pagination
  const filteredCount = useMemo(() => filteredPokemon.length, [filteredPokemon]);

  return (
    <PokemonContext.Provider value={{
      pokemonList: paginatedPokemon,
      allPokemon: pokemonList,
      types,
      loading,
      error,
      searchTerm,
      setSearchTerm,
      selectedTypes,
      toggleType,
      sorting,
      changeSorting,
      pagination,
      changePage,
      changePerPage,
      favorites,
      addToFavorites,
      removeFromFavorites,
      isFavorite,
      filteredCount,
    }}>
      {children}
    </PokemonContext.Provider>
  );
};
