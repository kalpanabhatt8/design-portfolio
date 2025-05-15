import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';

const wittyLines = [
  "Yes, that’s my real name.",
  "Not Chawla. Bhatt.",
  "Yes, with two T’s."
];

const Header = () => {
  const [fadeIn, setFadeIn] = useState(false);
  const [lineIndex, setLineIndex] = useState(0);
  const timeoutRef = useRef(null);

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
      <div className='w-[100%] flex justify-center items-center absolute z-20'>
        <div className='container'>
          <nav className="flex justify-between py-5 px-8">
            <div
              className="flex flex-col"
              data-cursor-hide="true"
            >
              <h1
                onMouseOver={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                data-cursor-burst
                className="font-bold transition-all duration-700 h-[1.85rem] hover:tracking-wider cursor-pointer"
                style={{
                  fontFamily: '"Slackside One", cursive',
                  fontSize: '1.75rem',
                  lineHeight: '1.1',
                  letterSpacing: '0.5px',
                  zIndex: 567
                }}
              >
                Kalpana Bhatt
              </h1>
              <span
                className={`text-xs text-[#8a8a8a] italic mt-2 transition-opacity duration-700 font-normal ${
                  fadeIn ? 'opacity-100' : 'opacity-0'
                }`}
              >
                {wittyLines[lineIndex]}
              </span>
            </div>

            <ul className="flex gap-8 text-[#5B5B5B]">
              <li data-cursor-burst><NavLink to="/">Work</NavLink></li>
              <li data-cursor-burst><NavLink to="/">Design Lab</NavLink></li>
              <li data-cursor-burst><NavLink to="/">About</NavLink></li>
              <li data-cursor-burst><NavLink to="/">Resume</NavLink></li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Header;
