
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const fonts = [
    { fontFamily: '"Cal Sans", sans-serif', fontSize: '1.5rem' },
    { fontFamily: '"Rock Salt", cursive', fontSize: '1.15rem' }, // visually large
    { fontFamily: '"Kaushan Script", cursive', fontSize: '1.5rem' },
    { fontFamily: '"Slackside One", cursive', fontSize: '1.45rem' },
    // { fontFamily: '"Linefont", cursive', fontSize: '1.45rem' },
    { fontFamily: '"Splash", cursive', fontSize: '1.5rem' },
    // { fontFamily: '"Silkscreen", sans-serif', fontSize: '1rem' }, 
];

const Header = () => {
  const [fontIndex, setFontIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    let fadeOutTimeout;
    let changeFontTimeout;

    fadeOutTimeout = setTimeout(() => {
      setFade(false);
    }, 900); // fade out after 1.2s

    changeFontTimeout = setTimeout(() => {
      const nextIndex = (fontIndex + 1) % fonts.length;
      setFontIndex(nextIndex);
      setFade(true);
    }, 900); // total duration per font

    // If it's the last font, add 2s pause before restarting
    if (fontIndex === fonts.length - 1) {
      changeFontTimeout = setTimeout(() => {
        setFontIndex(0);
        setFade(true);
      }, 900 + 2000); // 1.6s + 2s pause
    }

    return () => {
      clearTimeout(fadeOutTimeout);
      clearTimeout(changeFontTimeout);
    };
  }, [fontIndex]);

  const currentFont = fonts[fontIndex];

  return (
<>
    <nav className="flex justify-between py-5 px-8">
      <h1
        className={`font-bold transition-opacity  h-[1.85rem] 
        }`}
        style={{
          fontFamily: currentFont.fontFamily,
          fontSize: currentFont.fontSize,
          lineHeight: '1.1',
          letterSpacing: '0.5px'
        }}
      >
        Kalpana Bhatt
      </h1>

      <ul className="flex gap-8 text-[#5B5B5B]">
        <li><NavLink to="/">Work</NavLink></li>
        <li><NavLink to="/">Design Lab</NavLink></li>
        <li><NavLink to="/">About</NavLink></li>
        <li><NavLink to="/">Resume</NavLink></li>
      </ul>
    </nav>


  

</>
  );
};

export default Header;