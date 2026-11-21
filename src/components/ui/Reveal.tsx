import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';

interface RevealProps {
  children: ReactNode;
  width?: "fit-content" | "100%";
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  distance?: number;
  key?: string | number;
  containerStyle?: React.CSSProperties;
  innerStyle?: React.CSSProperties;
}

export const Reveal = ({ 
  children, 
  width = "fit-content", 
  delay = 0.12, 
  direction = "up",
  distance = 30,
  containerStyle,
  innerStyle
}: RevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  // Visible by default (Batch 13): the server HTML and the first client
  // render show the content plainly. The old motion.div rendered
  // opacity:0 into the prerendered HTML, so the page looked blank until
  // JS hydrated and the observer fired — the white-screen wait on first
  // load. The animation only engages after mount, and only for content
  // that starts below the fold; above-fold content stays visible, so
  // there is no flash when hydration swaps the plain div for motion.
  const [mounted, setMounted] = useState(false);
  const [noObserver, setNoObserver] = useState(false);
  const [inViewAtMount, setInViewAtMount] = useState(true);
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') {
      setNoObserver(true);
      setMounted(true);
      return;
    }
    const el = ref.current;
    setInViewAtMount(el ? el.getBoundingClientRect().top < window.innerHeight * 0.9 : true);
    setMounted(true);
  }, []);

  // Fail-visible: no observer, or not mounted yet (SSR + first client
  // render) — render the content plainly instead of hiding it.
  if (!mounted || noObserver) {
    return (
      <div ref={ref} style={{ position: "relative", width, overflow: "hidden", ...containerStyle }}>
        <div style={{ ...innerStyle }}>{children}</div>
      </div>
    );
  }

  const variants = {
    hidden: { 
      opacity: 0, 
      y: direction === "up" ? distance : direction === "down" ? -distance : 0,
      x: direction === "left" ? distance : direction === "right" ? -distance : 0,
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      x: 0 
    }
  };

  return (
    <div ref={ref} style={{ position: "relative", width, overflow: "hidden", ...containerStyle }}>
      <motion.div
        variants={variants}
        // Already in view at mount: start visible (no flash). Below the
        // fold: start hidden and animate in when scrolled to.
        initial={inViewAtMount ? false : "hidden"}
        whileInView="visible"
        viewport={{ once: true, margin: "0px" }}
        transition={{ 
          duration: 0.6, 
          delay, 
          ease: [0.21, 0.47, 0.32, 0.98] // Professional "OutExpo" ease
        }}
        style={{ willChange: "transform, opacity", ...innerStyle }}
      >
        {children}
      </motion.div>
    </div>
  );
};
