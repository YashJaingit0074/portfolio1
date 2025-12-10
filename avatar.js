
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

window.onload = () => loadModel();

function loadModel() {
  const container = document.getElementById('avatar-container');
  const loadingElement = document.getElementById('avatar-loading');
  
  if (!container) {
    console.error('Avatar container not found!');
    return;
  }
  
  console.log('Loading 3D model...');
  
  const loader = new GLTFLoader();
  loader.load('public/46936_autosave.glb',
    (gltf) => {
      console.log('Model loaded successfully:', gltf);
      console.log('Animations available:', gltf.animations?.map(clip => clip.name) || 'None');
      setupScene(gltf);
      if (loadingElement) {
        loadingElement.style.display = 'none';
      }
    }, 
    (xhr) => {
      if (xhr.lengthComputable) {
        const percentCompletion = Math.round((xhr.loaded / xhr.total) * 100);
        if (loadingElement) {
          loadingElement.innerText = `LOADING... ${percentCompletion}%`;
        }
        console.log(`Loading model... ${percentCompletion}%`);
      }
    }, 
    (error) => {
      console.error('Error loading avatar:', error);
      if (loadingElement) {
        loadingElement.innerText = 'Failed to load avatar. Check console for details.';
        loadingElement.style.color = '#ff6b6b';
      }
    }
  );
}

function setupScene(gltf) {
    const container = document.getElementById('avatar-container');
    
    if (!container) {
      console.error('Avatar container not found in setupScene!');
      return;
    }
    
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.8; // Reduce exposure for darker appearance
    
    // Ensure container has dimensions
    if (container.clientWidth === 0 || container.clientHeight === 0) {
      container.style.width = '400px';
      container.style.height = '500px';
    }
    
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    renderer.shadowMap.enabled = true; // Enable shadows for more dramatic look
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.physicallyCorrectLights = true;

    container.appendChild(renderer.domElement);

    // Camera setup - better position for full body view
    const camera = new THREE.PerspectiveCamera(
      60, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(0, 1, 4);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.1;
    controls.enablePan = false;
    controls.enableZoom = true;
    controls.minDistance = 2.5;
    controls.maxDistance = 10;
    controls.minPolarAngle = Math.PI / 8; // Allow more vertical movement
    controls.maxPolarAngle = Math.PI - Math.PI / 8;
    controls.target = new THREE.Vector3(0, 0, 0);
    controls.autoRotate = false;
    controls.update();

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = null; // Keep transparent for better integration

    // Darker lighting setup for more dramatic appearance
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    // Main key light - reduced intensity
    const keyLight = new THREE.DirectionalLight(0xffffff, 0.8);
    keyLight.position.set(5, 10, 5);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 2048;
    keyLight.shadow.mapSize.height = 2048;
    scene.add(keyLight);

    // Subtle fill light
    const fillLight = new THREE.DirectionalLight(0xffffff, 0.4);
    fillLight.position.set(-5, 5, -5);
    scene.add(fillLight);
    
    // Minimal front light
    const frontLight = new THREE.DirectionalLight(0xffffff, 0.3);
    frontLight.position.set(0, 5, 10);
    scene.add(frontLight);

    // Load avatar and enhance materials for better visibility
    const avatar = gltf.scene;
    
    // Calculate bounding box to center the model
    const box = new THREE.Box3().setFromObject(avatar);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    
    console.log('Model size:', size);
    console.log('Model center:', center);
    
    // Scale the model appropriately for full body display
    const maxDimension = Math.max(size.x, size.y, size.z);
    let scale = 1;
    if (maxDimension > 2) {
      scale = 1.8 / maxDimension;
    } else if (maxDimension < 0.5) {
      scale = 2.5 / maxDimension;
    } else {
      scale = 1.5; // Make it larger by default for full body view
    }
    avatar.scale.setScalar(scale);
    console.log('Model scaled by:', scale, 'Original size:', maxDimension);
    
    // Center the model properly for full body display
    avatar.position.set(0, -(size.y * scale) / 3, 0); // Position to show full body
    
    // Enhance materials for darker, more dramatic appearance
    avatar.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        
        if (child.material) {
          // Fix material properties for darker appearance
          if (Array.isArray(child.material)) {
            child.material.forEach(mat => {
              mat.needsUpdate = true;
              mat.transparent = false;
              mat.opacity = 1.0;
              
              // Keep darker materials dark
              if (mat.color) {
                const currentColor = mat.color.getHex();
                if (currentColor === 0x000000 || currentColor < 0x222222) {
                  mat.color.setHex(0x111111); // Keep very dark
                } else {
                  // Darken existing colors by 30%
                  mat.color.multiplyScalar(0.7);
                }
              }
              
              // Increase metalness and adjust roughness for darker appearance
              if (mat.metalness !== undefined) {
                mat.metalness = 0.4;
              }
              if (mat.roughness !== undefined) {
                mat.roughness = 0.6;
              }
              
              // Remove emissive lighting
              if (mat.emissive) {
                mat.emissive.setHex(0x000000);
              }
            });
          } else {
            child.material.needsUpdate = true;
            child.material.transparent = false;
            child.material.opacity = 1.0;
            
            // Darken single material
            if (child.material.color) {
              const currentColor = child.material.color.getHex();
              if (currentColor === 0x000000 || currentColor < 0x222222) {
                child.material.color.setHex(0x111111);
              } else {
                // Darken color by 30%
                child.material.color.multiplyScalar(0.7);
              }
            }
            
            if (child.material.metalness !== undefined) {
              child.material.metalness = 0.4;
            }
            if (child.material.roughness !== undefined) {
              child.material.roughness = 0.6;
            }
            
            // Remove emissive
            if (child.material.emissive) {
              child.material.emissive.setHex(0x000000);
            }
          }
        }
      }
    });
    scene.add(avatar);

    // Optional: Add subtle environment lighting
    const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.6);
    scene.add(hemisphereLight);

    // Load animations (with fallback for missing animations)
    const mixer = new THREE.AnimationMixer(avatar);
    const clips = gltf.animations;
    
    let waveAction = null;
    let stumbleAction = null;
    
    if (clips && clips.length > 0) {
      const waveClip = clips.find(clip => clip.name.includes('wave') || clip.name.includes('003'));
      const stumbleClip = clips.find(clip => clip.name.includes('stumble') || clip.name.includes('005'));
      
      if (waveClip) {
        waveAction = mixer.clipAction(waveClip);
      }
      
      if (stumbleClip) {
        stumbleAction = mixer.clipAction(stumbleClip);
      }
    }

    let isStumbling = false;
    const raycaster = new THREE.Raycaster();
    
    container.addEventListener('mousedown', (ev) => {
      if (!waveAction || !stumbleAction || isStumbling) return;
      
      const rect = container.getBoundingClientRect();
      const coords = {
        x: ((ev.clientX - rect.left) / container.clientWidth) * 2 - 1,
        y: -((ev.clientY - rect.top) / container.clientHeight) * 2 + 1
      };

      raycaster.setFromCamera(coords, camera);
      const intersections = raycaster.intersectObject(avatar, true);
  
      if (intersections.length > 0) {
        isStumbling = true;
        stumbleAction.reset();
        stumbleAction.play();
        waveAction.crossFadeTo(stumbleAction, 0.3);

        setTimeout(() => {
          waveAction.reset();
          waveAction.play();
          stumbleAction.crossFadeTo(waveAction, 1);
          setTimeout(() => isStumbling = false, 1000);
        }, 4000);
      }
    });

    // Responsive handling
    const handleResize = () => {
      if (container) {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
      }
    };
    
    window.addEventListener('resize', handleResize);

    const clock = new THREE.Clock();
    let animationId;
    
    function animate() {
      animationId = requestAnimationFrame(animate);
      
      if (mixer) {
        mixer.update(clock.getDelta());
      }
      
      if (controls) {
        controls.update();
      }
      
      renderer.render(scene, camera);
    }

    animate();
    
    // Start default animation if available
    if (waveAction) {
      waveAction.play();
    }
    
    // Cleanup function
    window.addEventListener('beforeunload', () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      window.removeEventListener('resize', handleResize);
    });
}
