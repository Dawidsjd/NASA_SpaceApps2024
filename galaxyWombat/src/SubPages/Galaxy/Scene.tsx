// Scene.tsx
import React, { useState, useRef } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Planet, Orbit as PlanetOrbit } from './Planet';
import { planetData } from './orbits';
import { asteroidData } from './asteroids';
import PlanetDetails from './PlanetDetails';
import AsteroidDetails from './AsteroidDetails'; // Import AsteroidDetails
import SpeedControl from './SpeedControl';
import * as THREE from 'three';

const AU = 150; // Astronomical Unit (scaled)

const Sun: React.FC = () => {
  const sunTexture = useLoader(THREE.TextureLoader, '/assets/sun.jpg');

  return (
    <mesh position={[0, 0, 0]}>
      <sphereGeometry args={[5, 32, 32]} />
      <meshStandardMaterial map={sunTexture} />
    </mesh>
  );
};

const CameraController: React.FC<{
  targetPosition: [number, number, number] | null;
  isMoving: boolean;
}> = ({ targetPosition, isMoving }) => {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);

  useFrame(() => {
    if (cameraRef.current && targetPosition && isMoving) {
      const currentPos = cameraRef.current.position;
      const target = new THREE.Vector3(...targetPosition);

      currentPos.lerp(target, 0.1);
      cameraRef.current.lookAt(0, 0, 0);
    }
  });

  return (
    <>
      <PerspectiveCamera
        ref={cameraRef}
        makeDefault
        position={[0, 0, 400]}
        fov={60}
      />
      <OrbitControls minDistance={50} maxDistance={3000} />
    </>
  );
};

const Asteroid: React.FC<{
  label: string;
  size: number;
  color: string;
  speed: number;
  distanceFromSun: number;
  speedMultiplier: number;
  onClick: (label: string, description: string) => void; // New onClick prop
}> = ({
  label,
  size,
  color,
  speed,
  distanceFromSun,
  speedMultiplier,
  onClick,
}) => {
  const angleRef = React.useRef(Math.random() * Math.PI * 2);
  const asteroidRef = React.useRef<THREE.Mesh>(null);

  useFrame(() => {
    const radius = distanceFromSun * AU;
    const x = radius * Math.cos(angleRef.current);
    const z = radius * Math.sin(angleRef.current);
    const y = Math.sin(angleRef.current * 2) * 0.5;
    const asteroidMesh = asteroidRef.current;

    if (asteroidMesh) {
      asteroidMesh.position.set(x, y, z);
    }

    angleRef.current += speed * speedMultiplier;
  });

  return (
    <mesh ref={asteroidRef} onClick={() => onClick(label)}>
      {' '}
      {/* Handle click */}
      <sphereGeometry args={[size, 16, 16]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

const Scene: React.FC = () => {
  const [selectedPlanet, setSelectedPlanet] = useState<null | {
    label: string;
    description: string;
  }>(null);
  const [selectedAsteroid, setSelectedAsteroid] = useState<null | {
    label: string;
    description: string;
  }>(null); // New state for selected asteroid
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1);
  const targetPosition = useRef<[number, number, number] | null>(null);
  const [isMoving, setIsMoving] = useState<boolean>(false);

  const handleClosePlanetInfo = () => {
    setSelectedPlanet(null);
    setIsMoving(false);
  };

  const handleCloseAsteroidInfo = () => {
    setSelectedAsteroid(null); // Reset asteroid selection
  };

  const handlePlanetClick = (
    label: string,
    description: string,
    position: [number, number, number]
  ) => {
    setSelectedPlanet({ label, description });
    targetPosition.current = position;
    setIsMoving(true);
  };

  const handleAsteroidClick = (label: string, description: string) => {
    setSelectedAsteroid({ label, description }); // Set selected asteroid
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
        <pointLight position={[10, 10, 10]} />

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
              speedMultiplier={speedMultiplier}
              onClick={(label, description) =>
                handlePlanetClick(label, description, [
                  planet.rho * AU * Math.cos(planet.speed),
                  90,
                  planet.rho * AU * Math.sin(planet.speed),
                ])
              }
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
            speedMultiplier={speedMultiplier}
            onClick={(label) =>
              handleAsteroidClick(label, asteroid.description)
            } // Pass description
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

      {selectedAsteroid && ( // Render AsteroidDetails if an asteroid is selected
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
