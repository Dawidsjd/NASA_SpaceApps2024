import React, { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Planet, Orbit } from './Planet';
import { planetData } from './orbits';
import { asteroidData } from './asteroids'; // Import the asteroid data
import PlanetDetails from './PlanetDetails';
import SpeedControl from './SpeedControl';
import * as THREE from 'three';

const AU = 150; // Astronomical Unit (scaled)

const Sun: React.FC = () => (
  <mesh position={[0, 0, 0]}>
    <sphereGeometry args={[5, 32, 32]} />
    <meshStandardMaterial color="yellow" />
  </mesh>
);

const CameraController: React.FC<{
  targetPosition: [number, number, number] | null;
  isMoving: boolean;
}> = ({ targetPosition, isMoving }) => {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null); // Referencja do kamery

  useFrame(() => {
    if (cameraRef.current && targetPosition && isMoving) {
      const currentPos = cameraRef.current.position;
      const target = new THREE.Vector3(...targetPosition);

      currentPos.lerp(target, 0.1); // Płynne przejście
      cameraRef.current.lookAt(0, 0, 0); // Ustaw kamerę, aby patrzyła na Słońce
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

const Scene: React.FC = () => {
  const [selectedPlanet, setSelectedPlanet] = useState<null | {
    label: string;
    description: string;
  } | null>(null);

  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1);
  const targetPosition = useRef<[number, number, number] | null>(null); // Referencja do pozycji docelowej kamery
  const [isMoving, setIsMoving] = useState<boolean>(false); // Flaga informująca, czy kamera ma się poruszać

  const handleCloseInfo = () => {
    setSelectedPlanet(null);
    setIsMoving(false); // Zatrzymaj ruch kamery po zamknięciu szczegółów
  };

  const handlePlanetClick = (
    label: string,
    description: string,
    position: [number, number, number]
  ) => {
    setSelectedPlanet({ label, description });
    targetPosition.current = position; // Ustaw docelową pozycję kamery
    setIsMoving(true); // Rozpocznij ruch kamery
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
              texture={planet.texture} // Dodaj teksturę
              speed={planet.speed}
              speedMultiplier={speedMultiplier}
              onClick={(label, description) =>
                handlePlanetClick(label, description, [
                  planet.rho * AU * Math.cos(planet.speed), // Oblicz pozycję X
                  90, // Y
                  planet.rho * AU * Math.sin(planet.speed), // Oblicz pozycję Z
                ])
              }
            />

            <Orbit rho={planet.rho} color={planet.color} />
          </React.Fragment>
        ))}

        {/* Render asteroids */}
        {asteroidData.map((asteroid) => (
          <React.Fragment key={asteroid.label}>
            <Planet
              label={asteroid.label}
              rho={0.8} // Set a fixed distance for asteroids
              size={asteroid.size}
              color={asteroid.color}
              speed={asteroid.speed}
              speedMultiplier={speedMultiplier}
              onClick={(label, description) =>
                setSelectedPlanet({ label, description })
              }
            />
            <Orbit rho={0.8} color={asteroid.color} />
          </React.Fragment>
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
