/** @format */
import React from "react";
import { useNavigate } from "react-router-dom";
import ThemeSwitcher from "./ThemeSwitcher";
import { useTheme } from "../context/ThemeContext";

interface HeaderProps {
  toggleSidebar?: () => void;
  currentPage?: "home" | "about" | "contact";
  onNavigate?: (page: "home" | "about" | "contact") => void;
  isSidebarOpen?: boolean;
  setIsSidebarOpen?: (open: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({
  toggleSidebar,
  currentPage = "home",
  onNavigate,
  setIsSidebarOpen,
}) => {
  const { theme } = useTheme();
  const navigate = useNavigate();

  const getThemeClasses = () => {
    switch (theme.id) {
      case "theme1":
        return {
          header: "bg-white shadow-md border-b border-gray-200",
          text: "text-gray-800",
          button:
            "text-gray-600 hover:text-blue-600 transition-colors duration-200",
          activeButton:
            "text-blue-600 font-semibold border-b-2 border-blue-600",
          logo: "bg-blue-100 text-blue-600",
          hamburger: "text-gray-700 hover:text-gray-900",
        };
      case "theme2":
        return {
          header: "bg-gray-900 shadow-xl border-b border-gray-700",
          text: "text-white",
          button:
            "text-gray-300 hover:text-yellow-400 transition-colors duration-200 font-serif",
          activeButton:
            "text-yellow-400 font-bold border-b-2 border-yellow-400 font-serif",
          logo: "bg-yellow-600 text-gray-900",
          hamburger: "text-gray-200 hover:text-white",
        };
      case "theme3":
        return {
          header:
            "bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 shadow-lg",
          text: "text-white",
          button:
            "text-white/90 hover:text-white hover:scale-105 transition-all duration-300 font-medium",
          activeButton:
            "text-white font-bold bg-white/20 rounded-full px-3 py-1 scale-105",
          logo: "bg-white text-purple-600",
          hamburger: "text-white hover:text-pink-200",
        };
      default:
        return {
          header: "bg-white shadow-md",
          text: "text-gray-800",
          button: "text-gray-600 hover:text-blue-600",
          activeButton: "text-blue-600 font-semibold",
          logo: "bg-gray-300",
          hamburger: "text-gray-700",
        };
    }
  };

  const themeClasses = getThemeClasses();

  const handleNavigation = (page: "home" | "about" | "contact") => {
    const routes = {
      home: "/",
      about: "/about",
      contact: "/contact",
    };

    if (onNavigate) {
      onNavigate(page);
    } else {
      navigate(routes[page]);
    }

    if (setIsSidebarOpen) {
      setIsSidebarOpen(false);
    }
  };

  const getAppTitle = () => {
    switch (theme.id) {
      case "theme1":
        return "Multi-Theme App";
      case "theme2":
        return "PROFESSIONAL SUITE";
      case "theme3":
        return "🌈 Fun App 🌈";
      default:
        return "Multi-Theme App";
    }
  };

  const getAppTitleClasses = () => {
    switch (theme.id) {
      case "theme1":
        return "text-xl font-semibold";
      case "theme2":
        return "text-xl font-bold font-serif tracking-wider";
      case "theme3":
        return "text-xl font-bold font-['Pacifico',cursive]";
      default:
        return "text-xl font-bold";
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full h-16 ${themeClasses.header} px-4 md:px-6 flex items-center justify-between z-50 transition-all duration-300`}
    >
      {/* Left - Logo & Sidebar Toggle */}
      <div className="flex items-center space-x-4">
        {theme.layout === "sidebar" && toggleSidebar && (
          <button
            onClick={toggleSidebar}
            className={`${themeClasses.hamburger} focus:outline-none hover:scale-110 transition-transform duration-200 md:hidden`}
            aria-label="Toggle sidebar"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        )}

        <div className="flex items-center space-x-3">
          <div
            className={`w-8 h-8 ${themeClasses.logo} rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300`}
          >
            {theme.id === "theme3" ? "🎨" : "MT"}
          </div>
          <span
            className={`${getAppTitleClasses()} ${
              themeClasses.text
            } transition-all duration-300`}
          >
            {getAppTitle()}
          </span>
        </div>
      </div>

      {/* Center - Desktop Navigation */}
      <nav
        className={`hidden md:flex items-center space-x-6 ${
          theme.layout === "sidebar" ? "lg:flex" : "md:flex"
        }`}
      >
        {["home", "about", "contact"].map((page) => (
          <button
            key={page}
            onClick={() =>
              handleNavigation(page as "home" | "about" | "contact")
            }
            className={`px-3 py-2 rounded-md transition-all duration-200 ${
              currentPage === page
                ? themeClasses.activeButton
                : themeClasses.button
            }`}
          >
            {theme.id === "theme3" && page === "home"
              ? "🏠 Home"
              : theme.id === "theme3" && page === "about"
              ? "👋 About"
              : theme.id === "theme3" && page === "contact"
              ? "📞 Contact"
              : page.charAt(0).toUpperCase() + page.slice(1)}
          </button>
        ))}
      </nav>

      {/* Mobile Navigation - Dropdown */}
      {theme.layout !== "sidebar" && (
        <div className="md:hidden">
          <details className="relative">
            <summary
              className={`${themeClasses.button} cursor-pointer list-none`}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </summary>
            <div
              className={`absolute right-0 mt-2 w-48 ${themeClasses.header} rounded-lg shadow-lg border py-2 z-50`}
            >
              {["home", "about", "contact"].map((page) => (
                <button
                  key={page}
                  onClick={() =>
                    handleNavigation(page as "home" | "about" | "contact")
                  }
                  className={`w-full text-left px-4 py-2 ${themeClasses.button} hover:bg-gray-100 dark:hover:bg-gray-800`}
                >
                  {theme.id === "theme3" && page === "home"
                    ? "🏠 Home"
                    : theme.id === "theme3" && page === "about"
                    ? "👋 About"
                    : theme.id === "theme3" && page === "contact"
                    ? "📞 Contact"
                    : page.charAt(0).toUpperCase() + page.slice(1)}
                </button>
              ))}
            </div>
          </details>
        </div>
      )}

      {/* Right - Theme Switcher */}
      <ThemeSwitcher />
    </header>
  );
};

export default Header;
