import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Logo } from "../ui/logo";

export function Navbar({ toggleMenu }) {
  const [scrolled, setScrolled] = useState(false);

  const navigate = useNavigate();
  const handleLogoClick = () => {
    navigate("/");
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <motion.nav
      className="fixed top-0 left-0 w-full px-8 py-6 flex justify-between items-center z-50 transition-all duration-500"
      animate={{
        backgroundColor: scrolled ? "rgba(17, 17, 17, 0.9)" : "transparent",
        backdropFilter: scrolled ? "blur(10px)" : "none",
      }}
    >
      <div className="flex items-center">
        <Logo size="lg" onClick={handleLogoClick} />
      </div>
      <div className="hidden md:flex space-x-8">
        <Link
          to="/home"
          className="nav-item text-white opacity-80 hover:text-devoops-white transition-colors"
        >
          Home
        </Link>
        <Link
          to="/services"
          className="nav-item text-white opacity-80 hover:text-devoops-white transition-colors"
        >
          Services
        </Link>
        <a
          href="/home#about"
          className="nav-item text-white opacity-80 hover:text-devoops-white transition-colors"
        >
          About
        </a>
        <a
          href="/home#faq"
          className="nav-item text-white opacity-80 hover:text-devoops-white transition-colors"
        >
          FAQ
        </a>
        <Link
          to="/contact"
          className="nav-item text-white opacity-80 hover:text-devoops-white transition-colors"
        >
          Contact
        </Link>
      </div>
      <div className="block md:hidden">
        <button
          className="text-white hover:text-devoops-cyan focus:outline-none transition-colors"
          onClick={toggleMenu}
          aria-label="Open menu"
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
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </motion.nav>
  );
}
