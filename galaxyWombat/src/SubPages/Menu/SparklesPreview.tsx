
import React from "react";
import { SparklesCore } from "./Sparkles";
export function SparklesPreview() {
  return (
    <div className="h-screen relative w-full bg-black flex flex-col items-center justify-center overflow-hidden">
      <div className="w-full absolute inset-0 h-screen">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
      </div>
      <h1 
        className="font-bold text-center tracking-wider z-10 text-white"
        style={{ 
          letterSpacing: '8px', 
          textShadow: '2px 2px 5px #3b82f6', // niebieski cień tekstu
          fontSize: '5rem' // Zmniejszony rozmiar
        }}
      >
        STELLAR JOURNEY
      </h1>

      {/* Opis aplikacji */}
      <p className="text-center mx-4 mt-4 mb-4 text-lg z-10 w-1/2 text-white">
        Stellar Journey is an interactive app designed for space enthusiasts and astronomy lovers. It allows users to explore the mysteries of the universe and learn about planets, stars, and galaxies in an engaging way.
      </p>

      {/* Przycisk "Explore Space" */}
      <button className="relative px-12 py-4 bg-gray-900 text-white font-semibold rounded-lg overflow-hidden group mt-6 z-10">
        <span className="relative z-10 text-lg">Explore Space</span>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:via-white/20 bg-[length:200%_100%] animate-shimmer"></div>
      </button>

      {/* Zdjęcie po lewej stronie */}
      <img 
        src="/assets/wombat-layout.png" 
        alt="Wombat Layout" 
        className="absolute left-0 bottom-0 w-1/3 h-auto object-cover"
        draggable="false" // Uniemożliwia przeciąganie
      />
    </div>
  );
}
