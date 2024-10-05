import React from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { planetData } from './orbits';

const AU = 150; // Astronomical Unit (scaled)

interface PlanetProps {
  label: string;
  rho: number; // Orbital radius in AU
  size: number; // Size of the planet
  texture: string; // Texture file path
  speed: number; // Orbital speed
  rotationSpeed: number; // New prop for rotation speed
  speedMultiplier: number; // Speed multiplier for animation
  onClick: (label: string, description: string) => void; // Callback when planet is clicked
  color: string; // Color of the orbit line
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
}) => {
  const adjustedRho = rho * AU; // Adjusted radius in 3D space
  const angleRef = React.useRef(0); // Reference for orbital angle
  const planetRef = React.useRef<THREE.Mesh>(null); // Reference for the planet mesh

  // Load the planet texture
  const planetTexture = useLoader(THREE.TextureLoader, texture);

  // Use frame for position and rotation updates
  useFrame(() => {
    // Calculate the planet's orbital position
    const angle = angleRef.current; // Reference for orbital angle
    const x = adjustedRho * Math.cos(angle); // Calculate x position
    const z = adjustedRho * Math.sin(angle); // Calculate z position
    const planetMesh = planetRef.current;

    if (planetMesh) {
      planetMesh.position.set(x, 0, z); // Set the position of the planet

      // Rotate the planet around its own axis
      planetMesh.rotation.y += rotationSpeed * speedMultiplier; // Use speedMultiplier for rotation
    }

    // Update the angle for the next frame
    angleRef.current += speed * speedMultiplier; // Update angle for next frame
  });

  const handleClick = () => {
    const description =
      planetData.find((p) => p.label === label)?.description ||
      'No description available.';
    onClick(label, description); // Call the click handler with the planet label and description
  };

  return (
    <mesh
      ref={planetRef}
      onClick={handleClick} // Trigger onClick when the planet is clicked
    >
      <sphereGeometry args={[size * 2, 32, 32]} /> {/* Scale the planet size */}
      <meshStandardMaterial map={planetTexture} /> {/* Apply texture */}
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
