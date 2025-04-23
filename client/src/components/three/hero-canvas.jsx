import { useEffect, useRef } from "react";
import * as THREE from "three";

export function HeroCanvas() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      2000
    );
    camera.position.z = 1000;
    
    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);
    
    // Determine if mobile
    const isMobile = window.innerWidth <= 768;
    
    // Create an array to store particles
    const particlesCount = isMobile ? 1000 : 2000;
    const particles = new THREE.BufferGeometry();
    
    // Create position, color, and size arrays for the particles
    const positions = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);
    const sizes = new Float32Array(particlesCount);
    
    // Create a color palette for the particles (cybernetic blue and cyan tones)
    const colorPalette = [
      new THREE.Color(0x0066ff), // blue
      new THREE.Color(0x00aaff), // light blue
      new THREE.Color(0x00ffff), // cyan
      new THREE.Color(0x66ffff), // light cyan
      new THREE.Color(0x0022aa), // dark blue
    ];
    
    // Set up particles with random positions, colors from palette, and sizes
    for (let i = 0; i < particlesCount; i++) {
      // Position
      positions[i * 3] = (Math.random() - 0.5) * 2000; // x
      positions[i * 3 + 1] = (Math.random() - 0.5) * 2000; // y
      positions[i * 3 + 2] = (Math.random() - 0.5) * 2000; // z
      
      // Random color from our palette
      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
      
      // Size - vary between small and medium particles
      sizes[i] = Math.random() * 5 + 1;
    }
    
    // Set attributes for the BufferGeometry
    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    particles.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    
    // Create a particle texture using canvas
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const context = canvas.getContext('2d');
    
    // Create a soft gradient circle
    const gradient = context.createRadialGradient(64, 64, 0, 64, 64, 64);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.2, 'rgba(255, 255, 255, 0.8)');
    gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.4)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    
    context.fillStyle = gradient;
    context.beginPath();
    context.arc(64, 64, 64, 0, Math.PI * 2, false);
    context.fill();
    
    const particleTexture = new THREE.CanvasTexture(canvas);
    
    // Create material for the particles
    const particleMaterial = new THREE.PointsMaterial({
      size: 4,
      transparent: true,
      opacity: 0.8,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
      sizeAttenuation: true,
      map: particleTexture
    });
    
    // Create the particles system
    const particleSystem = new THREE.Points(particles, particleMaterial);
    scene.add(particleSystem);
    
    // We'll increase the number of particles to create a more immersive star field
    const additionalStarsCount = 3000;
    const additionalStars = new THREE.BufferGeometry();
    const starPositions = new Float32Array(additionalStarsCount * 3);
    const starColors = new Float32Array(additionalStarsCount * 3);
    const starSizes = new Float32Array(additionalStarsCount);
    
    // More varied color palette for stars with some warmer tones for contrast
    const starColorPalette = [
      new THREE.Color(0x0066ff), // blue
      new THREE.Color(0x00aaff), // light blue
      new THREE.Color(0x00ffff), // cyan
      new THREE.Color(0xaaddff), // pale blue
      new THREE.Color(0xffffff), // white
      new THREE.Color(0xffffaa), // pale yellow (for distant stars)
    ];
    
    // Create random positions for stars in a more spherical distribution
    for (let i = 0; i < additionalStarsCount; i++) {
      // Use spherical distribution for more realistic star field
      const radius = 1500 + Math.random() * 500;
      const theta = Math.random() * Math.PI * 2; // horizontal angle
      const phi = Math.acos(Math.random() * 2 - 1); // vertical angle
      
      // Convert spherical to cartesian coordinates
      starPositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      starPositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      starPositions[i * 3 + 2] = radius * Math.cos(phi);
      
      // Random color from our palette
      const color = starColorPalette[Math.floor(Math.random() * starColorPalette.length)];
      starColors[i * 3] = color.r;
      starColors[i * 3 + 1] = color.g;
      starColors[i * 3 + 2] = color.b;
      
      // Vary star sizes, mostly small with a few larger ones
      const sizeFactor = Math.random();
      starSizes[i] = sizeFactor < 0.95 ? Math.random() * 3 + 0.5 : Math.random() * 6 + 3;
    }
    
    additionalStars.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    additionalStars.setAttribute('color', new THREE.BufferAttribute(starColors, 3));
    additionalStars.setAttribute('size', new THREE.BufferAttribute(starSizes, 1));
    
    // Create a custom texture for stars with a soft glow
    const starCanvas = document.createElement('canvas');
    starCanvas.width = 64;
    starCanvas.height = 64;
    const starContext = starCanvas.getContext('2d');
    
    // Create a soft glow dot for stars
    const starGradient = starContext.createRadialGradient(32, 32, 0, 32, 32, 32);
    starGradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    starGradient.addColorStop(0.2, 'rgba(255, 255, 255, 0.9)');
    starGradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.5)');
    starGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    
    starContext.fillStyle = starGradient;
    starContext.beginPath();
    starContext.arc(32, 32, 32, 0, Math.PI * 2);
    starContext.fill();
    
    const starTexture = new THREE.CanvasTexture(starCanvas);
    
    const starMaterial = new THREE.PointsMaterial({
      size: 2,
      transparent: true,
      opacity: 0.8,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
      map: starTexture,
      sizeAttenuation: true
    });
    
    const starField = new THREE.Points(additionalStars, starMaterial);
    scene.add(starField);
    
    // Initialize mouse position for interaction
    const mouse = {
      x: 0,
      y: 0
    };
    
    // Track mouse movement for parallax effect
    const handleMouseMove = (event) => {
      // Calculate normalized device coordinates
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };
    
    window.addEventListener("resize", handleResize);
    
    // Animation loop
    let frameId;
    let time = 0;
    
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      time += 0.015;
      
      // Rotate particle system slowly
      particleSystem.rotation.x = time * 0.05;
      particleSystem.rotation.y = time * 0.03;
      
      // Slow zoom effect to create the "diving into the matrix" feel
      camera.position.z = 1000 - (Math.sin(time * 0.1) * 50);
      
      // Parallax effect based on mouse position
      if (!isMobile) {
        scene.rotation.x = mouse.y * 0.1;
        scene.rotation.y = mouse.x * 0.1;
      }
      
      // Move some particles to create a flowing effect
      const positions = particles.attributes.position.array;
      for (let i = 0; i < particlesCount; i++) {
        // Make particles move at different speeds for more organic feel
        const speed = (i % 5) * 0.2 + 0.5;
        
        // Move particles forward (toward camera)
        positions[i * 3 + 2] += speed;
        
        // If a particle gets too close to the camera, reset it far away
        if (positions[i * 3 + 2] > 1000) {
          positions[i * 3 + 2] = -1000;
          
          // Randomize X and Y when recycling particles
          positions[i * 3] = (Math.random() - 0.5) * 2000;
          positions[i * 3 + 1] = (Math.random() - 0.5) * 2000;
        }
      }
      particles.attributes.position.needsUpdate = true;
      
      // Rotate the star field to create a gentle twinkling movement
      starField.rotation.x = Math.sin(time * 0.03) * 0.05;
      starField.rotation.y = Math.cos(time * 0.05) * 0.05;
      starField.rotation.z = Math.sin(time * 0.02) * 0.02;
      
      // Create twinkling effect by adjusting some star sizes
      const starSizes = starField.geometry.attributes.size.array;
      for (let i = 0; i < additionalStarsCount; i++) {
        // Random twinkling effect
        if (Math.random() < 0.01) {
          // Randomly select stars to twinkle
          const twinkleFactor = 0.5 + Math.random() * 2;
          const originalSize = starSizes[i];
          starSizes[i] = originalSize * twinkleFactor;
          
          // Schedule reset after brief twinkle
          setTimeout(() => {
            if (starField.geometry && starField.geometry.attributes) {
              starSizes[i] = originalSize;
              starField.geometry.attributes.size.needsUpdate = true;
            }
          }, 200 + Math.random() * 300);
        }
      }
      starField.geometry.attributes.size.needsUpdate = true;
      
      // Pulse the particle opacities for a more dynamic feel
      particleMaterial.opacity = 0.6 + Math.sin(time) * 0.2;
      starMaterial.opacity = 0.7 + Math.cos(time * 0.3) * 0.2;
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Cleanup
    return () => {
      if (frameId) {
        cancelAnimationFrame(frameId);
      }
      
      if (containerRef.current && containerRef.current.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement);
      }
      
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      
      // Dispose resources
      if (particles) particles.dispose();
      if (particleMaterial) particleMaterial.dispose();
      if (particleTexture) particleTexture.dispose();
      
      if (additionalStars) additionalStars.dispose();
      if (starMaterial) starMaterial.dispose();
      if (starTexture) starTexture.dispose();
      
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className="absolute top-0 left-0 w-full h-full z-0" />;
}