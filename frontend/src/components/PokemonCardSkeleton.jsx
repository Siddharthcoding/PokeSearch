import React from "react";

const PokemonCardSkeleton = () => {
  return (
    <div className="rounded-2xl shadow-xl p-6 flex flex-col items-center bg-gray-100 animate-pulse">
      <div className="bg-white rounded-full shadow-lg p-2 mb-2">
        <div className="w-20 h-20 rounded-full bg-gray-200"></div>
      </div>
      <div className="h-6 bg-gray-200 rounded-full w-24 mb-2"></div>
      <div className="flex flex-wrap justify-center gap-2 mb-4">
        <div className="h-5 bg-gray-200 rounded-full w-16"></div>
        <div className="h-5 bg-gray-200 rounded-full w-16"></div>
      </div>
      <div className="flex justify-between items-center w-full">
        <div className="h-4 bg-gray-200 rounded-full w-16"></div>
        <div className="h-6 bg-gray-200 rounded-full w-6"></div>
      </div>
    </div>
  );
};

export default PokemonCardSkeleton;
