// Global variables for Three.js
let scene, camera, renderer, heartMesh;

init();
animate();

function init() {
  // Create scene and camera
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 5;

  // Renderer settings
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById("container").appendChild(renderer.domElement);

  // Create heart shape using Three.js Shape
  const x = 0,
    y = 0;
  const heartShape = new THREE.Shape();
  heartShape.moveTo(x + 0.25, y + 0.25);
  heartShape.bezierCurveTo(x + 0.25, y + 0.25, x + 0.2, y, x, y);
  heartShape.bezierCurveTo(x - 0.3, y, x - 0.3, y + 0.35, x - 0.3, y + 0.35);
  heartShape.bezierCurveTo(x - 0.3, y + 0.55, x - 0.15, y + 0.77, x + 0.25, y + 0.95);
  heartShape.bezierCurveTo(x + 0.6, y + 0.77, x + 0.8, y + 0.55, x + 0.8, y + 0.35);
  heartShape.bezierCurveTo(x + 0.8, y + 0.35, x + 0.8, y, x + 0.5, y);
  heartShape.bezierCurveTo(x + 0.35, y, x + 0.25, y + 0.25, x + 0.25, y + 0.25);

  // Extrude settings for a 3D effect
  const extrudeSettings = {
    depth: 0.5,
    bevelEnabled: true,
    bevelSegments: 2,
    steps: 2,
    bevelSize: 0.1,
    bevelThickness: 0.1,
  };

  const geometry = new THREE.ExtrudeGeometry(heartShape, extrudeSettings);
  const material = new THREE.MeshPhongMaterial({
    color: 0xff4081,
    shininess: 100,
  });
  heartMesh = new THREE.Mesh(geometry, material);
  scene.add(heartMesh);

  // Lighting for the scene
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);
  const pointLight = new THREE.PointLight(0xffffff, 1);
  pointLight.position.set(5, 5, 5);
  scene.add(pointLight);

  // Handle window resize events
  window.addEventListener("resize", onWindowResize, false);

  // Reveal button using GSAP for a smooth fade-in of additional text
  document.getElementById("reveal").addEventListener("click", () => {
    gsap.to("#more", { opacity: 1, duration: 2 });
  });
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);
  // Slowly rotate the heart for a stunning effect
  heartMesh.rotation.y += 0.01;
  renderer.render(scene, camera);
}
