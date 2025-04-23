import { useEffect, useRef } from "react";
import * as THREE from "three";

export function HeroCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return; // Removed mobile check to show on all devices

    // Scene setup
    const scene = new THREE.Scene();
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      70, // Slightly wider field of view
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 4.5; // Move camera closer
    camera.position.y = 0.5; // Slight adjustment to center better
    
    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);
    
    // Determine if mobile for size adjustments
    const isMobile = window.innerWidth <= 768;
    
    // Geometry - 10% smaller as requested
    const geometry = new THREE.TorusKnotGeometry(1.35, 0.36, 100, 16);
    
    // Material - brighter indigo for better visibility
    const material = new THREE.MeshStandardMaterial({
      color: 0x6A00FF, // Brighter indigo color
      metalness: 0.8,
      roughness: 0.1,
      wireframe: true,
      emissive: 0x4B0082, // Add emissive glow
      emissiveIntensity: 0.3
    });
    
    // Mesh
    const torusKnot = new THREE.Mesh(geometry, material);
    
    // Apply mobile-specific adjustments
    if (isMobile) {
      // Move the shape slightly on mobile for better visibility
      torusKnot.position.z = -0.5;
      // Adjust camera for mobile
      camera.position.z = 5.5;
    }
    
    scene.add(torusKnot);
    
    // Lighting - stronger and more lights
    const pointLight1 = new THREE.PointLight(0x6A00FF, 2); // Brighter indigo light with higher intensity
    pointLight1.position.set(2, 3, 4);
    scene.add(pointLight1);
    
    const pointLight2 = new THREE.PointLight(0x9370DB, 2); // Medium purple light with higher intensity
    pointLight2.position.set(-2, -3, 4);
    scene.add(pointLight2);
    
    // Add a third light to enhance visibility
    const pointLight3 = new THREE.PointLight(0xB19CD9, 1.5); // Lavender light
    pointLight3.position.set(0, 5, 2);
    scene.add(pointLight3);
    
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4); // Increased ambient light
    scene.add(ambientLight);
    
    // Handle window resize
    const handleResize = () => {
      // Update mobile state when resizing
      const newIsMobile = window.innerWidth <= 768;
      
      // Update camera and object positions if mobile state changed
      if (newIsMobile !== isMobile) {
        if (newIsMobile) {
          torusKnot.position.z = -0.5;
          camera.position.z = 5.5;
        } else {
          torusKnot.position.z = 0;
          camera.position.z = 4.5;
        }
      }
      
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };
    
    window.addEventListener("resize", handleResize);
    
    // Animation loop
    let frameId: number;
    
    // Base scale factor (smaller on mobile)
    const baseScale = isMobile ? 0.7 : 1.0;
    
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      
      // Faster rotation for more visibility
      torusKnot.rotation.x += 0.006;
      torusKnot.rotation.y += 0.008;
      
      // Slight floating motion (keep Z position stable on mobile)
      if (isMobile) {
        torusKnot.position.y = Math.sin(Date.now() * 0.001) * 0.05; // Smaller motion on mobile
      } else {
        torusKnot.position.y = Math.sin(Date.now() * 0.001) * 0.1;
      }
      
      // Slight pulsating size effect - apply to base scale
      const pulseFactor = Math.sin(Date.now() * 0.002) * 0.05;
      const scale = baseScale + (baseScale * pulseFactor);
      torusKnot.scale.set(scale, scale, scale);
      
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
      // Dispose resources
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className="absolute top-0 left-0 w-full h-full z-0" />;
}
