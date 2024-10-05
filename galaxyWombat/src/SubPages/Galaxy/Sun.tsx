import { useLoader } from '@react-three/fiber';
import * as THREE from 'three';

const Sun: React.FC = () => {
  const sunTexture = useLoader(THREE.TextureLoader, '/assets/sun.jpg');

  return (
    <mesh position={[0, 0, 0]}>
      <sphereGeometry args={[5, 32, 32]} />
      <meshStandardMaterial map={sunTexture} />
    </mesh>
  );
};

export default Sun;
