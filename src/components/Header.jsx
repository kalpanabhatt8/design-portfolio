import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import darkIcon from "../assets/dark-icon.svg"
import lightIcon from "../assets/light-icon.svg"
import { useTheme } from '../utils/ThemeContext';

const wittyLines = [
  "Yes, that’s my real name.",
  "Not Chawla. Bhatt.",
  "Yes, with two T’s."
];

const Header = () => {
  const [fadeIn, setFadeIn] = useState(false);
  const [lineIndex, setLineIndex] = useState(0);
  const timeoutRef = useRef(null);

  const { theme, toggleTheme, showQuickLoader } = useTheme();

  if (showQuickLoader) {
    return (
      <div className={`fixed inset-0 flex items-center justify-center z-[9999] transition-all duration-300 ${
        theme === 'dark' ? 'bg-[#030100] text-white' : 'bg-[#fdfdf8] text-black'
      }`}>
        <div className="text-center">
          <p className="text-lg font-medium mb-2">Applying theme...</p>
          <div className="w-32 h-1.5 bg-gray-300 overflow-hidden rounded-full">
            <div className="h-full bg-accent animate-pulse w-full"></div>
          </div>
        </div>
      </div>
    );
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeIn(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleMouseEnter = () => {
    if (!timeoutRef.current) {
      let current = 0;

      const cycle = () => {
        current += 1;
        setLineIndex(current);

        if (current < wittyLines.length - 1) {
          timeoutRef.current = setTimeout(cycle, 2000);
        } else {
          timeoutRef.current = setTimeout(() => {
            setLineIndex(0);
            timeoutRef.current = null;
          }, 2000);
        }
      };

      cycle();
    }
  };

  const handleMouseLeave = () => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = null;
    setLineIndex(0);
  };

  return (
    <>
      <div className={`w-full flex justify-center items-center absolute z-20 ${theme === "dark" ? "text-dark-text" : "text-light-text"
        }`}>
        <div className='container'>
          <nav className="flex justify-between py-5">
            <div
              className="flex flex-col"
              data-cursor-hide="true"
            >
              <h1
                onMouseOver={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                data-cursor-burst
                className="font-medium h-[1.85rem] hover:tracking-wider cursor-pointer border-1 border-"
                style={{
                  fontSize: '1.5rem',
                  marginBottom: "0px",
                  letterSpacing: '0.5px',
                  zIndex: 567
                }}
              >
                Prashant Singh
              </h1>
              <div className="absolute top-12 w-full z-20">
                <span
                  className={`text-xs text-[#8a8a8a] italic transition-opacity duration-700 font-normal ${fadeIn ? 'opacity-100' : 'opacity-0'
                    }`}
                >
                  {wittyLines[lineIndex]}
                </span>
              </div>
            </div>

            <ul className={`flex gap-8 items-center ${theme === "dark" ? "text-dark-text" : "text-light-text"
              }`}>
              <li data-cursor-burst>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? 'text-accent font-medium' : 'opacity-70 hover:opacity-100'
                  }
                >
                  Work
                </NavLink>
              </li>
              <li data-cursor-burst>
                <NavLink
                  to="/design-lab"
                  className={({ isActive }) =>
                    isActive ? 'text-accent font-medium' : 'opacity-70 hover:opacity-100'
                  }
                >
                  Design Lab
                </NavLink>
              </li>
              <li data-cursor-burst>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    isActive ? 'text-accent font-medium' : 'opacity-70 hover:opacity-100'
                  }
                >
                  About
                </NavLink>
              </li>
              <li data-cursor-burst>
                <NavLink
                  to="/resume"
                  className={({ isActive }) =>
                    isActive ? 'text-accent font-medium' : 'opacity-70 hover:opacity-100'
                  }
                >
                  Resume
                </NavLink>
              </li>
              <li data-cursor-burst>
                <button onClick={toggleTheme} className={`focus:outline-none border-[1px] border-[#b6b6b6] p-2 rounded-lg theme-toggle`}>
                  <img src={theme === 'light' ? lightIcon : darkIcon} alt="Toggle Theme" className="w-4 " />
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Header;
