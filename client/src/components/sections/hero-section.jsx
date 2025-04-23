import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { HeroCanvas } from "../three/hero-canvas";
import { useGsapReveal } from "@/hooks/use-gsap-reveal";

export function HeroSection() {
  const revealRefs = useRef([]);
  const addToRefs = (el) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  };

  useGsapReveal(revealRefs.current);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="canvas-container">
        <HeroCanvas />
      </div>
      <div className="relative z-10 px-8 py-16 max-w-6xl mx-auto flex flex-col items-center">
        <h1
          className="text-4xl md:text-7xl lg:text-8xl font-bold text-center leading-tight"
          ref={addToRefs}
        >
          <span className="block">Developing powerful</span>
          <span className="block text-glow">
            solutions <span className="text-devoops-blue">that</span>
          </span>
          <span className="block">
            <span className="text-devoops-cyan">transform</span> & secure
          </span>
        </h1>
        <p
          className="mt-8 text-xl md:text-2xl text-center text-gray-300 max-w-3xl"
          ref={addToRefs}
        >
          We're a development agency specializing in UI/UX designs, mobile apps, 
          desktop software, and secure web solutions using cutting-edge technologies.
        </p>
        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <a
            href="#work"
            className="px-8 py-4 bg-devoops-blue text-white rounded-full text-lg font-medium hover:bg-opacity-90 transition-all transform hover:scale-105"
          >
            Explore Our Projects
          </a>
        </motion.div>
      </div>
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10">
        <div className="scroll-indicator">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-white opacity-80"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}