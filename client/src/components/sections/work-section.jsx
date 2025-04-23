import { useRef } from "react";
import { motion } from "framer-motion";
import { useGsapReveal } from "@/hooks/use-gsap-reveal";

const projects = [
  {
    id: 1,
    title: "Neomorph Platform",
    description: "UI/UX Design, Development, 3D Animation",
    imageUrl:
      "https://images.unsplash.com/photo-1558655146-9f40138edfeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    imageAlt: "Abstract 3D UI elements",
  },
  {
    id: 2,
    title: "Vertex Interactive",
    description: "Brand Identity, Web Development, AR",
    imageUrl:
      "https://images.unsplash.com/photo-1633613286848-e6f43bbafb8d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    imageAlt: "Modern geometric shapes",
  },
  {
    id: 3,
    title: "Prismatic Experiences",
    description: "3D Modeling, Animation, WebGL",
    imageUrl:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    imageAlt: "Abstract 3D elements",
  },
  {
    id: 4,
    title: "Quantum Interface",
    description: "UX Research, Frontend Development",
    imageUrl:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    imageAlt: "Minimalist interface components",
  },
];

export function WorkSection() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef(null);
  const cardsRef = useRef([]);

  useGsapReveal([titleRef.current, textRef.current]);

  const staggerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * i,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
  };

  return (
    <section id="work" className="py-20 md:py-32 px-8" ref={sectionRef}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16">
          <h2
            className="text-4xl md:text-5xl font-bold"
            data-animation="reveal"
            ref={titleRef}
          >
            Featured Projects
          </h2>
          <p
            className="mt-4 md:mt-0 text-lg text-huly-gray max-w-md"
            data-animation="reveal-delay"
            ref={textRef}
          >
            A selection of our best work showcasing our capabilities in design,
            development, and creative strategy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="project-card rounded-xl overflow-hidden group"
              ref={(el) => (cardsRef.current[index] = el)}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerVariants}
            >
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={project.imageUrl}
                  alt={project.imageAlt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-huly-dark opacity-0 group-hover:opacity-90 transition-opacity duration-500 flex items-end">
                  <div className="p-8">
                    <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                    <p className="text-huly-gray">{project.description}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <a
            href="#"
            className="inline-flex items-center text-lg font-medium text-white group"
          >
            <span className="link-hover-effect">View all projects</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}