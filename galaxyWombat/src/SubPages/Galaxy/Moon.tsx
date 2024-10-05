// Moon.tsx
import React from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface MoonProps {
  distanceFromEarth: number;
  size: number;
  color: string;
  speed: number;
}

const Moon: React.FC<MoonProps> = ({
  distanceFromEarth,
  size,
  color,
  speed,
}) => {
  const moonRef = React.useRef<THREE.Mesh>(null);
  const angleRef = React.useRef(0);

  useFrame(() => {
    const x = distanceFromEarth * Math.cos(angleRef.current);
    const z = distanceFromEarth * Math.sin(angleRef.current);
    const moonMesh = moonRef.current;

    if (moonMesh) {
      moonMesh.position.set(x, 0, z); // Ustawienie pozycji księżyca wokół Ziemi
    }

    angleRef.current += speed; // Zwiększanie kąta w każdej klatce, aby księżyc się obracał
  });

  return (
    <mesh ref={moonRef}>
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

export default Moon;
