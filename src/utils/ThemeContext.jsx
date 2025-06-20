// src/utils/ThemeContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import texture from "../assets/grid-texture.png"
const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() =>
    localStorage.getItem("theme") || "dark"
  );

  useEffect(() => {
    document.body.classList.remove("light", "dark");
    document.body.classList.add(theme);
    document.body.setAttribute("data-theme", theme);

    if (theme === "dark") {
      document.body.style.backgroundImage = "url('../assets/grid-texture.png')";
      document.body.style.backgroundRepeat = "repeat";
      // document.body.style.backgroundColor = "#030100";
    } else {
      document.body.style.backgroundImage = "url('../assets/grid-texture.png')";
      document.body.style.backgroundRepeat = "repeat";
      // document.body.style.backgroundColor = "#F9F9F9";
    }

    localStorage.setItem("theme", theme);
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