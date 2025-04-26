import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Typewriter from "typewriter-effect";
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
          <span className="block">Secure your vision</span>
          <span className="block">
            with our
            <span className="text-devoops-cyan text-glow"> Algorithms.</span>
          </span>
          <span className="block typewriter-container">
            <div className="inline-flex">
              <Typewriter
                onInit={(typewriter) => {
                  typewriter
                    //first phrase
                    .typeString("C")
                    .pauseFor(100)
                    .typeString("o")
                    .pauseFor(100)
                    .typeString("d")
                    .pauseFor(100)
                    .typeString("e")
                    .pauseFor(100)
                    .typeString(".")
                    .pauseFor(200)
                    .typeString(" ")

                    .typeString('<span class="text-devoops-blue">C</span>')
                    .pauseFor(100)
                    .typeString('<span class="text-devoops-blue">r</span>')
                    .pauseFor(100)
                    .typeString('<span class="text-devoops-blue">e</span>')
                    .pauseFor(100)
                    .typeString('<span class="text-devoops-blue">a</span>')
                    .pauseFor(100)
                    .typeString('<span class="text-devoops-blue">t</span>')
                    .pauseFor(100)
                    .typeString('<span class="text-devoops-blue">e</span>')
                    .pauseFor(100)
                    .typeString('<span class="text-devoops-blue">.</span>')
                    .pauseFor(200)
                    .typeString(" ")

                    .typeString(
                      '<span class="text-devoops-indigo text-glow2">E</span>'
                    )
                    .pauseFor(100)
                    .typeString(
                      '<span class="text-devoops-indigo text-glow2">l</span>'
                    )
                    .pauseFor(100)
                    .typeString(
                      '<span class="text-devoops-indigo text-glow2">e</span>'
                    )
                    .pauseFor(100)
                    .typeString(
                      '<span class="text-devoops-indigo text-glow2">v</span>'
                    )
                    .pauseFor(100)
                    .typeString(
                      '<span class="text-devoops-indigo text-glow2">a</span>'
                    )
                    .pauseFor(100)
                    .typeString(
                      '<span class="text-devoops-indigo text-glow2">t</span>'
                    )
                    .pauseFor(100)
                    .typeString(
                      '<span class="text-devoops-indigo text-glow2">e</span>'
                    )
                    .pauseFor(100)
                    .typeString(
                      '<span class="text-devoops-indigo text-glow2">!</span>'
                    )
                    .pauseFor(2000)
                    .deleteAll()
                    //second phrase
                    .typeString("D")
                    .pauseFor(100)
                    .typeString("e")
                    .pauseFor(100)
                    .typeString("s")
                    .pauseFor(100)
                    .typeString("i")
                    .pauseFor(100)
                    .typeString("g")
                    .pauseFor(100)
                    .typeString("n")
                    .pauseFor(100)
                    .typeString(".")
                    .pauseFor(200)
                    .typeString(" ")

                    .typeString('<span class="text-devoops-blue">D</span>')
                    .pauseFor(100)
                    .typeString('<span class="text-devoops-blue">e</span>')
                    .pauseFor(100)
                    .typeString('<span class="text-devoops-blue">v</span>')
                    .pauseFor(100)
                    .typeString('<span class="text-devoops-blue">e</span>')
                    .pauseFor(100)
                    .typeString('<span class="text-devoops-blue">l</span>')
                    .pauseFor(100)
                    .typeString('<span class="text-devoops-blue">o</span>')
                    .pauseFor(100)
                    .typeString('<span class="text-devoops-blue">p</span>')
                    .pauseFor(100)
                    .typeString('<span class="text-devoops-blue">.</span>')
                    .pauseFor(200)
                    .typeString(" ")

                    .typeString(
                      '<span class="text-devoops-indigo text-glow2">D</span>'
                    )
                    .pauseFor(100)
                    .typeString(
                      '<span class="text-devoops-indigo text-glow2">e</span>'
                    )
                    .pauseFor(100)
                    .typeString(
                      '<span class="text-devoops-indigo text-glow2">p</span>'
                    )
                    .pauseFor(100)
                    .typeString(
                      '<span class="text-devoops-indigo text-glow2">l</span>'
                    )
                    .pauseFor(100)
                    .typeString(
                      '<span class="text-devoops-indigo text-glow2">o</span>'
                    )
                    .pauseFor(100)
                    .typeString(
                      '<span class="text-devoops-indigo text-glow2">y</span>'
                    )
                    .pauseFor(100)
                    .typeString(
                      '<span class="text-devoops-indigo text-glow2">!</span>'
                    )
                    .pauseFor(2000)
                    .deleteAll()
                    .start();
                }}
                options={{
                  loop: true,
                  delay: 30, // Faster base typing speed
                  deleteSpeed: 15, // Faster deletion speed
                  autoStart: true,
                  stringSplitter: (text) => {
                    return text.split(/(<\/?span.*?>)/g).filter(Boolean);
                  },
                  html: true,
                }}
              />
            </div>
          </span>
        </h1>
        <p
          className="mt-8 text-xl md:text-2xl text-center text-gray-300 max-w-3xl"
          ref={addToRefs}
        >
          We don't just ship code — we craft experiences that scale.{" "}
        </p>
        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        ></motion.div>
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
