import React, { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Trail } from '@react-three/drei';
import * as THREE from 'three';

const AU = 150;

interface AsteroidProps {
  label: string;
  size: number;
  color: string;
  speed: number;
  distanceFromSun: number;
  speedMultiplier: number;
  texture: string;
  description: string;
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
  description,
  onClick,
}) => {
  const angleRef = useRef(Math.random() * Math.PI * 2);
  const asteroidRef = useRef<THREE.Mesh>(null);

  const asteroidTexture = useLoader(THREE.TextureLoader, texture);

  useFrame(() => {
    const radius = distanceFromSun * AU;
    const x = radius * Math.cos(angleRef.current);
    const z = radius * Math.sin(angleRef.current);
    const y = Math.sin(angleRef.current * 2) * 0.5;

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
      onClick(label, description, [x, y, z]);
    }
  };

  return (
    <>
      {/* Trail effect */}
      <Trail
        width={5} // Increase the thickness of the trail
        length={8} // Increase the length of the trail
        decay={0.9} // How quickly the trail fades away
        color={color}
        attenuation={(t) => t * t}
      >
        <mesh ref={asteroidRef} onClick={handleClick}>
          <sphereGeometry args={[size, 16, 16]} />
          <meshStandardMaterial map={asteroidTexture} />
        </mesh>
      </Trail>
    </>
  );
};

export default Asteroid;
