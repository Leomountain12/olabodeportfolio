// import { Code2, Database, Globe, Layout, Server, Sparkles } from "lucide-react";
// import DisplayImage from "../components/DisplayImage";

// const AboutPage = () => {
//   const skills = [
//     { name: "Frontend", icon: Layout, color: "text-orange-500", description: "React, Next.js, Vue.js" },
//     { name: "Backend", icon: Server, color: "text-orange-500", description: "Node.js, Django, FastAPI" },
//     { name: "Database", icon: Database, color: "text-orange-500", description: "PostgreSQL, MongoDB, Redis" },
//     { name: "AI/ML", icon: Sparkles, color: "text-orange-500", description: "LangChain, RAG, LLMs, TensorFlow" },
//     { name: "DevOps", icon: Globe, color: "text-orange-500", description: "AWS, Docker, Kubernetes, CI/CD" },
//     { name: "Full Stack", icon: Code2, color: "text-orange-500", description: "End-to-end solutions" },
//   ];

//   const timeline = [
//     {
//       year: "2024 - Present",
//       title: "Full Stack AI Developer",
//       company: "Leodcatalyst Studio",
//       description: "Building AI-powered applications and consulting on technical strategy.",
//     },
//     {
//       year: "2022 - 2024",
//       title: "Senior Software Engineer",
//       company: "Tech Solutions Inc.",
//       description: "Developed scalable web applications and led the frontend team.",
//     },
//     {
//       year: "2020 - 2022",
//       title: "Junior Developer",
//       company: "Startup Hub",
//       description: "Learned the ropes of full-stack development and agile methodologies.",
//     },
//   ];

//   return (
//     <div>
//       <section className="py-20">
//         <div className="container-custom">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
//             <div>
//               <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
//                 About <span className="text-orange-500">Leodcatalyst</span>
//               </h1>
//               <p className="text-lg text-gray-500 mb-6">
//                 I'm Olabode Olamide, a Full Stack AI Developer who bridges the gap 
//                 between design and technology. I have a passion for creating intelligent, 
//                 user-friendly applications that make a real difference.
//               </p>
//               <p className="text-gray-500 mb-6">
//                 With a strong foundation in both frontend and backend development, I leverage
//                 AI technologies to build innovative solutions. I believe in writing clean,
//                 maintainable code and following industry best practices.
//               </p>
//               <p className="text-gray-500">
//                 When I'm not coding, I enjoy contributing to open-source projects, writing
//                 technical blog posts, exploring new technologies, and mentoring aspiring developers.
//               </p>
//             </div>
//             <div className="relative">
//               <div className="w-full max-w-md mx-auto">
//                 <div className="w-64 h-64 mx-auto rounded-2xl overflow-hidden shadow-2xl border-4 border-orange-500/20">
//                   <DisplayImage
//                     className="w-full h-full object-cover"
//                     alt="Olabode Olamide - Leodcatalyst"
//                     fallbackText="Upload your photo"
//                   />
//                 </div>
//               </div>
//               <div className="absolute -bottom-4 -right-4 bg-orange-500 text-white px-4 py-2 rounded-lg shadow-lg">
//                 <span className="font-bold">Leodcatalyst</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       <section className="py-20 bg-gray-50">
//         <div className="container-custom">
//           <h2 className="section-title text-center">Skills & Expertise</h2>
//           <p className="section-subtitle text-center mx-auto mb-12">
//             Technologies and tools I work with daily.
//           </p>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {skills.map((skill, index) => (
//               <div key={index} className="card p-6 hover:shadow-lg transition-shadow">
//                 <div className="flex items-center gap-4">
//                   <div className={`p-3 bg-orange-500/10 rounded-xl ${skill.color}`}>
//                     <skill.icon size={24} />
//                   </div>
//                   <div>
//                     <h3 className="font-semibold text-slate-900">{skill.name}</h3>
//                     <p className="text-sm text-gray-500">{skill.description}</p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       <section className="py-20">
//         <div className="container-custom">
//           <h2 className="section-title text-center">Experience</h2>
//           <p className="section-subtitle text-center mx-auto mb-12">
//             My journey in the tech industry.
//           </p>
//           <div className="relative max-w-3xl mx-auto">
//             <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>

//             {timeline.map((item, index) => (
//               <div key={index} className="relative pl-12 pb-12 last:pb-0">
//                 <div className="absolute left-0 top-1.5 w-8 h-8 bg-orange-500 rounded-full border-4 border-white shadow-md"></div>

//                 <div className="card p-6">
//                   <span className="text-sm text-orange-500 font-medium">{item.year}</span>
//                   <h3 className="text-xl font-bold text-slate-900 mt-1">{item.title}</h3>
//                   <p className="text-orange-500 font-medium mb-2">{item.company}</p>
//                   <p className="text-gray-500">{item.description}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default AboutPage;
// src/pages/AboutPage.jsx
import { Code2, Database, Globe, Layout, Server, Sparkles } from "lucide-react";
import DisplayImage from "../components/DisplayImage";

const AboutPage = () => {
  const skills = [
    { name: "Frontend", icon: Layout, color: "text-orange-500", description: "React, Next.js, Vue.js" },
    { name: "Backend", icon: Server, color: "text-orange-500", description: "Node.js, Django, FastAPI" },
    { name: "Database", icon: Database, color: "text-orange-500", description: "PostgreSQL, MongoDB, Redis" },
    { name: "AI/ML", icon: Sparkles, color: "text-orange-500", description: "LangChain, RAG, LLMs, TensorFlow" },
    { name: "DevOps", icon: Globe, color: "text-orange-500", description: "AWS, Docker, Kubernetes, CI/CD" },
    { name: "Full Stack", icon: Code2, color: "text-orange-500", description: "End-to-end solutions" },
  ];

  const timeline = [
    { year: "2024 - Present", title: "Full Stack AI Developer", company: "Leodcatalyst Studio", description: "Building AI-powered applications and consulting on technical strategy." },
    { year: "2022 - 2024", title: "Senior Software Engineer", company: "Tech Solutions Inc.", description: "Developed scalable web applications and led the frontend team." },
    { year: "2020 - 2022", title: "Junior Developer", company: "Startup Hub", description: "Learned the ropes of full-stack development and agile methodologies." },
  ];

  return (
    <div>
      <section className="py-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">About <span className="text-orange-500">Leodcatalyst</span></h1>
              <p className="text-lg text-gray-500 mb-6">I'm Olabode Olamide, a Full Stack AI Developer who bridges the gap between design and technology...</p>
              <p className="text-gray-500 mb-6">With a strong foundation in both frontend and backend development, I leverage AI technologies to build innovative solutions.</p>
              <p className="text-gray-500">When I'm not coding, I enjoy contributing to open-source projects, writing technical blog posts, and mentoring aspiring developers.</p>
            </div>
            <div className="relative">
              <div className="w-full max-w-md mx-auto">
                <div className="w-64 h-64 mx-auto rounded-2xl overflow-hidden shadow-2xl border-4 border-orange-500/20">
                  <DisplayImage className="w-full h-full object-cover" alt="Olabode Olamide - Leodcatalyst" fallbackText="Upload your photo" />
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 bg-orange-500 text-white px-4 py-2 rounded-lg shadow-lg"><span className="font-bold">Leodcatalyst</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <h2 className="section-title text-center">Skills & Expertise</h2>
          <p className="section-subtitle text-center mx-auto mb-12">Technologies and tools I work with daily.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill, index) => (
              <div key={index} className="card p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-4">
                  <div className={`p-3 bg-orange-500/10 rounded-xl ${skill.color}`}><skill.icon size={24} /></div>
                  <div><h3 className="font-semibold text-slate-900">{skill.name}</h3><p className="text-sm text-gray-500">{skill.description}</p></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container-custom">
          <h2 className="section-title text-center">Experience</h2>
          <p className="section-subtitle text-center mx-auto mb-12">My journey in the tech industry.</p>
          <div className="relative max-w-3xl mx-auto">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
            {timeline.map((item, index) => (
              <div key={index} className="relative pl-12 pb-12 last:pb-0">
                <div className="absolute left-0 top-1.5 w-8 h-8 bg-orange-500 rounded-full border-4 border-white shadow-md"></div>
                <div className="card p-6">
                  <span className="text-sm text-orange-500 font-medium">{item.year}</span>
                  <h3 className="text-xl font-bold text-slate-900 mt-1">{item.title}</h3>
                  <p className="text-orange-500 font-medium mb-2">{item.company}</p>
                  <p className="text-gray-500">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;