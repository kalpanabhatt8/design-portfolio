import { Link } from "react-router-dom";
import { useLayoutEffect, useRef, useState, useEffect } from "react";
import gsap from "gsap";
import thumbnailURL from "../assets/shreyaji.png";
import ytIcon from "../assets/youtube-color-icon.svg";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showText, setShowText] = useState(false);
  const ytIconRef = useRef(null);
  const vibeRef = useRef(null);
  const textRef = useRef([]);
  const orbitRef = useRef(null);

  const sentence =
    "I’m Kalpana Bhatt — daughter of a supermom, shaped by equations, powered by lo-fi beats, now designing clarity out of chaos. I turn half-baked ideas into elegant, scalable interfaces that just make sense.";
  const words = sentence.split(" ");

  useLayoutEffect(() => {
    if (!isLoading) {
      const ctx = gsap.context(() => {
        gsap.from(vibeRef.current, {
          opacity: 0,
          y: 20,
          duration: 1,
          ease: "power3.out",
        });

        gsap.set(textRef.current, { opacity: 0, y: 20 });

        gsap.to(textRef.current, {
          opacity: 1,
          y: 0,
          stagger: 0.035,
          duration: 0.6,
          ease: "power3.out",
          delay: 0.4,
        });

        gsap.set(ytIconRef.current, { opacity: 0, scale: 0.8 });
      });

      return () => ctx.revert();
    }
  }, [isLoading]);

  const handleIconHover = (show) => {
    gsap.to(ytIconRef.current, {
      opacity: show ? 1 : 0,
      scale: show ? 1 : 0.8,
      ease: "power3.out",
      duration: 0.3,
    });
  };

  useEffect(() => {
    const orbitAnim = gsap.to(orbitRef.current, {
      rotate: 360,
      repeat: -1,
      ease: "linear",
      duration: 3,
    });

    const textTimer = setTimeout(() => setShowText(true), 3000);
    const loaderTimer = setTimeout(() => setIsLoading(false), 5000);

    return () => {
      orbitAnim.kill();
      clearTimeout(textTimer);
      clearTimeout(loaderTimer);
    };
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-white text-center font-body">
        <div className="relative w-12 h-12 mb-6">
          <div
            className="absolute w-2 h-2 bg-orange-400 rounded-full top-0 left-1/2 transform -translate-x-1/2"
            ref={orbitRef}
            style={{ transformOrigin: "center 150%" }}
          ></div>
        </div>

        {showText && (
          <>
            <h1 className="text-3xl sm:text-4xl font-heading font-semibold text-white tracking-tight mt-2">
              Loading creativity
            </h1>
            <p className="text-md sm:text-lg text-orange-300 italic mt-2">
              (this might take longer if it’s Monday)
            </p>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center flex-col gap-[1.5rem] h-[100vh] relative overflow-hidden z-0">
      {/* Music Player */}
      <Link
        to="https://www.youtube.com/watch?v=9pIP8fWEUzo"
        className="flex gap-1 justify-center items-center w-fit relative z-10 cursor-hover"
        onMouseEnter={() => handleIconHover(true)}
        onMouseLeave={() => handleIconHover(false)}
        ref={vibeRef}
      >
        <div className="w-7 h-7 mr-1 rounded-full overflow-hidden">
          <img
            src={thumbnailURL}
            alt="Now Playing"
            className="w-full h-full object-cover animate-spin-slow"
          />
        </div>
        <p className="text-[0.75rem] text-black">bairiyaa</p>
        <p className="text-[0.75rem] text-[#969696]">· current vibe</p>
        <img
          ref={ytIconRef}
          src={ytIcon}
          alt="YouTube"
          className="w-4 absolute -right-6 opacity-0 pointer-events-none"
        />
      </Link>

      {/* Hero Text */}
      <h1
        data-cursor-hide="true"
        className="text-lg text-center w-full sm:w-[90vw] md:w-[70vw] lg:w-[50vw] leading-normal flex flex-wrap justify-center gap-x-1 z-10"
      >
        {words.map((word, i) => (
          <span
            key={i}
            ref={(el) => (textRef.current[i] = el)}
            className={`transition-colors duration-200 ${["supermom", "equations", "lo-fi", "chaos", "half-baked"].some((w) =>
              word.toLowerCase().includes(w)
            )
              ? "text-[#969696] hover:text-[#FF800A] cursor-pointer"
              : "text-black"
            }`}
          >
            {word}
          </span>
        ))}
      </h1>
    </div>
  );
};

export default Home;
