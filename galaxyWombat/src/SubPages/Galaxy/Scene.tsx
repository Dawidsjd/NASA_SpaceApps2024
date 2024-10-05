import React, { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Planet, Orbit as PlanetOrbit } from './Planet';
import { planetData } from './orbits';
import { asteroidData } from './asteroids';
import PlanetDetails from './PlanetDetails';
import AsteroidDetails from './AsteroidDetails';
import SpeedControl from './SpeedControl';
import Sun from './Sun';
import Asteroid from './Asteroid'; // Import the new Asteroid component
import * as THREE from 'three';

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
    previousSpeed.current = speedMultiplier; // Store current speed before setting to 0
    setSpeedMultiplier(0); // Set speed to 0 when a planet is clicked
    setSelectedPlanet({ label, description });

    // Wyjątek dla planet - oddalamy tylko w osi Z
    if (label === 'Saturn') {
      targetPosition.current = [position[0], position[1], position[2] * 1.5]; // Saturn oddala się w osi Z
    } else if (label === 'Jupiter') {
      targetPosition.current = [position[0], position[1], position[2] * 2]; // Jowisz oddala się w osi Z
    } else if (label === 'Uranus') {
      targetPosition.current = [position[0], position[1], position[2] * 1.25]; // Uran oddala się w osi Z
    } else {
      targetPosition.current = position; // Ustawiamy pozycję celu dla kamery
    }

    setIsMoving(true);
  };

  const handleAsteroidClick = (
    label: string,
    description: string,
    position: [number, number, number]
  ) => {
    previousSpeed.current = speedMultiplier; // Store current speed before setting to 0
    setSpeedMultiplier(0); // Set speed to 0 when an asteroid is clicked
    setSelectedAsteroid({ label, description });
    targetPosition.current = position; // Set the camera target position to the asteroid's position
    setIsMoving(true);
  };

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
              texture={planet.texture}
              speed={planet.speed}
              rotationSpeed={planet.rotationSpeed}
              speedMultiplier={speedMultiplier}
              onClick={(label, description, position) => {
                handlePlanetClick(label, description, position);
              }}
              angleRef={anglesRef.current} // Pass angleRef to maintain angle state
            />
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
            distanceFromSun={asteroid.distanceFromSun}
            description={asteroid.description} // Pass the correct description
            speedMultiplier={speedMultiplier}
            onClick={handleAsteroidClick} // Ensure onClick works as expected
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
          description={selectedAsteroid.description}
          onClose={handleCloseAsteroidInfo}
        />
      )}
    </>
  );
};

export default Scene;
