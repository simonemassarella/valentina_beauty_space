"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

type Props = {
  children: React.ReactNode;
};

export default function ScrollRevealProvider({ children }: Props) {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const elements = Array.from(
      document.querySelectorAll<HTMLElement>(".reveal-on-scroll"),
    );

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -10% 0px",
      },
    );

    elements.forEach((el) => {
      if (!el.classList.contains("is-visible")) {
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, [pathname]);

  return <>{children}</>;
}
