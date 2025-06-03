import { Link } from "react-router-dom";
import { useLayoutEffect, useRef, useState, useEffect } from "react";
import gsap from "gsap";
import thumbnailURL from "../assets/shreyaji.png";
import ytIcon from "../assets/youtube-color-icon.svg";
import LoadingScreen from "./LoadingScreen";

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

  useEffect(() => {
    const cursor = document.createElement("div");
    cursor.classList.add("cursor-dot");
    document.body.appendChild(cursor);

    const moveCursor = (e) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3,
        ease: "power3.out"
      });
    };

    window.addEventListener("mousemove", moveCursor);

    const handleHover = () => {
      cursor.style.transform = "scale(3)";
      cursor.style.borderRadius = "20%";
    };
    const handleLeave = () => {
      cursor.style.transform = "scale(1)";
      cursor.style.borderRadius = "50%";
    };

    const magnetEffect = (e) => {
      const rect = e.target.getBoundingClientRect();
      const offsetX = e.clientX - (rect.left + rect.width / 2);
      const offsetY = e.clientY - (rect.top + rect.height / 2);
      gsap.to(e.target, {
        x: offsetX * 0.2,
        y: offsetY * 0.2,
        duration: 0.3,
        ease: "power3.out"
      });
    };

    const magnetReset = (e) => {
      gsap.to(e.target, { x: 0, y: 0, duration: 0.3, ease: "power3.out" });
    };

    document.querySelectorAll(".cta-button").forEach((el) => {
      el.addEventListener("mouseenter", handleHover);
      el.addEventListener("mouseleave", handleLeave);
      el.addEventListener("mousemove", magnetEffect);
      el.addEventListener("mouseout", magnetReset);
    });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.body.removeChild(cursor);
      document.querySelectorAll(".cta-button").forEach((el) => {
        el.removeEventListener("mouseenter", handleHover);
        el.removeEventListener("mouseleave", handleLeave);
        el.removeEventListener("mousemove", magnetEffect);
        el.removeEventListener("mouseout", magnetReset);
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
        delay: 1.1,
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
        <div className="hero-section relative w-full h-screen flex flex-col justify-center px-6 md:px-24 lg:px-40 bg-[#2F2F2F]">
          <div className="relative z-10 max-w-5xl">
            <p ref={(el) => (textRef.current[0] = el)} className="text-white text-lg mb-4">
              Hi! I am <span className="text-gray-400">Kalpana Bhatt</span>
            </p>

            <h1 ref={(el) => (textRef.current[1] = el)} className="text-white text-[2.75rem] md:text-[4rem] lg:text-[5.65rem] font-extrabold leading-[1.1] mb-8">
              Product Design &<br className="hidden md:block" />Frontend Engineer
            </h1>

            <p ref={(el) => (textRef.current[2] = el)} className="text-lg font-normal w-full sm:w-[90vw] md:w-[60vw] lg:w-[45vw] leading-relaxed text-gray-300">
            — daughter of a <span className="text-gray-400 hover:text-[#FF800A] cursor-pointer">supermom</span>, 
              shaped by <span className="text-gray-400 hover:text-[#FF800A] cursor-pointer">equations</span>, 
              powered by <span className="text-gray-400 hover:text-[#FF800A] cursor-pointer">lo-fi beats</span>, 
              now designing clarity into <span className="text-gray-400 hover:text-[#FF800A] cursor-pointer">chaos</span>. 
              I turn <span className="text-gray-400 hover:text-[#FF800A] cursor-pointer">half-baked</span> ideas into elegant, scalable interfaces that just make sense.
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;