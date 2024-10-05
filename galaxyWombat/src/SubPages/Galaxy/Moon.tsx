import React from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface MoonProps {
  distanceFromEarth: number;
  size: number;
  color: string;
  speed: number;
  earthAngleRef: React.MutableRefObject<number>; // Referencja do kąta obrotu Ziemi
}

const Moon: React.FC<MoonProps> = ({
  distanceFromEarth,
  size,
  color,
  speed,
  earthAngleRef, // Dodajemy referencję do kąta obrotu Ziemi
}) => {
  const moonRef = React.useRef<THREE.Mesh>(null);

  useFrame(() => {
    const moonMesh = moonRef.current;

    if (moonMesh) {
      // Ustawiamy Księżyc na linii prostej względem Ziemi
      const x = distanceFromEarth * Math.cos(earthAngleRef.current); // Zależne od kąta Ziemi
      const z = distanceFromEarth * Math.sin(earthAngleRef.current); // Zależne od kąta Ziemi
      moonMesh.position.set(x, 0, z); // Pozycja Księżyca wokół Ziemi
    }
  });

  return (
    <mesh ref={moonRef}>
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

export default Moon;
