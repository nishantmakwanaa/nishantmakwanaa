import { useEffect, useRef } from "react";

let globalIndex = 0;
let resetTimer: ReturnType<typeof setTimeout> | null = null;

export const useFadeIn = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Assign a stagger index for initial load
    const index = globalIndex++;
    if (resetTimer) clearTimeout(resetTimer);
    resetTimer = setTimeout(() => { globalIndex = 0; }, 100);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Stagger delay: 40ms per section on initial load
          const delay = index * 40;
          setTimeout(() => {
            el.classList.add("visible");
          }, delay);
          observer.unobserve(el);
        }
      },
      { threshold: 0.08 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
};
