import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useGsapReveal(elements: (HTMLElement | null)[]) {
  useEffect(() => {
    const filteredElements = elements.filter(Boolean) as HTMLElement[];
    
    if (filteredElements.length === 0) return;

    const animations = filteredElements.map((el, index) => {
      const animation = gsap.fromTo(
        el,
        { 
          y: 50, 
          opacity: 0 
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: index * 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );

      return animation;
    });

    return () => {
      animations.forEach(animation => {
        if (animation.scrollTrigger) {
          animation.scrollTrigger.kill();
        }
        animation.kill();
      });
    };
  }, [elements]);
}
