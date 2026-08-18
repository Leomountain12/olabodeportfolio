// src/pages/ProjectsPage.jsx
import { useState, useEffect } from "react";
import { categories as allCategories } from "../data/projects";
import ProjectCard from "../components/ProjectCard";
import CategoryFilter from "../components/CategoryFilter";
import { projectsApi } from "../api/client";

const ProjectsPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [allProjects, setAllProjects] = useState([]);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const projects = await projectsApi.getAll();
        setAllProjects(projects);
        localStorage.setItem('customProjects', JSON.stringify(projects));
      } catch (error) {
        console.error("Error loading projects:", error);
        // fallback to default
        const { defaultProjects } = await import("../data/defaultData");
        setAllProjects(defaultProjects);
      }
    };
    loadProjects();
  }, []);

  const filteredProjects = activeCategory === "All"
    ? allProjects
    : allProjects.filter((p) => p.category === activeCategory);

  return (
    <div className="py-20">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h1 className="section-title">My Projects</h1>
          <p className="section-subtitle mx-auto">A collection of my work showcasing full-stack and AI solutions.</p>
        </div>
        <CategoryFilter categories={allCategories} activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
        {filteredProjects.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📂</div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">No Projects Found</h3>
            <p className="text-gray-500">Add your first project in the admin panel.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id || project.title} project={project} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectsPage;