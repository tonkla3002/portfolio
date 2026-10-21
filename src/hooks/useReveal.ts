import { useEffect, useRef } from "react";

// Marks an element "armed" (children hidden) once it is known to be below the fold, then
// "in" when it scrolls into view, which plays the .reveal-item animations in globals.css.
// Content already on screen, reduced-motion users and no-JS visitors always see everything.
// Classes are toggled on the node directly so no React state is set inside the effect.
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.9) return;

    el.classList.add("armed");
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("in");
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return ref;
}
