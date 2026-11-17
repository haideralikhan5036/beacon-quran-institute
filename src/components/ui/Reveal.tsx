import React, { ReactNode, useEffect, useState } from 'react';
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
  // Fail-visible: if IntersectionObserver is unavailable the motion element
  // would stay at opacity 0 forever — render the content plainly instead.
  const [noObserver, setNoObserver] = useState(false);
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') setNoObserver(true);
  }, []);

  if (noObserver) {
    return (
      <div style={{ position: "relative", width, overflow: "hidden", ...containerStyle }}>
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
    <div style={{ position: "relative", width, overflow: "hidden", ...containerStyle }}>
      <motion.div
        variants={variants}
        initial="hidden"
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
