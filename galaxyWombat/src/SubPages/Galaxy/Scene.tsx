// src/Scene.tsx
import React from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { planetData, PlanetData } from './orbits';

const AU = 150; // Zwiększenie wartości jednostki astronomicznej (jeszcze większy odstęp)

const MERCURY_OFFSET = 1.5; // Zwiększamy odległość Merkurego o 50%

interface PlanetProps extends PlanetData {
  isMercury?: boolean; // Dodatkowy argument dla Merkurego
}

const Planet: React.FC<PlanetProps> = ({
  rho,
  size,
  color,
  speed,
  isMercury = false,
}) => {
  const adjustedRho = isMercury ? rho * MERCURY_OFFSET : rho;

  // Zmienna do przechowywania aktualnego kąta
  const angleRef = React.useRef(0);

  // Animacja planet
  useFrame(() => {
    angleRef.current += speed; // Zwiększ kąt o prędkość
    const x = adjustedRho * AU * Math.cos(angleRef.current); // Oblicz nową pozycję X
    const z = adjustedRho * AU * Math.sin(angleRef.current); // Oblicz nową pozycję Z
    // Ustaw nową pozycję
    const planetMesh = planetRef.current as any;
    if (planetMesh) {
      planetMesh.position.set(x, 0, z);
    }
  });

  const planetRef = React.useRef<THREE.Mesh>(null);

  return (
    <mesh ref={planetRef} position={[adjustedRho * AU, 0, 0]}>
      <sphereGeometry args={[size * 2, 32, 32]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

const Orbit: React.FC<{ rho: number; isMercury?: boolean }> = ({
  rho,
  isMercury = false,
}) => {
  const adjustedRho = isMercury ? rho * MERCURY_OFFSET : rho;

  const points = [];
  for (let i = 0; i <= 360; i++) {
    const angle = (i * Math.PI) / 180;
    const x = adjustedRho * AU * Math.cos(angle);
    const y = adjustedRho * AU * Math.sin(angle);
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
  return (
    <Canvas
      camera={{ position: [0, 0, 400], fov: 60 }}
      style={{ width: '100vw', height: '100vh' }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <OrbitControls minDistance={50} maxDistance={3000} /> <Sun />
      {planetData.map((planet) => (
        <React.Fragment key={planet.label}>
          <Planet
            rho={planet.rho}
            size={planet.size}
            color={planet.color}
            speed={planet.speed}
            isMercury={planet.label === 'Mercury'}
          />
          <Orbit rho={planet.rho} isMercury={planet.label === 'Mercury'} />
        </React.Fragment>
      ))}
    </Canvas>
  );
};

export default Scene;
