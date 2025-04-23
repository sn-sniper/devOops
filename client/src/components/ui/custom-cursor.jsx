import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export function CustomCursor() {
  const cursorRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Initial check
    checkMobile();

    // Add resize listener to update when orientation changes
    window.addEventListener("resize", checkMobile);

    // Clean up listener
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Separate useEffect for handling cursor visibility globally
  useEffect(() => {
    // Setup global cursor handling
    if (isMobile) {
      // Remove cursor styling on mobile
      document.documentElement.style.cursor = "auto";
      document.body.style.cursor = "auto";
      
      // Remove any cursor: none rules that might have been added
      const styleSheet = document.createElement("style");
      styleSheet.id = "cursor-reset";
      styleSheet.textContent = `
        a, button, input, textarea, select { cursor: auto !important; }
      `;
      document.head.appendChild(styleSheet);
      
      return () => {
        if (document.getElementById("cursor-reset")) {
          document.head.removeChild(document.getElementById("cursor-reset"));
        }
      };
    } else {
      // Hide default cursor on desktop with high specificity
      const styleSheet = document.createElement("style");
      styleSheet.id = "cursor-none";
      styleSheet.textContent = `
        html, body, * { cursor: none !important; }
        a, button, input, textarea, select { cursor: none !important; }
        .cursor-hide-zone { cursor: auto !important; }
        .cursor-hide-zone * { cursor: auto !important; }
      `;
      document.head.appendChild(styleSheet);
      
      return () => {
        if (document.getElementById("cursor-none")) {
          document.head.removeChild(document.getElementById("cursor-none"));
        }
      };
    }
  }, [isMobile]);
  
  useEffect(() => {
    // If mobile, don't set up cursor movement effects
    if (isMobile) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    // Track whether cursor following is paused
    const cursorState = {
      followMouse: true
    };
    
    // Define mouse movement handler
    const onMouseMove = (e) => {
      // Only follow mouse if not paused
      if (cursorState.followMouse) {
        gsap.to(cursor, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.1,
          ease: "power3.out",
        });
      }
    };

    window.addEventListener("mousemove", onMouseMove);

    // Smaller default size for standard interactive elements
    const standardInteractiveElements = document.querySelectorAll(
      "button:not(nav button):not(footer button), input, textarea, select, .interactive",
    );

    standardInteractiveElements.forEach((el) => {
      el.addEventListener("mouseenter", () => {
        gsap.to(cursor, {
          width: 50,
          height: 50,
          borderRadius: "9999px", // Circle
          duration: 0.3,
        });
      });

      el.addEventListener("mouseleave", () => {
        gsap.to(cursor, {
          width: 20,
          height: 20,
          borderRadius: "9999px", // Circle
          duration: 0.3,
        });
      });
    });

    // Special handling for navbar and footer links
    const navbarFooterLinks = document.querySelectorAll(
      "nav a, footer a, .nav-item, .footer-link",
    );

    navbarFooterLinks.forEach((link) => {
      link.addEventListener("mouseenter", (e) => {
        // Get the link's dimensions and position
        const rect = link.getBoundingClientRect();
        
        // Calculate the center position of the link
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Pause cursor following
        cursorState.followMouse = false;
        
        // Adjust cursor to match the link's size with padding and rounded corners
        // and position it at the center of the link
        gsap.to(cursor, {
          x: centerX,
          y: centerY,
          width: rect.width + 20, // Add 10px padding on each side
          height: rect.height + 10, // Add some vertical padding too
          borderRadius: "100rem", // Very rounded corners
          duration: 0.3,
          overwrite: "auto",
        });
      });

      link.addEventListener("mouseleave", (e) => {
        // Get the current mouse position when leaving
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        // Reset to default circular cursor and position at current mouse position
        gsap.to(cursor, {
          x: mouseX,
          y: mouseY,
          width: 20,
          height: 20,
          borderRadius: "9999px", // Full rounded (circle)
          duration: 0.3,
          onComplete: () => {
            // Re-enable cursor following after animation completes
            cursorState.followMouse = true;
          }
        });
      });
    });

    // Handle cursor hide zones (like maps)
    const cursorHideZones = document.querySelectorAll(".cursor-hide-zone");
    
    const handleCursorHideEnter = () => {
      // Hide the custom cursor 
      setIsVisible(false);
      gsap.to(cursor, {
        opacity: 0,
        duration: 0.2,
      });
    };
    
    const handleCursorHideLeave = () => {
      // Show the custom cursor
      setIsVisible(true);
      gsap.to(cursor, {
        opacity: 1,
        duration: 0.2,
      });
    };
    
    cursorHideZones.forEach((zone) => {
      zone.addEventListener("mouseenter", handleCursorHideEnter);
      zone.addEventListener("mouseleave", handleCursorHideLeave);
    });

    return () => {
      // Reset cursor style when component unmounts
      document.body.style.cursor = "auto";
      
      window.removeEventListener("mousemove", onMouseMove);

      standardInteractiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", () => {});
        el.removeEventListener("mouseleave", () => {});
      });

      navbarFooterLinks.forEach((link) => {
        link.removeEventListener("mouseenter", () => {});
        link.removeEventListener("mouseleave", () => {});
      });
      
      cursorHideZones.forEach((zone) => {
        zone.removeEventListener("mouseenter", handleCursorHideEnter);
        zone.removeEventListener("mouseleave", handleCursorHideLeave);
      });
    };
  }, [isMobile]);

  // Don't render anything if on mobile
  if (isMobile) return null;

  return (
    <div
      ref={cursorRef}
      className={`fixed w-[20px] h-[20px] rounded-full bg-devoops-white pointer-events-none mix-blend-difference z-[9999] transform -translate-x-1/2 -translate-y-1/2 hidden md:block ${!isVisible ? 'opacity-0' : 'opacity-100'}`}
      style={{ top: 0, left: 0 }}
    ></div>
  );
}
