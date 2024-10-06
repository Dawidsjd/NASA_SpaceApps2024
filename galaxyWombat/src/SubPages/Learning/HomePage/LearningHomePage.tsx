import React, { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom'; // Use useNavigate for navigation
import { PlanetsCategory, plantesCategory } from '../PlanetsCategory';

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
      <div className="flex flex-row items-center justify-between mx-2">
        <button className="flex items-center px-4 py-2 mt-2 text-white rounded-lg opacity-70 hover:opacity-100">
          <Link to="/" className="flex items-center">
            <FaArrowLeft className="mr-2" />
            Back
          </Link>
        </button>
        <img
          src="/assets/icon.png"
          alt="Ikona"
          draggable="false"
          className="w-24 h-24 mt-2 select-none"
        />
      </div>
      <div className="flex flex-row items-center justify-center h-4/6 mx-2">
        <div className="flex flex-row w-3/5 h-2/3 bg-gray-800 bg-opacity-55 shadow-xl backdrop-blur-[2px] backdrop-filter rounded-lg p-4">
          <div className="w-1/2 flex items-center justify-center">
            <img
              src={selectedPlanet.image}
              alt={selectedPlanet.label}
              className="w-64 h-64 object-contain"
            />
          </div>
          <div className="w-1/2 flex flex-col items-center justify-center text-2xl text-center">
            <p className="text-3xl font-bold m-2 text-white">
              Learn something about {selectedPlanet.label}
            </p>

            {/* Add onClick to the button to navigate on click */}
            <button
              className="bg-green-600 py-2 px-12 rounded-lg mt-2 text-white hover:bg-white hover:text-green-600"
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
              className="flex flex-row items-center space-x-2 py-1 px-2 hover:bg-white bg-gray-800 bg-opacity-55 shadow-xl backdrop-blur-[2px] backdrop-filter rounded-lg p-4 hover:text-[#202937]"
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
  );
};

export default LearningHomePage;
