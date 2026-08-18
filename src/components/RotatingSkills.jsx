// src/components/RotatingSkills.jsx
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const RotatingSkills = () => {
  const skills = [
    "React", "Next.js", "Node.js", "Python",
    "Tailwind CSS", "MongoDB", "PostgreSQL", "Docker",
    "TensorFlow", "TypeScript", "GraphQL", "Firebase",
    "AWS", "Git", "JavaScript", "Vue.js",
    "Django", "FastAPI", "Redis", "Kubernetes"
  ];

  const firstRow = skills.slice(0, 10);
  const secondRow = skills.slice(10);

  return (
    <section className="py-16 bg-gradient-to-r from-orange-50 to-white overflow-hidden">
      <div className="container-custom">
        <div className="text-center mb-10">
          <h2 className="section-title">Technologies I Work With</h2>
          <p className="section-subtitle mx-auto">
            Constantly learning and mastering new technologies
          </p>
        </div>

        <div className="relative flex overflow-hidden py-4">
          <motion.div
            className="flex gap-8 items-center"
            animate={{ x: [0, -1500] }}
            transition={{ x: { repeat: Infinity, repeatType: "loop", duration: 25, ease: "linear" } }}
          >
            {firstRow.map((skill, index) => (
              <div key={index} className="flex flex-col items-center gap-2 min-w-[120px]">
                <div className="px-6 py-4 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow hover:scale-110 transform duration-300">
                  <span className="text-lg font-semibold text-slate-900">{skill}</span>
                </div>
              </div>
            ))}
            {firstRow.map((skill, index) => (
              <div key={`dup-${index}`} className="flex flex-col items-center gap-2 min-w-[120px]">
                <div className="px-6 py-4 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow hover:scale-110 transform duration-300">
                  <span className="text-lg font-semibold text-slate-900">{skill}</span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="relative flex overflow-hidden py-4">
          <motion.div
            className="flex gap-8 items-center"
            animate={{ x: [-1500, 0] }}
            transition={{ x: { repeat: Infinity, repeatType: "loop", duration: 25, ease: "linear" } }}
          >
            {secondRow.map((skill, index) => (
              <div key={index} className="flex flex-col items-center gap-2 min-w-[120px]">
                <div className="px-6 py-4 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow hover:scale-110 transform duration-300">
                  <span className="text-lg font-semibold text-slate-900">{skill}</span>
                </div>
              </div>
            ))}
            {secondRow.map((skill, index) => (
              <div key={`dup-${index}`} className="flex flex-col items-center gap-2 min-w-[120px]">
                <div className="px-6 py-4 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow hover:scale-110 transform duration-300">
                  <span className="text-lg font-semibold text-slate-900">{skill}</span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="text-center mt-8">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500/10 rounded-full animate-pulse">
            <Sparkles className="text-orange-500" size={20} />
            <span className="text-orange-600 font-medium">
              🚀 Currently Learning: AI Agents, Web3 & Quantum Computing
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RotatingSkills;