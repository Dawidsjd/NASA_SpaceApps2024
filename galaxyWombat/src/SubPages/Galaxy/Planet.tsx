// Planet.tsx
import React from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { planetData } from './orbits';

const AU = 150; // Astronomical Unit (scaled)

interface PlanetProps {
  label: string;
  rho: number;
  size: number;
  color: string;
  speed: number;
  speedMultiplier: number; // New prop for speed multiplier
  onClick: (label: string, description: string) => void;
}

const Planet: React.FC<PlanetProps> = ({
  label,
  rho,
  size,
  color,
  speed,
  speedMultiplier, // Use speedMultiplier here
  onClick,
}) => {
  const adjustedRho = rho * AU; // Distance calculation
  const angleRef = React.useRef(0);
  const planetRef = React.useRef<THREE.Mesh>(null);

  useFrame(() => {
    const x = adjustedRho * Math.cos(angleRef.current);
    const z = adjustedRho * Math.sin(angleRef.current);
    const planetMesh = planetRef.current;
    if (planetMesh) {
      planetMesh.position.set(x, 0, z);
    }
    angleRef.current += speed * speedMultiplier; // Update angle based on speed and multiplier
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

const Orbit: React.FC<{ rho: number; color: string }> = ({ rho, color }) => {
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
      <lineBasicMaterial attach="material" color={color} />
    </line>
  );
};

export { Planet, Orbit };
