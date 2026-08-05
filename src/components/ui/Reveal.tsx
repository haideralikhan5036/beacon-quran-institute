import React, { ReactNode } from 'react';
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
  delay = 0.2, 
  direction = "up",
  distance = 30,
  containerStyle,
  innerStyle
}: RevealProps) => {
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
        viewport={{ once: true, margin: "-100px" }}
        transition={{ 
          duration: 0.8, 
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
