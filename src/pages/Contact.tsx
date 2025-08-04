/** @format */

import React from "react";
import { useTheme } from "../context/ThemeContext";

const Contact: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div
      className="min-h-screen px-6 py-10 md:py-16 flex flex-col items-center"
      style={{
        fontFamily: theme.fonts.primary,
        backgroundColor: theme.colors.background,
        color: theme.colors.text,
      }}
    >
      <h1 className="text-4xl font-bold mb-6 text-center">Contact Us</h1>
      <p className="text-lg mb-8 text-center max-w-xl">
        Have a question or want to work together? Drop us a message and we’ll
        get back to you shortly.
      </p>

      <form
        className="w-full max-w-2xl space-y-5 bg-white shadow-lg rounded-xl p-6"
        style={{
          backgroundColor: theme.colors.surface,
          boxShadow: "0 4px 14px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div className="flex flex-col space-y-2">
          <label htmlFor="name" className="font-semibold">
            Name
          </label>
          <input
            type="text"
            id="name"
            placeholder="Your full name"
            className="p-3 rounded border focus:outline-none focus:ring-2"
            style={{
              backgroundColor: theme.colors.background,
              color: theme.colors.text,
              borderColor: theme.colors.accent,
            }}
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label htmlFor="email" className="font-semibold">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="you@example.com"
            className="p-3 rounded border focus:outline-none focus:ring-2"
            style={{
              backgroundColor: theme.colors.background,
              color: theme.colors.text,
              borderColor: theme.colors.accent,
            }}
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label htmlFor="message" className="font-semibold">
            Message
          </label>
          <textarea
            id="message"
            placeholder="Your message..."
            rows={5}
            className="p-3 rounded border focus:outline-none focus:ring-2"
            style={{
              backgroundColor: theme.colors.background,
              color: theme.colors.text,
              borderColor: theme.colors.accent,
            }}
          />
        </div>

        <button
          type="submit"
          className="px-6 py-3 text-white font-semibold rounded-lg shadow transition duration-300 hover:scale-105"
          style={{
            backgroundColor: theme.colors.primary,
          }}
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default Contact;
