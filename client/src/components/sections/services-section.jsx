import { useRef } from "react";
import { motion } from "framer-motion";
import { useGsapReveal } from "@/hooks/use-gsap-reveal";

const services = [
  {
    id: 1,
    title: "UI/UX Design",
    description:
      "We create intuitive and visually striking interfaces that enhance user experience and drive engagement, from wireframes to high-fidelity prototypes.",
    icon: (
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
          d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
    color: "devoops-blue",
  },
  {
    id: 2,
    title: "Web Development",
    description:
      "We build secure, performant, responsive websites and web applications using modern technologies that deliver seamless experiences across all devices.",
    icon: (
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
    color: "devoops-cyan",
  },
  {
    id: 3,
    title: "Mobile App Development",
    description:
      "We design and build native and cross-platform mobile applications that deliver exceptional user experiences while meeting business objectives.",
    icon: (
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
    color: "devoops-blue",
  },
  {
    id: 4,
    title: "Desktop Applications",
    description:
      "We develop powerful, efficient desktop software with intuitive interfaces for Windows, macOS, and Linux that solve complex business challenges.",
    icon: (
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
          d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
    color: "devoops-blue",
  },
  {
    id: 5,
    title: "Cybersecurity",
    description:
      "We implement robust security measures to protect your digital assets, identify vulnerabilities, and ensure data privacy compliance.",
    icon: (
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
          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
        />
      </svg>
    ),
    color: "devoops-cyan",
  },
  {
    id: 6,
    title: "DevOps Solutions",
    description:
      "We streamline your development workflows, implement CI/CD pipelines, and optimize cloud infrastructure for scalability and reliability.",
    icon: (
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
    color: "devoops-blue",
  },
];

export function ServicesSection() {
  const headerRef = useRef(null);
  const servicesRef = useRef([]);

  useGsapReveal([headerRef.current]);

  return (
    <section id="services" className="py-20 md:py-32 px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div
          className="text-center mb-20"
          data-animation="reveal"
          ref={headerRef}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Services</h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            We deliver robust technological solutions designed to transform your business
            with secure, scalable, and user-friendly digital experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              className={`p-8 rounded-xl bg-gradient-to-br from-[#121212] to-[#08080A] border border-gray-800 hover:border-${service.color} transition-all duration-300`}
              ref={(el) => (servicesRef.current[index] = el)}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <div
                className={`w-14 h-14 mb-6 bg-${service.color} bg-opacity-10 rounded-lg flex items-center justify-center`}
              >
                {service.icon}
              </div>
              <h3 className="text-xl font-bold mb-4 text-white">{service.title}</h3>
              <p className="text-gray-400">{service.description}</p>
            </motion.div>
          ))}
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