import { Link } from "react-router-dom";
import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import thumbnailURL from "../assets/shreyaji.png";
import ytIcon from "../assets/youtube-color-icon.svg";
import CustomCursor from "./CustomCursor";

const Home = () => {
  const [hovered, setHovered] = useState(null);
  const ytIconRef = useRef(null);
  const vibeRef = useRef(null);
  const textRef = useRef([]);

  const sentence =
    "I’m Kalpana Bhatt — daughter of a supermom, shaped by equations, powered by lo-fi beats, now designing clarity out of chaos. I turn half-baked ideas into elegant, scalable interfaces that just make sense.";
  const words = sentence.split(" ");

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Animate music bar
      gsap.from(vibeRef.current, {
        opacity: 0,
        y: 20,
        duration: 1,
        ease: "power3.out",
      });

      // Animate hero text words
      gsap.set(textRef.current, { opacity: 0, y: 20 });

      gsap.to(textRef.current, {
        opacity: 1,
        y: 0,
        stagger: 0.035,
        duration: 0.6,
        ease: "power3.out",
        delay: 0.4,
      });

      // Prepare YouTube icon
      gsap.set(ytIconRef.current, { opacity: 0, scale: 0.8 });
    });

    return () => ctx.revert();
  }, []);

  const handleIconHover = (show) => {
    gsap.to(ytIconRef.current, {
      opacity: show ? 1 : 0,
      scale: show ? 1 : 0.8,
      ease: "power3.out",
      duration: 0.3,
    });
  };

  return (
    <>
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
        <h1 className="text-lg text-center w-full sm:w-[90vw] md:w-[70vw] lg:w-[50vw] leading-normal flex flex-wrap justify-center gap-x-1 z-10">
          {words.map((word, i) => (
            <span
              key={i}
              ref={(el) => (textRef.current[i] = el)}
              className={`${
                ["supermom", "equations", "lo-fi", "chaos", "half-baked"].some((w) =>
                  word.toLowerCase().includes(w)
                )
                  ? "text-[#969696] cursor-hover"
                  : "text-black"
              }`}
            >
              {word}
            </span>
          ))}
        </h1>
      </div>
    </>
  );
};

export default Home;
