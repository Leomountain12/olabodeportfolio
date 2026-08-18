// src/components/Footer.jsx
import { Link } from "react-router-dom";
import { Code2, Mail, MapPin, Phone } from "lucide-react";
import SocialIcons from "./SocialIcons";
import getSocialConfig from "../data/socialConfig";

const Footer = () => {
  const config = getSocialConfig();
  const { email, phone } = config;

  return (
    <footer className="bg-gray-50 text-gray-600 py-16 border-t border-gray-200">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Code2 className="w-8 h-8 text-orange-500" />
              <h3 className="text-2xl font-bold text-slate-900">
                <span className="text-orange-500">Leo</span>dcatalyst
              </h3>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              Building innovative solutions with AI and modern web technologies.
            </p>
            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-3 text-sm text-gray-500">
                <Mail size={16} className="text-orange-500" />
                <a href={`mailto:${email}`} className="hover:text-orange-500 transition-colors">
                  {email}
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-500">
                <Phone size={16} className="text-orange-500" />
                <a href={`tel:${phone}`} className="hover:text-orange-500 transition-colors">
                  {phone}
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-500">
                <MapPin size={16} className="text-orange-500" />
                <span>Remote / Global</span>
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-slate-900 font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/" className="text-gray-500 hover:text-orange-500 transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-gray-500 hover:text-orange-500 transition-colors">About</Link></li>
              <li><Link to="/projects" className="text-gray-500 hover:text-orange-500 transition-colors">Projects</Link></li>
              <li><Link to="/contact" className="text-gray-500 hover:text-orange-500 transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-slate-900 font-semibold text-lg mb-4">Resources</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="/resume.pdf" className="text-gray-500 hover:text-orange-500 transition-colors" target="_blank" rel="noopener noreferrer">📄 Resume</a></li>
              <li><Link to="/projects" className="text-gray-500 hover:text-orange-500 transition-colors">🚀 Portfolio</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-slate-900 font-semibold text-lg mb-4">Connect</h4>
            <SocialIcons position="static" />
            <p className="text-xs text-gray-400 mt-4">📬 Let's connect and build something amazing together.</p>
          </div>
        </div>
        <div className="border-t border-gray-200 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">© {new Date().getFullYear()} <span className="text-orange-500">Leodcatalyst</span>. All rights reserved.</p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-gray-500 hover:text-orange-500 transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-500 hover:text-orange-500 transition-colors">Terms of Service</a>
            <span className="text-gray-300">|</span>
            <span className="text-gray-500">Made with ❤️ by Leodcatalyst</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;