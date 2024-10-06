import React, { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { PlanetsCategory, plantesCategory } from '../PlanetsCategory'; // Adjust the path as needed

const LearningHomePage = () => {
  // State to track the currently selected planet
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetsCategory>(
    plantesCategory[2]
  ); // Default to Earth

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
      <div className="flex flex-row items-center justify-center h-4/5 border mx-2 border-red-500">
        <div className="flex flex-row w-4/5">
          {/* Display selected planet's image */}
          <div className="w-1/2 border flex items-center justify-center">
            <img
              src={selectedPlanet.image}
              alt={selectedPlanet.label}
              className="w-48 h-48 object-contain"
            />
          </div>
          {/* Display the name of the selected planet */}
          <div className="w-1/2 border flex items-center justify-center text-2xl">
            {selectedPlanet.label}
          </div>
        </div>
      </div>
      <div className="flex flex-row items-center justify-center border mx-2 border-red-500">
        {/* Content menu with planet images and labels */}
        <div className="flex flex-row space-x-4">
          {plantesCategory.map((planet) => (
            <button
              key={planet.label}
              onClick={() => setSelectedPlanet(planet)} // Update selected planet on click
              className="flex flex-col items-center"
            >
              <img
                src={planet.image}
                alt={planet.label}
                className="w-16 h-16 object-contain mb-1"
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
