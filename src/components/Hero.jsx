// src/components/Hero.jsx
import { Link } from "react-router-dom";
import { ArrowRight, Code2, Sparkles, Zap } from "lucide-react";
import { motion } from "framer-motion";
import DisplayImage from "./DisplayImage";

const Hero = () => {
  return (
    <section className="min-h-[90vh] flex items-center relative overflow-hidden">
      <div className="container-custom py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 bg-white/10 backdrop-blur-sm text-white rounded-full text-sm font-medium border border-white/20">
                Full Stack AI Developer
              </span>
              <Sparkles size={16} className="text-orange-400" />
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-4">
              <span className="text-white">Hi, I'm</span>
              <br />
              <span className="text-white">Olabode Olamide</span>
              <br />
              <span className="text-orange-400">Leodcatalyst</span>
            </h1>

            <p className="text-lg text-white/80 mb-6 max-w-lg">
              I build intelligent, user-centric applications using AI and modern web
              technologies. Let's create something extraordinary together.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link to="/projects" className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-all duration-300 shadow-lg hover:shadow-orange-500/25 inline-flex items-center gap-2">
                View My Work <ArrowRight size={18} />
              </Link>
              <Link to="/contact" className="border-2 border-white/30 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-all duration-300">
                Contact Me
              </Link>
            </div>

            <div className="flex gap-8 mt-10">
              <div>
                <div className="flex items-center gap-1 text-2xl font-bold text-white">
                  5 <span className="text-orange-400">+</span>
                </div>
                <div className="text-sm text-white/60">Projects</div>
              </div>
              <div>
                <div className="flex items-center gap-1 text-2xl font-bold text-white">
                  4 <span className="text-orange-400">+</span>
                </div>
                <div className="text-sm text-white/60">Years Experience</div>
              </div>
              <div>
                <div className="flex items-center gap-1 text-2xl font-bold text-white">
                  100 <span className="text-orange-400">%</span>
                </div>
                <div className="text-sm text-white/60">Client Satisfaction</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative flex justify-center"
          >
            <div className="relative w-72 h-72 sm:w-96 sm:h-96">
              <DisplayImage
                className="w-full h-full rounded-full object-cover border-4 border-orange-500/30 shadow-2xl"
                alt="Olabode Olamide - Leodcatalyst"
                fallbackText="Upload your photo"
              />
              <div className="absolute -top-4 -right-4 p-3 bg-white/10 backdrop-blur-md rounded-xl shadow-lg animate-bounce border border-white/20">
                <Zap className="text-orange-400" size={24} />
              </div>
              <div className="absolute -bottom-4 -left-4 p-3 bg-white/10 backdrop-blur-md rounded-xl shadow-lg animate-bounce delay-100 border border-white/20">
                <Code2 className="text-orange-400" size={24} />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;