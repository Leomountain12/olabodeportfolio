

// import { Routes, Route } from "react-router-dom";
// import Layout from "./layouts/Layout";
// import HomePage from "./pages/HomePage";
// import AboutPage from "./pages/AboutPage";
// import ProjectsPage from "./pages/ProjectsPage";
// import ProjectDetailPage from "./pages/ProjectDetailPage";
// import ContactPage from "./pages/ContactPage";
// import AdminUpload from "./components/AdminUpload";

// function App() {
//   return (
//     <>
//       <Routes>
//         <Route path="/" element={<Layout />}>
//           <Route index element={<HomePage />} />
//           <Route path="about" element={<AboutPage />} />
//           <Route path="projects" element={<ProjectsPage />} />
//           <Route path="projects/:id" element={<ProjectDetailPage />} />
//           <Route path="contact" element={<ContactPage />} />
//         </Route>
//       </Routes>
//       <AdminUpload />
//     </>
//   );
// }

// export default App;
// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ProjectsPage from "./pages/ProjectsPage";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import ContactPage from "./pages/ContactPage";
import AdminUpload from "./components/AdminUpload";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="projects/:id" element={<ProjectDetailPage />} />
          <Route path="contact" element={<ContactPage />} />
        </Route>
      </Routes>
      <AdminUpload />
    </>
  );
}

export default App;