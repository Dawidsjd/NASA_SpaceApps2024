import React, { useState, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Planet, Orbit as PlanetOrbit } from './Planet';
import { planetData } from './orbits';
import { asteroidData } from './asteroids';
import PlanetDetails from './PlanetDetails';
import AsteroidDetails from './AsteroidDetails';
import SpeedControl from './SpeedControl';
import Sun from './Sun'; // Assuming Sun is in a separate file
import CameraController from './CameraController'; // Assuming CameraController is in a separate file
import Asteroid from './Asteroid'; // Import the new Asteroid component
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';
import { FaChevronLeft } from 'react-icons/fa';

const AU = 150; // Astronomical Unit (scaled)

const Scene: React.FC = () => {
  const [loading, setLoading] = useState(true); // State for loading
  const [isPanelOpen, setIsPanelOpen] = useState(false); // State for controlling the slide-out panel

  const [selectedPlanet, setSelectedPlanet] = useState<null | {
    label: string;
    description: string;
  }>(null);
  const [selectedAsteroid, setSelectedAsteroid] = useState<null | {
    label: string;
    description: string;
  }>(null);
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1);
  const targetPosition = useRef<[number, number, number] | null>(null);
  const [isMoving, setIsMoving] = useState<boolean>(false);
  const previousSpeed = useRef<number>(1);
  const anglesRef = useRef(new Map<string, number>()); // Store angles for planets

  useEffect(() => {
    // Simulate loading process, replace this with actual loading logic if needed
    const loadAssets = async () => {
      // Simulate loading delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setLoading(false);
    };

    loadAssets();
  }, []);

  const handleClosePlanetInfo = () => {
    setSelectedPlanet(null);
    setIsMoving(false);
    setSpeedMultiplier(previousSpeed.current); // Restore previous speed when closing modal
  };

  const handleCloseAsteroidInfo = () => {
    setSelectedAsteroid(null);
    setIsMoving(false);
    setSpeedMultiplier(previousSpeed.current); // Restore previous speed when closing modal
  };

  const handlePlanetClick = (
    label: string,
    description: string,
    position: [number, number, number]
  ) => {
    previousSpeed.current = speedMultiplier; // Save current speed before stopping
    setSpeedMultiplier(0); // Stop speed when a planet is clicked
    setSelectedPlanet({ label, description });
    targetPosition.current = position; // Set the camera target position
    setIsMoving(true); // Start moving the camera
  };

  const handleAsteroidClick = (
    label: string,
    description: string,
    position: [number, number, number]
  ) => {
    previousSpeed.current = speedMultiplier; // Save current speed before setting to 0
    setSpeedMultiplier(0); // Set speed to 0 when an asteroid is clicked
    setSelectedAsteroid({ label, description }); // Pass label and description correctly
    targetPosition.current = position; // Set camera target position
    setIsMoving(true); // Start moving the camera
  };

  const togglePanel = () => {
    setIsPanelOpen(!isPanelOpen);
  };

  const orbitsVisible = !selectedPlanet && !selectedAsteroid; // Orbits should only be visible when no planet or asteroid is selected

  return (
    <div className="bg-black h-screen w-full relative overflow-hidden">
      {loading ? (
        <div className="bg-black w-full h-screen">
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontSize: '2rem',
              color: 'white',
            }}
          >
            <span className="loading loading-bars loading-lg h-auto"></span>
          </div>
        </div>
      ) : (
        <Canvas
          style={{
            width: '100vw',
            height: '100vh',
          }}
        >
          {/* Sphere background */}
          <Sphere args={[1000, 1000, 1000]} position={[0, 0, 0]}>
            <meshBasicMaterial
              map={new THREE.TextureLoader().load('/public/assets/bg-1.jpg')}
              side={THREE.BackSide}
            />
          </Sphere>

          <CameraController
            targetPosition={targetPosition.current}
            isMoving={isMoving}
          />
          <ambientLight intensity={0.5} />
          <hemisphereLight intensity={0.3} color="white" groundColor="blue" />
          <directionalLight position={[10, 10, 10]} intensity={1} />
          <Sun />

          {planetData.map((planet) => (
            <React.Fragment key={planet.label}>
              {/* Planet Component */}
              <Planet
                label={planet.label}
                rho={planet.rho}
                size={planet.size}
                color={planet.color}
                description={planet.description}
                texture={planet.texture}
                speed={planet.speed}
                rotationSpeed={planet.rotationSpeed}
                speedMultiplier={speedMultiplier}
                onClick={() => {
                  handlePlanetClick(planet.label, planet.description, planet.position); // Pass the position as well
                }}
                angleRef={anglesRef.current} // Pass angleRef
              />

              {/* Glow effect around the planet */}
              <pointLight
                position={[planet.rho * AU, 0, 0]} // Positioning the light near the planet
                intensity={150} // Intensity of the glow
                distance={planet.rho * AU + 10} // Distance for the light to affect
                decay={2} // How quickly the light fades
                color={'red'} // Glow color matching the planet
              />

              {orbitsVisible && (
                <PlanetOrbit rho={planet.rho} color={planet.color} />
              )}
            </React.Fragment>
          ))}

          {asteroidData.map((asteroid) => (
            <Asteroid
              key={asteroid.label}
              label={asteroid.label}
              size={asteroid.size}
              speed={asteroid.speed}
              texture={asteroid.texture}
              distanceFromSun={asteroid.distanceFromSun}
              description={asteroid.description} // Pass the description here
              speedMultiplier={speedMultiplier}
              onClick={() => {
                handleAsteroidClick(asteroid.label, asteroid.description, asteroid.position); // Pass the position as well
              }}
            />
          ))}
        </Canvas>
      )}

      <SpeedControl
        speedMultiplier={speedMultiplier}
        onChange={setSpeedMultiplier}
      />

      {selectedPlanet && (
        <PlanetDetails
          label={selectedPlanet.label}
          description={selectedPlanet.description}
          onClose={handleClosePlanetInfo}
        />
      )}

      {selectedAsteroid && (
        <AsteroidDetails
          label={selectedAsteroid.label}
          description={selectedAsteroid.description} // Ensure this matches
          onClose={handleCloseAsteroidInfo}
        />
      )}

      <img
        src="/assets/icon-dark.png" // Zmień na właściwą ścieżkę do logo
        alt="Logo"
        draggable="false"
        className="absolute top-5 right-5 w-24 h-24 select-none opacity-40" // Dodaj klasę select-none
        style={{ userSelect: 'none' }} // Wyłącza możliwość wybierania logo
      />

      {/* Slide-out panel toggle button */}
      <button
        onClick={togglePanel}
        className={`absolute top-1/2 right-0 transform -translate-y-1/2 text-2xl text-gray-200 hover:text-gray-400 p-2 transition duration-300 ${
          isPanelOpen ? '-translate-x-80' : 'translate-x-0' // Przesuwanie przycisku w lewo przy otwarciu panelu
        }`}
      >
        <FaChevronLeft />
      </button>

      {/* Slide-out panel */}
      <div
        className={`absolute top-1/2 right-0 transform -translate-y-1/2 w-80 text-white transition bg-gray-800 p-4 rounded-lg shadow-lg opacity-55 hover:opacity-90 ${
          isPanelOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-between h-1/2"> {/* Flexbox do układania w wierszu */}
          <div className="overflow-y-auto w-1/2"> {/* Przewijanie dla tabeli planet */}
            <h2 className="text-lg font-bold p-2 text-center">Planets</h2>
            <table className="table w-full">
              <thead>
                <tr>
                  <th className="p-2">Name</th>
                </tr>
              </thead>
              <tbody>
                {planetData.map((planet) => (
                  <tr key={planet.label} className="transition-colors duration-300 hover:bg-gray-700" onClick={() => handlePlanetClick(planet.label, planet.description, planet.position)}>
                    <td className="p-2">{planet.label}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="overflow-y-auto w-1/2"> {/* Przewijanie dla tabeli asteroid */}
            <h2 className="text-lg font-bold p-2 text-center">Asteroids</h2>
            <table className="table w-full">
              <thead>
                <tr>
                  <th className="p-2">Name</th>
                </tr>
              </thead>
              <tbody>
                {asteroidData.map((asteroid) => (
                  <tr key={asteroid.label} className="transition-colors duration-300 hover:bg-gray-700" onClick={() => handleAsteroidClick(asteroid.label, asteroid.description, asteroid.position)}>
                    <td className="p-2">{asteroid.label}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scene;
