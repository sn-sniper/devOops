import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { CustomCursor } from "@/components/ui/custom-cursor";
// import { Loader } from "@/components/ui/loader";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";

// Import SVG icons from Lucide React
import {
  Server,
  Code,
  Wifi,
  Cable,
  Plug,
  BatteryWarning,
  RotateCcw,
  Globe,
  Home,
} from "lucide-react";

export default function NotFound() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [glitchEffect, setGlitchEffect] = useState(false);
  const [errorCode, setErrorCode] = useState("404");

  // Initialize smooth scrolling
  useSmoothScroll();

  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMenu = () => {
    setMobileMenuOpen(false);
  };

  // Trigger occasional glitch effects
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitchEffect(true);
      setTimeout(() => setGlitchEffect(false), 150);

      // Occasionally change error code for brief moments to simulate glitching
      if (Math.random() > 0.7) {
        const randomCodes = ["500", "403", "502", "ERR", "000", "SYS"];
        setErrorCode(
          randomCodes[Math.floor(Math.random() * randomCodes.length)]
        );
        setTimeout(() => setErrorCode("404"), 300);
      }
    }, 3000);

    return () => clearInterval(glitchInterval);
  }, []);

  // Floating icons animation
  const iconElements = [Server, Code, Wifi, Cable, Plug, BatteryWarning];

  return (
    <div className="overflow-x-hidden bg-slate-950 min-h-screen">
      {/* <Loader /> */}
      <CustomCursor />
      <Navbar toggleMenu={toggleMenu} />
      <MobileMenu isOpen={mobileMenuOpen} onClose={closeMenu} />

      <main className="relative pt-32 pb-20 overflow-hidden">
        {/* Animated background grid */}
        <div className="absolute inset-0 overflow-hidden -z-10">
          <motion.div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `linear-gradient(to right, rgba(79, 70, 229, 0.1) 1px, transparent 1px), 
                               linear-gradient(to bottom, rgba(79, 70, 229, 0.1) 1px, transparent 1px)`,
              backgroundSize: "3rem 3rem",
            }}
            animate={{
              y: [0, 20],
              opacity: [0.1, 0.2, 0.1],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        </div>

        {/* Floating tech elements in background */}
        <div className="absolute inset-0 overflow-hidden -z-10">
          {iconElements.map((Icon, index) => {
            const size = Math.random() * 30 + 20;
            const xPos = Math.random() * 100;
            const delay = Math.random() * 5;
            const duration = Math.random() * 10 + 15;

            return (
              <motion.div
                key={index}
                className="absolute text-devoops-blue/10"
                style={{
                  left: `${xPos}%`,
                  top: "30%",
                }}
                initial={{ y: "100vh" }}
                animate={{
                  y: [null, -100, -300],
                  rotate: [0, 360],
                  opacity: [0.1, 0.3, 0.1],
                }}
                transition={{
                  y: { duration, delay, repeat: Infinity, repeatType: "loop" },
                  rotate: {
                    duration: duration * 0.5,
                    repeat: Infinity,
                    ease: "linear",
                  },
                  opacity: {
                    duration: duration * 0.3,
                    repeat: Infinity,
                    repeatType: "mirror",
                  },
                }}
              >
                <Icon size={size} />
              </motion.div>
            );
          })}
        </div>

        <div className="container px-6 mx-auto relative z-10">
          {/* Main 404 content */}
          <div className="flex flex-col items-center text-center mb-12">
            {/* Glitching 404 number */}
            <motion.div
              className={`text-9xl md:text-[12rem] font-bold text-transparent bg-clip-text 
                ${
                  glitchEffect
                    ? "bg-red-500"
                    : "bg-gradient-to-r from-devoops-blue to-blue-500"
                }`}
              animate={{
                textShadow: glitchEffect
                  ? [
                      "0 0 7px #ff2d2d",
                      "0 0 10px #4f46e5",
                      "0 0 21px #2196f3",
                      "0 0 42px rgba(33, 150, 243, 0.5)",
                    ]
                  : [
                      "0 0 7px rgba(79, 70, 229, 0.7)",
                      "0 0 10px rgba(79, 70, 229, 0.5)",
                      "0 0 21px rgba(33, 150, 243, 0.5)",
                      "0 0 42px rgba(33, 150, 243, 0.2)",
                    ],
              }}
              transition={{
                duration: 0.2,
                ease: "easeInOut",
              }}
            >
              <motion.span
                animate={{
                  x: glitchEffect ? [0, -7, 5, -3, 0] : 0,
                  y: glitchEffect ? [0, 3, -5, 2, 0] : 0,
                }}
                transition={{ duration: 0.15 }}
              >
                {errorCode}
              </motion.span>
            </motion.div>

            {/* Error message with glitch effect */}
            <motion.h1
              className="text-2xl md:text-4xl font-bold text-white mt-6 mb-6 relative"
              animate={{
                x: glitchEffect ? [0, 3, -3, 1, 0] : 0,
              }}
              transition={{ duration: 0.15 }}
            >
              <span className={glitchEffect ? "text-red-400" : "text-white"}>
                Signal Lost: Page Not Found
              </span>
            </motion.h1>

            {/* Server rack visualization */}
            <motion.div
              className="w-full max-w-xl bg-slate-900 rounded-lg p-6 mb-8 border border-slate-800"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <div className="flex items-center mb-3">
                <div className="flex space-x-2">
                  <span
                    className={`inline-block w-3 h-3 rounded-full ${
                      glitchEffect ? "bg-red-500" : "bg-red-500 animate-pulse"
                    }`}
                  ></span>
                  <span className="inline-block w-3 h-3 rounded-full bg-yellow-500"></span>
                  <span className="inline-block w-3 h-3 rounded-full bg-green-500 opacity-50"></span>
                </div>
                <div className="ml-4 text-xs text-slate-400 font-mono">
                  server-response.log
                </div>
              </div>

              <div className="font-mono text-sm text-slate-400 border-t border-slate-800 pt-3">
                <p className="mb-1">
                  <span className="text-green-400">$</span> GET request to{" "}
                  <span className="text-devoops-blue">
                    {window.location.pathname}
                  </span>
                </p>
                <p className="mb-1">
                  <span className="text-red-400">ERROR:</span> Route not found
                  on server
                </p>
                <p className="mb-1">
                  <span className="text-yellow-400">WARNING:</span> Connection
                  status unstable
                </p>
                <motion.p
                  className="mb-1 opacity-80"
                  animate={{
                    opacity: [0.8, 0.4, 0.8],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <span className="text-blue-400">SYSTEM:</span> Attempting
                  route recovery...
                </motion.p>
                <p className="mb-1 opacity-60">
                  <span className="text-slate-500">DEBUG:</span> Check
                  application router for valid paths
                </p>
              </div>
            </motion.div>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <Link href="/">
                <motion.a
                  className="flex items-center justify-center gap-2 px-8 py-3 bg-devoops-blue hover:bg-devoops-blue/90 text-white font-medium rounded-full transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Home size={18} />
                  Return Home
                </motion.a>
              </Link>

              <motion.a
                href="javascript:history.back()"
                className="flex items-center justify-center gap-2 px-8 py-3 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-full transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <RotateCcw size={18} />
                Go Back
              </motion.a>
            </div>
          </div>

          {/* Server status indicators */}
          <motion.div
            className="max-w-3xl mx-auto mt-12 bg-slate-900/50 backdrop-blur-sm rounded-lg p-4 border border-slate-800"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            <div className="text-center mb-3 text-sm text-slate-400">
              Server Status
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <ServerStatusIndicator
                icon={Globe}
                label="Network Status"
                status="online"
                glitching={glitchEffect}
              />
              <ServerStatusIndicator
                icon={Server}
                label="API Service"
                status="degraded"
                glitching={glitchEffect}
              />
              <ServerStatusIndicator
                icon={Wifi}
                label="Client Router"
                status="offline"
                glitching={glitchEffect}
              />
              <ServerStatusIndicator
                icon={Code}
                label="Renderer"
                status="warning"
                glitching={glitchEffect}
              />
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

// Server status indicator component
function ServerStatusIndicator({ icon: Icon, label, status, glitching }) {
  const statusColors = {
    online: "bg-green-500",
    offline: "bg-red-500",
    degraded: "bg-yellow-500",
    warning: "bg-orange-500",
  };

  const labelColors = {
    online: "text-green-400",
    offline: "text-red-400",
    degraded: "text-yellow-400",
    warning: "text-orange-400",
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center p-3 rounded-md bg-slate-800/50 border border-slate-700/50"
      whileHover={{ y: -3, boxShadow: "0 4px 20px rgba(79, 70, 229, 0.2)" }}
      animate={{
        x: glitching && status !== "online" ? [0, -2, 2, -1, 0] : 0,
      }}
    >
      <div className="mb-2">
        <Icon className={`h-5 w-5 ${labelColors[status]}`} />
      </div>
      <div className="text-xs font-medium text-slate-300 mb-1">{label}</div>
      <div className="flex items-center space-x-1">
        <motion.span
          className={`inline-block w-2 h-2 rounded-full ${statusColors[status]}`}
          animate={{
            opacity: status === "online" ? 1 : [0.7, 0.3, 0.7],
            scale: status === "warning" ? [1, 1.2, 1] : 1,
          }}
          transition={{
            duration: status === "warning" ? 0.8 : 1.5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <span className={`text-xs ${labelColors[status]}`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      </div>
    </motion.div>
  );
}
