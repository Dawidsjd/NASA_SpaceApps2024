// Asteroid.tsx

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const AU = 150; // Astronomical Unit (scaled)

interface AsteroidProps {
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
}

const Asteroid: React.FC<AsteroidProps> = ({
  label,
  size,
  color,
  speed,
  distanceFromSun,
  description,
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

export default Asteroid;
