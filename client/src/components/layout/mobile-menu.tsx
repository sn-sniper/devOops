import { motion } from "framer-motion";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  return (
    <motion.div
      className="fixed inset-0 bg-devoops-dark z-40"
      initial={{ x: "100%" }}
      animate={{ x: isOpen ? 0 : "100%" }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <div className="h-full flex flex-col justify-center items-center space-y-12 p-8">
        <a
          href="#work"
          className="text-3xl font-bold text-white opacity-80 hover:text-devoops-blue transition-all"
          onClick={onClose}
        >
          Projects
        </a>
        <a
          href="#about"
          className="text-3xl font-bold text-white opacity-80 hover:text-devoops-cyan transition-all"
          onClick={onClose}
        >
          About
        </a>
        <a
          href="#services"
          className="text-3xl font-bold text-white opacity-80 hover:text-devoops-blue transition-all"
          onClick={onClose}
        >
          Services
        </a>
        <a
          href="#contact"
          className="text-3xl font-bold text-white opacity-80 hover:text-devoops-blue transition-all"
          onClick={onClose}
        >
          Contact
        </a>
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
