/** @format */
import React from "react";
import { useTheme } from "../context/ThemeContext";

type CardProps = {
  title: string;
  description: string;
  imageUrl?: string;
  price?: number;
  category?: string;
  onClick?: () => void;
};

const Card: React.FC<CardProps> = ({
  title,
  description,
  imageUrl,
  price,
  category,
  onClick,
}) => {
  const { theme } = useTheme();

  // Theme 1: Minimalist layout with light background, simple sans-serif font
  const theme1Classes = `
    bg-white hover:bg-gray-50 border border-gray-200 hover:border-gray-300
    shadow-sm hover:shadow-md p-6 rounded-lg transition-all duration-300
    font-sans text-gray-800 max-w-sm mx-auto
    hover:transform hover:-translate-y-1
  `;

  // Theme 2: Dark mode with sidebar layout, bold serif font
  const theme2Classes = `
    bg-gray-800 hover:bg-gray-700 border border-gray-600 hover:border-gray-500
    shadow-lg hover:shadow-xl p-8 rounded-xl transition-all duration-300
    font-serif text-gray-100 max-w-md mx-auto
    hover:transform hover:scale-105 backdrop-blur-sm
    bg-opacity-90 hover:bg-opacity-100
  `;

  // Theme 3: Colorful theme with card-based grid layout, playful Google Font
  const theme3Classes = `
    bg-gradient-to-br from-pink-100 via-purple-50 to-indigo-100
    hover:from-pink-200 hover:via-purple-100 hover:to-indigo-200
    border-2 border-transparent hover:border-purple-300
    shadow-lg hover:shadow-2xl p-6 rounded-3xl transition-all duration-500
    text-gray-700 max-w-sm mx-auto transform hover:rotate-1
    hover:scale-105 relative overflow-hidden
  `;

  const getThemeClasses = () => {
    switch (theme.name) {
      case "theme1":
      case "minimalist":
      default:
        return theme1Classes;
      case "theme2":
      case "dark":
        return theme2Classes;
      case "theme3":
      case "colorful":
        return theme3Classes;
    }
  };

  const getTitleClasses = () => {
    switch (theme.name) {
      case "theme1":
      case "minimalist":
      default:
        return "font-semibold text-lg mb-3 text-gray-900 line-clamp-2";
      case "theme2":
      case "dark":
        return "font-bold text-xl mb-4 text-white font-serif tracking-wide";
      case "theme3":
      case "colorful":
        return "font-bold text-xl mb-3 text-transparent bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text font-['Pacifico',cursive] leading-relaxed";
    }
  };

  const getDescriptionClasses = () => {
    switch (theme.name) {
      case "theme1":
      case "minimalist":
      default:
        return "text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3";
      case "theme2":
      case "dark":
        return "text-gray-300 text-base leading-relaxed mb-6 font-serif italic";
      case "theme3":
      case "colorful":
        return "text-gray-700 text-sm leading-relaxed mb-4 font-medium line-clamp-3";
    }
  };

  const getPriceClasses = () => {
    switch (theme.name) {
      case "theme1":
      case "minimalist":
      default:
        return "text-lg font-bold text-blue-600 mb-2";
      case "theme2":
      case "dark":
        return "text-xl font-bold text-yellow-400 mb-3 font-serif";
      case "theme3":
      case "colorful":
        return "text-lg font-bold text-purple-600 mb-2 font-['Pacifico',cursive]";
    }
  };

  const getCategoryClasses = () => {
    switch (theme.name) {
      case "theme1":
      case "minimalist":
      default:
        return "inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded uppercase tracking-wide mb-3";
      case "theme2":
      case "dark":
        return "inline-block px-3 py-1 bg-gray-700 text-gray-300 text-sm rounded-full font-serif mb-4";
      case "theme3":
      case "colorful":
        return "inline-block px-3 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs rounded-full font-bold uppercase tracking-wide mb-3 shadow-md";
    }
  };

  const getImageClasses = () => {
    switch (theme.name) {
      case "theme1":
      case "minimalist":
      default:
        return "w-full h-40 object-cover rounded-md mb-4";
      case "theme2":
      case "dark":
        return "w-full h-48 object-cover rounded-lg mb-6 filter brightness-90";
      case "theme3":
      case "colorful":
        return "w-full h-44 object-cover rounded-2xl mb-4 filter brightness-110 contrast-110";
    }
  };

  // Theme 3 specific decorative elements
  const getDecorativeElements = () => {
    if (theme.name === "theme3" || theme.name === "colorful") {
      return (
        <>
          <div className="absolute top-2 right-2 w-6 h-6 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full opacity-70"></div>
          <div className="absolute bottom-2 left-2 w-4 h-4 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-60"></div>
          <div className="absolute top-1/2 left-1 w-2 h-2 bg-gradient-to-br from-green-400 to-blue-500 rounded-full opacity-50"></div>
        </>
      );
    }
    return null;
  };

  return (
    <div className={`cursor-pointer ${getThemeClasses()}`} onClick={onClick}>
      {getDecorativeElements()}

      {imageUrl && (
        <img
          src={imageUrl}
          alt={title}
          className={getImageClasses()}
          loading="lazy"
        />
      )}

      {category && <span className={getCategoryClasses()}>{category}</span>}

      <h2 className={getTitleClasses()}>{title}</h2>

      <p className={getDescriptionClasses()}>{description}</p>

      {price && <div className={getPriceClasses()}>${price.toFixed(2)}</div>}

      {/* Theme-specific action buttons */}
      {theme.name === "theme1" || theme.name === "minimalist" ? (
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition-colors duration-200 text-sm font-medium">
          View Details
        </button>
      ) : theme.name === "theme2" || theme.name === "dark" ? (
        <button className="w-full bg-yellow-600 hover:bg-yellow-500 text-gray-900 py-3 px-6 rounded-lg transition-all duration-200 font-serif font-bold tracking-wide hover:shadow-lg">
          EXPLORE
        </button>
      ) : (
        <button className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white py-3 px-6 rounded-full transition-all duration-300 font-bold shadow-lg hover:shadow-xl transform hover:scale-105">
          ✨ Discover More ✨
        </button>
      )}
    </div>
  );
};

export default Card;
