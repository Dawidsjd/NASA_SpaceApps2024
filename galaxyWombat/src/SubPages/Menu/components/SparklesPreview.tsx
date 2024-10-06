import React, { useState } from "react";
import { SparklesCore } from "./Sparkles";
import { RocketLaunchIcon } from "@heroicons/react/24/outline";
import { FaGithub, FaTwitter, FaYoutube, FaArrowLeft } from "react-icons/fa"; // Importuj ikony z react-icons
import ShimmerCards from "./ShimmerCards";
import { motion } from "framer-motion";


export function SparklesPreview() {
  const [isExploring, setIsExploring] = useState(false);

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

      <motion.img
        src="/assets/icon.png"
        alt="Ikona"
        draggable="false"
        className="absolute top-10 right-10 w-24 h-24 select-none"
      />

      <div className="absolute top-10 left-10 flex flex-col space-y-2 z-10">
        {isExploring && (
          <button
            className="flex items-center px-4 py-2  text-white rounded-lg opacity-70 hover:opacity-100"
            onClick={() => setIsExploring(false)}
          >
            <FaArrowLeft className="mr-2" /> {/* Dodano ikonę strzałki */}
            Back
          </button>
        )}
      </div>

      <h1 
        className="font-bold text-center tracking-wider z-10 text-white"
        style={{ 
          letterSpacing: '8px', 
          textShadow: '2px 2px 5px #3b82f6', 
          fontSize: '5rem' 
        }}
      >
        STELLAR JOURNEY
      </h1>

      {!isExploring && (
        <>
          <motion.p
            className="text-center mx-4 mt-4 mb-4 text-lg z-10 w-1/2 text-white italic"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Stellar Journey is an interactive app designed for space enthusiasts and astronomy lovers. It allows users to explore the mysteries of the universe and learn about planets, stars, and galaxies in an engaging way.
          </motion.p>

          <button 
            className="relative flex items-center justify-center px-12 py-4 bg-gray-900 text-white font-semibold rounded-lg overflow-hidden group mt-6 z-10"
            onClick={() => setIsExploring(true)} // Ustaw stan na true po kliknięciu
          >
            <RocketLaunchIcon className="h-6 w-6 mr-2" aria-hidden="true" />
            <span className="relative z-10 text-lg">Explore Space</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:via-white/20 bg-[length:200%_100%] animate-shimmer"></div>
          </button>

          {/* Dodaj przyciski do mediów społecznościowych */}
          <div className="mt-10 flex space-x-10">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-gray-600">
              <FaGithub size={30} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-gray-600">
              <FaTwitter size={30} />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-gray-600">
              <FaYoutube size={30} />
            </a>
          </div>
        </>
      )}

      {isExploring && (
        <ShimmerCards />
      )}

      <motion.img 
        src="/assets/wombat-layout.png" 
        alt="Wombat Layout" 
        className="absolute left-0 -bottom-3 w-1/3 h-auto object-cover select-none"
        draggable="false"
        animate={{ y: [0, -10, 0], rotate: [0, 2, -2, 0] }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}
