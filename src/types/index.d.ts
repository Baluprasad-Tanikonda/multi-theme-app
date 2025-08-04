/** @format */

// Valid theme identifiers
export type ThemeType = "theme1" | "theme2" | "theme3";

// Layout types
export type LayoutType = "default" | "sidebar" | "grid";

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
    primary: string; // e.g., "Helvetica, sans-serif"
    secondary: string; // e.g., "Courier, monospace"
  };

  layout: LayoutType;

  spacing?: {
    padding: string; // e.g., "1rem"
    margin: string; // e.g., "0.5rem"
    borderRadius: string; // e.g., "8px"
  };

  transition?: {
    duration: string; // e.g., "0.3s"
    easing: string; // e.g., "ease-in-out"
  };
}
