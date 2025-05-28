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
    }
  }, [isLoading, loaderLineRef, setIsLoading]);

  return (
    <div ref={loaderRef} className="loader">
      <div ref={loaderLineRef} className="loader-line"></div>
      <div className="floating-elements">
        {floatingRefs.map((ref, idx) => (
          <div key={idx} ref={ref} className="floating"></div>
        ))}
      </div>
      <div className="dots">
        {dotRefs.map((ref, idx) => (
          <div key={idx} ref={ref} className="dot"></div>
        ))}
      </div>
      <div ref={statusRef} className="status-text">
        Loading...
      </div>
      <div ref={blurRef} className="blur-background"></div>
    </div>
  );
};

export default LoadingScreen;
