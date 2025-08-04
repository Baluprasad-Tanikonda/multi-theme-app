/** @format */
import React, { createContext, useContext, useState, useEffect } from "react";

// Define valid theme IDs
export type ThemeType = "theme1" | "theme2" | "theme3";

// Define the shape of a theme
export interface Theme {
  name: string;
  id: ThemeType;
  colors: {
    primary: string;
    secondary: string;
    background: string;
    surface: string;
    text: string;
    accent: string;
  };
  fonts: {
    primary: string;
    secondary: string;
  };
  layout: "default" | "sidebar";
}

// Default themes configuration
const defaultThemes: Record<ThemeType, Theme> = {
  theme1: {
    name: "Minimalist",
    id: "theme1",
    colors: {
      primary: "#3b82f6",
      secondary: "#64748b",
      background: "#ffffff",
      surface: "#f8fafc",
      text: "#1e293b",
      accent: "#2563eb",
    },
    fonts: {
      primary: "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
      secondary: "Inter, sans-serif",
    },
    layout: "default",
  },
  theme2: {
    name: "Dark Professional",
    id: "theme2",
    colors: {
      primary: "#fbbf24",
      secondary: "#6b7280",
      background: "#111827",
      surface: "#1f2937",
      text: "#f9fafb",
      accent: "#f59e0b",
    },
    fonts: {
      primary: "Georgia, 'Times New Roman', serif",
      secondary: "Georgia, serif",
    },
    layout: "sidebar",
  },
  theme3: {
    name: "Colorful Playful",
    id: "theme3",
    colors: {
      primary: "#ec4899",
      secondary: "#8b5cf6",
      background: "#fdf2f8",
      surface: "#ffffff",
      text: "#374151",
      accent: "#a855f7",
    },
    fonts: {
      primary: "'Pacifico', cursive, sans-serif",
      secondary: "'Poppins', sans-serif",
    },
    layout: "default",
  },
};

// Define context value type
interface ThemeContextType {
  theme: Theme;
  setTheme: (id: ThemeType) => void;
  availableThemes: Record<ThemeType, Theme>;
}

// Create context with proper default value
export const ThemeContext = createContext<ThemeContextType>({
  theme: defaultThemes.theme1,
  setTheme: () => {},
  availableThemes: defaultThemes,
});

// Custom hook to use theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

// Theme Provider component
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setThemeState] = useState<Theme>(defaultThemes.theme1);
  const [isLoading, setIsLoading] = useState(true);

  // Load theme from localStorage on mount
  useEffect(() => {
    try {
      const storedTheme = localStorage.getItem("selectedTheme") as ThemeType;
      if (storedTheme && defaultThemes[storedTheme]) {
        setThemeState(defaultThemes[storedTheme]);
      }
    } catch (error) {
      console.warn("Failed to load theme from localStorage:", error);
      // Fallback to default theme
      setThemeState(defaultThemes.theme1);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save theme to localStorage when changed
  const setTheme = (id: ThemeType) => {
    try {
      if (defaultThemes[id]) {
        localStorage.setItem("selectedTheme", id);
        setThemeState(defaultThemes[id]);
      } else {
        console.error(`Theme "${id}" not found`);
      }
    } catch (error) {
      console.warn("Failed to save theme to localStorage:", error);
      // Still update the theme even if localStorage fails
      if (defaultThemes[id]) {
        setThemeState(defaultThemes[id]);
      }
    }
  };

  // Apply theme styles to document root
  useEffect(() => {
    if (!isLoading) {
      const root = document.documentElement;

      // Set CSS custom properties for theme colors
      root.style.setProperty("--color-primary", theme.colors.primary);
      root.style.setProperty("--color-secondary", theme.colors.secondary);
      root.style.setProperty("--color-background", theme.colors.background);
      root.style.setProperty("--color-surface", theme.colors.surface);
      root.style.setProperty("--color-text", theme.colors.text);
      root.style.setProperty("--color-accent", theme.colors.accent);

      // Set font family
      root.style.setProperty("--font-primary", theme.fonts.primary);
      root.style.setProperty("--font-secondary", theme.fonts.secondary);

      // Add theme class to body for CSS targeting
      document.body.className = `theme-${theme.id}`;
    }
  }, [theme, isLoading]);

  // Show loading state or render children
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        availableThemes: defaultThemes,
      }}
    >
      <div
        style={{
          fontFamily: theme.fonts.primary,
          backgroundColor: theme.colors.background,
          color: theme.colors.text,
          minHeight: "100vh",
          transition: "all 0.3s ease-in-out",
        }}
        className={`theme-${theme.id}`}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
};
