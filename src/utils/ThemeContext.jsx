// src/utils/ThemeContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import texture from "../assets/grid-texture.png"
const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() =>
    localStorage.getItem("theme") || "dark"
  );

  useEffect(() => {
    const body = document.body;

    // Add transition class
    body.classList.add('theme-transition');

    // Set theme class and attributes
    body.classList.remove("light", "dark");
    body.classList.add(theme);
    body.setAttribute("data-theme", theme);

    // Set background
    body.style.backgroundImage = `url('${texture}')`;
    body.style.backgroundRepeat = "repeat";

    // Save theme to localStorage
    localStorage.setItem("theme", theme);

    // Remove transition class after animation
    const timeout = setTimeout(() => {
      body.classList.remove('theme-transition');
    }, 500);

    return () => clearTimeout(timeout);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);