import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader } from "@/components/ui/loader";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";
import { useToast } from "@/hooks/use-toast";

// Custom Select Component
const CustomSelect = ({ label, options, value, onChange, required }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const selectRef = useRef(null);
  const isPopulated = value && value.length > 0;

  const toggleOpen = () => setIsOpen(!isOpen);

  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setIsOpen(false);
      setIsFocused(false);
    }, 200);
  };

  return (
    <div className="mb-8 relative group">
      {/* Underline effect */}
      <div className="absolute bottom-0 left-0 h-[2px] bg-gray-600 w-full">
        <motion.div
          className="h-full bg-gradient-to-r from-devoops-indigo to-devoops-blue"
          initial={{ width: 0 }}
          animate={{ width: isFocused ? "100%" : "0%" }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        />
      </div>

      <motion.label
        initial={false}
        animate={{
          y: isFocused || isPopulated ? -28 : 0,
          x: isFocused || isPopulated ? 0 : 0,
          scale: isFocused || isPopulated ? 0.85 : 1,
          color: isFocused
            ? "rgb(99, 102, 241)" // indigo-500
            : isPopulated
            ? "rgb(129, 140, 248)" // indigo-400
            : "rgb(156, 163, 175)", // gray-400
        }}
        transition={{
          duration: 0.3,
          ease: [0.25, 1, 0.5, 1],
          color: { duration: 0.2 },
        }}
        className="absolute left-1 top-3 text-gray-400 pointer-events-none origin-left"
      >
        {label} {required && <span className="text-red-500"></span>}
      </motion.label>

      <div
        ref={selectRef}
        className="relative bg-transparent"
        onFocus={() => setIsFocused(true)}
        onBlur={handleBlur}
        tabIndex="0"
      >
        <div
          className="pt-3 pb-2 px-1 flex justify-between items-center cursor-pointer text-lg"
          onClick={toggleOpen}
        >
          <span className={value ? "text-white" : "text-gray-500"}>
            {value || "Select an option"}
          </span>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </motion.div>
        </div>

        {/* Input Highlight Effect */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{
            scaleX: isFocused ? 1 : 0,
            opacity: isFocused ? 0.1 : 0,
          }}
          transition={{ duration: 0.3 }}
          className="absolute -bottom-2 left-0 w-full h-8 origin-left rounded-md pointer-events-none"
          style={{ zIndex: -1 }}
        />

        {/* Dropdown menu with enhanced styling */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -5, scaleY: 0.8 }}
              animate={{ opacity: 1, y: 5, scaleY: 1 }}
              exit={{ opacity: 0, y: -5, scaleY: 0.8 }}
              transition={{
                duration: 0.2,
                ease: [0.4, 0, 0.2, 1],
              }}
              className="absolute w-full left-0 top-full mt-1 bg-gray-900/80 backdrop-blur-md rounded-md shadow-lg border border-gray-700 z-20 overflow-hidden"
              style={{
                transformOrigin: "top center",
                boxShadow:
                  "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04), 0 0 0 1px rgba(107, 114, 128, 0.1)",
              }}
            >
              <div className="max-h-60 overflow-y-auto py-1 scrollbar-thin">
                {options.map((option, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.2,
                      delay: index * 0.03,
                      ease: "easeOut",
                    }}
                  >
                    <div
                      className={`px-3 py-2 cursor-pointer transition-all text-base hover:bg-gray-800 ${
                        option === value
                          ? "bg-devoops-indigo/20 text-devoops-blue"
                          : "text-white"
                      }`}
                      onClick={() => handleSelect(option)}
                    >
                      <div className="flex items-center">
                        {option === value && (
                          <svg
                            className="w-4 h-4 mr-2 text-devoops-blue"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        )}
                        <span className={option === value ? "ml-0" : "ml-6"}>
                          {option}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

// Form Input Component with Animation
const AnimatedInput = ({
  name,
  label,
  type = "text",
  required,
  value,
  onChange,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const isPopulated = value && value.length > 0;
  const inputRef = useRef(null);

  return (
    <div className="mb-8 relative group">
      {/* Underline effect */}
      <div className="absolute bottom-0 left-0 h-[2px] bg-gray-600 w-full">
        <motion.div
          className="h-full bg-gradient-to-r from-devoops-blue to-devoops-cyan"
          initial={{ width: 0 }}
          animate={{ width: isFocused ? "100%" : "0%" }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        />
      </div>

      <motion.label
        initial={false}
        animate={{
          y: isFocused || isPopulated ? -28 : 0,
          x: isFocused || isPopulated ? 0 : 0,
          scale: isFocused || isPopulated ? 0.85 : 1,
          color: isFocused
            ? "rgb(56, 189, 248)" // cyan-400
            : isPopulated
            ? "rgb(94, 234, 212)" // teal-300
            : "rgb(156, 163, 175)", // gray-400
        }}
        transition={{
          duration: 0.3,
          ease: [0.25, 1, 0.5, 1],
          color: { duration: 0.2 },
        }}
        className="absolute left-1 top-3 text-gray-400 pointer-events-none origin-left"
        htmlFor={name}
      >
        {label} {required && <span className="text-red-500">*</span>}
      </motion.label>

      <input
        ref={inputRef}
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="w-full pt-3 pb-2 px-1 bg-transparent border-0 border-b-0 text-white focus:outline-none transition-all duration-300 text-lg"
        required={required}
      />

      {/* Input Highlight Effect */}
    </div>
  );
};

// Form Textarea Component with Animation
const AnimatedTextarea = ({ name, label, required, value, onChange }) => {
  const [isFocused, setIsFocused] = useState(false);
  const isPopulated = value && value.length > 0;
  const textareaRef = useRef(null);

  return (
    <div className="mb-8 relative group">
      {/* Border effect */}
      <motion.div
        className="absolute inset-0 rounded-lg pointer-events-none"
        initial={{ borderWidth: 1, borderColor: "#ddd" }}
        animate={{
          borderWidth: isFocused ? 2 : 1,
          borderColor: isFocused
            ? "rgba(59, 130, 246, 0.8)"
            : "rgba(75, 85, 99, 0.6)",
          boxShadow: isFocused
            ? "0 0 15px rgba(59, 130, 246, 0.3)"
            : "0 0 0px rgba(0, 0, 0, 0)",
        }}
        transition={{ duration: 0.2 }}
        style={{
          borderStyle: "solid",
          backgroundColor: "transparent",
        }}
      />

      <motion.label
        initial={false}
        animate={{
          y: isFocused || isPopulated ? -32 : 0,
          x: isFocused || isPopulated ? 0 : 0,
          scale: isFocused || isPopulated ? 0.85 : 1,
          color: isFocused
            ? "rgb(59, 130, 246)" // blue-500
            : isPopulated
            ? "rgb(147, 197, 253)" // blue-300
            : "rgb(156, 163, 175)", // gray-400
        }}
        transition={{
          duration: 0.3,
          ease: [0.25, 1, 0.5, 1],
          color: { duration: 0.2 },
        }}
        className="absolute left-3 top-3 z-10 text-gray-400 pointer-events-none origin-left"
        htmlFor={name}
      >
        {label} {required && <span className="text-red-500">*</span>}
      </motion.label>

      <textarea
        ref={textareaRef}
        id={name}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="w-full p-3 bg-black rounded-lg border-0 text-white focus:outline-none transition-all duration-300 min-h-[150px] resize-y text-lg relative z-0"
        required={required}
      />

      {/* Glow Effect */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isFocused ? 0.07 : 0 }}
        transition={{ duration: 0.3 }}
        className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-devoops-blue to-devoops-cyan rounded-lg pointer-events-none"
        style={{ zIndex: -1 }}
      />
    </div>
  );
};

export default function Contact() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    company: "",
    service: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useSmoothScroll();

  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMenu = () => {
    setMobileMenuOpen(false);
  };

  const handleInputChange = (field, value) => {
    setFormState({
      ...formState,
      [field]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Success message
    toast({
      title: "Message sent!",
      description: "We've received your message and will get back to you soon.",
    });

    // Reset form
    setFormState({
      name: "",
      email: "",
      company: "",
      service: "",
      message: "",
    });

    setIsSubmitting(false);
  };

  // Service options for select
  const serviceOptions = [
    "UI/UX Design",
    "Mobile App Development",
    "Web Development",
    "Custom Software",
    "E-commerce Solutions",
    "Other",
  ];

  // Animation variants
  const pageVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    initial: { opacity: 0, y: 30 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <div className="min-h-screen bg-devoops-dark overflow-x-hidden">
      <Loader />
      <CustomCursor />
      <Navbar toggleMenu={toggleMenu} />
      <MobileMenu isOpen={mobileMenuOpen} onClose={closeMenu} />

      <motion.main
        className="pt-32 pb-24"
        initial="initial"
        animate="animate"
        variants={pageVariants}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <motion.h1
              className="text-5xl md:text-6xl font-bold mb-6 text-white"
              variants={itemVariants}
            >
              Let's <span className="text-devoops-blue">Connect</span>
            </motion.h1>
            <motion.p
              className="text-xl text-gray-300 max-w-2xl mx-auto"
              variants={itemVariants}
            >
              Ready to transform your digital presence? Fill out the form below
              and our team will get back to you within 24 hours.
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            <motion.div
              className="rounded-2xl bg-gradient-to-br from-devoops-dark to-gray-900 p-8 shadow-lg border border-gray-800"
              variants={itemVariants}
            >
              <h2 className="text-2xl font-bold mb-6 text-white">
                Contact Information
              </h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-devoops-blue p-3 rounded-full">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-white">Phone 1</h3>
                    <p className="text-gray-300">+961 71 881 429</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-devoops-indigo p-3 rounded-full">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-white">Phone 2</h3>
                    <p className="text-gray-300">+1 (619) 873-1807</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-devoops-cyan p-3 rounded-full">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-white">Email</h3>
                    <p className="text-gray-300">hello@devoops.dev</p>
                  </div>
                </div>

                <div className="mt-12">
                  <h3 className="text-lg font-medium text-white mb-4">
                    Follow Us
                  </h3>
                  <div className="flex space-x-4">
                    <a
                      href="#"
                      className="bg-gray-800 p-3 rounded-full hover:bg-black transition-colors duration-300"
                    >
                      <svg
                        className="w-5 h-5 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                      </svg>
                    </a>

                    <a
                      href="#"
                      className="bg-gray-800 p-3 rounded-full hover:bg-blue-700 transition-colors duration-300"
                    >
                      <svg
                        className="w-5 h-5 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z" />
                      </svg>
                    </a>
                    <a
                      href="#"
                      className="bg-gray-800 p-3 rounded-full hover:bg-pink-700 transition-colors duration-300"
                    >
                      <svg
                        className="w-5 h-5 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    </a>
                    <a
                      href="#"
                      className="bg-gray-800 p-3 rounded-full hover:bg-gray-900 transition-colors duration-300"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-black/30 backdrop-blur-md rounded-2xl p-8 shadow-lg border border-gray-800"
            >
              <h2 className="text-2xl font-bold mb-6 text-white">
                Send Us a Message
              </h2>
              <form onSubmit={handleSubmit}>
                <AnimatedInput
                  name="name"
                  label="Your Name"
                  required
                  value={formState.name}
                  onChange={(value) => handleInputChange("name", value)}
                />

                <AnimatedInput
                  name="email"
                  label="Email Address"
                  type="email"
                  required
                  value={formState.email}
                  onChange={(value) => handleInputChange("email", value)}
                />

                <AnimatedInput
                  name="company"
                  label="Company Name"
                  value={formState.company}
                  onChange={(value) => handleInputChange("company", value)}
                />

                <CustomSelect
                  options={serviceOptions}
                  value={formState.service}
                  onChange={(value) => handleInputChange("service", value)}
                  required
                />

                <AnimatedTextarea
                  name="message"
                  label="Your Message"
                  required
                  value={formState.message}
                  onChange={(value) => handleInputChange("message", value)}
                />

                <motion.button
                  type="submit"
                  className="w-full py-3 px-6 text-center text-white font-semibold bg-gradient-to-r from-devoops-blue to-devoops-indigo rounded-md hover:from-devoops-indigo hover:to-devoops-blue transition-all duration-300 disabled:opacity-70"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    "Send Message"
                  )}
                </motion.button>
              </form>
            </motion.div>
          </div>

          {/* <motion.div className="mt-24 text-center" variants={itemVariants}>
            <div
              className="w-full h-[400px] rounded-xl overflow-hidden cursor-hide-zone"
              id="map-container"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.1333800506534!2d-122.4194!3d37.7749!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858085a4d5111f%3A0x71f44662ca8262d3!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1649774531199!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </motion.div> */}
        </div>
      </motion.main>

      <Footer />
    </div>
  );
}
