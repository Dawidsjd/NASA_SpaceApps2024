import React, { useState, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Planet, Orbit as PlanetOrbit } from './Planet';
import { planetData } from './orbits';
import { asteroidData } from './asteroids';
import PlanetDetails from './PlanetDetails';
import AsteroidDetails from './AsteroidDetails';
import SpeedControl from './SpeedControl';
import Sun from './Sun';
import CameraController from './CameraController';
import Asteroid from './Asteroid';
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';
import { FaArrowCircleLeft, FaArrowLeft, FaChevronLeft } from 'react-icons/fa';

const AU = 150;

const Scene: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [isPanelOpen, setIsPanelOpen] = useState(false); // State for controlling the slide-out panel
  const [selectedPlanet, setSelectedPlanet] = useState<null | { label: string; description: string }>(null);
  const [selectedAsteroid, setSelectedAsteroid] = useState<null | { label: string; description: string }>(null);
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1);
  const targetPosition = useRef<[number, number, number] | null>(null);
  const [isMoving, setIsMoving] = useState<boolean>(false);
  const previousSpeed = useRef<number>(1);
  const anglesRef = useRef(new Map<string, number>());

  useEffect(() => {
    const loadAssets = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setLoading(false);
    };
    loadAssets();
  }, []);

  const togglePanel = () => {
    setIsPanelOpen(!isPanelOpen);
  };

  const handleClosePlanetInfo = () => {
    setSelectedPlanet(null);
    setIsMoving(false);
    setSpeedMultiplier(previousSpeed.current);
  };

  const handleCloseAsteroidInfo = () => {
    setSelectedAsteroid(null);
    setIsMoving(false);
    setSpeedMultiplier(previousSpeed.current);
  };

  return (
    <div className="bg-black h-screen w-full relative overflow-hidden"> {/* Upewnij się, że overflow-hidden jest ustawiony tutaj */}
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
        <Canvas style={{ width: '100vw', height: '100vh' }}>
          <Sphere args={[1000, 1000, 1000]} position={[0, 0, 0]}>
            <meshBasicMaterial map={new THREE.TextureLoader().load('/public/assets/bg-1.jpg')} side={THREE.BackSide} />
          </Sphere>

          <CameraController targetPosition={targetPosition.current} isMoving={isMoving} />
          <ambientLight intensity={0.5} />
          <hemisphereLight intensity={0.3} color="white" groundColor="blue" />
          <directionalLight position={[10, 10, 10]} intensity={1} />
          <Sun />

          {planetData.map((planet) => (
            <React.Fragment key={planet.label}>
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
                onClick={(label, description, position) => {
                  setSelectedPlanet({ label, description });
                  targetPosition.current = position;
                }}
                angleRef={anglesRef.current}
              />
              <pointLight position={[planet.rho * AU, 0, 0]} intensity={150} distance={planet.rho * AU + 10} decay={2} color={'red'} />
              <PlanetOrbit rho={planet.rho} color={planet.color} />
            </React.Fragment>
          ))}

          {asteroidData.map((asteroid) => (
            <Asteroid
              key={asteroid.label}
              label={asteroid.label}
              size={4}
              color={asteroid.color}
              speed={asteroid.speed}
              texture={asteroid.texture}
              distanceFromSun={asteroid.distanceFromSun}
              description={asteroid.description}
              speedMultiplier={speedMultiplier}
              onClick={(label, description, position) => {
                setSelectedAsteroid({ label, description });
                targetPosition.current = position;
              }}
            />
          ))}
        </Canvas>
      )}

      <SpeedControl speedMultiplier={speedMultiplier} onChange={setSpeedMultiplier} />

      {selectedPlanet && <PlanetDetails label={selectedPlanet.label} description={selectedPlanet.description} onClose={handleClosePlanetInfo} />}
      {selectedAsteroid && <AsteroidDetails label={selectedAsteroid.label} description={selectedAsteroid.description} onClose={handleCloseAsteroidInfo} />}

      <img
        src="/assets/icon-dark.png"
        alt="Logo"
        draggable="false"
        className="absolute top-5 right-5 w-24 h-24 select-none opacity-40"
        style={{ userSelect: 'none' }}
      />

      {/* Slide-out panel toggle button */}
<button
  onClick={togglePanel}
  className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700 transition duration-300"
><FaChevronLeft/>
</button>


      {/* Slide-out panel */}
      <div
        className={`absolute top-0 right-0 h-full w-64 bg-gray-800 text-white transition-transform duration-300 ease-in-out transform ${
          isPanelOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <h2 className="text-lg font-bold p-4">Planets</h2>
        <ul className="pl-4">
          {planetData.map((planet) => (
            <li key={planet.label} className="mb-2">
              {planet.label}
            </li>
          ))}
        </ul>

        <h2 className="text-lg font-bold p-4">Asteroids</h2>
        <ul className="pl-4">
          {asteroidData.map((asteroid) => (
            <li key={asteroid.label} className="mb-2">
              {asteroid.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Scene;
