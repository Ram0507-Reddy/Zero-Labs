"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export function CustomCursor() {
  const [cursorType, setCursorType] = useState<"default" | "pointer" | "text">("default");
  const [isVisible, setIsVisible] = useState(false);
  
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 30, stiffness: 500, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Check if non-touch on mount
    const isMouse = !window.matchMedia("(pointer: coarse)").matches;
    if (isMouse) {
      requestAnimationFrame(() => setIsVisible(true));
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      const target = e.target as HTMLElement;
      if (!target) return;

      // Check if target or any parent is interactable
      const isPointer = 
        window.getComputedStyle(target).cursor === "pointer" ||
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.onclick !== null;

      const isText = 
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable;

      if (isPointer) setCursorType("pointer");
      else if (isText) setCursorType("text");
      else setCursorType("default");
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  if (!isVisible) return null;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        * { cursor: none !important; }
        @media (max-width: 768px) {
          * { cursor: auto !important; }
        }
      `}} />
      <motion.div
        className="fixed top-0 left-0 z-[999999] pointer-events-none hidden md:block"
        style={{
          x: cursorX,
          y: cursorY,
        }}
      >
        <motion.div
          animate={{
            width: cursorType === "pointer" ? 40 : cursorType === "text" ? 2 : 10,
            height: cursorType === "pointer" ? 40 : cursorType === "text" ? 24 : 10,
            borderRadius: cursorType === "text" ? "2px" : "50%",
            x: cursorType === "pointer" ? -20 : cursorType === "text" ? -1 : -5,
            y: cursorType === "pointer" ? -20 : cursorType === "text" ? -12 : -5,
            backgroundColor: cursorType === "text" ? "#ef4444" : "white",
            border: cursorType === "pointer" ? "2px solid #ef4444" : "none",
            mixBlendMode: cursorType === "pointer" ? "normal" : "difference",
          }}
          transition={{ 
            type: "spring", 
            stiffness: 400, 
            damping: 35,
            mass: 0.1
          }}
          className="relative flex items-center justify-center transition-colors duration-200"
        >
          {cursorType === "pointer" && (
             <motion.div 
               initial={{ scale: 0 }}
               animate={{ scale: 1 }}
               className="w-1.5 h-1.5 bg-red-500 rounded-full shadow-[0_0_10px_#ef4444]" 
             />
          )}
        </motion.div>
      </motion.div>
    </>
  );
}
