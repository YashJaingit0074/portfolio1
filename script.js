/**
 * MINIMAL PORTFOLIO - JavaScript
 * Clean, responsive portfolio with smooth animations
 */

// ===============================================
// GLOBAL VARIABLES
// ===============================================
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('[data-section]');
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const sideNav = document.getElementById('side-nav');
let currentSection = 0;
let isScrolling = false;

// ===============================================
// INITIALIZATION
// ===============================================
document.addEventListener('DOMContentLoaded', function() {
    // Initialize loading screen
    setTimeout(() => {
        document.getElementById('loading-screen').classList.add('hide');
        setTimeout(() => {
            document.getElementById('loading-screen').style.display = 'none';
            initializePortfolio();
        }, 500);
    }, 1500);
});

function initializePortfolio() {
    // Initialize navigation
    initializeNavigation();
    
    // Initialize scroll effects
    initializeScrollEffects();
    
    // Initialize form handling
    initializeContactForm();
    
    // Initialize intersection observer for section animations
    initializeIntersectionObserver();
    
    // Initialize mobile menu
    initializeMobileMenu();
    
    // Set initial active section
    setActiveSection('home');
}

// ===============================================
// NAVIGATION SYSTEM
// ===============================================
function initializeNavigation() {
    // Handle navigation clicks
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetSection = link.getAttribute('data-section');
            navigateToSection(targetSection);
            
            // Close mobile menu if open
            if (sideNav.classList.contains('active')) {
                sideNav.classList.remove('active');
            }
        });
    });
    
    // Throttled scroll navigation for better performance
    const throttledScroll = throttle((e) => {
        if (isScrolling) return;
        
        if (e.deltaY > 0) {
            // Scroll down
            if (currentSection < sections.length - 1) {
                navigateToSection(sections[currentSection + 1].id);
            }
        } else {
            // Scroll up
            if (currentSection > 0) {
                navigateToSection(sections[currentSection - 1].id);
            }
        }
    }, 150);
    
    window.addEventListener('wheel', throttledScroll, { passive: true });
    
    // Handle keyboard navigation
    document.addEventListener('keydown', (e) => {
        switch(e.key) {
            case 'ArrowDown':
                e.preventDefault();
                if (currentSection < sections.length - 1) {
                    navigateToSection(sections[currentSection + 1].id);
                }
                break;
            case 'ArrowUp':
                e.preventDefault();
                if (currentSection > 0) {
                    navigateToSection(sections[currentSection - 1].id);
                }
                break;
        }
    });
}

function navigateToSection(sectionId) {
    if (isScrolling) return;
    
    isScrolling = true;
    
    // Use requestAnimationFrame for smooth transitions
    requestAnimationFrame(() => {
        setActiveSection(sectionId);
        
        // Smooth scroll to section
        const targetElement = document.getElementById(sectionId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
    
    // Reset scrolling flag with shorter delay
    setTimeout(() => {
        isScrolling = false;
    }, 800);
}

function setActiveSection(sectionId) {
    // Update active section with hardware acceleration
    sections.forEach((section, index) => {
        section.classList.remove('active');
        if (section.id === sectionId) {
            // Force hardware acceleration
            section.style.willChange = 'opacity, transform';
            section.classList.add('active');
            currentSection = index;
            
            // Remove will-change after animation
            setTimeout(() => {
                section.style.willChange = 'auto';
            }, 1000);
        }
    });
    
    // Update active nav link
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === sectionId) {
            link.classList.add('active');
        }
    });
}

// ===============================================
// MOBILE MENU
// ===============================================
function initializeMobileMenu() {
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', () => {
            sideNav.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
        });
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!sideNav.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
            sideNav.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        }
    });
}

// ===============================================
// SCROLL EFFECTS
// ===============================================
function initializeScrollEffects() {
    let ticking = false;
    
    // Optimized scroll handler
    function updateOnScroll() {
        const scrolled = window.pageYOffset;
        
        // Parallax effect for elements (throttled)
        const parallaxElements = document.querySelectorAll('.parallax');
        parallaxElements.forEach((element, index) => {
            const speed = (index + 1) * 0.1;
            element.style.transform = `translate3d(0, ${scrolled * speed}px, 0)`;
        });
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateOnScroll);
            ticking = true;
        }
    }
    
    // Use passive event listeners for better performance
    window.addEventListener('scroll', requestTick, { passive: true });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ===============================================
// INTERSECTION OBSERVER
// ===============================================
function initializeIntersectionObserver() {
    const observerOptions = {
        threshold: [0.1, 0.3, 0.5],
        rootMargin: '0px 0px -10% 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
                // Add visible class for animations with hardware acceleration
                entry.target.style.willChange = 'opacity, transform';
                entry.target.classList.add('visible');
                
                // Update active section
                const sectionId = entry.target.id;
                if (sectionId && !isScrolling) {
                    setActiveSection(sectionId);
                }
                
                // Animate child elements with stagger and optimization
                const animateElements = entry.target.querySelectorAll('.animate-on-scroll');
                animateElements.forEach((element, index) => {
                    const delay = index * 100;
                    
                    setTimeout(() => {
                        requestAnimationFrame(() => {
                            element.style.willChange = 'opacity, transform';
                            element.style.opacity = '1';
                            element.style.transform = 'translate3d(0, 0, 0)';
                            
                            // Clean up will-change after animation
                            setTimeout(() => {
                                element.style.willChange = 'auto';
                            }, 600);
                        });
                    }, delay);
                });
                
                // Clean up will-change after main animation
                setTimeout(() => {
                    entry.target.style.willChange = 'auto';
                }, 1000);
            }
        });
    }, observerOptions);
    
    // Observe all sections
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Prepare animatable elements with hardware acceleration
    const animatableElements = document.querySelectorAll('.project-item, .info-item, .skill-tag');
    animatableElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translate3d(0, 20px, 0)';
        element.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        element.classList.add('animate-on-scroll');
    });
}

// ===============================================
// CONTACT FORM
// ===============================================
function initializeContactForm() {
    const form = document.getElementById('contact-form');
    
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(form);
            const button = form.querySelector('button[type="submit"]');
            const originalText = button.textContent;
            
            // Show loading state
            button.textContent = 'Sending...';
            button.disabled = true;
            button.style.opacity = '0.7';
            
            // Simulate form submission (replace with actual form handling)
            setTimeout(() => {
                // Show success message
                button.textContent = 'Message Sent!';
                button.style.background = '#4CAF50';
                
                // Reset form
                form.reset();
                
                // Reset button after delay
                setTimeout(() => {
                    button.textContent = originalText;
                    button.disabled = false;
                    button.style.opacity = '';
                    button.style.background = '';
                }, 3000);
                
                // Show success notification
                showNotification('Message sent successfully!', 'success');
            }, 2000);
        });
        
        // Form validation
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', validateInput);
            input.addEventListener('input', clearValidation);
        });
    }
}

function validateInput(e) {
    const input = e.target;
    const value = input.value.trim();
    
    // Remove existing validation classes
    input.classList.remove('valid', 'invalid');
    
    if (input.hasAttribute('required') && !value) {
        input.classList.add('invalid');
        return false;
    }
    
    if (input.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            input.classList.add('invalid');
            return false;
        }
    }
    
    if (value) {
        input.classList.add('valid');
    }
    
    return true;
}

function clearValidation(e) {
    const input = e.target;
    input.classList.remove('valid', 'invalid');
}

// ===============================================
// UTILITY FUNCTIONS
// ===============================================

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '15px 20px',
        background: type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3',
        color: 'white',
        borderRadius: '5px',
        zIndex: '10000',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease'
    });
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after delay
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Smooth scroll to element
function scrollToElement(element, duration = 1000) {
    const targetPosition = element.offsetTop;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;
    
    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }
    
    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }
    
    requestAnimationFrame(animation);
}

// Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// ===============================================
// HOVER EFFECTS
// ===============================================

// Add hover effects to interactive elements
document.addEventListener('DOMContentLoaded', () => {
    // Project cards hover effect
    const projectItems = document.querySelectorAll('.project-item');
    projectItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Button hover effects
    const buttons = document.querySelectorAll('button, .cta-button');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

// ===============================================
// PERFORMANCE OPTIMIZATIONS
// ===============================================

// Lazy load images
const lazyImages = document.querySelectorAll('img[data-src]');
if (lazyImages.length) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
}

// Preload critical resources
function preloadCriticalResources() {
    const criticalImages = [
        // Add your critical image URLs here
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Initialize when DOM is fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializePortfolio);
} else {
    initializePortfolio();
}

// Performance monitoring
console.log('🎯 Minimal Portfolio initialized successfully!');

// Check for performance issues
window.addEventListener('load', () => {
    const loadTime = performance.now();
    console.log(`⚡ Page loaded in ${Math.round(loadTime)}ms`);
    
    if (loadTime > 3000) {
        console.warn('⚠️ Page load time is above 3 seconds. Consider optimizing.');
    }
});

// ===============================================
// INITIALIZATION
// ===============================================
document.addEventListener('DOMContentLoaded', function() {
    // Initialize loading screen
    setTimeout(() => {
        document.getElementById('loading-screen').classList.add('hide');
        setTimeout(() => {
            document.getElementById('loading-screen').style.display = 'none';
            initializePortfolio();
        }, 500);
    }, 2000);
});

function initializePortfolio() {
    // Initialize 3D scene
    init3DScene();
    
    // Initialize navigation
    initializeNavigation();
    
    // Initialize scroll effects
    initializeScrollEffects();
    
    // Initialize skill animations
    initializeSkillBars();
    
    // Initialize form handling
    initializeContactForm();
    
    // Initialize particle system
    createParticleSystem();
    
    // Start animation loop
    animate();
    
    // Initialize intersection observer for section animations
    initializeIntersectionObserver();
}

// ===============================================
// 3D SCENE SETUP
// ===============================================
function init3DScene() {
    // Create scene
    scene = new THREE.Scene();
    
    // Create camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 500;
    
    // Create renderer
    renderer = new THREE.WebGLRenderer({ 
        canvas: document.getElementById('three-canvas'),
        antialias: true,
        alpha: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    
    // Create geometric shapes
    createFloatingGeometry();
    
    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);
    
    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0x00f5ff, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    // Add mouse movement listener
    document.addEventListener('mousemove', onMouseMove, false);
    
    // Add window resize listener
    window.addEventListener('resize', onWindowResize, false);
}

function createFloatingGeometry() {
    const geometries = [
        new THREE.BoxGeometry(20, 20, 20),
        new THREE.SphereGeometry(15, 32, 32),
        new THREE.ConeGeometry(10, 30, 8),
        new THREE.OctahedronGeometry(15),
        new THREE.TorusGeometry(12, 5, 8, 16)
    ];
    
    const materials = [
        new THREE.MeshPhongMaterial({ color: 0x00f5ff, transparent: true, opacity: 0.7 }),
        new THREE.MeshPhongMaterial({ color: 0xff00ff, transparent: true, opacity: 0.7 }),
        new THREE.MeshPhongMaterial({ color: 0xffff00, transparent: true, opacity: 0.7 }),
        new THREE.MeshPhongMaterial({ color: 0xff0080, transparent: true, opacity: 0.7 }),
        new THREE.MeshPhongMaterial({ color: 0x80ff00, transparent: true, opacity: 0.7 })
    ];
    
    for (let i = 0; i < 15; i++) {
        const geometry = geometries[Math.floor(Math.random() * geometries.length)];
        const material = materials[Math.floor(Math.random() * materials.length)];
        const mesh = new THREE.Mesh(geometry, material);
        
        mesh.position.x = Math.random() * 2000 - 1000;
        mesh.position.y = Math.random() * 2000 - 1000;
        mesh.position.z = Math.random() * 1000 - 500;
        
        mesh.rotation.x = Math.random() * 2 * Math.PI;
        mesh.rotation.y = Math.random() * 2 * Math.PI;
        mesh.rotation.z = Math.random() * 2 * Math.PI;
        
        // Add custom properties for animation
        mesh.userData = {
            rotationSpeed: {
                x: (Math.random() - 0.5) * 0.01,
                y: (Math.random() - 0.5) * 0.01,
                z: (Math.random() - 0.5) * 0.01
            },
            originalPosition: mesh.position.clone(),
            floatSpeed: Math.random() * 0.02 + 0.01
        };
        
        scene.add(mesh);
        particles.push(mesh);
    }
}

// ===============================================
// NAVIGATION SYSTEM
// ===============================================
function initializeNavigation() {
    // Handle navigation clicks
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetSection = link.getAttribute('data-section');
            navigateToSection(targetSection);
        });
    });
    
    // Handle scroll navigation
    let scrollTimeout;
    window.addEventListener('wheel', (e) => {
        if (isScrolling) return;
        
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            if (e.deltaY > 0) {
                // Scroll down
                if (currentSection < sections.length - 1) {
                    navigateToSection(sections[currentSection + 1].id);
                }
            } else {
                // Scroll up
                if (currentSection > 0) {
                    navigateToSection(sections[currentSection - 1].id);
                }
            }
        }, 100);
    });
    
    // Handle keyboard navigation
    document.addEventListener('keydown', (e) => {
        switch(e.key) {
            case 'ArrowDown':
                if (currentSection < sections.length - 1) {
                    navigateToSection(sections[currentSection + 1].id);
                }
                break;
            case 'ArrowUp':
                if (currentSection > 0) {
                    navigateToSection(sections[currentSection - 1].id);
                }
                break;
        }
    });
}

function navigateToSection(sectionId) {
    if (isScrolling) return;
    
    isScrolling = true;
    
    // Update active section
    sections.forEach((section, index) => {
        section.classList.remove('active');
        if (section.id === sectionId) {
            section.classList.add('active');
            currentSection = index;
        }
    });
    
    // Update active nav link
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === sectionId) {
            link.classList.add('active');
        }
    });
    
    // Smooth scroll to section
    document.getElementById(sectionId).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
    
    // Update 3D scene based on section
    updateSceneForSection(sectionId);
    
    // Reset scrolling flag
    setTimeout(() => {
        isScrolling = false;
    }, 1000);
}

function updateSceneForSection(sectionId) {
    particles.forEach((particle, index) => {
        const delay = index * 100;
        
        setTimeout(() => {
            switch(sectionId) {
                case 'home':
                    // Particles form a sphere around the center
                    const sphereRadius = 300;
                    const phi = Math.random() * Math.PI * 2;
                    const theta = Math.random() * Math.PI;
                    
                    particle.position.x = sphereRadius * Math.sin(theta) * Math.cos(phi);
                    particle.position.y = sphereRadius * Math.sin(theta) * Math.sin(phi);
                    particle.position.z = sphereRadius * Math.cos(theta);
                    break;
                    
                case 'about':
                    // Particles form a DNA helix
                    const t = index / particles.length * Math.PI * 4;
                    particle.position.x = Math.cos(t) * 200;
                    particle.position.y = (index - particles.length / 2) * 50;
                    particle.position.z = Math.sin(t) * 200;
                    break;
                    
                case 'skills':
                    // Particles form a cube grid
                    const gridSize = 3;
                    const spacing = 150;
                    const x = (index % gridSize) - 1;
                    const y = Math.floor((index / gridSize) % gridSize) - 1;
                    const z = Math.floor(index / (gridSize * gridSize)) - 1;
                    
                    particle.position.x = x * spacing;
                    particle.position.y = y * spacing;
                    particle.position.z = z * spacing;
                    break;
                    
                case 'projects':
                    // Particles form a spiral
                    const spiral = index * 0.5;
                    particle.position.x = Math.cos(spiral) * (100 + index * 10);
                    particle.position.y = index * 20 - 150;
                    particle.position.z = Math.sin(spiral) * (100 + index * 10);
                    break;
                    
                case 'contact':
                    // Particles form a heart shape
                    const heart = index / particles.length * Math.PI * 2;
                    const heartScale = 100;
                    particle.position.x = heartScale * (16 * Math.pow(Math.sin(heart), 3));
                    particle.position.y = heartScale * (13 * Math.cos(heart) - 5 * Math.cos(2 * heart) - 2 * Math.cos(3 * heart) - Math.cos(4 * heart));
                    particle.position.z = Math.sin(heart * 2) * 50;
                    break;
                    
                default:
                    // Random positions
                    particle.position.x = Math.random() * 1000 - 500;
                    particle.position.y = Math.random() * 1000 - 500;
                    particle.position.z = Math.random() * 500 - 250;
            }
        }, delay);
    });
}

// ===============================================
// SCROLL EFFECTS
// ===============================================
function initializeScrollEffects() {
    // Navbar scroll effect
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const nav = document.getElementById('main-nav');
        
        if (window.scrollY > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        
        lastScrollY = window.scrollY;
    });
    
    // Parallax effect for background elements
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.floating-element');
        
        parallaxElements.forEach((element, index) => {
            const speed = (index + 1) * 0.5;
            element.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
        });
    });
}

// ===============================================
// SKILL BAR ANIMATIONS
// ===============================================
function initializeSkillBars() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    const animateSkill = (skillItem) => {
        const skillLevel = skillItem.getAttribute('data-skill');
        const progressBar = skillItem.querySelector('.skill-progress');
        
        let currentLevel = 0;
        const increment = skillLevel / 100;
        
        const timer = setInterval(() => {
            currentLevel += increment;
            progressBar.style.width = currentLevel + '%';
            
            if (currentLevel >= skillLevel) {
                clearInterval(timer);
                progressBar.style.width = skillLevel + '%';
            }
        }, 20);
    };
    
    // Animate skills when they come into view
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    animateSkill(entry.target);
                }, 200);
                skillObserver.unobserve(entry.target);
            }
        });
    });
    
    skillItems.forEach(item => {
        skillObserver.observe(item);
    });
}

// ===============================================
// INTERSECTION OBSERVER
// ===============================================
function initializeIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Animate child elements with stagger
                const children = entry.target.querySelectorAll('.animate-on-scroll');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.style.opacity = '1';
                        child.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }
        });
    }, observerOptions);
    
    // Observe all sections and animatable elements
    sections.forEach(section => observer.observe(section));
    
    const animatableElements = document.querySelectorAll('.project-card, .stat-item, .contact-method');
    animatableElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        observer.observe(element);
    });
}

// ===============================================
// CONTACT FORM
// ===============================================
function initializeContactForm() {
    const form = document.getElementById('contact-form');
    
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(form);
            const button = form.querySelector('button[type="submit"]');
            const originalText = button.innerHTML;
            
            // Show loading state
            button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            button.disabled = true;
            
            // Simulate form submission (replace with actual form handling)
            setTimeout(() => {
                // Show success message
                button.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                button.style.background = '#00ff88';
                
                // Reset form
                form.reset();
                
                // Reset button after delay
                setTimeout(() => {
                    button.innerHTML = originalText;
                    button.disabled = false;
                    button.style.background = '';
                }, 3000);
            }, 2000);
        });
    }
}

// ===============================================
// PARTICLE SYSTEM
// ===============================================
function createParticleSystem() {
    const particlesOverlay = document.getElementById('particles-overlay');
    
    for (let i = 0; i < 50; i++) {
        createParticle(particlesOverlay);
    }
    
    // Create new particles periodically
    setInterval(() => {
        if (particlesOverlay.children.length < 100) {
            createParticle(particlesOverlay);
        }
    }, 2000);
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random starting position
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = '100%';
    
    // Random size
    const size = Math.random() * 4 + 1;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    
    // Random color
    const colors = ['#00f5ff', '#ff00ff', '#ffff00', '#ff0080', '#80ff00'];
    particle.style.background = colors[Math.floor(Math.random() * colors.length)];
    particle.style.borderRadius = '50%';
    particle.style.position = 'fixed';
    particle.style.pointerEvents = 'none';
    particle.style.zIndex = '0';
    particle.style.opacity = '0.6';
    
    // Animation
    const duration = Math.random() * 10000 + 5000;
    particle.style.animation = `particle ${duration}ms linear forwards`;
    
    container.appendChild(particle);
    
    // Remove particle after animation
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    }, duration);
}

// ===============================================
// MOUSE INTERACTION
// ===============================================
function onMouseMove(event) {
    mouseX = (event.clientX - windowHalfX) * 0.1;
    mouseY = (event.clientY - windowHalfY) * 0.1;
}

// ===============================================
// WINDOW RESIZE
// ===============================================
function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
    
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// ===============================================
// ANIMATION LOOP
// ===============================================
function animate() {
    requestAnimationFrame(animate);
    
    // Update camera position based on mouse
    camera.position.x += (mouseX - camera.position.x) * 0.05;
    camera.position.y += (-mouseY - camera.position.y) * 0.05;
    camera.lookAt(scene.position);
    
    // Animate particles
    particles.forEach((particle, index) => {
        // Rotation
        particle.rotation.x += particle.userData.rotationSpeed.x;
        particle.rotation.y += particle.userData.rotationSpeed.y;
        particle.rotation.z += particle.userData.rotationSpeed.z;
        
        // Floating animation
        const time = Date.now() * 0.001;
        particle.position.y += Math.sin(time * particle.userData.floatSpeed + index) * 0.5;
    });
    
    // Render the scene
    renderer.render(scene, camera);
}

// ===============================================
// UTILITY FUNCTIONS
// ===============================================

// Smooth scroll to element
function scrollToElement(element, duration = 1000) {
    const targetPosition = element.offsetTop;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;
    
    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }
    
    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }
    
    requestAnimationFrame(animation);
}

// Add loading states to buttons
document.querySelectorAll('button, .btn-primary, .btn-secondary').forEach(button => {
    button.addEventListener('click', function() {
        if (!this.disabled) {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        }
    });
});

// Add hover effects to project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Initialize when DOM is fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializePortfolio);
} else {
    initializePortfolio();
}

// Performance optimization: Pause animations when tab is not visible
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Pause heavy animations
        particles.forEach(particle => {
            particle.userData.paused = true;
        });
    } else {
        // Resume animations
        particles.forEach(particle => {
            particle.userData.paused = false;
        });
    }
});

console.log('🚀 3D Portfolio initialized successfully!');