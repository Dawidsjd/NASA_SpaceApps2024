import React, { useState, useRef } from 'react';
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
import { EffectComposer, Bloom, DepthOfField } from '@react-three/postprocessing';

const AU = 150; // Astronomical Unit (scaled)

const Scene: React.FC = () => {
  const [selectedPlanet, setSelectedPlanet] = useState<null | { label: string; description: string; }>(null);
  const [selectedAsteroid, setSelectedAsteroid] = useState<null | { label: string; description: string; }>(null);
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1);
  const targetPosition = useRef<[number, number, number] | null>(null);
  const [isMoving, setIsMoving] = useState<boolean>(false);
  const previousSpeed = useRef<number>(1);
  const anglesRef = useRef(new Map<string, number>()); // Store angles for planets

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

  const handlePlanetClick = (label: string, description: string, position: [number, number, number]) => {
    previousSpeed.current = speedMultiplier;
    setSpeedMultiplier(0);
    setSelectedPlanet({ label, description });
    targetPosition.current = position;
    setIsMoving(true);
  };

  const handleAsteroidClick = (label: string, description: string, position: [number, number, number]) => {
    previousSpeed.current = speedMultiplier;
    setSpeedMultiplier(0);
    setSelectedAsteroid({ label, description });
    targetPosition.current = position;
    setIsMoving(true);
  };

  const orbitsVisible = !selectedPlanet && !selectedAsteroid;

  return (
    <>
      <Canvas
        style={{
          width: '100vw',
          height: '100vh',
        }}
        shadows // Włącz cienie w całej scenie
      >
        {/* Sphere background */}
        <Sphere args={[1000, 1000, 1000]} position={[0, 0, 0]} receiveShadow>
          <meshBasicMaterial
            map={new THREE.TextureLoader().load('/public/background.jpg')}
            side={THREE.BackSide}
          />
        </Sphere>

        <CameraController targetPosition={targetPosition.current} isMoving={isMoving} />
        <ambientLight intensity={0.5} />
        <hemisphereLight intensity={0.3} color="white" groundColor="blue" />
        <directionalLight position={[10, 10, 10]} intensity={1} castShadow />
        <Sun /> {/* Dodaj cienie do Słońca */}

        {/* Dodajemy planet i asteroid */}
        <group>
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
                angleRef={anglesRef.current}
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
              description={asteroid.description}
              speedMultiplier={speedMultiplier}
              onClick={(label, description, position) =>
                handleAsteroidClick(label, description, position)
              }
            />
          ))}
        </group>

        {/* Efekty post-processingu */}
        <EffectComposer>
          <Bloom
            intensity={1.5}
            kernelSize={3}
            luminanceThreshold={0.5}
            luminanceSmoothing={0.1}
          />
          <DepthOfField
            focusDistance={0.1}
            focalLength={0.9}
            bokehScale={2.5}
            height={480}
          />
        </EffectComposer>
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

      <img
        src="/assets/icon-dark.png" // Zmień na właściwą ścieżkę do logo
        alt="Logo"
        className="absolute top-4 right-4 w-24 h-24 select-none"
        style={{ userSelect: 'none' }} // Wyłącza możliwość wybierania logo
      />
    </>
  );
};

export default Scene;
