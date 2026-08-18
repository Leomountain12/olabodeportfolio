// src/components/DisplayImage.jsx
import { useState, useEffect } from "react";
import { profileApi } from "../api/client";

const DisplayImage = ({ className, alt, fallbackText }) => {
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    const loadImage = async () => {
      try {
        const profile = await profileApi.get();
        if (profile.image) {
          setImageSrc(profile.image);
        } else {
          setImageSrc("https://res.cloudinary.com/g77vrcnu/image/upload/v1/portfolio/profile.jpg");
        }
      } catch (error) {
        console.error("Error loading profile image:", error);
        setImageSrc("https://res.cloudinary.com/g77vrcnu/image/upload/v1/portfolio/profile.jpg");
      }
    };
    loadImage();
  }, []);

  if (!imageSrc) {
    return (
      <div className={`${className} bg-gray-100 flex items-center justify-center`}>
        <span className="text-gray-400 text-sm">{fallbackText || "Upload photo"}</span>
      </div>
    );
  }

  return <img src={imageSrc} alt={alt || "Profile"} className={className} />;
};

export default DisplayImage;