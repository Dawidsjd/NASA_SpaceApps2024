const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

function updateRocketRotation(event) {
  const rect = renderer.domElement.getBoundingClientRect();

  mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  
  const planeZ = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
  const point = new THREE.Vector3();
  raycaster.ray.intersectPlane(planeZ, point);
  console.log("TEST WORK");

  ufo.lookAt(point);
}
console.log("TEST LOG  script");
document.addEventListener('mousemove', updateRocketRotation, false);
