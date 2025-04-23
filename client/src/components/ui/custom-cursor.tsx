import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const onMouseMove = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power3.out",
      });
    };

    window.addEventListener("mousemove", onMouseMove);

    // Make cursor larger when hovering over interactive elements
    const interactiveElements = document.querySelectorAll(
      "a, button, input, textarea, select, .interactive"
    );

    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", () => {
        gsap.to(cursor, {
          width: 60,
          height: 60,
          duration: 0.3,
        });
      });

      el.addEventListener("mouseleave", () => {
        gsap.to(cursor, {
          width: 30,
          height: 30,
          duration: 0.3,
        });
      });
    });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", () => {});
        el.removeEventListener("mouseleave", () => {});
      });
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed w-[30px] h-[30px] rounded-full bg-devoops-blue pointer-events-none mix-blend-difference z-[9999] transform -translate-x-1/2 -translate-y-1/2"
      style={{ top: 0, left: 0 }}
    ></div>
  );
}
