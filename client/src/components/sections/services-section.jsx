import { useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useGsapReveal } from "@/hooks/use-gsap-reveal";
import { services } from "@/data/services";

// Service icons mapping
const serviceIcons = {
  "Mobile App Design": (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-8 w-8 text-devoops-blue"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
      />
    </svg>
  ),
  "Web Design": (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-8 w-8 text-devoops-cyan"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
  ),
  "Mobile App Development": (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-8 w-8 text-devoops-blue"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
      />
    </svg>
  ),
  "Web Development": (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-8 w-8 text-devoops-cyan"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
      />
    </svg>
  ),
  "Software Development": (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-8 w-8 text-devoops-blue"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
      />
    </svg>
  ),
  "Software Upgrades": (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-8 w-8 text-devoops-blue"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
      />
    </svg>
  ),
  Hosting: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-8 w-8 text-devoops-cyan"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2"
      />
    </svg>
  ),
  SEO: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-8 w-8 text-devoops-blue"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  ),
  "Custom Domain": (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-8 w-8 text-devoops-cyan"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M10.172 13.828a4 4 0 015.656 0l4 4a4 4 0 01-5.656 5.656l-1.102-1.101"
      />
    </svg>
  ),
  "Custom Email": (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-8 w-8 text-devoops-blue"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
  ),
};

export function ServicesSection() {
  const headerRef = useRef(null);
  const servicesRef = useRef([]);
  const buttonRef = useRef(null);

  const displayedServices = services.slice(0, 4);

  useGsapReveal([headerRef.current, buttonRef.current]);

  return (
    <section
      id="services"
      className="py-20 md:py-32 px-8 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <div
          className="text-center mb-20"
          data-animation="reveal"
          ref={headerRef}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Services</h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            We deliver robust technological solutions designed to transform your
            business with secure, scalable, and user-friendly digital
            experiences.
          </p>
        </div>

        <div className="grid grid-cols-4 md:grid-cols-2 gap-8">
          {displayedServices.map((service, index) => {
            const colorClass = service.title.includes("Design")
              ? "devoops-blue"
              : service.title.includes("Development")
              ? "devoops-cyan"
              : index % 2 === 0
              ? "devoops-blue"
              : "devoops-cyan";

            return (
              <motion.div
                key={service.id}
                className={`p-8 rounded-xl bg-gradient-to-br from-[#121212] to-[#08080A] border border-gray-800 hover:border-devoops-blue transition-all duration-300`}
                ref={(el) => (servicesRef.current[index] = el)}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <div
                  className={`w-14 h-14 mb-6 bg-${colorClass} bg-opacity-10 rounded-lg flex items-center justify-center`}
                >
                  {serviceIcons[service.title] || (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-8 w-8 text-${colorClass}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                      />
                    </svg>
                  )}
                </div>
                <h3 className="text-xl font-bold mb-4 text-white">
                  {service.title}
                </h3>
                <p className="text-gray-400 mb-4">
                  {service.description.substring(0, 120)}...
                </p>
                <div className="flex flex-wrap gap-2 mb-2">
                  {service.technologies.slice(0, 2).map((tech, idx) => (
                    <span key={idx} className={`text-${colorClass} text-xs`}>
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        <div
          className="flex justify-center mt-16"
          data-animation="reveal"
          ref={buttonRef}
        >
          <Link
            to="/services"
            className="px-8 py-4 bg-devoops-blue text-white rounded-full text-lg font-medium hover:bg-opacity-90 transition-all transform hover:scale-105 inline-flex items-center gap-2"
          >
            <span>Explore All Services</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </div>
      </div>

      <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
          alt="Abstract pattern"
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  );
}
