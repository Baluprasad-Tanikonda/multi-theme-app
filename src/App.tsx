/** @format */
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import Layout from "./components/Layout";
import Header from "./components/Header";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";

// Main App Content Component (inside Router)
const AppContent: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Get current page from location
  const getCurrentPage = (): "home" | "about" | "contact" => {
    const path = location.pathname;
    if (path === "/about") return "about";
    if (path === "/contact") return "contact";
    return "home";
  };

  // Handle navigation
  const handleNavigation = (page: "home" | "about" | "contact") => {
    const routes = {
      home: "/",
      about: "/about",
      contact: "/contact",
    };
    navigate(routes[page]);
    setIsSidebarOpen(false);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="min-h-screen">
      {/* Header with navigation */}
      <Header
        toggleSidebar={toggleSidebar}
        currentPage={getCurrentPage()}
        onNavigate={handleNavigation}
        isSidebarOpen={isSidebarOpen}
      />

      {/* Main Layout with Routes */}
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          {/* Catch-all route for 404 */}
          <Route
            path="*"
            element={
              <div className="text-center py-20">
                <h1 className="text-4xl font-bold text-gray-600 mb-4">404</h1>
                <p className="text-gray-500 mb-6">Page not found</p>
                <button
                  onClick={() => navigate("/")}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Go Home
                </button>
              </div>
            }
          />
        </Routes>
      </Layout>
    </div>
  );
};

// Main App Component
const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
};

export default App;
