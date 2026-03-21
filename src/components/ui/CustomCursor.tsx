"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue, AnimatePresence } from "framer-motion";

export function CustomCursor() {
  const [cursorType, setCursorType] = useState<"default" | "pointer" | "text">("default");
  const [isVisible, setIsVisible] = useState(false);
  
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 35, stiffness: 600, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Only show custom cursor on non-touch devices
    if (typeof window === "undefined" || window.matchMedia("(pointer: coarse)").matches) return;
    setIsVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      const target = e.target as HTMLElement;
      if (!target) return;

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
        <AnimatePresence mode="wait">
          {cursorType === "text" ? (
             <motion.div
               key="text-cursor"
               initial={{ opacity: 0, scaleY: 0 }}
               animate={{ opacity: 1, scaleY: 1 }}
               exit={{ opacity: 0, scaleY: 0 }}
               className="w-[2px] h-6 bg-[#ef4444] rounded-full -translate-x-1/2 -translate-y-1/2 shadow-[0_0_8px_#ef4444]"
             />
          ) : (
            <motion.div
              key="poly-cursor"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: 1, 
                scale: cursorType === "pointer" ? 1.4 : 1,
                rotate: cursorType === "pointer" ? 15 : 0
              }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="relative -translate-x-[2px] -translate-y-[2px]"
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Base polygon */}
                <motion.path 
                  animate={{
                    fill: cursorType === "pointer" ? "rgba(239, 68, 68, 0.4)" : "rgba(115, 115, 115, 0.9)",
                    stroke: cursorType === "pointer" ? "#ef4444" : "#E5E5E5",
                  }}
                  d="M1 1 L19 8 L11 11 L8 19 Z" 
                  strokeWidth="1.2" 
                  strokeLinejoin="round"
                />
                
                {/* Internal mesh lines */}
                <motion.path 
                  animate={{ stroke: cursorType === "pointer" ? "#ef4444" : "#E5E5E5" }}
                  d="M1 1 L11 11" strokeWidth="0.8" opacity="0.6" 
                />
                <motion.path 
                  animate={{ stroke: cursorType === "pointer" ? "#ef4444" : "#E5E5E5" }}
                  d="M19 8 L8 19" strokeWidth="0.8" opacity="0.6" 
                />
                <motion.path 
                  animate={{ stroke: cursorType === "pointer" ? "#fecaca" : "#E5E5E5" }}
                  d="M1 1 L8 19" strokeWidth="0.4" opacity="0.3" 
                />
                <motion.path 
                  animate={{ stroke: cursorType === "pointer" ? "#fecaca" : "#E5E5E5" }}
                  d="M1 1 L19 8" strokeWidth="0.4" opacity="0.3" 
                />
                
                {/* Outer nodes */}
                <motion.circle 
                  animate={{ fill: cursorType === "pointer" ? "#ef4444" : "#FFFFFF" }}
                  cx="1" cy="1" r="1.5" 
                />
                <motion.circle 
                  animate={{ fill: cursorType === "pointer" ? "#ef4444" : "#FFFFFF" }}
                  cx="19" cy="8" r="1.5" 
                />
                <motion.circle 
                  animate={{ fill: cursorType === "pointer" ? "#ef4444" : "#FFFFFF" }}
                  cx="8" cy="19" r="1.5" 
                />
                
                {/* Inner nodes */}
                <motion.circle 
                  animate={{ fill: cursorType === "pointer" ? "#ff0000" : "#FFFFFF" }}
                  cx="11" cy="11" r="1.2" 
                />
                {cursorType === "pointer" && (
                  <motion.circle 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1.5, opacity: [0.5, 1, 0.5] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                    cx="11" cy="11" r="3" stroke="#ef4444" strokeWidth="0.5"
                  />
                )}
              </svg>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
