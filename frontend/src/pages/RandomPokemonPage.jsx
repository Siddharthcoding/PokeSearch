import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePokemonContext } from "../contexts/PokemonContext";

const RandomPokemonPage = () => {
  const { allPokemon } = usePokemonContext();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (allPokemon.length > 0) {
      setIsLoading(true);
      const random = allPokemon[Math.floor(Math.random() * allPokemon.length)];
      
      const timer = setTimeout(() => {
        navigate(`/pokemon/${random.id}`);
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [allPokemon, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-blue-50 py-10 px-2 flex justify-center items-center">
      <div className="w-full max-w-md">
        <h2 className="text-2xl font-extrabold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-pink-500 to-yellow-500">
          Finding a Random Pokémon...
        </h2>
        
        <div className="rounded-2xl shadow-xl p-6 flex flex-col items-center bg-white animate-pulse">
          <div className="bg-gray-200 rounded-full shadow-lg p-2 mb-2">
            <div className="w-24 h-24 rounded-full bg-gray-300"></div>
          </div>
          
          <div className="h-6 bg-gray-300 rounded-full w-32 mb-2"></div>
          
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            <div className="h-5 bg-gray-300 rounded-full w-20"></div>
            <div className="h-5 bg-gray-300 rounded-full w-16"></div>
          </div>
          
          <div className="w-full space-y-2">
            <div className="h-4 bg-gray-200 rounded-full w-full"></div>
            <div className="h-4 bg-gray-200 rounded-full w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded-full w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded-full w-2/3"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RandomPokemonPage;
