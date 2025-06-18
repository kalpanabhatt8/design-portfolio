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

  const { theme, toggleTheme } = useTheme();

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
      <div className={`flex items-center z-20 ${theme === 'light' ? 'text-light-primary' : 'text-dark-primary'}`}>
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
                className="font-medium transition-all duration-700 h-[1.85rem] hover:tracking-wider cursor-pointer"
                style={{
                  fontSize: '1.5rem',
                  lineHeight: '1.1',
                  marginBottom:"0px",
                  letterSpacing: '0.5px',
                  
                }}
              >
                Kalpana Bhatt
              </h1>
              <span
                className={`text-xs italic transition-opacity duration-700 font-normal ${
                  fadeIn ? 'opacity-100' : 'opacity-0'
                } ${theme === 'light' ? 'text-light-secondary' : 'text-dark-secondary'}`}
              >
                {wittyLines[lineIndex]}
              </span>
            </div>

            <ul className="flex gap-8 text-secondary items-center">
              <li data-cursor-burst><NavLink to="/">Work</NavLink></li>
              <li data-cursor-burst><NavLink to="/">Design Lab</NavLink></li>
              <li data-cursor-burst><NavLink to="/">About</NavLink></li>
              <li data-cursor-burst><NavLink to="/">Resume</NavLink></li>
              <li data-cursor-burst>
                <button onClick={toggleTheme} className={`focus:outline-none border-[1px] p-2 rounded-lg theme-toggle ${theme === 'light' ? 'border-light-secondary' : 'border-dark-secondary'}`}>
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
