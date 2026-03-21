"use client";

import { motion } from 'framer-motion';
import { ZeroLabsLogo } from '@/components/ui/ZeroLabsLogo';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black">
      <div className="relative w-64 h-64 md:w-80 md:h-80">
        {/* Subtle radial glow background */}
        <div className="absolute inset-0 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 w-full h-full"
        >
          <ZeroLabsLogo mode="hero" className="w-full h-full" />
        </motion.div>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="mt-8 flex flex-col items-center space-y-2"
      >
        <div className="text-[10px] uppercase tracking-[0.4em] font-bold text-neutral-500 animate-pulse">
          Initializing System
        </div>
        <div className="flex space-x-1">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ 
                opacity: [0.2, 1, 0.2],
                scale: [1, 1.2, 1]
              }}
              transition={{ 
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2
              }}
              className="w-1 h-1 bg-white rounded-full"
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
