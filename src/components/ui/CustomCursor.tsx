"use client";

import { useEffect, useState, useMemo } from "react";
import { motion, useSpring, useMotionValue, AnimatePresence } from "framer-motion";

type CursorType = 
  | "default" 
  | "pointer" 
  | "text" 
  | "help" 
  | "wait" 
  | "progress" 
  | "not-allowed" 
  | "move" 
  | "crosshair"
  | "ns-resize"
  | "ew-resize"
  | "nesw-resize"
  | "nwse-resize"
  | "alias"
  | "copy";

export function CustomCursor() {
  const [cursorType, setCursorType] = useState<CursorType>("default");
  const [isVisible, setIsVisible] = useState(false);
  
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 40, stiffness: 800, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    if (typeof window === "undefined" || window.matchMedia("(pointer: coarse)").matches) return;
    
    // Decouple mount from render to avoid cascading render warning
    requestAnimationFrame(() => setIsVisible(true));

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      const target = e.target as HTMLElement;
      if (!target) return;

      const computedCursor = window.getComputedStyle(target).cursor;
      
      // Map standard cursors to our geometric set
      switch (computedCursor) {
        case "pointer": setCursorType("pointer"); break;
        case "text": setCursorType("text"); break;
        case "help": setCursorType("help"); break;
        case "wait": setCursorType("wait"); break;
        case "progress": setCursorType("progress"); break;
        case "not-allowed": setCursorType("not-allowed"); break;
        case "move": setCursorType("move"); break;
        case "crosshair": setCursorType("crosshair"); break;
        case "n-resize": case "s-resize": case "ns-resize": setCursorType("ns-resize"); break;
        case "e-resize": case "w-resize": case "ew-resize": setCursorType("ew-resize"); break;
        case "ne-resize": case "sw-resize": case "nesw-resize": setCursorType("nesw-resize"); break;
        case "nw-resize": case "se-resize": case "nwse-resize": setCursorType("nwse-resize"); break;
        case "alias": setCursorType("alias"); break;
        case "copy": setCursorType("copy"); break;
        default: setCursorType("default");
      }
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
        style={{ x: cursorX, y: cursorY }}
      >
        <AnimatePresence mode="popLayout">
           <CursorGraphic type={cursorType} key={cursorType} />
        </AnimatePresence>
      </motion.div>
    </>
  );
}

function CursorGraphic({ type }: { type: CursorType }) {
  // Common animation variants
  const defaultVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.8, opacity: 0 },
  };

  const colors = {
    white: "#FFFFFF",
    grey: "#E5E5E5",
    muted: "rgba(115, 115, 115, 0.9)",
    red: "#ef4444",
    redMuted: "rgba(239, 68, 68, 0.4)",
  };

  // 1. Default / Pointing
  if (type === "default") {
    return (
      <motion.div {...defaultVariants} className="relative -translate-x-[2px] -translate-y-[2px]">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
          <path d="M1 1 L19 8 L11 11 L8 19 Z" fill={colors.muted} stroke={colors.grey} strokeWidth="1.2" strokeLinejoin="round"/>
          <path d="M1 1 L11 11" stroke={colors.grey} strokeWidth="0.8" opacity="0.6" />
          <path d="M19 8 L8 19" stroke={colors.grey} strokeWidth="0.8" opacity="0.6" />
          <circle cx="1" cy="1" r="1.5" fill={colors.white}/>
          <circle cx="19" cy="8" r="1.5" fill={colors.white}/>
          <circle cx="8" cy="19" r="1.5" fill={colors.white}/>
          <circle cx="11" cy="11" r="1.2" fill={colors.white}/>
        </svg>
      </motion.div>
    );
  }

  // 2. Link / Pointer
  if (type === "pointer") {
    return (
      <motion.div {...defaultVariants} className="relative -translate-x-[2px] -translate-y-[2px]">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
           {/* Polyhedral Base with Red Accent */}
           <path d="M1 1 L19 8 L11 11 L8 19 Z" fill={colors.redMuted} stroke={colors.red} strokeWidth="1.2" strokeLinejoin="round"/>
           <path d="M1 1 L11 11" stroke={colors.red} strokeWidth="0.8" opacity="0.6" />
           <path d="M19 8 L8 19" stroke={colors.red} strokeWidth="0.8" opacity="0.6" />
           
           {/* Chain Link Icon Underneath */}
           <path d="M12 16 C12 18.2 13.8 20 16 20 C18.2 20 20 18.2 20 16" stroke={colors.red} strokeWidth="1.5" strokeLinecap="round" />
           <path d="M14 18 C14 15.8 15.8 14 18 14 C20.2 14 22 15.8 22 18" stroke={colors.red} strokeWidth="1.5" strokeLinecap="round" />
           
           <circle cx="1" cy="1" r="1.5" fill={colors.red}/>
           <circle cx="19" cy="8" r="1.5" fill={colors.red}/>
           <circle cx="8" cy="19" r="1.5" fill={colors.red}/>
           <circle cx="11" cy="11" r="1.2" fill={colors.red}/>
           <motion.circle 
              animate={{ scale: [1, 2], opacity: [0.5, 0] }}
              transition={{ repeat: Infinity, duration: 1 }}
              cx="11" cy="11" r="3" stroke={colors.red} strokeWidth="0.5" 
            />
        </svg>
      </motion.div>
    );
  }

  // 3. Text Select
  if (type === "text") {
    return (
      <motion.div {...defaultVariants} className="relative -translate-x-1/2 -translate-y-1/2">
        <svg width="24" height="32" viewBox="0 0 16 24" fill="none">
           {/* Geometric I-beam */}
           <path d="M4 2 L12 2" stroke={colors.white} strokeWidth="1.5" strokeLinecap="round" />
           <path d="M4 22 L12 22" stroke={colors.white} strokeWidth="1.5" strokeLinecap="round" />
           <path d="M8 2 L8 22" stroke={colors.red} strokeWidth="2" />
           
           {/* Node points */}
           <circle cx="8" cy="2" r="2" fill={colors.white} />
           <circle cx="4" cy="2" r="1" fill={colors.grey} />
           <circle cx="12" cy="2" r="1" fill={colors.grey} />
           <circle cx="8" cy="22" r="2" fill={colors.white} />
           <circle cx="4" cy="22" r="1" fill={colors.grey} />
           <circle cx="12" cy="22" r="1" fill={colors.grey} />
           
           <path d="M4 2 L8 12 L12 2" stroke={colors.grey} strokeWidth="0.5" opacity="0.3" />
           <path d="M4 22 L8 12 L12 22" stroke={colors.grey} strokeWidth="0.5" opacity="0.3" />
        </svg>
      </motion.div>
    );
  }

  // 4. Help Select
  if (type === "help") {
    return (
      <motion.div {...defaultVariants} className="relative -translate-x-[2px] -translate-y-[2px]">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
          <path d="M1 1 L19 8 L11 11 L8 19 Z" fill={colors.muted} stroke={colors.grey} strokeWidth="1.2" strokeLinejoin="round"/>
          {/* Question mark cluster */}
          <path d="M14 2 C16 2 17 3 17 4.5 C17 6 16 6.5 15 7.5 C14.5 8 14.5 9 14.5 9" stroke={colors.white} strokeWidth="1.2" strokeLinecap="round" />
          <circle cx="14.5" cy="11.5" r="1" fill={colors.white} />
          
          <circle cx="1" cy="1" r="1.5" fill={colors.white}/>
          <circle cx="19" cy="8" r="1.5" fill={colors.white}/>
          <circle cx="11" cy="11" r="1.2" fill={colors.white}/>
        </svg>
      </motion.div>
    );
  }

  // 5. Busy / Wait
  if (type === "wait") {
    return (
      <motion.div {...defaultVariants} className="relative -translate-x-1/2 -translate-y-1/2">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
          {/* Hourglass Geometric */}
          <path d="M6 4 L18 4 L12 12 L6 20 L18 20" stroke={colors.grey} strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M6 4 L18 20" stroke={colors.grey} strokeWidth="0.5" opacity="0.5" />
          <path d="M18 4 L6 20" stroke={colors.grey} strokeWidth="0.5" opacity="0.5" />
          
          <motion.circle 
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            cx="12" cy="12" r="8" stroke={colors.red} strokeWidth="1" strokeDasharray="4 4" 
          />
          
          <circle cx="12" cy="4" r="1.5" fill={colors.white} />
          <circle cx="12" cy="20" r="1.5" fill={colors.white} />
          <circle cx="12" cy="12" r="2" fill={colors.red} />
        </svg>
      </motion.div>
    );
  }

  // 6. Working in background
  if (type === "progress") {
    return (
      <motion.div {...defaultVariants} className="relative -translate-x-[2px] -translate-y-[2px]">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
          <path d="M1 1 L19 8 L11 11 L8 19 Z" fill={colors.muted} stroke={colors.grey} strokeWidth="1.2" strokeLinejoin="round"/>
          <motion.circle 
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            cx="18" cy="18" r="4" stroke={colors.grey} strokeWidth="1" strokeDasharray="3 3" 
          />
          <circle cx="1" cy="1" r="1.5" fill={colors.white}/>
        </svg>
      </motion.div>
    );
  }

  // 7. Unavailable / Not Allowed
  if (type === "not-allowed") {
    return (
      <motion.div {...defaultVariants} className="relative -translate-x-[2px] -translate-y-[2px]">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
           <path d="M1 1 L19 8 L11 11 L8 19 Z" fill="rgba(60,60,60,0.8)" stroke="#555" strokeWidth="1.2" strokeLinejoin="round"/>
           {/* Red strike through bar */}
           <motion.rect 
             initial={{ width: 0 }}
             animate={{ width: 30 }}
             x="-2" y="10" height="3" fill={colors.red} transform="rotate(-45, 10, 10)" opacity="0.8" 
           />
           <circle cx="1" cy="1" r="1.5" fill="#888"/>
        </svg>
      </motion.div>
    );
  }

  // 8. Precision Select / Crosshair
  if (type === "crosshair") {
    return (
      <motion.div {...defaultVariants} className="relative -translate-x-1/2 -translate-y-1/2">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
           <path d="M12 2 L12 22 M2 12 L22 12" stroke={colors.white} strokeWidth="1" />
           {/* Geometric tips */}
           <path d="M12 2 L10 5 L14 5 Z" fill={colors.grey} />
           <path d="M12 22 L10 19 L14 19 Z" fill={colors.grey} />
           <path d="M2 12 L5 10 L5 14 Z" fill={colors.grey} />
           <path d="M22 12 L19 10 L19 14 Z" fill={colors.grey} />
           
           <circle cx="12" cy="12" r="1.5" fill={colors.red} />
           <circle cx="12" cy="12" r="6" stroke={colors.grey} strokeWidth="0.5" opacity="0.3" />
        </svg>
      </motion.div>
    );
  }

  // 9. Move / All Direction
  if (type === "move") {
    return (
      <motion.div {...defaultVariants} className="relative -translate-x-1/2 -translate-y-1/2">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
           <path d="M12 4 L12 20 M4 12 L20 12" stroke={colors.white} strokeWidth="1.5" />
           {/* Polyhedral heads */}
           <path d="M12 2 L8 6 L16 6 Z" fill={colors.white} />
           <path d="M12 22 L8 18 L16 18 Z" fill={colors.white} />
           <path d="M2 12 L6 8 L6 16 Z" fill={colors.white} />
           <path d="M22 12 L18 8 L18 16 Z" fill={colors.white} />
           <circle cx="12" cy="12" r="1.5" fill={colors.red} />
        </svg>
      </motion.div>
    );
  }

  // 10-13. Resizes
  if (type.includes("resize")) {
    const isVertical = type === "ns-resize";
    const isHorizontal = type === "ew-resize";
    const isDiag1 = type === "nwse-resize"; // \
    const isDiag2 = type === "nesw-resize"; // /

    return (
      <motion.div {...defaultVariants} className="relative -translate-x-1/2 -translate-y-1/2">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" style={{ 
          transform: isVertical ? "none" : 
                    isHorizontal ? "rotate(90deg)" : 
                    isDiag1 ? "rotate(45deg)" : "rotate(-45deg)" 
        }}>
           <path d="M12 4 L12 20" stroke={colors.white} strokeWidth="1.5" />
           <path d="M12 2 L8 6 L16 6 Z" fill={colors.white} />
           <path d="M12 22 L8 18 L16 18 Z" fill={colors.white} />
           <circle cx="12" cy="4" r="1.5" fill={colors.grey} />
           <circle cx="12" cy="20" r="1.5" fill={colors.grey} />
        </svg>
      </motion.div>
    );
  }

  // 14. Alias / Alternate Select (Star)
  if (type === "alias") {
    return (
      <motion.div {...defaultVariants} className="relative -translate-x-1/2 -translate-y-1/2">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
           <path d="M12 2 L14.5 9 L22 9 L16 14 L18 21 L12 17 L6 21 L8 14 L2 9 L9.5 9 Z" fill={colors.muted} stroke={colors.grey} strokeWidth="1.2" strokeLinejoin="round" />
           <path d="M12 2 L12 17 M2 9 L22 9 M12 17 L6 21 M12 17 L18 21" stroke={colors.grey} strokeWidth="0.5" opacity="0.4" />
           <circle cx="12" cy="2" r="1.5" fill={colors.white} />
           <circle cx="2" cy="9" r="1.5" fill={colors.white} />
           <circle cx="22" cy="9" r="1.5" fill={colors.white} />
           <circle cx="12" cy="17" r="2" fill={colors.red} />
        </svg>
      </motion.div>
    );
  }

  // 15. Copy / Handwrite (Pencil)
  if (type === "copy") {
     return (
       <motion.div {...defaultVariants} className="relative -translate-x-[2px] -translate-y-[22px] rotate-[20deg]">
         <svg width="32" height="40" viewBox="0 0 16 32" fill="none">
            <path d="M8 30 L2 24 L2 4 L14 4 L14 24 Z" fill={colors.muted} stroke={colors.grey} strokeWidth="1.2" />
            <path d="M8 30 L14 24" stroke={colors.grey} strokeWidth="1.2" />
            <path d="M2 4 L14 24 M14 4 L2 24" stroke={colors.grey} strokeWidth="0.5" opacity="0.3" />
            <circle cx="8" cy="30" r="2" fill={colors.red} />
            <circle cx="2" cy="4" r="1.5" fill={colors.white} />
            <circle cx="14" cy="4" r="1.5" fill={colors.white} />
         </svg>
       </motion.div>
     );
  }

  return null;
}
