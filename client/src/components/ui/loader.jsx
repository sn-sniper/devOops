import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import iconPath from "@/assets/ICON.png";

export function Loader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set a timer to remove the loader after a few seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  // Define animations for letters
  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.3 + i * 0.1,
        duration: 0.4,
        ease: "easeOut",
      },
    }),
    exit: (i) => ({
      opacity: 0,
      y: -20,
      transition: {
        delay: i * 0.05,
        duration: 0.3,
        ease: "easeIn",
      },
    }),
  };

  // Container animations
  const containerVariants = {
    initial: { opacity: 1 },
    exit: {
      opacity: 0,
      transition: {
        delay: 0.5,
        duration: 0.8,
        ease: "easeInOut",
      },
    },
  };

  // Define letter and icon parts
  const leftLetters = ["D", "E", "V"];
  const rightLetters = [ "P", "S"];
  const leftColors = ["text-white", "text-devoops-cyan", "text-devoops-blue"];
  const rightColors = [ "text-devoops-cyan", "text-white"];

  // Big circle animation for immersive effect
  const bigCircleVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: [0, 1, 20],
      opacity: [0, 0.3, 0],
      transition: {
        delay: 2.5,
        duration: 1.5,
        ease: [0.16, 1, 0.3, 1], // Cinematic easing
        times: [0, 0.2, 1],
      },
    },
  };

  // Icon animation
  const iconVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.6,
        duration: 0.5,
        ease: "easeOut",
      },
    },
    pulse: {
      scale: [1, 1.1, 1],
      filter: [
        "drop-shadow(0 0 5px rgba(79, 70, 229, 0.5))",
        "drop-shadow(0 0 15px rgba(79, 70, 229, 0.8))",
        "drop-shadow(0 0 5px rgba(79, 70, 229, 0.5))",
      ],
      transition: {
        duration: 2,
        repeat: 2,
        repeatType: "reverse",
      },
    },
  };

  // Rising small particles
  const particlesCount = 30;
  const particles = Array.from({ length: particlesCount });

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed top-0 left-0 w-full h-full bg-black flex justify-center items-center z-[9999] overflow-hidden"
          initial="initial"
          exit="exit"
          variants={containerVariants}
        >
          {/* Background ambient glow */}
          <motion.div
            className="absolute h-96 w-96 rounded-full opacity-20"
            style={{
              background:
                "radial-gradient(circle, rgba(79, 70, 229, 0.3) 0%, rgba(0, 0, 0, 0) 70%)",
            }}
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />

          {/* Logo container with scale animation */}
          <motion.div
            className="relative"
            initial={{ scale: 1 }}
            animate={{
              scale: [1, 1, 1.8],
            }}
            transition={{
              duration: 2.5,
              times: [0, 0.6, 1],
              ease: "easeOut",
              delay: 1.5,
            }}
          >
            {/* Logo with Icon in the middle */}
            <div className="flex items-center justify-center space-x-1 md:space-x-2 text-5xl md:text-7xl font-bold relative">
              {/* Left side letters */}
              {leftLetters.map((letter, i) => (
                <motion.div
                  key={`left-${i}`}
                  className={`${leftColors[i]} inline-block`}
                  custom={i}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={letterVariants}
                >
                  {letter}
                </motion.div>
              ))}

              {/* Middle icon */}
              <motion.div
                className="relative z-10 mx-1 h-16 w-16 md:h-20 md:w-20 inline-flex justify-center items-center"
                initial="hidden"
                animate={["visible", "pulse"]}
                variants={iconVariants}
                style={{
                  position: "relative",
                  top: "-5px",
                }}
              >
                <img
                  src={iconPath}
                  alt="DevOops Icon"
                  className="w-full h-full object-contain"
                />

                {/* Glow effect for the icon */}
                <motion.div
                  className="absolute inset-0 rounded-full bg-indigo-500 opacity-30 blur-md -z-10"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.3, 0.7, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: 2,
                    repeatType: "reverse",
                  }}
                />
              </motion.div>

              {/* Right side letters */}
              {rightLetters.map((letter, i) => (
                <motion.div
                  key={`right-${i}`}
                  className={`${rightColors[i]} inline-block`}
                  custom={i + leftLetters.length + 1} // Offset for animation timing
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={letterVariants}
                >
                  {letter}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Diving into the icon effect */}
          <motion.div
            className="absolute w-80 h-80 rounded-full bg-indigo-500/10"
            variants={bigCircleVariants}
            initial="hidden"
            animate="visible"
          />

          {/* Tech-inspired circular rings */}
          <div className="absolute w-60 h-60">
            {[0, 1, 2].map((ring) => (
              <motion.div
                key={ring}
                className="absolute rounded-full border border-indigo-500/20"
                style={{
                  width: `${100 + ring * 40}%`,
                  height: `${100 + ring * 40}%`,
                  left: `-${ring * 20}%`,
                  top: `-${ring * 20}%`,
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: [0.2, 0.4, 0.2],
                  scale: [1, 1.05, 1],
                  rotate: [0, 180],
                }}
                transition={{
                  duration: 6 - ring,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "linear",
                  delay: ring * 0.3,
                }}
              />
            ))}
          </div>

          {/* Floating particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {particles.map((_, i) => {
              const size = Math.random() * 4 + 2;
              const x = Math.random() * 100;
              const delay = Math.random() * 2;
              const duration = Math.random() * 2 + 2;

              return (
                <motion.div
                  key={i}
                  className="absolute rounded-full bg-blue-500"
                  style={{
                    left: `${x}%`,
                    width: size,
                    height: size,
                    opacity: Math.random() * 0.5 + 0.3,
                    backgroundColor:
                      i % 3 === 0
                        ? "#4f46e5"
                        : i % 3 === 1
                        ? "#60a5fa"
                        : "#93c5fd",
                  }}
                  initial={{ y: "110vh" }}
                  animate={{ y: "-10vh" }}
                  transition={{
                    duration,
                    delay,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "linear",
                  }}
                />
              );
            })}
          </div>

          {/* Digital noise overlay */}
          <motion.div
            className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
              backgroundSize: "cover",
            }}
            animate={{
              opacity: [0.1, 0.15, 0.1],
              backgroundPosition: ["0% 0%", "100% 100%"],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: "mirror",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
