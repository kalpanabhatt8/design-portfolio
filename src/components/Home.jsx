import { Link } from "react-router-dom";
import { useLayoutEffect, useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import thumbnailURL from "../assets/shreyaji.png";
import ytIcon from "../assets/youtube-color-icon.svg";
import LoadingScreen from "./LoadingScreen";
import { useTheme } from "../utils/ThemeContext";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const { theme } = useTheme();
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

  const heroContainerRef = useRef(null);
  const workSectionRef = useRef(null);
  const scrollContainerRef = useRef(null);
  let heroRef = null;

  useEffect(() => {
    const cursor = document.getElementById("custom-cursor");

    const moveCursor = (e) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.15,
        ease: "power3.out"
      });
    };

    const moveBlob = (e) => {
      const { innerWidth, innerHeight } = window;
      const offsetX = (e.clientX - innerWidth / 2) / 20;
      const offsetY = (e.clientY - innerHeight / 2) / 20;

      gsap.to(vibeRef.current, {
        x: offsetX,
        y: offsetY,
        duration: 1.2,
        ease: "power4.out"
      });
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousemove", moveBlob);

    // Morph on hover zones:
    document.querySelectorAll(".cta-button").forEach((el) => {
      el.addEventListener("mouseenter", () => {
        cursor.style.transform = "scale(2)";
      });
      el.addEventListener("mouseleave", () => {
        cursor.style.transform = "scale(1)";
      });
    });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousemove", moveBlob);
      document.querySelectorAll(".cta-button").forEach((el) => {
        el.removeEventListener("mouseenter", () => {});
        el.removeEventListener("mouseleave", () => {});
      });
    };
  }, []);

  const loadingStatuses = ["debugging...", "hydrating code...", "calming dev anxiety..."];
  const sentence =
    " — daughter of a supermom, shaped by equations, powered by lo-fi beats, now designing clarity out of chaos. I turn half-baked ideas into elegant, scalable interfaces that just make sense.";
  const words = sentence.split(" ");

  useLayoutEffect(() => {
    if (isLoading) return;

    const ctx = gsap.context(() => {
      gsap.from(textRef.current[0], {
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: "power4.out",
        delay: 0.3,
      });

      gsap.from(textRef.current[1], {
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: "power4.out",
        delay: 0.7,
      });

      gsap.from(textRef.current[2], {
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: "power4.out",
        delay: 0.9,
      });

      gsap.from(".prototype-card", {
        opacity: 0,
        y: 20,
        duration: 1,
        ease: "power4.out",
        delay: 1.8,
      });

      gsap.to(heroRef, {
        scale: 1.01,
        duration: 12,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      gsap.to(heroContainerRef.current, {
        opacity: 0,
        y: -50,
        ease: "power2.out",
        scrollTrigger: {
          trigger: heroContainerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
          scroller: scrollContainerRef.current,
        }
      });

      gsap.to(vibeRef.current, {
        opacity: 0,
        ease: "power2.out",
        scrollTrigger: {
          trigger: heroContainerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
          scroller: scrollContainerRef.current,
        }
      });

      gsap.to(heroContainerRef.current, {
        opacity: 0,
        ease: "power2.out",
        scrollTrigger: {
          trigger: heroContainerRef.current,
          start: "top top",
          end: "center top",
          scrub: true,
          scroller: scrollContainerRef.current,
        }
      });

      gsap.from(workSectionRef.current, {
        opacity: 0,
        ease: "power2.out",
        scrollTrigger: {
          trigger: workSectionRef.current,
          start: "top bottom",
          end: "center center",
          scrub: true,
          scroller: scrollContainerRef.current,
        }
      });

      gsap.to(vibeRef.current, {
        y: "+=20",
        duration: 5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
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

<div
      id="custom-cursor"
      className="top-0 left-0 z-[999999] pointer-events-none bg-transparent custom-cursor"
      style={{
        width: "28px",
        height: "28px",
        transform: "translate(-50%, -50%)",
        position: "fixed"
      }}
    >
      <img
        src="/textures/sparkle-cursor.svg"
        alt="cursor"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
        }}
      />
    </div>
    

      {isLoading && (
        <LoadingScreen
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          loaderRef={loaderRef}
          loaderLineRef={loaderLineRef}
          floatingRefs={floatingRefs}
          dotRefs={dotRefs}
          statusRef={statusRef}
          blurRef={blurRef}
        />
      )}

      {!isLoading && (
        <div
          ref={scrollContainerRef}
          className="w-full h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth"
        >
          <div ref={heroContainerRef} className="relative w-full h-screen flex flex-col justify-center px-6 md:px-24 lg:px-40 snap-start">
          <div ref={vibeRef} className="absolute top-[60%] right-[5%] w-[400px] h-[400px] rounded-full bg-[#FF800A] opacity-40 blur-[120px] z-0"></div>
            <div className="relative z-10 ">
              <p className={`text-md mb-2 ${theme === "dark" ? "text-[theme(colors.dark.secondary)]" : "text-[theme(colors.light.secondary)]"}`}>
                Hi! I am <span className="text-accent hover:text-brand cursor-pointer uppercase">Kalpana Bhatt</span>
              </p>
              <h1 ref={(el) => (textRef.current[0] = el)} className={`text-[2.75rem] md:text-[4rem] lg:text-[5.65rem] font-extrabold leading-[1.1] mb-8 ${theme === "dark" ? "text-[theme(colors.dark.primary)]" : "text-[theme(colors.light.primary)]"}`}>
                Product Designer & Frontend Engineer
              </h1>
              <p ref={(el) => (textRef.current[1] = el)} className={`text-md font-normal w-full sm:w-[90vw] md:w-[60vw] lg:w-[45vw] leading-relaxed ${theme === "dark" ? "text-[theme(colors.dark.secondary)]" : "text-[theme(colors.light.secondary)]"}`}>
                — daughter of a <span className="text-accent hover:text-brand cursor-pointer">supermom</span>, 
                shaped by <span className="text-accent hover:text-brand cursor-pointer">equations</span>, 
                powered by <span className="text-accent hover:text-brand cursor-pointer">lo-fi beats</span>, 
                now designing clarity into <span className="text-accent hover:text-brand cursor-pointer">chaos</span>. 
                I turn <span className="text-accent hover:text-brand cursor-pointer">half-baked</span> ideas into elegant, scalable interfaces that just make sense.
              </p>

              <div ref={(el) => (textRef.current[2] = el)} className={`mt-12 text-sm ${theme === "dark" ? "text-[theme(colors.dark.accent)]" : "text-[theme(colors.light.accent)]"}`}>
              🚧 Upcoming: Spotify Clone, E-commerce Dashboard, AI Chatbot
            </div>

            </div>
          </div>
          <div ref={workSectionRef} id="work-section" className="h-screen flex items-center justify-center snap-start">
            <h2 className={`text-4xl ${theme === "dark" ? "text-[theme(colors.dark.primary)]" : "text-[theme(colors.light.primary)]"}`}>Case Studies Coming Soon...</h2>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;