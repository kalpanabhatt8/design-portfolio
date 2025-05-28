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
  const loaderLineRef = useRef(null);
  const floatingRefs = useRef([]);
  const dotRefs = useRef([]);
  const statusRef = useRef(null);
  const blurRef = useRef(null);

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
        scale: 1.05,
        opacity: 0,
        duration: 0.6,
        ease: "power2.inOut",
        onStart: () => {
          gsap.to(loaderRef.current, {
            scale: 1,
            duration: 0.1,
            ease: "power2.inOut",
          });
          // Remove conflicting GSAP animation for loaderLineRef.current width.
          // gsap.to(loaderLineRef.current, {
          //   width: "100%",
          //   duration: 0.6,
          //   ease: "power2.inOut",
          // });
          gsap.to(loaderLineRef.current, {
            opacity: 0,
            duration: 0.5,
            ease: "power2.inOut",
            onComplete: () => {
              loaderLineRef.current.style.display = "none";
            }
          });
        },
        onComplete: () => {
          setIsLoading(false);
        },
      });
    }, 6000);

    // Progress bar: 0% to 80% fast, then 80% to 100% slow and subtle
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

    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      mouseX = (e.clientX - centerX) * 0.15;
      mouseY = (e.clientY - centerY) * 0.15;
    };

    const animateBlur = () => {
      if (blurRef.current) {
        gsap.to(blurRef.current, {
          x: mouseX,
          y: mouseY,
          duration: 0.5,
          ease: "power2.out",
        });
      }
      requestAnimationFrame(animateBlur);
    };

    window.addEventListener("mousemove", handleMouseMove);
    animateBlur();

    floatingRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.to(el, {
        y: "+=10",
        x: "+=10",
        rotation: "+=5",
        opacity: 0.1 + Math.random() * 0.1,
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

    return () => {
      clearTimeout(timeout);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <>
      {isLoading && (
        <div
          ref={loaderRef}
          className="absolute inset-0 z-50 flex items-center justify-center h-screen w-full bg-[#0a0d10] text-white font-bricolage overflow-hidden transition-all duration-500 ease-in-out"
        >
          <div className="absolute inset-0 z-0 pointer-events-none">
            {["const", "return", "{ }", "div", "<button>", "useState", "=>"].map((word, index) => (
              <span
                key={index}
                ref={(el) => (floatingRefs.current[index] = el)}
                className="absolute text-sm text-[#FF9D41] opacity-20"
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
            className="transform absolute w-[600px] h-[600px] bg-gradient-to-tr from-[#FF800A] via-transparent to-[#1A1D23] rounded-full opacity-30 animate-pulse blur-3xl z-0"
          />

          <div className="z-10 text-center">
            <div className="flex flex-row gap-1 justify-center items-center">
              <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-4 text-white">
                Loading
              </h1>
              <div className="flex justify-center gap-1 mb-2 items-center">
                {[0, 1, 2].map((_, i) => (
                  <span
                    key={i}
                    ref={(el) => (dotRefs.current[i] = el)}
                    className="inline-block w-1.5 h-1.5 bg-[#E5E7EB] rounded-full"
                  ></span>
                ))}
              </div>
            </div>
            <p className="text-sm italic text-[#ffb774]" ref={statusRef}>
              (this might take longer if it’s Monday)
            </p>
          </div>
          <div className="absolute bottom-[80px] flex justify-center w-full z-50 ">
            <div className="w-[120px] h-1.5 rounded-full overflow-hidden bg-[#1A1D23] border border-[#FF9D41]/50 shadow-inner shadow-[#FF800A]/20">
              <div
                ref={loaderLineRef}
                className="h-full rounded-full"
                style={{
                  width: "0%",
                  background: "linear-gradient(to right, #FF800A, #FFB347)",
                  boxShadow: "0 0 12px #FF800A",
                  transition: "width 0.6s ease-in-out",
                }}
              />
            </div>
          </div>
        </div>
      )}

      {!isLoading && (
        <div className="flex justify-center items-center flex-col gap-[1.5rem] h-[100vh] relative overflow-hidden z-0 bg-hero-pattern">
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
            <p className="text-[0.75rem] text-[#A0A0A0]">· current vibe</p>
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
                className={`transition-colors duration-200 ${
                  ["supermom", "equations", "lo-fi", "chaos", "half-baked"].some((w) =>
                    word.toLowerCase().includes(w)
                  )
                    ? "text-[#364156] hover:text-[#FF800A] cursor-pointer"
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