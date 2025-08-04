/** @format */
import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import type { ThemeType } from "../context/ThemeContext";

const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme, availableThemes } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const handleThemeChange = (themeId: ThemeType) => {
    setTheme(themeId);
    setIsOpen(false);
  };

  const getThemeIcon = (themeId: ThemeType) => {
    switch (themeId) {
      case "theme1":
        return "☀️";
      case "theme2":
        return "🌙";
      case "theme3":
        return "🌈";
      default:
        return "🎨";
    }
  };

  const getThemeClasses = () => {
    switch (theme.id) {
      case "theme1":
        return {
          dropdown: "bg-white border border-gray-300 shadow-lg rounded-lg",
          button:
            "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50",
          option: "hover:bg-blue-50 hover:text-blue-600",
          text: "text-gray-700",
          accent: "text-blue-600",
        };
      case "theme2":
        return {
          dropdown: "bg-gray-800 border border-gray-600 shadow-2xl rounded-lg",
          button:
            "bg-gray-800 border border-gray-600 text-gray-200 hover:bg-gray-700",
          option: "hover:bg-gray-700 hover:text-yellow-400",
          text: "text-gray-200",
          accent: "text-yellow-400",
        };
      case "theme3":
        return {
          dropdown: "bg-white border-2 border-purple-300 shadow-xl rounded-2xl",
          button:
            "bg-gradient-to-r from-pink-100 to-purple-100 border-2 border-purple-300 text-gray-700 hover:from-pink-200 hover:to-purple-200",
          option:
            "hover:bg-gradient-to-r hover:from-pink-50 hover:to-purple-50 hover:text-purple-600",
          text: "text-gray-700",
          accent: "text-purple-600",
        };
      default:
        return {
          dropdown: "bg-white border border-gray-300 shadow-lg rounded-lg",
          button:
            "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50",
          option: "hover:bg-gray-50",
          text: "text-gray-700",
          accent: "text-blue-600",
        };
    }
  };

  const themeClasses = getThemeClasses();

  const getDisplayName = (themeId: ThemeType) => {
    const themeObj = availableThemes[themeId];
    return themeObj?.name || themeId;
  };

  const getCurrentThemeDescription = () => {
    switch (theme.id) {
      case "theme1":
        return "Clean & Minimal";
      case "theme2":
        return "Dark & Professional";
      case "theme3":
        return "Colorful & Fun";
      default:
        return "Theme";
    }
  };

  return (
    <div className="relative">
      {/* Theme Switcher Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          ${themeClasses.button}
          px-4 py-2 rounded-lg transition-all duration-300 ease-in-out
          flex items-center space-x-2 min-w-[140px] justify-between
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
          transform hover:scale-105 active:scale-95
          ${theme.id === "theme3" ? "hover:rotate-1" : ""}
        `}
        aria-label="Switch theme"
        aria-expanded={isOpen}
      >
        <div className="flex items-center space-x-2">
          <span className="text-lg" role="img" aria-label="Theme icon">
            {getThemeIcon(theme.id)}
          </span>
          <span
            className={`font-medium text-sm ${themeClasses.text} hidden sm:inline`}
          >
            {theme.id === "theme3"
              ? getCurrentThemeDescription()
              : getDisplayName(theme.id)}
          </span>
        </div>

        <svg
          className={`w-4 h-4 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          } ${themeClasses.text}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown Content */}
          <div
            className={`
              absolute right-0 mt-2 w-64 ${themeClasses.dropdown}
              z-20 transform transition-all duration-200 ease-in-out
              ${isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95"}
            `}
          >
            <div className="p-2">
              <div
                className={`px-3 py-2 text-xs font-semibold ${themeClasses.text} opacity-75 uppercase tracking-wide`}
              >
                Choose Theme
              </div>

              {(Object.keys(availableThemes) as ThemeType[]).map((themeId) => {
                const isActive = theme.id === themeId;
                const themeObj = availableThemes[themeId];

                return (
                  <button
                    key={themeId}
                    onClick={() => handleThemeChange(themeId)}
                    className={`
                      w-full text-left px-3 py-3 rounded-lg transition-all duration-200
                      flex items-center space-x-3 group
                      ${
                        isActive
                          ? `${themeClasses.accent} bg-opacity-10 font-semibold`
                          : `${themeClasses.text} ${themeClasses.option}`
                      }
                      ${theme.id === "theme3" ? "hover:scale-105" : ""}
                    `}
                  >
                    <span
                      className="text-xl"
                      role="img"
                      aria-label={`${themeObj.name} icon`}
                    >
                      {getThemeIcon(themeId)}
                    </span>

                    <div className="flex-1">
                      <div
                        className={`font-medium ${
                          isActive ? themeClasses.accent : ""
                        }`}
                      >
                        {themeObj.name}
                      </div>
                      <div
                        className={`text-xs opacity-75 ${
                          themeId === "theme1"
                            ? "Clean & Minimal Design"
                            : themeId === "theme2"
                            ? "Professional Dark Mode"
                            : "Playful & Colorful UI"
                        }`}
                      >
                        {themeId === "theme1"
                          ? "Clean & Minimal Design"
                          : themeId === "theme2"
                          ? "Professional Dark Mode"
                          : "Playful & Colorful UI"}
                      </div>
                    </div>

                    {isActive && (
                      <div
                        className={`w-2 h-2 rounded-full ${themeClasses.accent.replace(
                          "text-",
                          "bg-"
                        )}`}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Theme Preview Section */}
            <div
              className={`border-t ${
                theme.id === "theme2" ? "border-gray-600" : "border-gray-200"
              } p-3`}
            >
              <div className="flex items-center justify-center space-x-2">
                <div className={`text-xs ${themeClasses.text} opacity-75`}>
                  Current: {getCurrentThemeDescription()}
                </div>
                {theme.id === "theme3" && (
                  <span className="animate-pulse">✨</span>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ThemeSwitcher;
