import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./pages/Header"; 
import Home from "./pages/Home";
import DetailPage from "./pages/DetailPage";
import FavoritesPage from "./pages/FavoritesPage";
import ComparePage from "./pages/ComparePage";
import RandomPokemonPage from "./pages/RandomPokemonPage";
import ErrorBoundary from "./components/ErrorBoundary";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <ErrorBoundary>
      <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/home" element={
        <>
          <Header />
          <Home />
        </>
      } />
        <Route path="/pokemon/:id" element={
          <>
            <Header />
            <DetailPage />
          </>
        } />
        <Route path="/favorites" element={
          <>
            <Header />
            <FavoritesPage />
          </>
        } />
        <Route path="/compare" element={
          <>
            <Header />
            <ComparePage />
          </>
        } />
        <Route path="/random" element={
          <>
            <Header />
            <RandomPokemonPage />
          </>
        } />
      </Routes>
    </ErrorBoundary>
  );
}

export default App;
