import { Link } from "react-router-dom";
import { useLayoutEffect, useRef, useState, useEffect } from "react";
import gsap from "gsap";
import thumbnailURL from "../assets/shreyaji.png";
import ytIcon from "../assets/youtube-color-icon.svg";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const ytIconRef = useRef(null);
  const vibeRef = useRef(null);
  const textRef = useRef([]);
  const loaderRef = useRef(null);
  const floatingRefs = useRef([]);
  const dotRefs = useRef([]);
  const statusRef = useRef(null);

  const loadingStatuses = ["debugging...", "hydrating code...", "calming dev anxiety..."];

  const sentence =
    "I’m Kalpana Bhatt — daughter of a supermom, shaped by equations, powered by lo-fi beats, now designing clarity out of chaos. I turn half-baked ideas into elegant, scalable interfaces that just make sense.";
  const words = sentence.split(" ");

  useLayoutEffect(() => {
    if (isLoading) return;

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
    const timeout = setTimeout(() => {
      gsap.to(loaderRef.current, {
        opacity: 0,
        duration: 0.6,
        ease: "power2.inOut",
        onComplete: () => setIsLoading(false),
      });
    }, 6000);

    floatingRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.to(el, {
        y: "+=10",
        x: "+=10",
        rotation: "+=5",
        duration: 3 + Math.random() * 2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      el.addEventListener("mouseenter", () => {
        el.style.filter = "blur(1px)";
      });
      el.addEventListener("mouseleave", () => {
        el.style.filter = "blur(0px)";
      });
    });

    dotRefs.current.forEach((dot, i) => {
      if (!dot) return;
      gsap.to(dot, {
        y: [-4, -6, -5][i % 3],
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        duration: 0.5,
        delay: i * 0.2,
      });
    });

    setTimeout(() => {
  if (statusRef.current) {
    statusRef.current.textContent = "(this might take longer if it’s Monday)";
  }
}, 0);

setTimeout(() => {
  if (statusRef.current) {
    const msg = loadingStatuses[Math.floor(Math.random() * loadingStatuses.length)];
    statusRef.current.textContent = msg;
    gsap.fromTo(
      statusRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.3, yoyo: true, repeat: 1, repeatDelay: 0.5 }
    );
  }
}, 5000);

    return () => {
      clearTimeout(timeout);
      
    };
  }, []);

  return (
    <>
      {isLoading && (
        <div
          ref={loaderRef}
          className="relative flex items-center justify-center h-screen w-full bg-[#0F1115] text-white font-bricolage overflow-hidden transition-all duration-500 ease-in-out"
        >
          <div className="absolute inset-0 z-0 pointer-events-none">
            {["const", "return", "{ }", "div", "<button>", "useState", "=>"].map((word, index) => (
              <span
                key={index}
                ref={(el) => (floatingRefs.current[index] = el)}
                className="absolute text-sm text-[#3BAEFF] opacity-20"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
              >
                {word}
              </span>
            ))}
          </div>

          <div className="absolute w-[600px] h-[600px] bg-gradient-to-tr from-[#3BAEFF] via-transparent to-[#0F1115] rounded-full opacity-20 animate-pulse blur-3xl z-0" />

          <div className="z-10 text-center">
            <div className="flex flex-row gap-3 justify-center items-center">
              <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-4">
                Loading
              </h1>
              <div className="flex justify-center gap-1 mb-2 items-center">
                {[0, 1, 2].map((d, i) => (
                  <span
                    key={i}
                    ref={(el) => (dotRefs.current[i] = el)}
                    className="inline-block w-1.5 h-1.5 bg-white rounded-full"
                  ></span>
                ))}
              </div>
            </div>
            <p className="text-sm italic text-[#d0d0d0]" ref={statusRef}>
              (this might take longer if it’s Monday)
            </p>
          </div>
        </div>
      )}

      {!isLoading && (
        <div className="flex justify-center items-center flex-col gap-[1.5rem] h-[100vh] relative overflow-hidden z-0 bg-white">
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
      )}
    </>
  );
};

export default Home;
