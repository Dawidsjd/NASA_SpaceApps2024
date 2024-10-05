// src/Scene.tsx
import React, { useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { planetData } from './orbits';
import PlanetDetails from './PlanetDetails';

const AU = 150; // Astronomical Unit (scaled)

interface PlanetProps {
  label: string;
  rho: number;
  size: number;
  color: string;
  speed: number;
  onClick: (label: string, description: string) => void;
}

const Planet: React.FC<PlanetProps> = ({
  label,
  rho,
  size,
  color,
  speed,
  onClick,
}) => {
  const adjustedRho = rho * AU; // Distance calculation
  const angleRef = React.useRef(0);
  const planetRef = React.useRef<THREE.Mesh>(null);

  useFrame(() => {
    // Movement is paused for now
    const x = adjustedRho * Math.cos(angleRef.current);
    const z = adjustedRho * Math.sin(angleRef.current);
    const planetMesh = planetRef.current;
    if (planetMesh) {
      planetMesh.position.set(x, 0, z);
    }
  });

  return (
    <mesh
      ref={planetRef}
      onClick={() =>
        onClick(
          label,
          planetData.find((p) => p.label === label)?.description ||
            'No description available.'
        )
      }
    >
      <sphereGeometry args={[size * 2, 32, 32]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

const Orbit: React.FC<{ rho: number }> = ({ rho }) => {
  const points = [];
  for (let i = 0; i <= 360; i++) {
    const angle = (i * Math.PI) / 180;
    const x = rho * AU * Math.cos(angle);
    const y = rho * AU * Math.sin(angle);
    points.push(new THREE.Vector3(x, 0, y));
  }
  const orbitGeometry = new THREE.BufferGeometry().setFromPoints(points);
  return (
    <line>
      <bufferGeometry attach="geometry" {...orbitGeometry} />
      <lineBasicMaterial attach="material" color="white" />
    </line>
  );
};

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

  const handleCloseInfo = () => {
    setSelectedPlanet(null);
  };

  return (
    <Canvas
      camera={{ position: [0, 0, 400], fov: 60 }}
      style={{ width: '100vw', height: '100vh' }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <OrbitControls minDistance={50} maxDistance={3000} />

      <Sun />

      {planetData.map((planet) => {
        return (
          <React.Fragment key={planet.label}>
            <Planet
              label={planet.label}
              rho={planet.rho}
              size={planet.size}
              color={planet.color}
              speed={planet.speed}
              onClick={setSelectedPlanet}
            />
            <Orbit rho={planet.rho} />
          </React.Fragment>
        );
      })}

      {/* Display planet information in a popup */}
      {selectedPlanet && (
        <PlanetDetails
          label={selectedPlanet.label}
          description={selectedPlanet.description}
          onClose={handleCloseInfo}
        />
      )}
    </Canvas>
  );
};

export default Scene;