/** @format */
import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import Header from "./Header";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { theme } = useTheme();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const showSidebar = theme.layout === "sidebar";

  // Define theme-based classes
  const getThemeClasses = () => {
    const isDark =
      theme.name === "dark" || theme.colors.background === "#1a1a1a";

    return {
      background: isDark ? "bg-gray-900" : "bg-gray-50",
      text: isDark ? "text-gray-100" : "text-gray-900",
      surface: isDark ? "bg-gray-800" : "bg-white",
      surfaceHover: isDark ? "hover:bg-gray-700" : "hover:bg-gray-100",
      accent: isDark
        ? "text-blue-400 hover:text-blue-300"
        : "text-blue-600 hover:text-blue-500",
      border: isDark ? "border-gray-700" : "border-gray-200",
      shadow: isDark
        ? "shadow-xl shadow-black/20"
        : "shadow-lg shadow-gray-200/50",
    };
  };

  const themeClasses = getThemeClasses();

  return (
    <div
      className={`min-h-screen flex flex-col ${themeClasses.background} ${themeClasses.text} transition-colors duration-300`}
    >
      {/* Header */}
      <Header toggleSidebar={() => setIsSidebarOpen((prev) => !prev)} />

      {/* Main content wrapper */}
      <div className="flex flex-1 pt-16 relative">
        {/* Sidebar backdrop for mobile */}
        {showSidebar && isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden transition-opacity duration-300"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Sidebar (only in sidebar layout) */}
        {showSidebar && (
          <aside
            className={`w-64 ${themeClasses.surface} ${themeClasses.shadow} 
              transition-all duration-300 ease-in-out transform
              ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
              fixed md:static z-40 h-full md:h-auto md:translate-x-0
              ${themeClasses.border} border-r`}
          >
            <nav className="p-6 space-y-6">
              <div className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Navigation
              </div>

              <ul className="space-y-2">
                <li
                  className={`group rounded-lg px-4 py-3 ${themeClasses.surfaceHover} 
                  transition-all duration-200 cursor-pointer border ${themeClasses.border}
                  hover:border-blue-500/50 hover:shadow-md`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 rounded-full bg-blue-500 group-hover:bg-blue-400 transition-colors"></div>
                    <span
                      className={`font-medium ${themeClasses.accent} transition-colors`}
                    >
                      Home
                    </span>
                  </div>
                </li>

                <li
                  className={`group rounded-lg px-4 py-3 ${themeClasses.surfaceHover} 
                  transition-all duration-200 cursor-pointer border ${themeClasses.border}
                  hover:border-purple-500/50 hover:shadow-md`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 rounded-full bg-purple-500 group-hover:bg-purple-400 transition-colors"></div>
                    <span
                      className={`font-medium ${themeClasses.accent} transition-colors`}
                    >
                      About
                    </span>
                  </div>
                </li>

                <li
                  className={`group rounded-lg px-4 py-3 ${themeClasses.surfaceHover} 
                  transition-all duration-200 cursor-pointer border ${themeClasses.border}
                  hover:border-green-500/50 hover:shadow-md`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 rounded-full bg-green-500 group-hover:bg-green-400 transition-colors"></div>
                    <span
                      className={`font-medium ${themeClasses.accent} transition-colors`}
                    >
                      Contact
                    </span>
                  </div>
                </li>
              </ul>

              {/* Decorative element */}
              <div className="mt-8 pt-6 border-t border-gray-300 dark:border-gray-600">
                <div className="flex items-center space-x-2 text-sm opacity-70">
                  <div className="w-1 h-1 rounded-full bg-current animate-pulse"></div>
                  <span>Dashboard</span>
                </div>
              </div>
            </nav>
          </aside>
        )}

        {/* Main content */}
        <main
          className={`flex-1 transition-all duration-300 ease-in-out
            ${showSidebar ? "md:ml-0" : ""} 
            ${isSidebarOpen && showSidebar ? "ml-0" : ""}`}
        >
          <div className="p-6 md:p-8 lg:p-10">
            <div
              className={`max-w-7xl mx-auto ${themeClasses.surface} 
              rounded-2xl ${themeClasses.shadow} p-6 md:p-8 
              border ${themeClasses.border} backdrop-blur-sm`}
            >
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
