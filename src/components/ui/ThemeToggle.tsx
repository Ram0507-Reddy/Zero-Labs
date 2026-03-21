"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-16 h-8 rounded-full bg-neutral-800" />;
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={`relative w-16 h-8 rounded-full focus:outline-none transition-colors duration-500 overflow-hidden ${
        isDark ? "bg-[#111827]" : "bg-sky-400"
      }`}
      aria-label="Toggle Dark Mode"
    >
      {/* Background Decor: Stars (Dark) vs Clouds/Sun Rays (Light) */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={false}
        animate={{ opacity: isDark ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="absolute top-2 left-2 w-1 h-1 bg-white rounded-full opacity-80" />
        <div className="absolute top-4 left-4 w-1.5 h-1.5 bg-neutral-300 rounded-full opacity-90" />
        <div className="absolute top-5 left-2 w-1 h-1 bg-white rounded-full opacity-60" />
      </motion.div>

      {/* The Toggle Knob (Sun / Moon) */}
      <motion.div
        className="absolute top-1 bottom-1 w-6 h-6 rounded-full flex items-center justify-center overflow-hidden"
        initial={false}
        animate={{
          x: isDark ? 32 : 4,
          backgroundColor: isDark ? "#e2e8f0" : "#fbbf24", // Moon color vs Sun color
        }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      >
        {/* Craters for the moon */}
        <motion.div
          animate={{ opacity: isDark ? 1 : 0 }}
          className="absolute inset-0"
        >
          <div className="absolute top-1 left-3 w-1.5 h-1.5 rounded-full bg-slate-300" />
          <div className="absolute top-3 left-1 w-1.5 h-1.5 rounded-full bg-slate-300" />
          <div className="absolute top-3 left-4 w-2 h-2 rounded-full bg-slate-200" />
        </motion.div>
      </motion.div>
    </button>
  );
}
