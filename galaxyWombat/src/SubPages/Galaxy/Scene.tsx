// Scene.tsx

import React, { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Planet, Orbit } from './Planet';
import { planetData } from './orbits';
import { asteroidData } from './asteroids'; // Import the asteroid data
import PlanetDetails from './PlanetDetails';
import SpeedControl from './SpeedControl';

const AU = 150; // Astronomical Unit (scaled)

const Sun: React.FC = () => (
  <mesh position={[0, 0, 0]}>
    <sphereGeometry args={[5, 32, 32]} />
    <meshStandardMaterial color="yellow" />
  </mesh>
);

const Scene: React.FC = () => {
  const [selectedPlanet, setSelectedPlanet] = useState<null | {
    label: string;
    description: string;
  }>(null);
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1);

  const handleCloseInfo = () => {
    setSelectedPlanet(null);
  };

  return (
    <>
      <Canvas
        camera={{ position: [0, 0, 400], fov: 60 }}
        style={{
          width: '100vw',
          height: '100vh',
          background: 'url(/public/background.jpg)',
        }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <OrbitControls minDistance={50} maxDistance={3000} />

        <Sun />

        {planetData.map((planet) => (
          <React.Fragment key={planet.label}>
            <Planet
              label={planet.label}
              rho={planet.rho}
              size={planet.size}
              color={planet.color}
              speed={planet.speed}
              speedMultiplier={speedMultiplier}
              onClick={(label, description) =>
                setSelectedPlanet({ label, description })
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
