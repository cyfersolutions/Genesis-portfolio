"use client";

import { useEffect } from "react";

// Fades `.rv` elements in as they enter the viewport.
export default function RevealOnScroll() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.12 }
    );
    document.querySelectorAll<HTMLElement>(".rv").forEach((el, i) => {
      el.style.transitionDelay = (i % 4) * 70 + "ms";
      io.observe(el);
    });
    return () => io.disconnect();
  }, []);
  return null;
}
