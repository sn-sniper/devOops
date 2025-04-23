import { useRef, useEffect } from "react";
import { gsap } from "gsap";

const marqueeItems = [
  { text: "Create", color: "white" },
  { text: "•", color: "text-huly-purple" },
  { text: "Innovate", color: "white" },
  { text: "•", color: "text-huly-orange" },
  { text: "Design", color: "white" },
  { text: "•", color: "text-huly-blue" },
  { text: "Develop", color: "white" },
  { text: "•", color: "text-huly-purple" },
  { text: "Experience", color: "white" },
  { text: "•", color: "text-huly-orange" },
];

export function MarqueeSection() {
  const marqueeContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const marqueeContent = marqueeContentRef.current;
    if (!marqueeContent) return;

    // Clone the marquee content for seamless looping
    const clone = marqueeContent.cloneNode(true);
    marqueeContent.parentElement?.appendChild(clone);

    // Create the marquee animation
    gsap.to([marqueeContent, clone], {
      x: "-50%",
      duration: 20,
      ease: "linear",
      repeat: -1,
    });

    return () => {
      gsap.killTweensOf([marqueeContent, clone]);
    };
  }, []);

  return (
    <section className="py-20 bg-huly-black overflow-hidden">
      <div className="marquee">
        <div
          className="marquee-content flex items-center space-x-8 text-5xl md:text-7xl font-bold opacity-30"
          ref={marqueeContentRef}
        >
          {marqueeItems.map((item, index) => (
            <span key={index} className={item.color === "white" ? "" : item.color}>
              {item.text}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
