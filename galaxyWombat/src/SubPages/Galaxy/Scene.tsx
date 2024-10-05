import React, { useState, useRef } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Planet, Orbit as PlanetOrbit } from './Planet';
import { planetData } from './orbits';
import { asteroidData } from './asteroids';
import PlanetDetails from './PlanetDetails';
import AsteroidDetails from './AsteroidDetails';
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
  const zoomDistance = 10; // Adjust this value for how close you want to zoom in
  const smoothSpeed = 0.1; // Smoothness of the camera movement

  useFrame(() => {
    if (cameraRef.current && targetPosition && isMoving) {
      const currentPos = cameraRef.current.position.clone();
      const target = new THREE.Vector3(...targetPosition).add(
        new THREE.Vector3(0, 0, zoomDistance)
      );

      // Smoothly move the camera towards the target position
      currentPos.lerp(target, smoothSpeed);
      cameraRef.current.position.copy(currentPos);

      // Look at the target position (the planet or asteroid)
      cameraRef.current.lookAt(
        targetPosition[0],
        targetPosition[1],
        targetPosition[2]
      );

      // Stop moving if the camera is close enough to the target
      if (currentPos.distanceTo(target) < 0.5) {
        cameraRef.current.position.copy(target); // Snap to the desired position
      }
    }
  });

  return (
    <>
      <PerspectiveCamera
        ref={cameraRef}
        makeDefault
        position={[0, 0, 500]} // Initial camera position; can adjust as necessary
        fov={60}
      />
      <OrbitControls
        minDistance={10} // Set a minimum distance to prevent zooming in too close
        maxDistance={3000} // Maximum distance to zoom out
        enablePan={true} // Allow panning
        enableZoom={true} // Allow zooming
      />
    </>
  );
};

const Asteroid: React.FC<{
  label: string;
  size: number;
  color: string;
  speed: number;
  distanceFromSun: number;
  description: string; // Add description prop
  speedMultiplier: number;
  onClick: (
    label: string,
    description: string,
    position: [number, number, number]
  ) => void; // Include position and description
}> = ({
  label,
  size,
  color,
  speed,
  texture,
  distanceFromSun,
  description, // Use description from asteroid data
  speedMultiplier,
  onClick,
}) => {
  const angleRef = useRef(Math.random() * Math.PI * 2);
  const asteroidRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    const radius = distanceFromSun * AU;
    const x = radius * Math.cos(angleRef.current);
    const z = radius * Math.sin(angleRef.current);
    const y = Math.sin(angleRef.current * 2) * 0.5; // Optional vertical movement

    if (asteroidRef.current) {
      asteroidRef.current.position.set(x, y, z);
    }

    angleRef.current += speed * speedMultiplier;
  });

  const handleClick = () => {
    const radius = distanceFromSun * AU;
    const x = radius * Math.cos(angleRef.current);
    const z = radius * Math.sin(angleRef.current);
    const y = Math.sin(angleRef.current * 2) * 0.5;

    if (asteroidRef.current) {
      onClick(label, description, [x, y, z]); // Pass correct description
    }
  };

  return (
    <mesh ref={asteroidRef} onClick={handleClick}>
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
    previousSpeed.current = speedMultiplier; // Zapisujemy aktualną prędkość przed zatrzymaniem
    setSpeedMultiplier(0); // Zatrzymujemy prędkość po kliknięciu
    setSelectedPlanet({ label, description });
    targetPosition.current = position; // Ustawiamy pozycję celu dla kamery
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
              angleRef={anglesRef.current} // Przekaż angleRef
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
            onClick={
              (label, description, position) =>
                handleAsteroidClick(label, description, position) // Ensure description is passed
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
          description={selectedAsteroid.description}
          onClose={handleCloseAsteroidInfo}
        />
      )}
    </>
  );
};

export default Scene;
