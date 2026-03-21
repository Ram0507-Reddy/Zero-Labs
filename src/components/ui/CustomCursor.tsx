"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Return a sleek, physics-based inverted dot that tracks the mouse 
  // perfectly due to the high stiffness setting.
  return (
    <motion.div
      className="fixed top-0 left-0 w-4 h-4 rounded-full bg-white mix-blend-difference pointer-events-none z-[9999] hidden md:block"
      animate={{
        x: position.x - 8,
        y: position.y - 8,
      }}
      transition={{
        type: "spring",
        stiffness: 800,
        damping: 40,
        mass: 0.1
      }}
    />
  );
}
