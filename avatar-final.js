import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

console.log('Avatar loaded!');

const container = document.getElementById('avatar-container');
if (container) {
  loadAvatar();
} else {
  document.addEventListener('DOMContentLoaded', loadAvatar);
}

function loadAvatar() {
  const container = document.getElementById('avatar-container');
  if (!container) {
    setTimeout(loadAvatar, 100);
    return;
  }

  const loader = new GLTFLoader();
  loader.load('46936_autosave.glb', (gltf) => {
    const width = container.clientWidth || 400;
    const height = container.clientHeight || 500;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height);
    camera.position.set(0, 1, 3);  // Moved back to see full body

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.target.set(0, 0.9, 0);  // Look at center of body
    controls.update();

    scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(2, 2, 2);
    scene.add(light);

    const avatar = gltf.scene;
    scene.add(avatar);

    const mixer = new THREE.AnimationMixer(avatar);
    if (gltf.animations.length > 0) {
      mixer.clipAction(gltf.animations[0]).play();
    }

    const clock = new THREE.Clock();
    function animate() {
      requestAnimationFrame(animate);
      mixer.update(clock.getDelta());
      controls.update();
      renderer.render(scene, camera);
    }
    animate();
    console.log('3D Avatar ready!');
  });
}
