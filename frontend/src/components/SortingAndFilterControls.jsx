import React from "react";

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

const SortingAndFilterControls = ({
  types,
  searchTerm,
  setSearchTerm,
  selectedTypes,
  toggleType,
  sorting,
  changeSorting
}) => (
  <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col md:flex-row md:items-end gap-6 mb-8">
    <div className="flex-1">
      <label className="block text-sm font-semibold text-gray-700 mb-2">Search</label>
      <input
        type="text"
        placeholder="Search Pokémon..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
      />
    </div>
    <div className="flex-1">
      <label className="block text-sm font-semibold text-gray-700 mb-2">Filter by Type</label>
      <div className="flex flex-wrap gap-2">
        {types.map(type => (
          <button
            key={type}
            type="button"
            onClick={() => toggleType(type)}
            className={`
              px-3 py-1 rounded-full font-bold shadow transition
              ${selectedTypes.includes(type)
                ? `${typeColors[type] || "bg-pink-500 text-white"} scale-105 ring-2 ring-pink-400`
                : "bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200"}
            `}
          >
            {type}
          </button>
        ))}
      </div>
    </div>
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">Sort By</label>
      <div className="flex gap-2">
        <select
          value={sorting.field}
          onChange={e => changeSorting(e.target.value, sorting.order)}
          className="rounded-full border px-4 py-2 font-semibold bg-gray-50"
        >
          <option value="id">ID</option>
          <option value="name">Name</option>
        </select>
        <select
          value={sorting.order}
          onChange={e => changeSorting(sorting.field, e.target.value)}
          className="rounded-full border px-4 py-2 font-semibold bg-gray-50"
        >
          <option value="asc">Asc</option>
          <option value="desc">Desc</option>
        </select>
      </div>
    </div>
  </div>
);

export default SortingAndFilterControls;
