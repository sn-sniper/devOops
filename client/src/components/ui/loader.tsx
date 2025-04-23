import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Loader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Slightly longer load time for better effect
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  // Text animation variants
  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.3 + (i * 0.1),
        duration: 0.4,
        ease: "easeOut"
      }
    })
  };

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed top-0 left-0 w-full h-full bg-black flex justify-center items-center z-[9999]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.7, ease: "easeInOut" } }}
        >
          <div className="text-5xl md:text-7xl font-bold tracking-tight relative">
            <motion.span 
              className="text-white"
              initial="hidden"
              animate="visible"
              custom={0}
              variants={letterVariants}
            >
              d
            </motion.span>
            <motion.span 
              className="text-devoops-cyan"
              initial="hidden"
              animate="visible"
              custom={1}
              variants={letterVariants}
            >
              e
            </motion.span>
            <motion.span 
              className="text-devoops-blue"
              initial="hidden"
              animate="visible"
              custom={2}
              variants={letterVariants}
            >
              v
            </motion.span>
            <motion.span 
              className="text-5xl md:text-8xl align-top text-indigo-500"
              initial="hidden"
              animate={{
                opacity: 1,
                y: 0,
                scale: [1, 1.1, 1],
                textShadow: "0 0 15px rgba(80, 0, 255, 0.7)"
              }}
              transition={{
                delay: 0.6,
                duration: 0.8,
                repeat: 1,
                repeatType: "reverse"
              }}
              style={{ 
                position: "relative", 
                top: "-5px",
                filter: "drop-shadow(0 0 8px rgba(76, 29, 149, 0.8))"
              }}
            >
              O
            </motion.span>
            <motion.span 
              className="text-devoops-blue"
              initial="hidden"
              animate="visible"
              custom={4}
              variants={letterVariants}
            >
              o
            </motion.span>
            <motion.span 
              className="text-devoops-cyan"
              initial="hidden"
              animate="visible"
              custom={5}
              variants={letterVariants}
            >
              p
            </motion.span>
            <motion.span 
              className="text-white"
              initial="hidden"
              animate="visible"
              custom={6}
              variants={letterVariants}
            >
              s
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
