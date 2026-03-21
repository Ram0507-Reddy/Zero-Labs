"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ZeroLabsLogo } from "@/components/ui/ZeroLabsLogo";

export function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Lock scrolling while the preloader is executing its cinematic sequence
    document.body.style.overflow = "hidden";
    
    // Unmount precisely after the animation sequence finishes
    const timer = setTimeout(() => {
      setIsLoading(false);
      document.body.style.overflow = "auto";
    }, 3200);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -40, filter: "blur(10px)" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[999999] flex flex-col items-center justify-center bg-black"
        >
          <div className="flex flex-col items-center gap-10">
            {/* Official Logo Drawing Animation */}
            <div className="w-56 md:w-80">
              <ZeroLabsLogo />
            </div>
            
            {/* Cinematic Typography Reveal */}
            <motion.div 
              initial={{ opacity: 0, y: 10, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
              className="flex items-center gap-2"
            >
                <span className="text-neutral-400 font-medium tracking-[0.2em] text-xs md:text-sm font-mono">WELCOME</span>
                <span className="text-neutral-600 font-medium tracking-[0.2em] text-xs md:text-sm font-mono">TO</span>
                <span className="text-white font-bold tracking-[0.3em] text-xs md:text-sm font-sans drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">ZERO LABS</span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
