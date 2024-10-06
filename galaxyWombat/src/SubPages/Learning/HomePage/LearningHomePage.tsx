import React, { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom'; // Use useNavigate for navigation
import { PlanetsCategory, plantesCategory } from '../PlanetsCategory';
import { SparklesCore } from '../../Menu/components/Sparkles';

const LearningHomePage = () => {
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetsCategory>(
    plantesCategory[2] // Default to Earth
  );
  const navigate = useNavigate(); // Initialize navigation

  // Function to handle planet click and update selected planet
  const handlePlanetClick = (planet: PlanetsCategory) => {
    setSelectedPlanet(planet); // Update the selected planet state
  };

  return (
    <div className="h-screen" style={{ background: 'url(/img/bg.png)' }}>
      <div className="h-screen relative w-full bg-[#202937] overflow-hidden">
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
      <div className="flex flex-row items-center justify-between mx-2 mb-28">
      <div className="absolute top-6 left-6">
        <Link to="/" className=" text-white text-lg rounded-full border-2 border-gray-700 border-b-[6px] m-2.5 inline-flex items-center justify-center px-6 py-3 transition-all duration-100 hover:bg-gray-800 hover:border-gray-600 active:border-b-2 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50 active:translate-y-[4px] opacity-65 hover:opacity-100 z-50">
          <FaArrowLeft className="mr-2" /> Back
        </Link>
      </div>
        <img
          src="/assets/icon.png"
          alt="Ikona"
          draggable="false"
          className="absolute w-24 h-24 top-6 right-6 select-none"
        />
      </div>
      <div className="flex flex-row items-center justify-center h-4/6 mx-2">
        <div className="flex flex-row w-3/5 h-2/3  bg-opacity-55 rounded-lg   m-2.5 items-center justify-center p-6 transition-all duration-100 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50 z-50">
        
          <div className="w-1/2 flex items-center justify-center">
            <img
              src={selectedPlanet.image}
              alt={selectedPlanet.label}
              draggable='false'
              className="w-96 h-96 select-none object-contain"
            />
          </div>
          <div className="w-1/2 flex flex-col items-center justify-center text-2xl text-center">
            <p className="text-3xl font-bold m-2 text-white">
              Learn something about {selectedPlanet.label}
            </p>

            {/* Add onClick to the button to navigate on click */}
            <button
              className=" py-2 px-12 rounded-lg mt-2 text-white hover:text-gray-400 border-2 border-gray-700 border-b-[6px] m-2.5 inline-flex items-center justify-center p-6 transition-all duration-100 hover:bg-gray-800 hover:border-gray-600 active:border-b-2 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50 active:translate-y-[4px] z-50  backdrop-blur-[2px] backdrop-filter"
              onClick={() =>
                navigate('/learning/exercise', {
                  state: { planet: selectedPlanet },
                })
              } // Navigate on click
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center mx-2">
        <p className="text-xl text-gray-400 bold m-2">Choose other planet</p>
        {/* Content menu with planet images and labels */}
        <div className="flex flex-row space-x-5">
          {plantesCategory.map((planet) => (
            <button
              key={planet.label}
              onClick={() => handlePlanetClick(planet)} // Update selected planet on click
              className="flex flex-row items-center space-x-2 py-1 px-2 bg-gray-800 bg-opacity-55 shadow-xl backdrop-blur-[2px] backdrop-filter rounded-lg p-4 hover:text-gray-300  border-2 border-gray-700 border-b-[6px] m-2.5 justify-center transition-all duration-100 hover:bg-gray-800 hover:border-gray-600 active:border-b-2 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50 active:translate-y-[4px] z-50"
            >
              <img
                src={planet.image}
                alt={planet.label}
                className="w-8 h-8 object-contain"
              />
              <span>{planet.label}</span>
            </button>
          ))}
        </div>
      </div>
      </div>
    </div>
  );
};

export default LearningHomePage;
