import React, { useState } from "react";
import { SparklesCore } from "./Sparkles";
import { RocketLaunchIcon } from "@heroicons/react/24/outline"; // Importuj ikonę rakiety
import ShimmerCards from "./ShimmerCards";
import { motion } from "framer-motion";

export function SparklesPreview() {
  // Stan do kontrolowania widoczności
  const [isExploring, setIsExploring] = useState(false);

  return (
    <div className="h-screen relative w-full bg-black flex flex-col items-center justify-center overflow-hidden">
      {/* Tło cząsteczek */}
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

      {/* Animowana ikona w prawym górnym rogu */}
      <motion.img
        src="/assets/icon.png" // Ścieżka do ikony
        alt="Ikona"
        className="absolute top-10 right-10 w-24 h-24"
        
      />

      {/* Statyczny napis */}
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

      {!isExploring && ( // Warunkowe renderowanie opisu i przycisku
        <>
          {/* Opis aplikacji */}
          <motion.p
            className="text-center mx-4 mt-4 mb-4 text-lg z-10 w-1/2 text-white italic"
            initial={{ opacity: 0, y: 20 }} // Początkowy stan
            animate={{ opacity: 1, y: 0 }} // Animowane pojawienie się
            transition={{ duration: 1 }} // Czas trwania animacji
          >
            Stellar Journey is an interactive app designed for space enthusiasts and astronomy lovers. It allows users to explore the mysteries of the universe and learn about planets, stars, and galaxies in an engaging way.
          </motion.p>

          {/* Statyczny przycisk "Explore Space" */}
          <button 
            className="relative flex items-center justify-center px-12 py-4 bg-gray-900 text-white font-semibold rounded-lg overflow-hidden group mt-6 z-10"
            onClick={() => setIsExploring(true)} // Ustaw stan na true po kliknięciu
          >
            <RocketLaunchIcon className="h-6 w-6 mr-2" aria-hidden="true" /> {/* Ikona rakiety */}
            <span className="relative z-10 text-lg">Explore Space</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:via-white/20 bg-[length:200%_100%] animate-shimmer"></div>
          </button>
        </>
      )}

      {isExploring && ( // Warunkowe renderowanie kontenerów
        <ShimmerCards />
      )}

      {/* Animowane zdjęcie po lewej stronie */}
      <motion.img 
        src="/assets/wombat-layout.png" 
        alt="Wombat Layout" 
        className="absolute left-0 bottom-0 w-1/3 h-auto object-cover"
        draggable="false" // Uniemożliwia przeciąganie
        animate={{ y: [0, -10, 0], rotate: [0, 2, -2, 0] }} // Dryfowanie góra-dół oraz lekkie kołysanie
        transition={{
          duration: 5, // Czas trwania animacji
          repeat: Infinity, // Powtarzanie w nieskończoność
          ease: "easeInOut", // Łagodna animacja
        }}
      />
    </div>
  );
}
