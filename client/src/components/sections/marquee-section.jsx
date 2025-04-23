import { useRef, useEffect } from "react";
import { gsap } from "gsap";

// Define the marquee content
const marqueeItems = [
  { text: "Create", color: "white" },
  { text: "•", color: "text-devoops-blue" },
  { text: "Innovate", color: "white" },
  { text: "•", color: "text-devoops-indigo" },
  { text: "Design", color: "white" },
  { text: "•", color: "text-devoops-cyan" },
  { text: "Develop", color: "white" },
  { text: "•", color: "text-devoops-blue" },
  { text: "Experience", color: "white" },
  { text: "•", color: "text-devoops-indigo" },
];

export function MarqueeSection() {
  const marqueeRef = useRef(null);
  
  useEffect(() => {
    const marqueeElement = marqueeRef.current;
    if (!marqueeElement) return;

    // Create copy of the marquee content for seamless looping
    const marqueeContent = marqueeElement.querySelector('.marquee-content');
    const marqueeContentClone = marqueeContent.cloneNode(true);
    marqueeElement.appendChild(marqueeContentClone);
    
    // Setup animation with GSAP
    const animation = gsap.to(marqueeElement, {
      x: "-50%", // Move to the left by 50% of its width
      duration: 12, // Duration in seconds (faster than before)
      ease: "none", // Linear animation for smoothness
      repeat: -1, // Infinite repetition
      onRepeat: () => {
        // Immediately reset to start position when reaching the end
        gsap.set(marqueeElement, { x: "0%" });
      }
    });
    
    // Clean up animation on component unmount
    return () => {
      animation.kill();
    };
  }, []);
  
  return (
    <section className="py-20 bg-slate-950 overflow-hidden">
      <div className="marquee-outer">
        <div className="marquee-inner" ref={marqueeRef}>
          <div className="marquee-content flex items-center space-x-8 text-5xl md:text-7xl font-bold opacity-40">
            {marqueeItems.map((item, index) => (
              <span 
                key={index} 
                className={item.color === "white" ? "" : item.color}
              >
                {item.text}
              </span>
            ))}
          </div>
          {/* Clone is created in useEffect */}
        </div>
      </div>
    </section>
  );
}