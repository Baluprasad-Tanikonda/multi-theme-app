/** @format */

import React from "react";
import { useTheme } from "../context/ThemeContext";

const About: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div
      className="p-6"
      style={{
        fontFamily: theme.fonts.primary,
        backgroundColor: theme.colors.background,
        color: theme.colors.text,
      }}
    >
      <h1 className="text-3xl font-bold mb-4">About Us</h1>
      <p className="mb-4">
        This is a demo of a React multi-theme switcher application. Based on
        your selected theme, colors, fonts, layout, and structure change
        dynamically.
      </p>
      <p>
        This app demonstrates Context API, localStorage persistence, dynamic
        layout switching, and more.
      </p>
    </div>
  );
};

export default About;
