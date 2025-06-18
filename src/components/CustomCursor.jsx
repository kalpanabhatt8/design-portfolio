import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const CustomCursor = () => {
  const trailRefs = useRef([]);
  const [label, setLabel] = useState("");

  useEffect(() => {
    let requestId;
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    const trailCount = 5;
    trailRefs.current = Array.from({ length: trailCount }, (_, i) => trailRefs.current[i] || document.createElement("div"));

    trailRefs.current.forEach((el) => {
      el.className = "fixed top-0 left-0 pointer-events-none z-[9998] text-[#FF800A] text-lg font-semibold select-none";
      el.style.textShadow = "0 0 6px rgba(255, 128, 10, 0.5)";
      el.style.transformOrigin = "center";
      el.textContent = "✦";
      document.body.appendChild(el);
    });

    trailRefs.current.forEach((el, i) => {
      gsap.to(el, {
        opacity: "+=0.05",
        repeat: -1,
        yoyo: true,
        duration: 1.5 + i * 0.3,
        ease: "sine.inOut",
      });

      gsap.to(el, {
        scale: "+=0.1",
        repeat: -1,
        yoyo: true,
        duration: 1.2 + i * 0.3,
        ease: "sine.inOut",
      });
    });

    const updatePosition = () => {
      cursorX += (mouseX - cursorX) * 0.1;
      cursorY += (mouseY - cursorY) * 0.1;

      const angle = Math.atan2(mouseY - cursorY, mouseX - cursorX) * (180 / Math.PI);

      trailRefs.current.forEach((el, index) => {
        gsap.to(el, {
          x: mouseX,
          y: mouseY,
          scale: 1 - index * 0.1,
          opacity: 0.05 + 0.02 * (trailCount - index),
          rotation: angle,
          duration: 0.4 + index * 0.1,
          ease: "power3.out",
        });
      });

      requestId = requestAnimationFrame(updatePosition);
    };

    const handleMouseMove = (e) => {
      mouseX = e.clientX - 7;
      mouseY = e.clientY - 7;

      const isHover = e.target.closest("button, a");

      if (isHover) {
        const glyphs = ["✦", "✧", "❉", "⭑"];
        trailRefs.current.forEach((el, index) => {
          el.textContent = glyphs[index % glyphs.length];
        });
      } else {
        trailRefs.current.forEach((el) => {
          el.textContent = "✦";
        });
      }

      const hoveredTag = e.target.tagName.toLowerCase();
      const labelMap = {
        button: "Click",
        a: "Go →",
      };
      setLabel(labelMap[hoveredTag] || "");
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

      trailRefs.current.forEach((trail, index) => {
        const clone = trail.cloneNode(true);
        document.body.appendChild(clone);

        gsap.fromTo(
          clone,
          { opacity: 0.3, scale: 1 },
          {
            opacity: 0,
            scale: 2.5,
            duration: 0.4 + index * 0.1,
            ease: "power2.out",
            onComplete: () => clone.remove(),
          }
        );
      });
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.querySelectorAll("a, button").forEach((el) => {
      el.addEventListener("mouseleave", () => {
        gsap.to(el, {
          x: 0,
          y: 0,
          duration: 0.3,
          ease: "elastic.out(1, 0.3)",
        });
      });
    });
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

  return null;
};

export default CustomCursor;
