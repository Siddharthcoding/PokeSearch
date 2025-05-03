import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function LandingPage() {
  // Pokemon image data for the background
  const pokemonImages = [
    { id: 1, src: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png", alt: "Pikachu" },
    { id: 2, src: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/004.png", alt: "Charmander" },
    { id: 3, src: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/007.png", alt: "Squirtle" },
    { id: 4, src: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png", alt: "Bulbasaur" },
    { id: 5, src: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/039.png", alt: "Jigglypuff" },
    { id: 6, src: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/133.png", alt: "Eevee" },
    { id: 7, src: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/054.png", alt: "Psyduck" },
    { id: 8, src: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/143.png", alt: "Snorlax" },
    { id: 9, src: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/094.png", alt: "Gengar" },
    { id: 10, src: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/150.png", alt: "Mewtwo" },
    { id: 11, src: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/006.png", alt: "Charizard" },
    { id: 12, src: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/149.png", alt: "Dragonite" },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 flex">
          <div className="w-1/4 px-0.5">
            <motion.div 
              className="flex flex-col gap-1"
              initial={{ y: 0 }}
              animate={{ y: [0, -1500] }}
              transition={{ 
                repeat: Infinity,
                repeatType: "loop",
                duration: 50,
                ease: "linear"
              }}
            >
              {pokemonImages.slice(0, 6).map(pokemon => (
                <div 
                  key={pokemon.id} 
                  className="mb-1 h-[200px] md:h-[250px] bg-gradient-to-br from-red-100 to-blue-100 rounded-xl p-4" 
                >
                  <img 
                    src={pokemon.src} 
                    alt={pokemon.alt} 
                    className="w-full h-full object-contain"
                  />
                </div>
              ))}
              {pokemonImages.slice(0, 3).map(pokemon => (
                <div 
                  key={`repeat-1-${pokemon.id}`} 
                  className="mb-1 h-[200px] md:h-[250px] bg-gradient-to-br from-red-100 to-blue-100 rounded-xl p-4" 
                >
                  <img 
                    src={pokemon.src} 
                    alt={pokemon.alt} 
                    className="w-full h-full object-contain"
                  />
                </div>
              ))}
            </motion.div>
          </div>
          
          <div className="w-1/4 px-0.5">
            <motion.div 
              className="flex flex-col gap-1"
              initial={{ y: -300 }}
              animate={{ y: [-300, -1800] }}
              transition={{ 
                repeat: Infinity,
                repeatType: "loop",
                duration: 60,
                ease: "linear"
              }}
            >
              {pokemonImages.slice(3, 9).map(pokemon => (
                <div 
                  key={pokemon.id} 
                  className="mb-1 h-[200px] md:h-[250px] bg-gradient-to-br from-green-100 to-yellow-100 rounded-xl p-4" 
                >
                  <img 
                    src={pokemon.src} 
                    alt={pokemon.alt} 
                    className="w-full h-full object-contain"
                  />
                </div>
              ))}
              {pokemonImages.slice(3, 6).map(pokemon => (
                <div 
                  key={`repeat-2-${pokemon.id}`} 
                  className="mb-1 h-[200px] md:h-[250px] bg-gradient-to-br from-green-100 to-yellow-100 rounded-xl p-4" 
                >
                  <img 
                    src={pokemon.src} 
                    alt={pokemon.alt} 
                    className="w-full h-full object-contain"
                  />
                </div>
              ))}
            </motion.div>
          </div>
          
          <div className="w-1/4 px-0.5">
            <motion.div 
              className="flex flex-col gap-1"
              initial={{ y: -600 }}
              animate={{ y: [-600, -2100] }}
              transition={{ 
                repeat: Infinity,
                repeatType: "loop",
                duration: 55,
                ease: "linear"
              }}
            >
              {pokemonImages.slice(0, 6).reverse().map(pokemon => (
                <div 
                  key={pokemon.id} 
                  className="mb-1 h-[200px] md:h-[250px] bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl p-4" 
                >
                  <img 
                    src={pokemon.src} 
                    alt={pokemon.alt} 
                    className="w-full h-full object-contain"
                  />
                </div>
              ))}
              {pokemonImages.slice(0, 3).reverse().map(pokemon => (
                <div 
                  key={`repeat-3-${pokemon.id}`} 
                  className="mb-1 h-[200px] md:h-[250px] bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl p-4" 
                >
                  <img 
                    src={pokemon.src} 
                    alt={pokemon.alt} 
                    className="w-full h-full object-contain"
                  />
                </div>
              ))}
            </motion.div>
          </div>
          
          <div className="w-1/4 px-0.5">
            <motion.div 
              className="flex flex-col gap-1"
              initial={{ y: -900 }}
              animate={{ y: [-900, -2400] }}
              transition={{ 
                repeat: Infinity,
                repeatType: "loop",
                duration: 65,
                ease: "linear"
              }}
            >
              {pokemonImages.slice(6, 12).map(pokemon => (
                <div 
                  key={pokemon.id} 
                  className="mb-1 h-[200px] md:h-[250px] bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl p-4" 
                >
                  <img 
                    src={pokemon.src} 
                    alt={pokemon.alt} 
                    className="w-full h-full object-contain"
                  />
                </div>
              ))}
              {pokemonImages.slice(6, 9).map(pokemon => (
                <div 
                  key={`repeat-4-${pokemon.id}`} 
                  className="mb-1 h-[200px] md:h-[250px] bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl p-4" 
                >
                  <img 
                    src={pokemon.src} 
                    alt={pokemon.alt} 
                    className="w-full h-full object-contain"
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900 via-blue-900/90 to-blue-900/70"></div>
      </div>
      
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 py-8 sm:py-12 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="mb-8 md:mb-12"
        >
          <motion.h1 
            className="text-6xl md:text-7xl lg:text-8xl font-light text-white mb-5 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <span className="font-bold text-yellow-400 mr-1">Poké</span>
            <span className="font-extrabold text-white">Search</span>
          </motion.h1>
          
          <motion.div 
            className="max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <p className="text-lg sm:text-xl md:text-2xl font-light text-gray-300 leading-relaxed mb-1">
              Discover and explore your favorite Pokémon
            </p>
            <p className="text-base sm:text-lg italic text-yellow-300 font-medium mb-6">
              with detailed stats, abilities, and more at your fingertips
            </p>
            <div className="w-24 h-1 bg-yellow-400 mx-auto"></div>
          </motion.div>
        </motion.div>
        
        <motion.div
          className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <Link to="/home">
            <motion.button 
              className="px-8 py-3 bg-red-500 hover:bg-red-600 text-white font-medium rounded-full shadow-lg transition-all duration-300 text-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Explore Pokémon
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
