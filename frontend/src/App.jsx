// App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./pages/Header"; 
import Home from "./pages/Home";
import DetailPage from "./pages/DetailPage";
import FavoritesPage from "./pages/FavoritesPage";
import ComparePage from "./pages/ComparePage";
import RandomPokemonPage from "./pages/RandomPokemonPage";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  return (
    <ErrorBoundary>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokemon/:id" element={<DetailPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/compare" element={<ComparePage />} />
        <Route path="/random" element={<RandomPokemonPage />} />
      </Routes>
    </ErrorBoundary>
  );
}

export default App;
