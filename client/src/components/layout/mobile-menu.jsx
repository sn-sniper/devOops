import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Logo } from "../ui/logo";

export function MobileMenu({ isOpen, onClose }) {
  return (
    <motion.div
      className="fixed inset-0 bg-devoops-dark z-40"
      initial={{ x: "100%" }}
      animate={{ x: isOpen ? 0 : "100%" }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <div className="h-full flex flex-col justify-center items-center space-y-12 p-8">
        <Link
          to="/"
          className="text-3xl font-bold text-white opacity-80 hover:text-devoops-blue transition-all"
          onClick={onClose}
        >
          Home
        </Link>
        <Link
          to="/services"
          className="text-3xl font-bold text-white opacity-80 hover:text-devoops-cyan transition-all"
          onClick={onClose}
        >
          Services
        </Link>
        <a
          href="#about"
          className="text-3xl font-bold text-white opacity-80 hover:text-devoops-blue transition-all"
          onClick={onClose}
        >
          About
        </a>
        <a
          href="#faq"
          className="text-3xl font-bold text-white opacity-80 hover:text-devoops-blue transition-all"
          onClick={onClose}
        >
          FAQ
        </a>
        <Link
          to="/contact"
          className="text-3xl font-bold text-white opacity-80 hover:text-devoops-cyan transition-all"
          onClick={onClose}
        >
          Contact
        </Link>
        <button
          className="absolute top-8 right-8 text-white hover:text-devoops-cyan transition-colors"
          onClick={onClose}
          aria-label="Close menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </motion.div>
  );
}
