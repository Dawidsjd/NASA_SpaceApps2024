import React, { useState, useRef } from 'react';
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

const AU = 150; // Astronomical Unit (scaled)

const Scene: React.FC = () => {
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

    // Exceptions for planets - adjust Z axis for camera position
    if (label === 'Saturn') {
      targetPosition.current = [position[0], position[1], position[2] * 1.5]; // Saturn zoom
    } else if (label === 'Jupiter') {
      targetPosition.current = [position[0], position[1], position[2] * 2]; // Jupiter zoom
    } else if (label === 'Uranus') {
      targetPosition.current = [position[0], position[1], position[2] * 1.25]; // Uranus zoom
    } else {
      targetPosition.current = position; // Default zoom for other planets
    }

    setIsMoving(true);
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
    setIsMoving(true);
  };

  const orbitsVisible = !selectedPlanet && !selectedAsteroid; // Orbits should only be visible when no planet or asteroid is selected

  return (
    <>
      <Canvas
        style={{
          width: '100vw',
          height: '100vh',
          background: 'url(/public/background.jpg)',
        }}
      >
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
                handlePlanetClick(label, description, position);
              }}
              angleRef={anglesRef.current} // Pass angleRef
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
            size={4}
            color={asteroid.color}
            speed={asteroid.speed}
            texture={asteroid.texture}
            distanceFromSun={asteroid.distanceFromSun}
            description={asteroid.description} // Pass the description here
            speedMultiplier={speedMultiplier}
            onClick={(label, description, position) =>
              handleAsteroidClick(label, description, position)
            }
          />
        ))}
      </Canvas>

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
    </>
  );
};

export default Scene;
