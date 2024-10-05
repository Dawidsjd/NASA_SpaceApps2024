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
  speed: number;
  rotationSpeed: number;
  speedMultiplier: number;
  onClick: (label: string, description: string, position: [number, number, number]) => void;
  color: string;
  angleRef: Map<string, number>; // Nowa właściwość angleRef
}


const Planet: React.FC<PlanetProps> = ({
  label,
  rho,
  size,
  texture,
  speed,
  rotationSpeed,
  speedMultiplier,
  onClick,
  angleRef, // Dodaj angleRef tutaj
}) => {
  const adjustedRho = rho * AU; // Adjusted radius in 3D space
  const planetRef = React.useRef<THREE.Mesh>(null);

  // Load the planet texture
  const planetTexture = useLoader(THREE.TextureLoader, texture);

  // Use frame for position and rotation updates
  useFrame(() => {
    let angle = angleRef.get(label) || 0; // Pobierz kąt dla danej planety z mapy
    const x = adjustedRho * Math.cos(angle);
    const z = adjustedRho * Math.sin(angle);
    const planetMesh = planetRef.current;

    if (planetMesh) {
      planetMesh.position.set(x, 0, z);
      planetMesh.rotation.y += rotationSpeed * speedMultiplier;
    }

    angle += speed * speedMultiplier; // Zaktualizuj kąt
    angleRef.set(label, angle); // Zapisz zaktualizowany kąt w mapie
  });

  const handleClick = () => {
    const angle = angleRef.get(label) || 0; // Pobierz aktualny kąt planety
    const x = adjustedRho * Math.cos(angle);
    const z = adjustedRho * Math.sin(angle);
    onClick(label, 'Planet Description', [x, 0, z]);
  };

  return (
    <mesh ref={planetRef} onClick={handleClick}>
      <sphereGeometry args={[size * 2, 32, 32]} />
      <meshStandardMaterial map={planetTexture} />
    </mesh>
  );
};


const Orbit: React.FC<{ rho: number; color: string }> = ({ rho, color }) => {
  const points = [];
  for (let i = 0; i <= 360; i++) {
    const angle = (i * Math.PI) / 180; // Convert degrees to radians
    const x = rho * AU * Math.cos(angle); // Calculate x position on the orbit
    const z = rho * AU * Math.sin(angle); // Calculate z position on the orbit
    points.push(new THREE.Vector3(x, 0, z)); // Add point to orbit
  }

  const orbitGeometry = new THREE.BufferGeometry().setFromPoints(points); // Create geometry from points

  return (
    <line>
      <bufferGeometry attach="geometry" {...orbitGeometry} />{' '}
      {/* Attach the geometry to the line */}
      <lineBasicMaterial attach="material" color={color} />{' '}
      {/* Set the orbit color */}
    </line>
  );
};

export { Planet, Orbit };
