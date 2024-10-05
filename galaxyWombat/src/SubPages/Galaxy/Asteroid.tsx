import React, { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';

const AU = 150; // Astronomical Unit (scaled)

interface AsteroidProps {
  label: string;
  size: number;
  color: string;
  speed: number;
  distanceFromSun: number;
  speedMultiplier: number;
  texture: string;
  description: string; // Add description prop
  onClick: (
    label: string,
    description: string,
    position: [number, number, number]
  ) => void;
}

const Asteroid: React.FC<AsteroidProps> = ({
  label,
  size,
  color,
  texture,
  speed,
  distanceFromSun,
  speedMultiplier,
  description, // Destructure description
  onClick,
}) => {
  const angleRef = useRef(Math.random() * Math.PI * 2);
  const asteroidRef = useRef<THREE.Mesh>(null);

  const asteroidTexture = useLoader(THREE.TextureLoader, texture);

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
      onClick(label, description, [x, y, z]); // Use the passed description instead of hardcoded one
    }
  };

  return (
    <mesh ref={asteroidRef} onClick={handleClick}>
      <sphereGeometry args={[size, 16, 16]} />
      <meshStandardMaterial map={asteroidTexture} />
    </mesh>
  );
};

export default Asteroid;
