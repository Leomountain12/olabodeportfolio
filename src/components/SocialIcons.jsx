// src/components/SocialIcons.jsx
import { Github, Linkedin, Twitter, Instagram, Youtube, Facebook } from "lucide-react";
import getSocialConfig from "../data/socialConfig";

const TikTokIcon = ({ size = 20, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

const iconMap = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  instagram: Instagram,
  youtube: Youtube,
  tiktok: TikTokIcon,
  facebook: Facebook,
};

const SocialIcons = ({ position = "fixed", className = "" }) => {
  const config = getSocialConfig();
  const { social, socialOrder } = config;

  return (
    <div className={`${position === "fixed" ? "fixed right-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-3 z-40" : "flex gap-3 flex-wrap"} ${className}`}>
      {socialOrder.map((key) => {
        const Icon = iconMap[key];
        const url = social[key];
        if (!Icon || !url) return null;
        return (
          <a
            key={key}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={`p-2 rounded-lg transition-all duration-300 ${position === "fixed" ? "bg-white shadow-md hover:bg-orange-500 hover:text-white text-gray-600" : "bg-gray-100 hover:bg-orange-500 hover:text-white text-gray-600"}`}
            aria-label={key}
          >
            <Icon size={20} />
          </a>
        );
      })}
    </div>
  );
};

export default SocialIcons;