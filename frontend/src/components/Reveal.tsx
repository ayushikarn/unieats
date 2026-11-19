import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** transition delay in ms */
  delay?: number;
}

/**
 * Wrapper that fades/slides its children into view once they scroll
 * into the viewport. Respects prefers-reduced-motion (shows instantly).
 */
export default function Reveal({ children, className = "", delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const style: CSSProperties = { "--reveal-delay": `${delay}ms` } as CSSProperties;

  return (
    <div ref={ref} className={`reveal ${visible ? "is-visible" : ""} ${className}`} style={style}>
      {children}
    </div>
  );
}
