import { useRef } from "react";
import { motion } from "framer-motion";
import { useGsapReveal } from "@/hooks/use-gsap-reveal";

export function AboutSection() {
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useGsapReveal([contentRef.current, imageRef.current]);

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
            <div className="relative aspect-square rounded-xl overflow-hidden rotate-3d">
              <img
                src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Team of developers working together"
                className="w-full h-full object-cover"
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
