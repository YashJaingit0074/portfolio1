import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

let scene, camera, renderer, controls;

async function initAvatar() {
  console.log('=== AVATAR INIT START ===');
  const container = document.getElementById('avatar-container');
  const loadingElement = document.getElementById('avatar-loading');
  
  if (!container) {
    console.error('❌ Avatar container not found!');
    return;
  }
  
  console.log('✅ Container found');
  console.log('Container size:', container.clientWidth, 'x', container.clientHeight);
  
  // Wait for container to have size
  if (container.clientWidth === 0 || container.clientHeight === 0) {
    console.warn('⏳ Container has no size, waiting...');
    await new Promise(resolve => setTimeout(resolve, 100));
    console.log('New container size:', container.clientWidth, 'x', container.clientHeight);
  }

  // Setup scene
  scene = new THREE.Scene();
  scene.background = null;

  // Setup camera
  camera = new THREE.PerspectiveCamera(
    50,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  );
  camera.position.set(0, 1, 3);
  camera.lookAt(0, 0, 0);
  console.log('Camera position:', camera.position);

  // Setup renderer
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.8;
  container.appendChild(renderer.domElement);

  // Setup controls
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.1;
  controls.enableZoom = true;
  controls.minDistance = 2.5;
  controls.maxDistance = 10;
  controls.update();

  // Lighting - increase brightness to ensure visibility
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);
  console.log('Added ambient light');

  const keyLight = new THREE.DirectionalLight(0xffffff, 1.2);
  keyLight.position.set(5, 10, 5);
  scene.add(keyLight);

  const fillLight = new THREE.DirectionalLight(0xffffff, 0.6);
  fillLight.position.set(-5, 5, -5);
  scene.add(fillLight);

  const frontLight = new THREE.DirectionalLight(0xffffff, 0.5);
  frontLight.position.set(0, 5, 10);
  scene.add(frontLight);

  // Load model
  try {
    console.log('Loading 3D model from /46936_autosave.glb');
    const loader = new GLTFLoader();
    
    const gltf = await new Promise((resolve, reject) => {
      loader.load(
        '/46936_autosave.glb',
        resolve,
        (xhr) => {
          const progress = Math.round((xhr.loaded / xhr.total) * 100);
          if (loadingElement) {
            loadingElement.innerText = `LOADING... ${progress}%`;
          }
        },
        reject
      );
    });

    console.log('Model loaded successfully:', gltf);
    
    const avatar = gltf.scene;
    console.log('Avatar scene:', avatar);
    console.log('Avatar children:', avatar.children.length);
    
    // Calculate bounds
    const box = new THREE.Box3().setFromObject(avatar);
    const size = box.getSize(new THREE.Vector3());
    console.log('Avatar size:', size);
    const maxDimension = Math.max(size.x, size.y, size.z);
    
    // Scale appropriately
    const scale = 1.5 / maxDimension;
    console.log('Scale factor:', scale);
    avatar.scale.setScalar(scale);
    avatar.position.set(0, 0, 0);

    // Enhance materials
    avatar.traverse((child) => {
      if (child.isMesh && child.material) {
        const materials = Array.isArray(child.material) ? child.material : [child.material];
        materials.forEach((mat) => {
          mat.needsUpdate = true;
          if (mat.color) {
            mat.color.multiplyScalar(0.7);
          }
          if (mat.metalness !== undefined) mat.metalness = 0.4;
          if (mat.roughness !== undefined) mat.roughness = 0.6;
        });
      }
    });

    scene.add(avatar);
    console.log('Avatar added to scene');
    console.log('Scene children:', scene.children.length);
    
    if (loadingElement) {
      loadingElement.style.display = 'none';
    }

    // Animate
    function animate() {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    }
    console.log('Starting animation loop');
    animate();

    // Handle resize
    window.addEventListener('resize', () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    });

  } catch (error) {
    console.error('Error loading avatar:', error);
    if (loadingElement) {
      loadingElement.innerText = 'Failed to load avatar';
      loadingElement.style.color = '#ff6b6b';
    }
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAvatar);
} else {
  initAvatar();
}
