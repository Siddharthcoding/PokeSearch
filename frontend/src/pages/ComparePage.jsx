import React from "react";
import ComparisonTool from "../components/ComparisonTool";
import { Link } from "react-router-dom";

const ComparePage = () => (
  <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-pink-50 py-12 px-2">
    <div className="max-w-7xl mx-auto flex flex-col items-center">
      <div className="flex flex-col items-center mb-8">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-500 via-blue-500 to-pink-400 drop-shadow mb-2">
          Compare Pokémon
        </h1>
        <Link
          to="/home"
          className="inline-block px-6 py-2 rounded-full bg-gradient-to-r from-blue-400 to-pink-400 text-white font-semibold shadow hover:scale-105 transition mb-4"
        >
          ← Back to Home
        </Link>
      </div>
      <ComparisonTool />
    </div>
  </div>
);

export default ComparePage;
