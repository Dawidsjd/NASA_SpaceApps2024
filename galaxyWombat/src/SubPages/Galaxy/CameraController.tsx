import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';

const CameraController: React.FC<{
  targetPosition: [number, number, number] | null;
  isMoving: boolean;
}> = ({ targetPosition, isMoving }) => {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const zoomDistance = 10; // Adjust this value for how close you want to zoom in
  const smoothSpeed = 0.1; // Smoothness of the camera movement

  useFrame(() => {
    if (cameraRef.current && targetPosition && isMoving) {
      const currentPos = cameraRef.current.position.clone();
      const target = new THREE.Vector3(...targetPosition).add(
        new THREE.Vector3(0, 0, zoomDistance)
      );

      // Smoothly move the camera towards the target position
      currentPos.lerp(target, smoothSpeed);
      cameraRef.current.position.copy(currentPos);

      // Look at the target position (the planet or asteroid)
      cameraRef.current.lookAt(
        targetPosition[0],
        targetPosition[1],
        targetPosition[2]
      );

      // Stop moving if the camera is close enough to the target
      if (currentPos.distanceTo(target) < 0.5) {
        cameraRef.current.position.copy(target); // Snap to the desired position
      }
    }
  });

  return (
    <>
      <PerspectiveCamera
        ref={cameraRef}
        makeDefault
        position={[0, 180, 500]} // Initial camera position; can adjust as necessary
        fov={60}
      />
      <OrbitControls
        minDistance={10} // Set a minimum distance to prevent zooming in too close
        maxDistance={990} // Maximum distance to zoom out
        enablePan={true} // Allow panning
        enableZoom={true} // Allow zooming
      />
    </>
  );
};

export default CameraController;
