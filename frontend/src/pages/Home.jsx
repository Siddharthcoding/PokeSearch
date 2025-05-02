import React from "react";
import { usePokemonContext } from "../contexts/PokemonContext";
import PokemonCard from "../components/PokemonCard";
import PokemonCardSkeleton from "../components/PokemonCardSkeleton";
import Pagination from "../components/Pagination";
import SortingAndFilterControls from "../components/SortingAndFilterControls";

const Home = () => {
  const {
    pokemonList,
    allPokemon,
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
  } = usePokemonContext();

  const filteredCount = allPokemon.filter(pokemon => {
    const matchesSearch = pokemon.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTypes =
      selectedTypes.length === 0 ||
      selectedTypes.some(type => pokemon.types.includes(type));
    return matchesSearch && matchesTypes;
  }).length;

  // Generate skeleton cards array
  const skeletonCards = Array(8).fill(0); // Show 8 skeleton cards while loading

  return (
    <main className="container mx-auto px-4 py-8 min-h-[80vh]">
      <section className="mb-6">
        <SortingAndFilterControls
          types={types}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedTypes={selectedTypes}
          toggleType={toggleType}
          sorting={sorting}
          changeSorting={changeSorting}
        />
      </section>
      
      {loading && (
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {skeletonCards.map((_, index) => (
            <PokemonCardSkeleton key={index} />
          ))}
        </div>
      )}
      
      {error && (
        <div className="text-center text-red-600 font-semibold">{error}</div>
      )}
      
      {!loading && !error && pokemonList.length === 0 && (
        <div className="text-center text-gray-600">No Pokémon found matching your criteria.</div>
      )}
      
      {!loading && !error && pokemonList.length > 0 && (
        <>
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {pokemonList.map(pokemon => (
              <PokemonCard key={pokemon.id} pokemon={pokemon} />
            ))}
          </div>

          <Pagination
            currentPage={pagination.page}
            totalItems={filteredCount}
            itemsPerPage={pagination.perPage}
            onPageChange={changePage}
            onPerPageChange={changePerPage}
          />
        </>
      )}
    </main>
  );
};

export default Home;
