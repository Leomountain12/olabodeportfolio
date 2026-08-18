
import { useState, useEffect } from "react";
import { 
  Upload, X, Lock, Unlock, Image, Trash2, 
  Mail, FolderOpen, Settings, CheckCircle, 
  Send, User, Briefcase, MessageCircle, Plus,
  ExternalLink, Edit, Save, Link as LinkIcon,
  Github, Eye, EyeOff, Phone, Twitter, Instagram, 
  Youtube, Linkedin, Facebook
} from "lucide-react";
import { categories as allCategories } from "../data/projects";
import { getSocialConfig, saveSocialConfig } from "../data/socialConfig";
import { defaultProjects } from "../data/defaultData";
import { projectsApi, profileApi, messagesApi } from "../api/client";

// Custom TikTok Icon (SVG)
const TikTokIcon = ({ size = 20, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

const AdminUpload = () => {
  // Auth states
  const [isAdmin, setIsAdmin] = useState(false);
  const [password, setPassword] = useState("");
  const [showLogin, setShowLogin] = useState(false);
  const [error, setError] = useState("");
  
  // UI states
  const [activeTab, setActiveTab] = useState("images");
  const [showPanel, setShowPanel] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  
  const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || "secureleodcatalyst20242@g";
  
  // Profile image states
  const [images, setImages] = useState([]);
  const [profileFile, setProfileFile] = useState(null);
  const [profilePreview, setProfilePreview] = useState(null);
  
  // Project image states
  const [projectImages, setProjectImages] = useState([]);
  const [projectFile, setProjectFile] = useState(null);
  const [projectPreview, setProjectPreview] = useState(null);
  const [selectedProject, setSelectedProject] = useState("");
  
  // Messages states
  const [messages, setMessages] = useState([]);
  
  // Reply modal states
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [currentReplyMessage, setCurrentReplyMessage] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [replySending, setReplySending] = useState(false);
  
  // Settings states
  const [socialSettings, setSocialSettings] = useState(null);
  const [settingsSaved, setSettingsSaved] = useState(false);
  
  // Project management states
  const [customProjects, setCustomProjects] = useState([]);
  const [showAddProject, setShowAddProject] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [projectForm, setProjectForm] = useState({
    id: "",
    title: "",
    category: "",
    description: "",
    fullDescription: "",
    impact: "",
    tech: "",
    challenge: "",
    solution: "",
    liveLink: "",
    githubLink: "",
    features: "",
    image: ""
  });

  // Load social settings
  useEffect(() => {
    setSocialSettings(getSocialConfig());
  }, []);

  // Check screen size for mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Load all data from backend
  useEffect(() => {
    const loadData = async () => {
      try {
        // Load projects
        const projects = await projectsApi.getAll();
        setCustomProjects(projects);
        localStorage.setItem('customProjects', JSON.stringify(projects));
        
        // Load messages
        const messages = await messagesApi.getAll();
        setMessages(messages);
        localStorage.setItem('contactMessages', JSON.stringify(messages));
        
        // Load profile image
        const profile = await profileApi.get();
        if (profile.image) {
          localStorage.setItem('profileImageUrl', profile.image);
          setImages([{ id: Date.now(), src: profile.image, type: 'profile' }]);
        }
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };
    loadData();
  }, []);

  // ==================== AUTH FUNCTIONS ====================
  
  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAdmin(true);
      setShowLogin(false);
      setShowPanel(true);
      localStorage.setItem('adminLoggedIn', 'true');
      setError("");
      setPassword("");
    } else {
      setError("Wrong password!");
      setTimeout(() => setError(""), 3000);
    }
  };

  const handleLogout = () => {
    setIsAdmin(false);
    setShowLogin(false);
    setShowPanel(false);
    localStorage.removeItem('adminLoggedIn');
    setProfileFile(null);
    setProfilePreview(null);
    setProjectFile(null);
    setProjectPreview(null);
  };

  // ==================== PROFILE IMAGE FUNCTIONS ====================
  
  const handleProfileFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileFile(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfilePreview(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadProfileImage = async () => {
    if (!profileFile) {
      alert("Please select a profile image first!");
      return;
    }

    setUploading(true);

    try {
      const reader = new FileReader();
      reader.onload = async (event) => {
        try {
          const result = await profileApi.uploadImage(event.target.result);
          localStorage.setItem('profileImageUrl', result.url);
          setImages([{ id: Date.now(), src: result.url, type: 'profile' }]);
          setProfileFile(null);
          setProfilePreview(null);
          setUploading(false);
          setUploadSuccess(true);
          alert("✅ Profile image uploaded successfully!");
          window.location.reload();
        } catch (error) {
          console.error("Upload error:", error);
          alert("❌ Failed to upload image. Please try again.");
          setUploading(false);
        }
      };
      reader.readAsDataURL(profileFile);
    } catch (error) {
      console.error("Upload error:", error);
      alert("❌ Failed to upload image. Please try again.");
      setUploading(false);
    }
  };

  // ==================== PROJECT IMAGE FUNCTIONS ====================
  
  const handleProjectFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProjectFile(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        setProjectPreview(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadProjectImage = async () => {
    if (!projectFile) {
      alert("Please select a project image first!");
      return;
    }
    if (!selectedProject) {
      alert("Please select a project!");
      return;
    }

    setUploading(true);

    try {
      const reader = new FileReader();
      reader.onload = async (event) => {
        try {
          const result = await projectsApi.uploadImage(event.target.result, selectedProject);
          
          const newImage = {
            id: Date.now(),
            src: result.url,
            name: projectFile.name,
            projectName: selectedProject,
            type: 'project',
            date: new Date().toLocaleString()
          };
          const updatedImages = [newImage, ...projectImages];
          setProjectImages(updatedImages);
          localStorage.setItem('projectImages', JSON.stringify(updatedImages));
          
          const updatedProjects = customProjects.map(p => 
            p.title === selectedProject ? { ...p, image: result.url } : p
          );
          setCustomProjects(updatedProjects);
          localStorage.setItem('customProjects', JSON.stringify(updatedProjects));

          setProjectFile(null);
          setProjectPreview(null);
          setSelectedProject("");
          setUploading(false);
          
          alert("✅ Project image uploaded successfully!");
        } catch (error) {
          console.error("Upload error:", error);
          alert("❌ Failed to upload image. Please try again.");
          setUploading(false);
        }
      };
      reader.readAsDataURL(projectFile);
    } catch (error) {
      console.error("Upload error:", error);
      alert("❌ Failed to upload image. Please try again.");
      setUploading(false);
    }
  };

  // ==================== PROJECT CRUD FUNCTIONS ====================
  
  const handleAddProject = () => {
    setEditingProject(null);
    setProjectForm({
      id: "",
      title: "",
      category: "",
      description: "",
      fullDescription: "",
      impact: "",
      tech: "",
      challenge: "",
      solution: "",
      liveLink: "",
      githubLink: "",
      features: "",
      image: ""
    });
    setShowAddProject(true);
  };

  const handleEditProject = (project) => {
    setEditingProject(project);
    setProjectForm({
      id: project.id,
      title: project.title,
      category: project.category,
      description: project.description,
      fullDescription: project.fullDescription || "",
      impact: project.impact || "",
      tech: project.tech ? project.tech.join(", ") : "",
      challenge: project.challenge || "",
      solution: project.solution || "",
      liveLink: project.liveLink || "",
      githubLink: project.githubLink || "",
      features: project.features ? project.features.join("\n") : "",
      image: project.image || ""
    });
    setShowAddProject(true);
  };

  const handleSaveProject = async () => {
    if (!projectForm.title || !projectForm.category || !projectForm.description) {
      alert("Please fill in Title, Category, and Description!");
      return;
    }

    const techArray = projectForm.tech ? projectForm.tech.split(",").map(t => t.trim()).filter(t => t) : [];
    const featuresArray = projectForm.features ? projectForm.features.split("\n").map(f => f.trim()).filter(f => f) : [];
    
    const newProject = {
      title: projectForm.title,
      category: projectForm.category,
      description: projectForm.description,
      fullDescription: projectForm.fullDescription,
      impact: projectForm.impact,
      tech: techArray,
      challenge: projectForm.challenge,
      solution: projectForm.solution,
      liveLink: projectForm.liveLink,
      githubLink: projectForm.githubLink,
      features: featuresArray,
      image: projectForm.image || "https://via.placeholder.com/600x400?text=Project+Image"
    };

    try {
      let result;
      if (editingProject) {
        result = await projectsApi.update(editingProject.id, newProject);
      } else {
        result = await projectsApi.create(newProject);
      }
      
      let updatedProjects;
      if (editingProject) {
        updatedProjects = customProjects.map(p => p.id === editingProject.id ? result : p);
      } else {
        updatedProjects = [...customProjects, result];
      }
      
      setCustomProjects(updatedProjects);
      localStorage.setItem('customProjects', JSON.stringify(updatedProjects));
      alert(editingProject ? "✅ Project updated!" : "✅ New project added!");
      
      setShowAddProject(false);
      setEditingProject(null);
      setProjectForm({
        id: "",
        title: "",
        category: "",
        description: "",
        fullDescription: "",
        impact: "",
        tech: "",
        challenge: "",
        solution: "",
        liveLink: "",
        githubLink: "",
        features: "",
        image: ""
      });
      window.location.reload();
    } catch (error) {
      console.error("Error saving project:", error);
      alert("❌ Failed to save project. Please try again.");
    }
  };

  const handleDeleteProject = async (projectId) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        await projectsApi.delete(projectId);
        const updatedProjects = customProjects.filter(p => p.id !== projectId);
        setCustomProjects(updatedProjects);
        localStorage.setItem('customProjects', JSON.stringify(updatedProjects));
        alert("✅ Project deleted!");
        window.location.reload();
      } catch (error) {
        console.error("Error deleting project:", error);
        alert("❌ Failed to delete project. Please try again.");
      }
    }
  };

  // ==================== DELETE FUNCTIONS ====================
  
  const deleteImage = (id, type) => {
    if (type === 'profile') {
      const updatedImages = images.filter(img => img.id !== id);
      setImages(updatedImages);
      localStorage.setItem('adminImages', JSON.stringify(updatedImages));
    } else {
      const updatedImages = projectImages.filter(img => img.id !== id);
      setProjectImages(updatedImages);
      localStorage.setItem('projectImages', JSON.stringify(updatedImages));
    }
  };

  const deleteMessage = async (id) => {
    if (window.confirm("Delete this message?")) {
      try {
        await messagesApi.delete(id);
        const updatedMessages = messages.filter(msg => msg.id !== id);
        setMessages(updatedMessages);
        localStorage.setItem('contactMessages', JSON.stringify(updatedMessages));
        alert("✅ Message deleted!");
      } catch (error) {
        console.error("Error deleting message:", error);
        alert("❌ Failed to delete message. Please try again.");
      }
    }
  };

  const markMessageRead = async (id) => {
    try {
      await messagesApi.update(id, { read: true });
      const updatedMessages = messages.map(msg => 
        msg.id === id ? { ...msg, read: true } : msg
      );
      setMessages(updatedMessages);
      localStorage.setItem('contactMessages', JSON.stringify(updatedMessages));
    } catch (error) {
      console.error("Error marking message as read:", error);
    }
  };

  // ==================== SETTINGS FUNCTIONS ====================
  
  const handleSettingsChange = (field, value) => {
    setSocialSettings({ ...socialSettings, [field]: value });
  };

  const handleSocialChange = (platform, value) => {
    setSocialSettings({
      ...socialSettings,
      social: { ...socialSettings.social, [platform]: value },
    });
  };

  const handleSaveSettings = async () => {
    if (socialSettings) {
      try {
        await profileApi.update({
          email: socialSettings.email,
          phone: socialSettings.phone,
          social: socialSettings.social,
          socialOrder: socialSettings.socialOrder
        });
        saveSocialConfig(socialSettings);
        setSettingsSaved(true);
        setTimeout(() => setSettingsSaved(false), 3000);
        alert("✅ Settings saved successfully!");
        window.location.reload();
      } catch (error) {
        console.error("Error saving settings:", error);
        alert("❌ Failed to save settings. Please try again.");
      }
    }
  };

  // ==================== HELPER FUNCTIONS ====================
  
  const getAllProjects = () => {
    return customProjects.map(p => p.title);
  };

  const unreadCount = messages.filter(msg => !msg.read).length;

  // ==================== SEED DEFAULT PROJECTS ====================
  
  const seedDefaultProjects = async () => {
    if (window.confirm("Load default projects? This will replace all custom projects.")) {
      try {
        // Delete all existing projects first
        for (const project of customProjects) {
          await projectsApi.delete(project.id);
        }
        
        // Create default projects
        for (const project of defaultProjects) {
          await projectsApi.create(project);
        }
        
        const projects = await projectsApi.getAll();
        setCustomProjects(projects);
        localStorage.setItem('customProjects', JSON.stringify(projects));
        alert("✅ Default projects loaded!");
        window.location.reload();
      } catch (error) {
        console.error("Error seeding default projects:", error);
        alert("❌ Failed to load default projects. Please try again.");
      }
    }
  };

  // ==================== LOGIN MODAL ====================
  
  if (showLogin) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-6 w-80 max-w-full">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-slate-900">Admin Login</h3>
            <button
              onClick={() => {
                setShowLogin(false);
                setError("");
                setPassword("");
              }}
              className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X size={20} className="text-gray-500" />
            </button>
          </div>
          <form onSubmit={handleLogin}>
            <input
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 mb-3"
              autoFocus
            />
            {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition-colors"
            >
              Login
            </button>
          </form>
          <p className="text-xs text-gray-400 mt-2 text-center">
            Only the site owner can access this panel
          </p>
        </div>
      </div>
    );
  }

  // ==================== ADMIN DASHBOARD ====================
  
  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Hidden Admin Trigger */}
      <div 
        onClick={() => {
          if (isAdmin) {
            setShowPanel(!showPanel);
          } else {
            setShowLogin(true);
          }
        }}
        className="fixed bottom-6 right-6 z-50 w-12 h-12 cursor-pointer"
        title="Admin Access (Hidden)"
      />

      {/* Admin Panel */}
      {isAdmin && showPanel && (
        <div className={`fixed ${
          isMobile 
            ? 'inset-0 bottom-0 rounded-t-2xl max-h-[92vh]' 
            : 'bottom-24 right-6 w-[550px] max-h-[650px] rounded-2xl'
        } bg-white shadow-2xl overflow-hidden flex flex-col z-50 border border-gray-200`}>
          
          {/* HEADER */}
          <div className="bg-gradient-to-r from-orange-500 to-orange-400 text-white p-4 flex items-center justify-between">
            <h3 className="font-bold flex items-center gap-2 text-sm md:text-base">
              <Settings size={18} />
              Admin Dashboard
            </h3>
            <div className="flex items-center gap-2">
              {isMobile && (
                <button
                  onClick={() => setShowPanel(false)}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              )}
              <button
                onClick={handleLogout}
                className="text-white/80 hover:text-white transition-colors text-xs md:text-sm flex items-center gap-1"
              >
                <Unlock size={14} /> Logout
              </button>
            </div>
          </div>

          {/* TABS */}
          <div className="flex border-b border-gray-200 bg-gray-50 overflow-x-auto">
            <button
              onClick={() => setActiveTab("images")}
              className={`flex-1 py-3 px-2 text-xs md:text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === "images" 
                  ? "text-orange-500 border-b-2 border-orange-500 bg-white" 
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <User size={16} className="inline mr-1" /> Profile
            </button>
            <button
              onClick={() => setActiveTab("projects")}
              className={`flex-1 py-3 px-2 text-xs md:text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === "projects" 
                  ? "text-orange-500 border-b-2 border-orange-500 bg-white" 
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <Briefcase size={16} className="inline mr-1" /> Projects
            </button>
            <button
              onClick={() => setActiveTab("messages")}
              className={`flex-1 py-3 px-2 text-xs md:text-sm font-medium transition-colors whitespace-nowrap relative ${
                activeTab === "messages" 
                  ? "text-orange-500 border-b-2 border-orange-500 bg-white" 
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <MessageCircle size={16} className="inline mr-1" /> Messages
              {unreadCount > 0 && (
                <span className="ml-1 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
                  {unreadCount}
                </span>
              )}
            </button>
            {/* SETTINGS TAB */}
            <button
              onClick={() => setActiveTab("settings")}
              className={`flex-1 py-3 px-2 text-xs md:text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === "settings" 
                  ? "text-orange-500 border-b-2 border-orange-500 bg-white" 
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <Settings size={16} className="inline mr-1" /> Settings
            </button>
          </div>

          {/* CONTENT */}
          <div className="flex-1 overflow-y-auto p-3 md:p-4">
            
            {/* ============ PROFILE IMAGES TAB ============ */}
            {activeTab === "images" && (
              <div>
                <div className="mb-4 border rounded-lg p-3 md:p-4 bg-gray-50">
                  <p className="text-sm font-semibold text-gray-700 mb-3">📸 Upload Profile Photo</p>
                  
                  <div className="flex items-center gap-3 mb-3">
                    <label className="cursor-pointer flex-1">
                      <div className="border-2 border-dashed border-orange-300 rounded-lg p-3 text-center hover:bg-orange-50 transition-colors">
                        {profilePreview ? (
                          <div className="flex items-center justify-center gap-3">
                            <img src={profilePreview} alt="Preview" className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover" />
                            <span className="text-xs md:text-sm text-gray-600 truncate max-w-[100px]">{profileFile?.name}</span>
                          </div>
                        ) : (
                          <>
                            <Upload className="text-orange-500 mx-auto mb-1" size={20} />
                            <span className="text-xs md:text-sm text-gray-600">Select profile image</span>
                          </>
                        )}
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleProfileFileSelect}
                          className="hidden"
                        />
                      </div>
                    </label>
                  </div>

                  <button
                    onClick={uploadProfileImage}
                    disabled={!profileFile || uploading}
                    className={`w-full py-2 rounded-lg flex items-center justify-center gap-2 transition-colors text-sm ${
                      profileFile && !uploading
                        ? "bg-orange-500 text-white hover:bg-orange-600"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    {uploading ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                    ) : (
                      <>
                        <Send size={16} /> Upload Profile Photo
                      </>
                    )}
                  </button>

                  {uploadSuccess && (
                    <p className="text-green-500 text-xs text-center mt-2">✅ Uploaded successfully!</p>
                  )}
                </div>

                {images.filter(img => img.type === 'profile').length > 0 && (
                  <div>
                    <p className="text-sm font-semibold text-gray-600 mb-2">
                      Saved Profile Images ({images.filter(img => img.type === 'profile').length})
                    </p>
                    <div className="grid grid-cols-3 gap-2">
                      {images.filter(img => img.type === 'profile').map((img) => (
                        <div key={img.id} className="relative group">
                          <img
                            src={img.src}
                            alt={img.name}
                            className="w-full h-16 md:h-20 object-cover rounded-lg border"
                          />
                          <button
                            onClick={() => deleteImage(img.id, 'profile')}
                            className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ============ PROJECTS TAB ============ */}
            {activeTab === "projects" && (
              <div>
                <button
                  onClick={handleAddProject}
                  className="w-full mb-4 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center gap-2 text-sm"
                >
                  <Plus size={18} /> Add New Project
                </button>

                {showAddProject && (
                  <div className="mb-4 border rounded-lg p-4 bg-gray-50 max-h-[400px] overflow-y-auto">
                    <h4 className="font-semibold text-slate-900 mb-3">
                      {editingProject ? "✏️ Edit Project" : "➕ Add New Project"}
                    </h4>
                    
                    <div className="space-y-3">
                      {/* Title */}
                      <input
                        type="text"
                        placeholder="📌 Project Title *"
                        value={projectForm.title}
                        onChange={(e) => setProjectForm({...projectForm, title: e.target.value})}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                      
                      {/* Category */}
                      <div>
                        <label className="text-xs font-semibold text-gray-700 flex items-center gap-1 mb-1">
                          📂 Category * 
                          <span className="text-xs font-normal text-gray-400">(search or select from dropdown)</span>
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            placeholder="🔍 Search categories... (e.g., E-commerce, EdTech, FinTech)"
                            value={projectForm.category}
                            onChange={(e) => setProjectForm({...projectForm, category: e.target.value})}
                            list="category-list"
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                          />
                          <datalist id="category-list">
                            {allCategories.filter(c => c !== "All").map((cat) => (
                              <option key={cat} value={cat} />
                            ))}
                          </datalist>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {["AI / Machine Learning", "E-commerce", "EdTech", "FinTech", "SaaS", "Travel", "Real Estate", "Web Development"].map((cat) => (
                            <button
                              key={cat}
                              type="button"
                              onClick={() => setProjectForm({...projectForm, category: cat})}
                              className={`px-2 py-0.5 text-xs rounded-full transition-colors ${
                                projectForm.category === cat 
                                  ? "bg-orange-500 text-white" 
                                  : "bg-gray-100 hover:bg-orange-100 hover:text-orange-600 text-gray-600"
                              }`}
                            >
                              {cat}
                            </button>
                          ))}
                          <span className="text-xs text-gray-400 px-1">+ {allCategories.filter(c => c !== "All").length - 8} more...</span>
                        </div>
                        <p className="text-xs text-gray-400 mt-1">💡 Type to search all categories, or click a tag above</p>
                      </div>
                      
                      {/* Short Description */}
                      <input
                        type="text"
                        placeholder="📝 Short Description *"
                        value={projectForm.description}
                        onChange={(e) => setProjectForm({...projectForm, description: e.target.value})}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                      
                      {/* Full Description */}
                      <textarea
                        placeholder="📄 Full Description"
                        value={projectForm.fullDescription}
                        onChange={(e) => setProjectForm({...projectForm, fullDescription: e.target.value})}
                        rows="2"
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                      />
                      
                      {/* Tech Stack */}
                      <input
                        type="text"
                        placeholder="💻 Tech Stack (comma separated e.g., React, Node.js)"
                        value={projectForm.tech}
                        onChange={(e) => setProjectForm({...projectForm, tech: e.target.value})}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                      
                      {/* Live Link */}
                      <div className="border-2 border-blue-300 rounded-lg p-3 bg-blue-50">
                        <label className="text-xs font-semibold text-blue-700 flex items-center gap-1 mb-1">
                          <LinkIcon size={14} /> LIVE PROJECT LINK (Visitors will see "Live Demo" button)
                        </label>
                        <input
                          type="url"
                          placeholder="https://your-project-url.com"
                          value={projectForm.liveLink}
                          onChange={(e) => setProjectForm({...projectForm, liveLink: e.target.value})}
                          className="w-full px-3 py-2 text-sm border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
                        />
                        <p className="text-xs text-blue-600 mt-1">✅ Add your project URL here and visitors can click to visit!</p>
                      </div>
                      
                      {/* GitHub Link */}
                      <input
                        type="url"
                        placeholder="🐙 GitHub Link (optional)"
                        value={projectForm.githubLink}
                        onChange={(e) => setProjectForm({...projectForm, githubLink: e.target.value})}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                      
                      {/* Impact */}
                      <input
                        type="text"
                        placeholder="📊 Impact (e.g., Increased conversions by 35%)"
                        value={projectForm.impact}
                        onChange={(e) => setProjectForm({...projectForm, impact: e.target.value})}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                      
                      {/* Challenge */}
                      <textarea
                        placeholder="⚠️ Challenge"
                        value={projectForm.challenge}
                        onChange={(e) => setProjectForm({...projectForm, challenge: e.target.value})}
                        rows="2"
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                      />
                      
                      {/* Solution */}
                      <textarea
                        placeholder="💡 Solution"
                        value={projectForm.solution}
                        onChange={(e) => setProjectForm({...projectForm, solution: e.target.value})}
                        rows="2"
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                      />
                      
                      {/* Features */}
                      <textarea
                        placeholder="✨ Features (one per line)"
                        value={projectForm.features}
                        onChange={(e) => setProjectForm({...projectForm, features: e.target.value})}
                        rows="2"
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                      />
                    </div>

                    <div className="flex gap-2 mt-3">
                      <button
                        onClick={handleSaveProject}
                        className="flex-1 bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition-colors flex items-center justify-center gap-2 text-sm"
                      >
                        <Save size={16} /> {editingProject ? "Update Project" : "Save Project"}
                      </button>
                      <button
                        onClick={() => {
                          setShowAddProject(false);
                          setEditingProject(null);
                        }}
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors text-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                {/* Upload Project Image */}
                <div className="mb-4 border rounded-lg p-3 md:p-4 bg-gray-50">
                  <p className="text-sm font-semibold text-gray-700 mb-3">🖼️ Upload Project Image</p>
                  
                  <div className="mb-3">
                    <label className="text-xs md:text-sm text-gray-600 block mb-1">Select Project:</label>
                    <select
                      value={selectedProject}
                      onChange={(e) => setSelectedProject(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      <option value="">-- Select a project --</option>
                      {getAllProjects().map((project) => (
                        <option key={project} value={project}>{project}</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex items-center gap-3 mb-3">
                    <label className="cursor-pointer flex-1">
                      <div className="border-2 border-dashed border-orange-300 rounded-lg p-3 text-center hover:bg-orange-50 transition-colors">
                        {projectPreview ? (
                          <div className="flex items-center justify-center gap-3">
                            <img src={projectPreview} alt="Preview" className="w-10 h-10 md:w-12 md:h-12 rounded object-cover" />
                            <span className="text-xs md:text-sm text-gray-600 truncate max-w-[100px]">{projectFile?.name}</span>
                          </div>
                        ) : (
                          <>
                            <Upload className="text-orange-500 mx-auto mb-1" size={20} />
                            <span className="text-xs md:text-sm text-gray-600">Select project image</span>
                          </>
                        )}
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleProjectFileSelect}
                          className="hidden"
                        />
                      </div>
                    </label>
                  </div>

                  <button
                    onClick={uploadProjectImage}
                    disabled={!projectFile || !selectedProject || uploading}
                    className={`w-full py-2 rounded-lg flex items-center justify-center gap-2 transition-colors text-sm ${
                      projectFile && selectedProject && !uploading
                        ? "bg-orange-500 text-white hover:bg-orange-600"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    {uploading ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                    ) : (
                      <>
                        <Send size={16} /> Upload Project Image
                      </>
                    )}
                  </button>
                </div>

                {customProjects.length > 0 && (
                  <div className="mb-4">
                    <p className="text-sm font-semibold text-gray-600 mb-2">
                      Your Custom Projects ({customProjects.length})
                    </p>
                    <div className="space-y-2">
                      {customProjects.map((proj) => (
                        <div key={proj.id} className="border rounded-lg p-3 bg-white">
                          <div className="flex items-center justify-between">
                            <div className="flex-1 min-w-0">
                              <p className="font-semibold text-slate-900 text-sm">{proj.title}</p>
                              <p className="text-xs text-gray-500">{proj.category}</p>
                              {proj.liveLink && (
                                <a 
                                  href={proj.liveLink} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-xs text-blue-500 hover:text-blue-700 flex items-center gap-1"
                                >
                                  <ExternalLink size={12} /> Live Link
                                </a>
                              )}
                            </div>
                            <div className="flex gap-1 flex-shrink-0">
                              <button
                                onClick={() => handleEditProject(proj)}
                                className="p-1 text-blue-500 hover:bg-blue-50 rounded"
                                title="Edit"
                              >
                                <Edit size={14} />
                              </button>
                              <button
                                onClick={() => handleDeleteProject(proj.id)}
                                className="p-1 text-red-500 hover:bg-red-50 rounded"
                                title="Delete"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {projectImages.length > 0 && (
                  <div>
                    <p className="text-sm font-semibold text-gray-600 mb-2">
                      Uploaded Project Images ({projectImages.length})
                    </p>
                    <div className="space-y-2">
                      {projectImages.map((img) => (
                        <div key={img.id} className="flex items-center gap-3 border rounded-lg p-2 relative group">
                          <img
                            src={img.src}
                            alt={img.name}
                            className="w-12 h-12 md:w-16 md:h-16 object-cover rounded"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-slate-900 truncate">{img.projectName}</p>
                            <p className="text-xs text-gray-400">{img.date}</p>
                          </div>
                          <button
                            onClick={() => deleteImage(img.id, 'project')}
                            className="p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ============ MESSAGES TAB ============ */}
            {activeTab === "messages" && (
              <div>
                {messages.length === 0 ? (
                  <div className="text-center py-8">
                    <Mail className="text-gray-300 mx-auto mb-2" size={40} />
                    <p className="text-gray-500 text-sm">No messages yet</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {messages.map((msg) => (
                      <div key={msg.id} className={`border rounded-lg p-3 ${!msg.read ? 'bg-orange-50 border-orange-200' : 'bg-white'}`}>
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                              <span className="font-semibold text-sm text-slate-900">{msg.name}</span>
                              {!msg.read && (
                                <span className="bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full">New</span>
                              )}
                              {msg.replied && (
                                <span className="bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">✅ Replied</span>
                              )}
                            </div>
                            <p className="text-xs text-gray-500 truncate">{msg.email}</p>
                            <p className="text-sm font-medium text-slate-700 mt-1">📌 {msg.subject}</p>
                            <p className="text-sm text-slate-700 mt-1 break-words">{msg.message}</p>
                            <p className="text-xs text-gray-400 mt-1">📅 {msg.date}</p>
                          </div>
                          <div className="flex flex-col gap-1 flex-shrink-0 ml-2">
                            <button
                              onClick={() => {
                                setCurrentReplyMessage(msg);
                                setReplyText("");
                                setShowReplyModal(true);
                              }}
                              className="p-1.5 bg-blue-500 text-white hover:bg-blue-600 rounded-lg transition-colors flex items-center gap-1 text-xs"
                              title="Reply to message"
                            >
                              <ExternalLink size={14} /> Reply
                            </button>
                            {!msg.read && (
                              <button
                                onClick={() => markMessageRead(msg.id)}
                                className="p-1.5 bg-green-500 text-white hover:bg-green-600 rounded-lg transition-colors text-xs"
                                title="Mark as read"
                              >
                                ✅ Read
                              </button>
                            )}
                            <button
                              onClick={() => deleteMessage(msg.id)}
                              className="p-1.5 bg-red-500 text-white hover:bg-red-600 rounded-lg transition-colors text-xs"
                              title="Delete message"
                            >
                              🗑️ Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* ============ SETTINGS TAB ============ */}
            {activeTab === "settings" && socialSettings && (
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-4">⚙️ Social & Contact Settings</h3>
                <p className="text-sm text-gray-500 mb-4">
                  Update your contact information and social media links. These will update everywhere on the site.
                </p>

                <div className="space-y-4">
                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                      <Mail size={16} className="text-orange-500" /> Email Address
                    </label>
                    <input
                      type="email"
                      value={socialSettings.email || ""}
                      onChange={(e) => handleSettingsChange("email", e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="your@email.com"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                      <Phone size={16} className="text-orange-500" /> Phone Number
                    </label>
                    <input
                      type="text"
                      value={socialSettings.phone || ""}
                      onChange={(e) => handleSettingsChange("phone", e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="+2348126332866"
                    />
                  </div>

                  <hr className="border-gray-200" />

                  <h4 className="font-semibold text-slate-900">🌐 Social Media Links</h4>

                  {/* GitHub */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                      <Github size={16} className="text-gray-700" /> GitHub
                    </label>
                    <input
                      type="url"
                      value={socialSettings.social?.github || ""}
                      onChange={(e) => handleSocialChange("github", e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="https://github.com/yourusername"
                    />
                  </div>

                  {/* LinkedIn */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                      <Linkedin size={16} className="text-blue-600" /> LinkedIn
                    </label>
                    <input
                      type="url"
                      value={socialSettings.social?.linkedin || ""}
                      onChange={(e) => handleSocialChange("linkedin", e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="https://linkedin.com/in/yourusername"
                    />
                  </div>

                  {/* Twitter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                      <Twitter size={16} className="text-blue-400" /> Twitter / X
                    </label>
                    <input
                      type="url"
                      value={socialSettings.social?.twitter || ""}
                      onChange={(e) => handleSocialChange("twitter", e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="https://twitter.com/yourusername"
                    />
                  </div>

                  {/* Instagram */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                      <Instagram size={16} className="text-pink-500" /> Instagram
                    </label>
                    <input
                      type="url"
                      value={socialSettings.social?.instagram || ""}
                      onChange={(e) => handleSocialChange("instagram", e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="https://instagram.com/yourusername"
                    />
                  </div>

                  {/* YouTube */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                      <Youtube size={16} className="text-red-600" /> YouTube
                    </label>
                    <input
                      type="url"
                      value={socialSettings.social?.youtube || ""}
                      onChange={(e) => handleSocialChange("youtube", e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="https://youtube.com/@yourchannel"
                    />
                  </div>

                  {/* TikTok */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                      <TikTokIcon size={16} className="text-black" /> TikTok
                    </label>
                    <input
                      type="url"
                      value={socialSettings.social?.tiktok || ""}
                      onChange={(e) => handleSocialChange("tiktok", e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="https://tiktok.com/@yourusername"
                    />
                  </div>

                  {/* Facebook */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                      <Facebook size={16} className="text-blue-600" /> Facebook
                    </label>
                    <input
                      type="url"
                      value={socialSettings.social?.facebook || ""}
                      onChange={(e) => handleSocialChange("facebook", e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="https://facebook.com/yourusername"
                    />
                  </div>

                  {/* Save Button */}
                  <button
                    onClick={handleSaveSettings}
                    className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition-colors flex items-center justify-center gap-2 font-semibold"
                  >
                    <Save size={18} /> Save Settings
                  </button>

                  {settingsSaved && (
                    <div className="bg-green-50 text-green-700 p-3 rounded-lg text-center border border-green-200">
                      ✅ Settings saved successfully! Page will refresh.
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* ============ SEED DEFAULT PROJECTS BUTTON ============ */}
          <div className="border-t border-gray-200 p-2 bg-gray-50 text-center">
            <button
              onClick={seedDefaultProjects}
              className="text-xs text-blue-500 hover:text-blue-700 transition-colors"
            >
              📦 Load Default Projects
            </button>
            <span className="text-xs text-gray-400 mx-2">•</span>
            <p className="text-xs text-gray-400 inline">
              🔒 Only you can see this panel • Logged in as Admin
            </p>
          </div>

          {/* ============ REPLY MODAL ============ */}
          {showReplyModal && currentReplyMessage && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-4">
              <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-slate-900">✉️ Reply to Message</h3>
                    <button
                      onClick={() => {
                        setShowReplyModal(false);
                        setCurrentReplyMessage(null);
                        setReplyText("");
                      }}
                      className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <X size={20} className="text-gray-500" />
                    </button>
                  </div>

                  <div className="mb-4 p-3 bg-gray-50 rounded-lg text-sm">
                    <p className="text-gray-500"><strong>To:</strong> {currentReplyMessage.email}</p>
                    <p className="text-gray-500"><strong>Subject:</strong> Re: {currentReplyMessage.subject}</p>
                    <p className="text-gray-500 mt-2"><strong>Original Message:</strong></p>
                    <p className="text-gray-600 text-sm italic border-l-2 border-orange-300 pl-3 mt-1">
                      {currentReplyMessage.message}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Reply *
                    </label>
                    <textarea
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      rows="5"
                      placeholder="Type your reply here..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                    />
                  </div>

                  <div className="flex gap-3 mt-4">
                    <button
                      onClick={() => {
                        if (!replyText.trim()) {
                          alert("Please type a reply!");
                          return;
                        }

                        const subject = `Re: ${currentReplyMessage.subject}`;
                        const body = `Hi ${currentReplyMessage.name},\n\n${replyText}\n\n---\nOriginal message:\n${currentReplyMessage.message}`;
                        const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${currentReplyMessage.email}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                        window.open(gmailUrl, '_blank');
                        
                        const updatedMessages = messages.map(m => 
                          m.id === currentReplyMessage.id ? { ...m, replied: true, read: true } : m
                        );
                        setMessages(updatedMessages);
                        localStorage.setItem('contactMessages', JSON.stringify(updatedMessages));
                        
                        setShowReplyModal(false);
                        setCurrentReplyMessage(null);
                        setReplyText("");
                      }}
                      className="flex-1 bg-blue-500 text-white py-2.5 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
                    >
                      <ExternalLink size={16} /> Open Gmail to Reply
                    </button>
                    <button
                      onClick={() => {
                        setShowReplyModal(false);
                        setCurrentReplyMessage(null);
                        setReplyText("");
                      }}
                      className="px-4 py-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminUpload;