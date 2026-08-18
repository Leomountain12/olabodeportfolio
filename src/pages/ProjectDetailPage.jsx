// src/pages/ProjectDetailPage.jsx
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { projectsApi } from "../api/client";
import { ArrowLeft, CheckCircle, ArrowRight, ExternalLink, Github, Code2, Zap } from "lucide-react";

const ProjectDetailPage = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProject = async () => {
      try {
        const data = await projectsApi.getOne(id);
        setProject(data);
      } catch (error) {
        console.error("Error loading project:", error);
        setProject(null);
      } finally {
        setLoading(false);
      }
    };
    loadProject();
  }, [id]);

  if (loading) {
    return (
      <div className="py-20 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent mx-auto"></div>
        <p className="text-gray-500 mt-4">Loading project...</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Project Not Found</h2>
        <p className="text-gray-500 mb-6">The project you're looking for doesn't exist.</p>
        <Link to="/projects" className="btn-primary inline-flex items-center gap-2"><ArrowLeft size={18} /> Back to Projects</Link>
      </div>
    );
  }

  return (
    <div>
      <section className="relative py-20 bg-gray-50">
        <div className="container-custom">
          <Link to="/projects" className="inline-flex items-center gap-2 text-gray-500 hover:text-orange-500 transition-colors mb-6"><ArrowLeft size={18} /> Back to Projects</Link>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="px-3 py-1 bg-orange-500/10 text-orange-500 rounded-full text-sm font-medium">{project.category}</span>
              <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mt-4 mb-4">{project.title}</h1>
              <p className="text-lg text-gray-500 mb-6">{project.fullDescription || project.description}</p>
              {project.liveLink && (
                <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors shadow-lg hover:shadow-blue-500/25">
                  <ExternalLink size={18} /> View Live Project
                </a>
              )}
              {project.githubLink && (
                <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-900 transition-colors ml-3 shadow-lg hover:shadow-gray-800/25">
                  <Github size={18} /> View Source Code
                </a>
              )}
            </div>
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img src={project.image || "https://via.placeholder.com/600x400?text=Project+Image"} alt={project.title} className="w-full h-72 object-cover" onError={(e) => e.target.src = "https://via.placeholder.com/600x400?text=Project+Image"} />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="card p-8 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-3 mb-4"><div className="p-2 bg-red-100 rounded-lg"><Zap className="text-red-500" size={24} /></div><h3 className="text-xl font-bold text-slate-900">The Challenge</h3></div>
              <p className="text-gray-500 leading-relaxed">{project.challenge || "No challenge details provided."}</p>
            </div>
            <div className="card p-8 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-3 mb-4"><div className="p-2 bg-green-100 rounded-lg"><CheckCircle className="text-green-500" size={24} /></div><h3 className="text-xl font-bold text-slate-900">The Solution</h3></div>
              <p className="text-gray-500 leading-relaxed">{project.solution || "No solution details provided."}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4"><div className="p-2 bg-blue-100 rounded-lg"><Code2 className="text-blue-500" size={24} /></div><h3 className="text-xl font-bold text-slate-900">Tech Stack</h3></div>
              <div className="flex flex-wrap gap-3">
                {project.tech && project.tech.length > 0 ? project.tech.map((tech, index) => (
                  <span key={index} className="px-4 py-2 bg-white rounded-lg shadow-sm text-slate-900 font-medium text-sm hover:shadow-md transition-shadow">{tech}</span>
                )) : <p className="text-gray-500">No tech stack specified.</p>}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-4"><div className="p-2 bg-purple-100 rounded-lg"><CheckCircle className="text-purple-500" size={24} /></div><h3 className="text-xl font-bold text-slate-900">Impact</h3></div>
              <div className="flex items-start gap-3 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <CheckCircle className="text-green-500 flex-shrink-0 mt-1" size={20} />
                <p className="text-gray-500">{project.impact || "No impact details provided."}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {project.gallery && project.gallery.length > 0 && (
        <section className="py-20">
          <div className="container-custom">
            <h2 className="section-title text-center">Project Gallery</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              {project.gallery.map((image, index) => (
                <div key={index} className="rounded-2xl overflow-hidden shadow-lg group">
                  <img src={image} alt={`${project.title} ${index + 1}`} className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500" onError={(e) => e.target.src = "https://via.placeholder.com/600x400?text=Gallery+Image"} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-20 bg-gradient-to-r from-orange-500 to-orange-400">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Have a Project in Mind?</h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">Let's discuss how we can create something amazing together.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/contact" className="bg-white text-orange-500 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 inline-flex items-center gap-2 shadow-lg">Get in Touch <ArrowRight size={18} /></Link>
            {project.liveLink && (
              <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-all duration-300 inline-flex items-center gap-2">View Live Project</a>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectDetailPage;