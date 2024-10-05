import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Planet, Orbit } from './Planet';
import { planetData } from './orbits';
import * as THREE from 'three';
import PlanetDetails from './PlanetDetails';
import SpeedControl from './SpeedControl';
import Moon from './Moon';

const AU = 150; // Astronomical Unit (scaled)

const Sun: React.FC = () => (
  <mesh position={[0, 0, 0]}>
    <sphereGeometry args={[5, 32, 32]} />
    <meshStandardMaterial color="yellow" />
  </mesh>
);

const Scene: React.FC = () => {
  const [selectedPlanet, setSelectedPlanet] = useState<{
    label: string;
    description: string;
  } | null>(null);

  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1);

  // Referencja do kąta obrotu Ziemi
  const earthAngleRef = React.useRef(0);

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
              // Ziemia będzie miała swój własny kąt obrotu
              onUpdateAngle={(angle) => {
                if (planet.label === 'Earth') {
                  earthAngleRef.current = angle; // Zaktualizuj kąt Ziemi
                }
              }}
            />
            <Orbit rho={planet.rho} color={planet.color} />

            {/* Księżyc wokół Ziemi */}
            {planet.label === 'Earth' && (
              <Moon
                distanceFromEarth={25} // Odległość Księżyca od Ziemi
                size={0.27} // Proporcjonalna wielkość Księżyca względem Ziemi
                color="blue" // Kolor Księżyca
                speed={0.02} // Prędkość obrotu Księżyca wokół Ziemi
                earthAngleRef={earthAngleRef} // Referencja do kąta obrotu Ziemi
              />
            )}
          </React.Fragment>
        ))}
      </Canvas>

      {/* Speed control */}
      <SpeedControl
        speedMultiplier={speedMultiplier}
        onChange={setSpeedMultiplier}
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
