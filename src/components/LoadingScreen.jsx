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
  blurRef,
  theme,
}) => {
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

      // Additional timeout logic from Home.jsx
      setTimeout(() => {
        if (statusRef.current) {
          statusRef.current.textContent = "(this might take longer if it’s Monday)";
        }
      }, 0);

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
      }, 6000);

      setTimeout(() => {
        if (statusRef.current) {
          const loadingStatuses = ["debugging...", "hydrating code...", "calming dev anxiety..."];
          const msg = loadingStatuses[Math.floor(Math.random() * loadingStatuses.length)];
          gsap.to(statusRef.current, {
            opacity: 0,
            duration: 0.2,
            onComplete: () => {
              statusRef.current.textContent = msg;
              gsap.to(statusRef.current, {
                opacity: 1,
                duration: 0.4,
                ease: "power2.out",
              });
              gsap.fromTo(
                statusRef.current,
                { scale: 1.05, rotation: 1 },
                {
                  scale: 1,
                  rotation: 0,
                  duration: 0.6,
                  ease: "back.out(1.7)",
                }
              );
            },
          });
        }
      }, 5000);
    }
  }, [isLoading, loaderLineRef, setIsLoading, statusRef]);

  return (
    <div
      ref={loaderRef}
      className="absolute inset-0 z-50 flex items-center justify-center h-screen w-full bg-[#fdfdf8] text-black font-bricolage overflow-hidden transition-all duration-500 ease-in-out"
    >
      <div className="absolute inset-0 z-0 pointer-events-none">
        {["const", "return", "{ }", "div", "<button>", "useState", "=>"].map((word, index) => (
          <span
            key={index}
            ref={(el) => (floatingRefs.current[index] = el)}
            className="absolute text-sm text-[#c2c2c2] opacity-10"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          >
            {word}
          </span>
        ))}
      </div>

      <div
        ref={blurRef}
        className="transform absolute w-[600px] h-[600px] bg-gradient-to-tr from-[#ffeede] via-transparent to-[#fdfdf8] rounded-full opacity-30 animate-pulse blur-3xl z-0"
      />

      <div className="absolute top-4 right-4 z-50">
        <button
          onClick={() => alert("Settings coming soon!")}
          className={`w-8 h-8 flex items-center justify-center rounded-md border ${
            theme === 'dark' ? 'border-white text-white' : 'border-black text-black'
          } hover:opacity-80 transition-opacity duration-300`}
        >
          ⚙️
        </button>
      </div>

      <div className="z-10 text-center">
        <div className="flex flex-row gap-1 justify-center items-center">
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-4 text-light-text">
            Loading
          </h1>
          <div className="flex justify-center gap-1 mb-2 items-center">
            {[0, 1, 2].map((_, i) => (
              <span
                key={i}
                ref={(el) => (dotRefs.current[i] = el)}
                className="inline-block w-1.5 h-1.5 bg-light-text rounded-full"
              ></span>
            ))}
          </div>
        </div>
        <p className="text-sm italic text-[#e85a00]" ref={statusRef}>
          (this might take longer if it’s Monday)
        </p>
      </div>
      <div className="absolute bottom-[80px] flex justify-center w-full z-50 ">
        <div className="w-[120px] h-1.5 rounded-full overflow-hidden bg-[#f5f1ea] border border-[#e85a00]/40 shadow-inner shadow-[#FF800A]/20">
          <div
            ref={loaderLineRef}
            className="h-full rounded-full"
            style={{
              width: "0%",
              background: "linear-gradient(to right, #ff6a00, #ffc285)",
              boxShadow: "0 0 12px #e85a00",
              transition: "width 0.2s ease-in-out",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
