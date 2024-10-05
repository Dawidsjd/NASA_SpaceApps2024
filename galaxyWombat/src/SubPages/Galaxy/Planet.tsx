// Planet.tsx
import React from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { planetData } from './orbits';

const AU = 150; // Astronomical Unit (scaled)

interface PlanetProps {
  label: string;
  rho: number;
  size: number;
  texture: string;
  speed: number; // Orbital speed
  rotationSpeed: number; // New prop for rotation speed
  speedMultiplier: number;
  onClick: (label: string, description: string) => void;
  color: string;
}

const Planet: React.FC<PlanetProps> = ({
  label,
  rho,
  size,
  texture,
  speed,
  rotationSpeed, // Add rotationSpeed prop
  speedMultiplier,
  onClick,
}) => {
  const adjustedRho = rho * AU;
  const angleRef = React.useRef(0);
  const rotationRef = React.useRef(0); // Track rotation
  const planetRef = React.useRef<THREE.Mesh>(null);

  // Load the planet texture
  const planetTexture = useLoader(THREE.TextureLoader, texture);

  useFrame(() => {
    // Orbital movement
    const x = adjustedRho * Math.cos(angleRef.current);
    const z = adjustedRho * Math.sin(angleRef.current);
    const planetMesh = planetRef.current;
    if (planetMesh) {
      planetMesh.position.set(x, 0, z);
      // Rotate the planet around its own axis
      planetMesh.rotation.y += rotationSpeed * speedMultiplier; // Use speedMultiplier for rotation
    }
    angleRef.current += speed * speedMultiplier;
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
      <meshStandardMaterial map={planetTexture} />
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
