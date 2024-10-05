import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Planet, Orbit } from './Planet'; // Updated import
import { planetData } from './orbits';
import PlanetDetails from './PlanetDetails';
import SpeedControl from './SpeedControl'; // Import SpeedControl

const AU = 150; // Astronomical Unit (scaled)

const Scene: React.FC = () => {
  const [selectedPlanet, setSelectedPlanet] = useState<{
    label: string;
    description: string;
  } | null>(null);

  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1); // State for speed multiplier

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
        <pointLight position={[10, 10, 10]} />
        <OrbitControls minDistance={50} maxDistance={3000} />

        {planetData.map((planet) => (
          <React.Fragment key={planet.label}>
            <Planet
              label={planet.label}
              rho={planet.rho}
              size={planet.size}
              color={planet.color}
              speed={planet.speed}
              speedMultiplier={speedMultiplier} // Pass speed multiplier
              onClick={(label, description) =>
                setSelectedPlanet({ label, description })
              }
            />
            <Orbit rho={planet.rho} color={planet.color} />
          </React.Fragment>
        ))}
      </Canvas>

      {/* Speed control */}
      <SpeedControl
        speedMultiplier={speedMultiplier}
        onChange={setSpeedMultiplier} // Update speedMultiplier on slider change
      />

      {/* Popup planet details */}
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
