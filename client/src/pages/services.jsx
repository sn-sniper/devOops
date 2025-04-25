    import { useState, useEffect, useRef } from "react";
    import { motion, AnimatePresence } from "framer-motion";
    import { useNavigate } from "react-router-dom";
    import { Navbar } from "@/components/layout/navbar";
    import { Footer } from "@/components/layout/footer";
    import { MobileMenu } from "@/components/layout/mobile-menu";
    import { Badge } from "@/components/ui/badge";
    import { CustomCursor } from "@/components/ui/custom-cursor";
    import { useToast } from "@/hooks/use-toast";
    import gsap from "gsap";
    import { ScrollTrigger } from "gsap/ScrollTrigger";
    import { services as servicesData } from "@/data/services.js";

    gsap.registerPlugin(ScrollTrigger);

    export default function Services() {
      const [isMenuOpen, setIsMenuOpen] = useState(false);
      const [selectedService, setSelectedService] = useState(null);
      const servicesRef = useRef(null);
      const serviceSectionRefs = useRef([]);
      const navigate = useNavigate();
      const { toast } = useToast();

      // Toggle mobile menu
      const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
      };

      // Handle service selection
      const handleServiceSelect = (service) => {
        setSelectedService(service);
        window.scrollTo({ top: 0, behavior: "smooth" });
      };

      // Handle close service detail view
      const handleCloseDetail = () => {
        setSelectedService(null);
      };

      // Handle contact for service
      const handleContactForService = (service) => {
        toast({
          title: `Interested in ${service.title}?`,
          description:
            "We'll get in touch with you soon to discuss how we can help.",
        });
        navigate("/contact", { state: { serviceInterest: service.title } });
      };

      useEffect(() => {
        const elements = serviceSectionRefs.current;

        elements.forEach((el, index) => {
          if (!el) return;

          gsap.fromTo(
            el,
            {
              y: 60,
              opacity: 0,
            },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              delay: index * 0.1,
              scrollTrigger: {
                trigger: el,
                start: "top 80%",
                toggleActions: "play none none none",
              },
            }
          );
        });

        return () => {
          ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
      }, []);

      return (
        <div className="min-h-screen bg-devoops-dark text-white">
          <CustomCursor />
          <Navbar toggleMenu={toggleMenu} />
          <MobileMenu
            isOpen={isMenuOpen}
            onClose={() => setIsMenuOpen(false)}
          />

          <AnimatePresence mode="wait">
            {selectedService ? (
              <motion.div
                key="service-detail"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="pt-32 pb-20 px-6 sm:px-8 md:px-16 lg:px-32 max-w-8xl mx-auto"
              >
                <div className="flex justify-between items-center mb-8">
                  <button
                    onClick={handleCloseDetail}
                    className="text-white hover:text-devoops-blue transition-colors flex items-center gap-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 19l-7-7m0 0l7-7m-7 7h18"
                      />
                    </svg>
                    Back to Services
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                  <div className="col-span-1 lg:col-span-2">
                    <div
                      className={`rounded-2xl p-8 mb-8 ${selectedService.color} shadow-lg`}
                    >
                      <div className="text-4xl mb-4">
                        {selectedService.icon}
                      </div>
                      <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        {selectedService.title}
                      </h1>
                      <p className="text-lg md:text-xl opacity-90 mb-6">
                        {selectedService.description}
                      </p>
                    </div>

                    <div className="bg-black bg-opacity-30 rounded-2xl p-8 mb-8">
                      <h2 className="text-2xl font-bold mb-6 border-l-4 border-devoops-blue pl-4">
                        Key Benefits
                      </h2>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {selectedService.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <div className="text-devoops-blue mt-1">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                            <span className="text-lg">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-black bg-opacity-30 rounded-2xl p-8">
                      <h2 className="text-2xl font-bold mb-6 border-l-4 border-devoops-cyan pl-4">
                        Our Approach
                      </h2>
                      <div className="prose prose-lg prose-invert max-w-none">
                        <p>
                          At devOops, we approach every{" "}
                          {selectedService.title.toLowerCase()} project with a
                          carefully structured methodology:
                        </p>
                        <ol className="mt-4 space-y-4">
                          <li>
                            <strong>Discovery & Analysis</strong> - We start by
                            understanding your business goals, target audience,
                            and technical requirements.
                          </li>
                          <li>
                            <strong>Strategic Planning</strong> - Our team
                            develops a detailed roadmap outlining milestones,
                            technologies, and resource requirements.
                          </li>
                          <li>
                            <strong>Iterative Development</strong> - We follow
                            agile principles, creating functioning prototypes
                            early and refining through continuous feedback.
                          </li>
                          <li>
                            <strong>Quality Assurance</strong> - Rigorous
                            testing ensures your solution meets the highest
                            quality standards and performs flawlessly.
                          </li>
                          <li>
                            <strong>Deployment & Support</strong> - We oversee
                            smooth deployment and provide ongoing maintenance to
                            ensure long-term success.
                          </li>
                        </ol>
                      </div>
                    </div>
                  </div>

                  <div className="col-span-1">
                    <div className="sticky top-32">
                      <div className="bg-black bg-opacity-30 rounded-2xl p-8 mb-8">
                        <h2 className="text-2xl font-bold mb-6 border-l-4 border-devoops-indigo pl-4">
                          Technologies
                        </h2>
                        <div className="flex flex-wrap gap-2">
                          {selectedService.technologies.map((tech, index) => (
                            <Badge
                              key={index}
                              className="bg-devoops-gray text-white px-3 py-1 text-sm"
                            >
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="bg-gradient-to-br from-devoops-blue to-devoops-indigo rounded-2xl p-8 text-center">
                        <h3 className="text-xl font-bold mb-4">
                          Interested in our {selectedService.title} service?
                        </h3>
                        <p className="mb-6 opacity-90">
                          Let's discuss how we can help your business with our
                          expertise.
                        </p>
                        <button
                          onClick={() =>
                            handleContactForService(selectedService)
                          }
                          className="px-6 py-3 bg-white text-devoops-blue rounded-full text-lg font-medium hover:bg-opacity-90 transition-all transform hover:scale-105 w-full"
                        >
                          Contact Us
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="services-list"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="pt-32 pb-20"
              >
                <div className="px-6 sm:px-8 md:px-16 lg:px-24 max-w-7xl mx-auto">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="text-center mb-20"
                  >
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">
                      Our Services
                    </h1>
                    <div className="h-1 w-24 bg-gradient-to-r from-devoops-blue to-devoops-cyan mx-auto mb-8"></div>
                    <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
                      Comprehensive digital solutions tailored to transform your
                      ideas into reality. Explore our services to find the
                      perfect match for your project needs.
                    </p>
                  </motion.div>

                  <div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    ref={servicesRef}
                  >
                    {servicesData.map((service, index) => (
                      <motion.div
                        key={service.id}
                        ref={(el) => (serviceSectionRefs.current[index] = el)}
                        whileHover={{ y: -10, transition: { duration: 0.3 } }}
                        className="bg-black bg-opacity-30 rounded-2xl overflow-hidden border border-gray-800 hover:border-devoops-blue transition-all duration-300 cursor-pointer"
                        onClick={() => handleServiceSelect(service)}
                      >
                        <div className={`h-3 ${service.color}`}></div>
                        <div className="p-8">
                          <div className="text-4xl mb-4">{service.icon}</div>
                          <h2 className="text-2xl font-bold mb-3">
                            {service.title}
                          </h2>
                          <p className="text-gray-300 mb-6">
                            {service.description}
                          </p>
                          <div className="flex justify-between items-center">
                            <div className="flex flex-wrap gap-2">
                              {service.technologies
                                .slice(0, 3)
                                .map((tech, idx) => (
                                  <Badge
                                    key={idx}
                                    className="bg-devoops-gray text-xs"
                                  >
                                    {tech}
                                  </Badge>
                                ))}
                              {service.technologies.length > 3 && (
                                <Badge className="bg-devoops-gray text-xs">
                                  +{service.technologies.length - 3}
                                </Badge>
                              )}
                            </div>
                            <div className="text-devoops-blue">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <Footer />
        </div>
      );
    }