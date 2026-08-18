

// import ContactForm from "../components/ContactForm";
// import SocialIcons from "../components/SocialIcons";
// import { Mail, MapPin, Phone } from "lucide-react";
// import getSocialConfig from "../data/socialConfig";

// const ContactPage = () => {
//   const config = getSocialConfig();
//   const { email, phone } = config;

//   return (
//     <div className="py-20">
//       <div className="container-custom">
//         <div className="text-center mb-12">
//           <h1 className="section-title">Get in Touch</h1>
//           <p className="section-subtitle mx-auto">
//             Have a project in mind? Let's work together to bring your ideas to life.
//           </p>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           <div className="lg:col-span-2">
//             <div className="card p-8">
//               <ContactForm />
//             </div>
//           </div>

//           <div className="space-y-6">
//             <div className="card p-6">
//               <h3 className="text-lg font-bold text-slate-900 mb-4">Contact Information</h3>
//               <div className="space-y-4">
//                 <div className="flex items-start gap-3">
//                   <Mail className="text-orange-500 flex-shrink-0 mt-1" size={20} />
//                   <div>
//                     <p className="text-sm font-medium text-slate-900">Email</p>
//                     <a
//                       href={`mailto:${email}`}
//                       className="text-gray-500 hover:text-orange-500 transition-colors"
//                     >
//                       {email}
//                     </a>
//                   </div>
//                 </div>
//                 <div className="flex items-start gap-3">
//                   <Phone className="text-orange-500 flex-shrink-0 mt-1" size={20} />
//                   <div>
//                     <p className="text-sm font-medium text-slate-900">Phone</p>
//                     <a
//                       href={`tel:${phone}`}
//                       className="text-gray-500 hover:text-orange-500 transition-colors"
//                     >
//                       {phone}
//                     </a>
//                   </div>
//                 </div>
//                 <div className="flex items-start gap-3">
//                   <MapPin className="text-orange-500 flex-shrink-0 mt-1" size={20} />
//                   <div>
//                     <p className="text-sm font-medium text-slate-900">Location</p>
//                     <p className="text-gray-500">Remote / Global</p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="card p-6">
//               <h3 className="text-lg font-bold text-slate-900 mb-4">Connect With Me</h3>
//               <SocialIcons position="static" />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ContactPage;
// src/pages/ContactPage.jsx
import { useState, useEffect } from "react";
import ContactForm from "../components/ContactForm";
import SocialIcons from "../components/SocialIcons";
import { Mail, MapPin, Phone } from "lucide-react";
import { profileApi } from "../api/client";

const ContactPage = () => {
  const [profile, setProfile] = useState({ email: "", phone: "" });

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await profileApi.get();
        setProfile(data);
      } catch (error) {
        console.error("Error loading profile:", error);
      }
    };
    loadProfile();
  }, []);

  return (
    <div className="py-20">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h1 className="section-title">Get in Touch</h1>
          <p className="section-subtitle mx-auto">Have a project in mind? Let's work together to bring your ideas to life.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2"><div className="card p-8"><ContactForm /></div></div>

          <div className="space-y-6">
            <div className="card p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="text-orange-500 flex-shrink-0 mt-1" size={20} />
                  <div><p className="text-sm font-medium text-slate-900">Email</p><a href={`mailto:${profile.email || "olabodeolamide323@gmail.com"}`} className="text-gray-500 hover:text-orange-500 transition-colors">{profile.email || "olabodeolamide323@gmail.com"}</a></div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="text-orange-500 flex-shrink-0 mt-1" size={20} />
                  <div><p className="text-sm font-medium text-slate-900">Phone</p><a href={`tel:${profile.phone || "+2348126332866"}`} className="text-gray-500 hover:text-orange-500 transition-colors">{profile.phone || "+2348126332866"}</a></div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="text-orange-500 flex-shrink-0 mt-1" size={20} />
                  <div><p className="text-sm font-medium text-slate-900">Location</p><p className="text-gray-500">Remote / Global</p></div>
                </div>
              </div>
            </div>

            <div className="card p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Connect With Me</h3>
              <SocialIcons position="static" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;