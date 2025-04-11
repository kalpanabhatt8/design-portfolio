import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import "./index.css";

function App() {
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [entered, setEntered] = useState(false);
  const textRef = useRef(null);

  const handleEnter = () => {
    if (entered) return;
    setEntered(true);
    const tl = gsap.timeline();

    // Fade out instruction
    tl.to(".enter-instruction", {
      opacity: 0,
      duration: 0.5,
      ease: "power2.out",
      onComplete: () => {
        // Fade in name and tagline
        gsap.fromTo(
          textRef.current,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 1.5, ease: "power3.out" }
        );
      },
    });
  };

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Enter") handleEnter();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [entered]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-screen h-screen bg-black text-white flex items-center justify-center relative overflow-hidden"
      onClick={handleEnter}
    >
      {/* Name Text After Enter */}
      {entered && (
        <div
          ref={textRef}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center opacity-0"
        >
          <h1 className="text-3xl md:text-5xl font-semibold mb-4">
            Kalpana Bhatt
          </h1>
          <p className="text-lg md:text-xl text-gray-300">
            Designing experiences, not just screens.
          </p>
        </div>
      )}

      {/* Responsive Instruction */}
      {!entered && (
        <p className="enter-instruction absolute text-sm text-gray-300 animate-pulse">
          {isMobile ? "Tap to enter" : "Press Enter to continue"}
        </p>
      )}
    </div>
  );
}

export default App;
