export function Footer() {
  return (
    <footer className="py-12 px-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-8 md:mb-0">
            <a href="#" className="text-2xl font-bold tracking-tight">
              <span className="text-white">dev</span>
              <span className="text-devoops-blue">O</span>
              <span className="text-devoops-cyan">o</span>
              <span className="text-devoops-orange">ps</span>
            </a>
          </div>

          <div className="flex flex-wrap gap-x-8 gap-y-4 justify-center mb-8 md:mb-0">
            <a href="#work" className="text-gray-400 hover:text-devoops-blue transition-colors">
              Projects
            </a>
            <a href="#about" className="text-gray-400 hover:text-devoops-blue transition-colors">
              About
            </a>
            <a href="#services" className="text-gray-400 hover:text-devoops-blue transition-colors">
              Services
            </a>
            <a href="#contact" className="text-gray-400 hover:text-devoops-blue transition-colors">
              Contact
            </a>
            <a href="#" className="text-gray-400 hover:text-devoops-blue transition-colors">
              Privacy
            </a>
            <a href="#" className="text-gray-400 hover:text-devoops-blue transition-colors">
              Terms
            </a>
          </div>

          <div className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} devOops Development Agency. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
