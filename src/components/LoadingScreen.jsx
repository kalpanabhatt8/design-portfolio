import { useTheme } from '../utils/ThemeContext';
import gsap from 'gsap';
import React, { useEffect } from 'react';

const LoadingScreen = ({
  isLoading,
  setIsLoading,
  loaderRef,
  loaderLineRef,
  floatingRefs,
  dotRefs,
  statusRef,
  blurRef
}) => {
  const { theme } = useTheme();
  useEffect(() => {
    if (isLoading) {
      // Example animation logic from Home.jsx (assuming GSAP or similar)
      // This is placeholder for the original animation logic
      // Use the refs as in the original Home.jsx loading animation
      // For example:
      /*
      gsap.to(loaderLineRef.current, {
        duration: 2,
        width: '100%',
        onComplete: () => setIsLoading(false),
      });
      */


      // Original two-step progress bar animation
      const progressTimeline = gsap.timeline();
      progressTimeline.to(loaderLineRef.current, {
        width: "80%",
        duration: 0.8,
        ease: "power3.out"
      }).to(loaderLineRef.current, {
        width: "100%",
        duration: 5.2,
        ease: "power1.inOut"
      }, "+=0");

      setTimeout(() => {
        if (loaderRef.current) {
          const exitTimeline = gsap.timeline({
            onComplete: () => setIsLoading(false)
          });

          exitTimeline
            .to(loaderRef.current, {
              scale: 1.05,
              duration: 0.3,
              ease: "power1.out"
            })
            .to(loaderRef.current, {
              scale: 1.2,
              opacity: 0,
              duration: 0.6,
              ease: "power2.inOut"
            });
        } else {
          setIsLoading(false);
        }
      }, 3000);
    }
  }, [isLoading, loaderLineRef, setIsLoading, statusRef]);

  return (
    <div
      ref={loaderRef}
      className={`absolute inset-0 z-50 flex items-center justify-center h-screen w-full font-bricolage overflow-hidden transition-all duration-500 ease-in-out ${
        theme === 'dark'
          ? 'bg-gradient-to-br from-[#0a0a0a] to-[#1c1c1c] text-white'
          : 'bg-[radial-gradient(circle,_#ffffff,_#f0f3ff)] text-black'
      }`}
    >
      {/* <div className="absolute inset-0 z-0 pointer-events-none">
        {["const", "return", "{ }", "div", "<button>", "useState", "=>"].map((word, index) => (
          <span
            key={index}
            ref={(el) => (floatingRefs.current[index] = el)}
            className="absolute text-sm font-light text-light-accent opacity-30"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          >
            {word}
          </span>
        ))}
      </div> */}

      <div className="z-10 text-center">
        <div className="flex flex-row gap-1 justify-center items-center">
          <h1 className={`text-3xl sm:text-4xl font-semibold tracking-tight mb-4  ${
            theme === 'dark' ? 'text-dark-text' : 'text-light-text'
          }`}>
            Loading
          </h1>
          <div className="flex justify-center gap-1 mb-2 items-center">
            {[0, 1, 2].map((_, i) => (
              <span
                key={i}
                ref={(el) => (dotRefs.current[i] = el)}
                className={`inline-block w-1.5 h-1.5 bg-light-text rounded-full ${
                  theme === 'dark' ? 'bg-dark-text' : 'bg-light-text'
                }`}
              ></span>
            ))}
          </div>
        </div>
        <p
          className={`text-sm italic ${
            theme === 'dark' ? 'text-dark-accent' : 'text-light-neutral'
          }`}
          ref={statusRef}
        >
          (this might take longer if it’s Monday)
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;
