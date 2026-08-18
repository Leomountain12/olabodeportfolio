// src/pages/HomePage.jsx
import { useState, useEffect } from "react";
import Hero from "../components/Hero";
import RotatingSkills from "../components/RotatingSkills";
import ProjectCard from "../components/ProjectCard";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { projectsApi } from "../api/client";

const HomePage = () => {
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const slides = [
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80",
    "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1920&q=80",
    "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1920&q=80",
    "https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=1920&q=80",
    "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1920&q=80",
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1920&q=80",
    "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1920&q=80",
    "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1920&q=80",
    "https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?w=1920&q=80",
    "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=1920&q=80",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Load projects from API
  useEffect(() => {
    const loadProjects = async () => {
      try {
        const projects = await projectsApi.getAll();
        setFeaturedProjects(projects.slice(0, 3));
        localStorage.setItem('customProjects', JSON.stringify(projects));
      } catch (error) {
        console.error("Error loading projects:", error);
        // fallback to default projects if API fails
        const { defaultProjects } = await import("../data/defaultData");
        setFeaturedProjects(defaultProjects.slice(0, 3));
      }
    };
    loadProjects();
  }, []);

  const cardsPerSlide = isMobile ? 1 : 2;
  const totalSlides = Math.ceil(featuredProjects.length / cardsPerSlide);

  useEffect(() => {
    if (featuredProjects.length <= cardsPerSlide) return;
    const interval = setInterval(() => goToNext(), 3000);
    return () => clearInterval(interval);
  }, [featuredProjects.length, currentIndex, cardsPerSlide]);

  const goToNext = () => {
    if (isTransitioning || featuredProjects.length === 0) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const goToPrev = () => {
    if (isTransitioning || featuredProjects.length === 0) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const goToSlide = (index) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  return (
    <div>
      <div className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0 z-0">
          {slides.map((slide, index) => (
            <div key={index} className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${currentSlide === index ? "opacity-100" : "opacity-0"}`}>
              <img src={slide} alt={`Slide ${index + 1}`} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/60"></div>
            </div>
          ))}
        </div>
        <div className="relative z-10"><Hero /></div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {slides.map((_, index) => (
            <button key={index} onClick={() => setCurrentSlide(index)} className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${currentSlide === index ? "w-8 bg-orange-500" : "bg-white/50 hover:bg-white/80"}`} aria-label={`Go to slide ${index + 1}`} />
          ))}
        </div>
        <div className="absolute bottom-8 right-8 z-20 text-white/70 text-sm font-medium bg-black/30 px-3 py-1 rounded-full backdrop-blur-sm">
          {currentSlide + 1} / {slides.length}
        </div>
      </div>

      <RotatingSkills />

      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-10">
            <h2 className="section-title">Featured Projects</h2>
            <p className="section-subtitle mx-auto">Here are some of my recent works that showcase my skills and expertise.</p>
          </div>

          {featuredProjects.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🚀</div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">No Projects Yet</h3>
              <p className="text-gray-500">Add your first project in the admin panel.</p>
            </div>
          ) : (
            <div className="relative max-w-5xl mx-auto">
              <div className="overflow-hidden">
                <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                  {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                    <div key={slideIndex} className={`w-full flex-shrink-0 grid gap-6 px-2 ${isMobile ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2"}`}>
                      {featuredProjects.slice(slideIndex * cardsPerSlide, slideIndex * cardsPerSlide + cardsPerSlide).map((project) => (
                        <div key={project.id} className="max-w-md mx-auto w-full"><ProjectCard project={project} /></div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              {featuredProjects.length > cardsPerSlide && (
                <>
                  <button onClick={goToPrev} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 md:-translate-x-4 bg-white rounded-full p-2 shadow-lg hover:bg-orange-500 hover:text-white transition-all duration-300 z-10">
                    <ChevronLeft size={24} />
                  </button>
                  <button onClick={goToNext} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 md:translate-x-4 bg-white rounded-full p-2 shadow-lg hover:bg-orange-500 hover:text-white transition-all duration-300 z-10">
                    <ChevronRight size={24} />
                  </button>
                </>
              )}

              {featuredProjects.length > cardsPerSlide && (
                <div className="flex justify-center gap-2 mt-6">
                  {Array.from({ length: totalSlides }).map((_, index) => (
                    <button key={index} onClick={() => goToSlide(index)} className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${currentIndex === index ? "w-8 bg-orange-500" : "bg-gray-300 hover:bg-gray-400"}`} aria-label={`Go to slide ${index + 1}`} />
                  ))}
                </div>
              )}
              {featuredProjects.length > cardsPerSlide && (
                <div className="text-center mt-3 text-sm text-gray-400">{currentIndex + 1} / {totalSlides}</div>
              )}
            </div>
          )}

          <div className="text-center mt-10">
            <Link to="/projects" className="btn-secondary inline-flex items-center gap-2 text-sm">View All Projects <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-orange-500 font-medium text-sm">ABOUT ME</span>
              <h2 className="section-title">Full Stack Developer with AI Expertise</h2>
              <p className="text-gray-500 mb-4">I'm Olabode Olamide (Leodcatalyst), a passionate Full Stack AI Developer with 4+ years of experience building intelligent applications.</p>
              <p className="text-gray-500 mb-6">From EdTech platforms to AI collaboration tools, I bring ideas to life using cutting-edge technologies and best practices.</p>
              <Link to="/about" className="btn-primary inline-flex items-center gap-2">Learn More About Me <ArrowRight size={18} /></Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="card p-6 text-center"><div className="text-3xl font-bold text-slate-900 mb-1">4+</div><div className="text-sm text-gray-500">Years Experience</div></div>
              <div className="card p-6 text-center"><div className="text-3xl font-bold text-slate-900 mb-1">5</div><div className="text-sm text-gray-500">Projects Completed</div></div>
              <div className="card p-6 text-center"><div className="text-3xl font-bold text-slate-900 mb-1">20+</div><div className="text-sm text-gray-500">Technologies</div></div>
              <div className="card p-6 text-center"><div className="text-3xl font-bold text-slate-900 mb-1">100%</div><div className="text-sm text-gray-500">Client Satisfaction</div></div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-24 overflow-hidden min-h-[50vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1920&q=80" alt="Developer working on system" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/70"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-orange-600/20 via-transparent to-orange-600/20"></div>
        </div>
        <div className="relative z-10 container-custom text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-4 py-1.5 rounded-full text-sm font-medium mb-4 border border-white/20">
            <span className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></span> Let's Work Together
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">Ready to Build Something <span className="text-orange-400">Amazing</span>?</h2>
          <p className="text-white/70 text-lg md:text-xl mb-8 max-w-2xl mx-auto">Let's collaborate on your next project. I'm always open to discussing new opportunities and innovative ideas.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/contact" className="inline-flex items-center gap-2 bg-orange-500 text-white px-8 py-3.5 rounded-lg font-semibold hover:bg-orange-600 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-orange-500/25">Let's Talk <ArrowRight size={18} /></Link>
            <Link to="/projects" className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-8 py-3.5 rounded-lg font-semibold hover:bg-white/20 transition-all duration-300 border border-white/20">View My Work</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;