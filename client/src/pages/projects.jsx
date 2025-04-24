import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { CustomCursor } from "@/components/ui/custom-cursor";
// import { Loader } from "@/components/ui/loader";
import { Navbar } from "@/components/layout/navbar";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { Footer } from "@/components/layout/footer";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState(["All"]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Initialize smooth scrolling
  useSmoothScroll();
  
  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMenu = () => {
    setMobileMenuOpen(false);
  };
  
  // Fetch projects data from JSON file
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("/data/projects.json");
        if (!response.ok) {
          throw new Error("Failed to fetch projects data");
        }
        
        const data = await response.json();
        setProjects(data.projects);
        setFilteredProjects(data.projects);
        
        // Extract unique categories
        const uniqueCategories = ["All", ...new Set(data.projects.map(project => project.category))];
        setCategories(uniqueCategories);
        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching projects:", error);
        setLoading(false);
      }
    };
    
    fetchProjects();
  }, []);
  
  // Filter projects based on selected category
  useEffect(() => {
    if (activeFilter === "All") {
      setFilteredProjects(projects);
    } else {
      const filtered = projects.filter(project => project.category === activeFilter);
      setFilteredProjects(filtered);
    }
  }, [activeFilter, projects]);
  
  // Animation variants for cards
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: "easeOut"
      }
    }
  };
  
  // Handle category filter change
  const handleFilterChange = (category) => {
    setActiveFilter(category);
  };

  return (
    <div className="overflow-x-hidden bg-slate-950 min-h-screen">
      {/* <Loader /> */}
      <CustomCursor />
      <Navbar toggleMenu={toggleMenu} />
      <MobileMenu isOpen={mobileMenuOpen} onClose={closeMenu} />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">Our Projects</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Discover our portfolio of innovative solutions across various industries,
              showcasing our technical expertise and commitment to excellence.
            </p>
          </motion.div>
          
          {/* Category filters */}
          <motion.div 
            className="flex flex-wrap justify-center gap-4 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleFilterChange(category)}
                className={`px-6 py-2 rounded-full transition-all duration-300 ${
                  activeFilter === category
                    ? "bg-devoops-blue text-white"
                    : "bg-slate-800 text-gray-300 hover:bg-slate-700"
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>
          
          {/* Projects grid */}
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-devoops-blue"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  className="bg-slate-900 rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300"
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                >
                  <div className="h-64 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline" className="bg-slate-800 text-devoops-blue">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <h3 className="text-2xl font-bold mb-2 text-white">{project.title}</h3>
                    <p className="text-gray-400 mb-4">{project.description}</p>
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>{project.client}</span>
                      <span>{project.year}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
          
          {/* Empty state */}
          {!loading && filteredProjects.length === 0 && (
            <div className="text-center py-20">
              <h3 className="text-2xl font-bold mb-2 text-white">No projects found</h3>
              <p className="text-gray-400">
                No projects match the selected filter. Please try another category.
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}