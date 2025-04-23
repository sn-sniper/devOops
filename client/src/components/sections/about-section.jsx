import { useRef, useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { useGsapReveal } from "@/hooks/use-gsap-reveal";
import { useIsMobile } from "@/hooks/use-mobile";
import gsap from "gsap";

export function AboutSection() {
  const contentRef = useRef(null);
  const imageRef = useRef(null);
  const imageContainerRef = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [mouseMoved, setMouseMoved] = useState(false);
  const isMobile = useIsMobile();
  const animationInitialized = useRef(false);

  // Only run GSAP reveal once when component mounts, not on every re-render
  useEffect(() => {
    if (!animationInitialized.current && contentRef.current && imageRef.current) {
      // Setup the reveal animations manually instead of using the hook that might re-trigger
      gsap.set([contentRef.current, imageRef.current], { opacity: 0, y: 50 });
      
      gsap.to(contentRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.2
      });
      
      gsap.to(imageRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.4
      });
      
      animationInitialized.current = true;
    }
  }, []);

  // Setup tilting effect based on cursor position using refs to avoid re-renders
  useEffect(() => {
    // Don't set up mouse events on mobile
    if (isMobile) return;
    
    const rotateXRef = { current: 0 };
    const rotateYRef = { current: 0 };
    const isMovingRef = { current: false };
    
    // Use requestAnimationFrame for performance
    let rafId = null;
    
    // Update DOM with current rotation values
    const updateRotation = () => {
      if (imageContainerRef.current) {
        // Get the motion div inside
        const motionDiv = imageContainerRef.current.querySelector('div');
        if (motionDiv) {
          // Set transition for smooth return to original position on mouseleave
          if (!isMovingRef.current) {
            motionDiv.style.transition = "transform 0.5s ease-out";
          } else {
            motionDiv.style.transition = "transform 0.1s ease-out"; // A small transition during movement for smoother feel
          }
          
          // Update transform directly with DOM manipulation to avoid React re-renders
          motionDiv.style.transform = isMovingRef.current
            ? `perspective(1000px) rotateX(${rotateXRef.current}deg) rotateY(${rotateYRef.current}deg) scale3d(1.05, 1.05, 1.05)`
            : `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
          
          // Update shadow with transition for smoother return
          const shadowDiv = imageContainerRef.current.querySelector('.shadow-element');
          if (shadowDiv) {
            shadowDiv.style.transition = !isMovingRef.current ? "box-shadow 0.5s ease-out" : "box-shadow 0.1s ease-out";
            shadowDiv.style.boxShadow = `0 20px 30px rgba(0, 0, 0, 0.4), 
                                        ${rotateYRef.current * -1}px ${rotateXRef.current}px 30px rgba(0, 0, 0, 0.3)`;
          }
        }
      }
      
      // Only continue animation loop if there's movement
      if (isMovingRef.current) {
        rafId = requestAnimationFrame(updateRotation);
      }
    };
    
    const handleMouseMove = (e) => {
      if (!imageContainerRef.current) return;
      
      // Get the container's bounding rectangle
      const rect = imageContainerRef.current.getBoundingClientRect();
      
      // Calculate center of the container
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Calculate distance from center in percentage (-1 to 1)
      const percentX = (e.clientX - centerX) / (rect.width / 2);
      const percentY = (e.clientY - centerY) / (rect.height / 2);
      
      // Calculate rotation (max tilt of 15 degrees)
      const tiltAmountX = 10;
      const tiltAmountY = 10;
      rotateXRef.current = -1 * percentY * tiltAmountX; // Invert Y axis for natural tilt
      rotateYRef.current = percentX * tiltAmountY;
      
      // For React state (only for reading in component, not for animation)
      setRotateX(rotateXRef.current);
      setRotateY(rotateYRef.current);
      
      if (!isMovingRef.current) {
        isMovingRef.current = true;
        setMouseMoved(true);
        rafId = requestAnimationFrame(updateRotation);
      }
    };
    
    // Reset the tilt when mouse leaves
    const handleMouseLeave = () => {
      rotateXRef.current = 0;
      rotateYRef.current = 0;
      isMovingRef.current = false;
      setMouseMoved(false);
      
      // Update one last time with reset values
      updateRotation();
    };
    
    const imageContainer = imageContainerRef.current;
    
    if (imageContainer) {
      imageContainer.addEventListener("mousemove", handleMouseMove);
      imageContainer.addEventListener("mouseleave", handleMouseLeave);
      
      return () => {
        imageContainer.removeEventListener("mousemove", handleMouseMove);
        imageContainer.removeEventListener("mouseleave", handleMouseLeave);
        
        // Cancel any pending animation frame
        if (rafId) {
          cancelAnimationFrame(rafId);
        }
      };
    }
  }, [isMobile]);

  const tiltStyle = mouseMoved
    ? {
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`,
        transition: "transform 0.2s ease-out",
      }
    : {
        transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
        transition: "transform 0.6s ease-out",
      };

  return (
    <section id="about" className="py-20 md:py-32 px-8 bg-slate-950">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-16">
          <div
            className="lg:w-1/2"
            data-animation="reveal"
            ref={contentRef}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              Merging engineering with exceptional user experience
            </h2>
            <p className="text-lg text-gray-300 mb-6">
              Founded in 2020, devOops is a specialized development agency focused on
              creating robust, secure, and user-friendly software solutions. We excel at
              the intersection of technical excellence and intuitive design.
            </p>
            <p className="text-lg text-gray-300 mb-8">
              Our team of developers, engineers, and UX specialists brings extensive
              expertise in mobile app development, desktop software, cybersecurity,
              and web solutions to deliver products that exceed expectations and stand
              the test of time.
            </p>
            <div className="flex flex-wrap gap-6">
              <div>
                <h3 className="text-5xl font-bold text-devoops-blue mb-2">
                  75+
                </h3>
                <p className="text-gray-300">Projects delivered</p>
              </div>
              <div>
                <h3 className="text-5xl font-bold text-devoops-cyan mb-2">20</h3>
                <p className="text-gray-300">Expert developers</p>
              </div>
              <div>
                <h3 className="text-5xl font-bold text-devoops-blue mb-2">6</h3>
                <p className="text-gray-300">Industry awards</p>
              </div>
            </div>
          </div>
          <div
            className="lg:w-1/2 relative"
            data-animation="reveal-delay"
            ref={imageRef}
          >
            <div 
              className="relative aspect-square rounded-xl overflow-hidden cursor-pointer"
              ref={imageContainerRef}
              style={{ 
                transformStyle: "preserve-3d", 
                willChange: "transform",
              }}
            >
              <div className="w-full h-full rounded-xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Team of developers working together"
                  className="w-full h-full object-cover"
                  style={{ transformStyle: "preserve-3d" }}
                />
              </div>
              
              {/* Add subtle shadow that moves with tilt */}
              <div 
                className="absolute inset-0 rounded-xl shadow-lg shadow-element"
                style={{ 
                  boxShadow: `0 20px 30px rgba(0, 0, 0, 0.4), 
                             ${rotateY * -1}px ${rotateX}px 30px rgba(0, 0, 0, 0.3)`,
                  transition: "box-shadow 0.2s ease-out"
                }}
              />
            </div>
            <motion.div
              className="absolute -bottom-10 -left-10 z-10 p-6 bg-devoops-blue rounded-xl"
              animate={{
                y: [0, -20, 0],
              }}
              transition={{
                duration: 6,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "loop",
              }}
            >
              <p className="text-lg font-medium">
                "Building software that works securely, reliably, and intuitively"
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}