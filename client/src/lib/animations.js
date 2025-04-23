import { gsap } from "gsap";

export const reveal = (element, delay = 0) => {
  return gsap.fromTo(
    element,
    { y: 50, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.8,
      delay,
      ease: "power3.out",
    }
  );
};

export const revealStagger = (elements, staggerTime = 0.1) => {
  return gsap.fromTo(
    elements,
    { y: 50, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: staggerTime,
      ease: "power3.out",
    }
  );
};

export const fadeIn = (element, delay = 0) => {
  return gsap.fromTo(
    element,
    { opacity: 0 },
    {
      opacity: 1,
      duration: 0.6,
      delay,
      ease: "power2.out",
    }
  );
};

export const marqueeAnimation = (element) => {
  return gsap.to(element, {
    x: "-50%",
    ease: "none",
    duration: 20,
    repeat: -1,
  });
};

export const floatAnimation = (element) => {
  return gsap.to(element, {
    y: [-20, 0, -20],
    duration: 6,
    ease: "power1.inOut",
    repeat: -1,
  });
};