import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const trailRefs = useRef([]);
  const [label, setLabel] = useState("");

  useEffect(() => {
    const cursor = cursorRef.current;
    let requestId;
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    const trailCount = 5;
    trailRefs.current = Array.from({ length: trailCount }, (_, i) => trailRefs.current[i] || document.createElement("div"));

    trailRefs.current.forEach((el) => {
      el.className = "fixed top-0 left-0 w-3 h-3 bg-[#FF800A] rounded-full pointer-events-none z-[9998] opacity-30";
      document.body.appendChild(el);
    });

    const updatePosition = () => {
      cursorX += (mouseX - cursorX) * 0.1;
      cursorY += (mouseY - cursorY) * 0.1;
      cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;

      trailRefs.current.forEach((el, index) => {
        gsap.to(el, {
          x: mouseX,
          y: mouseY,
          scale: 1 - index * 0.1,
          opacity: 0.15 - index * 0.02,
          duration: 0.4 + index * 0.1,
          ease: "power3.out",
        });
      });

      requestId = requestAnimationFrame(updatePosition);
    };

    const handleMouseMove = (e) => {
      mouseX = e.clientX - 7;
      mouseY = e.clientY - 7;

      const shouldHide = e.target.closest("[data-cursor-hide='true']");
      cursor.style.display = shouldHide ? "none" : "block";

      const darkSection = e.target.closest("[data-cursor-dark='true']");
      if (darkSection) {
        cursor.style.backgroundColor = "#ffffff";
        cursor.style.boxShadow = "0 0 6px #ffffff";
      } else {
        cursor.style.backgroundColor = "#FF800A";
        cursor.style.boxShadow = "0 0 6px #FF800A";
      }

      const magnetTarget = e.target.closest("button, a");
      if (magnetTarget) {
        const rect = magnetTarget.getBoundingClientRect();
        const offsetX = (e.clientX - (rect.left + rect.width / 2)) * 0.3;
        const offsetY = (e.clientY - (rect.top + rect.height / 2)) * 0.3;
        gsap.to(magnetTarget, { x: offsetX, y: offsetY, duration: 0.3, ease: "power3.out" });
      }
    };

    const handleBurst = () => {
      const burst = document.createElement("div");
      burst.className = "fixed w-8 h-8 border-2 border-[#FF800A] rounded-full z-[9997] pointer-events-none";
      burst.style.left = `${mouseX}px`;
      burst.style.top = `${mouseY}px`;
      burst.style.transform = "translate(-50%, -50%)";
      document.body.appendChild(burst);

      gsap.fromTo(
        burst,
        { scale: 1, opacity: 0.5 },
        {
          scale: 2.5,
          opacity: 0,
          duration: 0.5,
          ease: "power2.out",
          onComplete: () => burst.remove(),
        }
      );
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.querySelectorAll("a, button, [data-cursor-burst]").forEach((el) => {
      el.addEventListener("click", handleBurst);
    });

    requestId = requestAnimationFrame(updatePosition);

    return () => {
      cancelAnimationFrame(requestId);
      document.removeEventListener("mousemove", handleMouseMove);
      document.querySelectorAll("a, button, [data-cursor-burst]").forEach((el) => {
        el.removeEventListener("click", handleBurst);
      });
      trailRefs.current.forEach((el) => el.remove());
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none flex items-center justify-center text-[10px] text-white font-semibold"
        style={{
          width: "14px",
          height: "14px",
          borderRadius: "50%",
          backgroundColor: "#FF800A",
          transition: "background-color 0.3s ease",
          pointerEvents: "none",
          display: "block",
        }}
      >
        {label}
      </div>
    </>
  );
};

export default CustomCursor;
