import React, { useState, useRef } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Planet, Orbit as PlanetOrbit } from './Planet';
import { planetData } from './orbits';
import { asteroidData } from './asteroids'; // Import the asteroid data
import PlanetDetails from './PlanetDetails';
import SpeedControl from './SpeedControl';
import * as THREE from 'three';

const AU = 150; // Astronomical Unit (scaled)

const Sun: React.FC = () => {
  // Załaduj teksturę Słońca
  const sunTexture = useLoader(THREE.TextureLoader, '/assets/sun.jpg'); // Upewnij się, że ścieżka do tekstury jest poprawna

  return (
    <mesh position={[0, 0, 0]}>
      <sphereGeometry args={[5, 32, 32]} />
      <meshStandardMaterial map={sunTexture} /> {/* Użyj załadowanej tekstury */}
    </mesh>
  );
};


const CameraController: React.FC<{
  targetPosition: [number, number, number] | null;
  isMoving: boolean;
}> = ({ targetPosition, isMoving }) => {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null); // Camera reference

  useFrame(() => {
    if (cameraRef.current && targetPosition && isMoving) {
      const currentPos = cameraRef.current.position;
      const target = new THREE.Vector3(...targetPosition);

      currentPos.lerp(target, 0.1); // Smooth transition
      cameraRef.current.lookAt(0, 0, 0); // Look at the Sun
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
  distanceFromSun: number; // New prop for distance
}> = ({ label, size, color, speed, distanceFromSun }) => {
  const angleRef = React.useRef(0);
  const asteroidRef = React.useRef<THREE.Mesh>(null);

  // Update position over time
  useFrame(() => {
    const radius = distanceFromSun * AU; // Calculate radius based on distance from Sun
    const x = radius * Math.cos(angleRef.current); // X position
    const z = radius * Math.sin(angleRef.current); // Z position
    const asteroidMesh = asteroidRef.current;

    if (asteroidMesh) {
      asteroidMesh.position.set(x, 0, z); // Update position
    }

    angleRef.current += speed; // Update angle based on speed
  });

  return (
    <mesh ref={asteroidRef}>
      <sphereGeometry args={[size, 16, 16]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

const Scene: React.FC = () => {
  const [selectedPlanet, setSelectedPlanet] = useState<null | {
    label: string;
    description: string;
  } | null>(null);

  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1);
  const targetPosition = useRef<[number, number, number] | null>(null); // Target camera position
  const [isMoving, setIsMoving] = useState<boolean>(false); // Camera movement flag

  const handleCloseInfo = () => {
    setSelectedPlanet(null);
    setIsMoving(false); // Stop camera movement when closing details
  };

  const handlePlanetClick = (
    label: string,
    description: string,
    position: [number, number, number]
  ) => {
    setSelectedPlanet({ label, description });
    targetPosition.current = position; // Set target camera position
    setIsMoving(true); // Start camera movement
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
              texture={planet.texture} // Add texture
              speed={planet.speed}
              speedMultiplier={speedMultiplier}
              onClick={(label, description) =>
                handlePlanetClick(label, description, [
                  planet.rho * AU * Math.cos(planet.speed), // Calculate X position
                  90, // Y
                  planet.rho * AU * Math.sin(planet.speed), // Calculate Z position
                ])
              }
            />

            <PlanetOrbit rho={planet.rho} color={planet.color} />
          </React.Fragment>
        ))}

        {/* Render asteroids between Earth's and Jupiter's orbits */}
        {asteroidData.map((asteroid) => (
          <Asteroid
            key={asteroid.label}
            label={asteroid.label}
            size={1}
            color={asteroid.color} // Use defined color
            speed={asteroid.speed}
            distanceFromSun={asteroid.distanceFromSun} // Pass distance
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
          onClose={handleCloseInfo}
        />
      )}
    </>
  );
};

export default Scene;
