// src/data/socialConfig.js
const defaultSettings = {
  email: "olabodeolamide323@gmail.com",
  phone: "+2348126332866",
  social: {
    github: "https://github.com/leodcatalyst",
    linkedin: "https://linkedin.com/in/leodcatalyst",
    twitter: "https://twitter.com/leodcatalyst",
    instagram: "https://instagram.com/leodcatalyst",
    youtube: "https://youtube.com/@leodcatalyst",
    tiktok: "https://tiktok.com/@leodcatalyst",
    facebook: "https://facebook.com/leodcatalyst",
  },
  socialOrder: ["github", "linkedin", "twitter", "instagram", "youtube", "tiktok", "facebook"],
};

export const getSocialConfig = () => {
  const saved = localStorage.getItem('socialSettings');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      return { ...defaultSettings, ...parsed, social: { ...defaultSettings.social, ...parsed.social } };
    } catch { return defaultSettings; }
  }
  return defaultSettings;
};

export const saveSocialConfig = (settings) => {
  localStorage.setItem('socialSettings', JSON.stringify(settings));
};

export default getSocialConfig;