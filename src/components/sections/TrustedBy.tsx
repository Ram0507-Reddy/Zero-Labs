"use client";

import { motion } from "framer-motion";

const CORE_PRIMITIVES = [
  "FAULT-TOLERANT", "ZERO-DEPENDENCY", "MATHEMATICAL-PRECISION", "100%-UPTIME", "DISTRIBUTED-LEDGER", "AUTONOMOUS", "QUANTUM-RESISTANT"
];

export function TrustedBy() {
  return (
    <section className="relative w-full py-12 overflow-hidden bg-white dark:bg-black transition-colors duration-500 z-10 border-y border-neutral-200 dark:border-white/5">
      
      {/* Edge Gradient Fades */}
      <div className="absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-white dark:from-black to-transparent z-10 pointer-events-none"></div>
      <div className="absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-white dark:from-black to-transparent z-10 pointer-events-none"></div>

      <div className="flex items-center">
        <span className="shrink-0 px-8 text-xs font-mono uppercase tracking-widest text-neutral-400 dark:text-neutral-600 z-20 bg-white dark:bg-black">
          CORE PRIMITIVES
        </span>
        
        <div className="flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
          <motion.div
            className="flex items-center gap-24 whitespace-nowrap"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 25,
            }}
          >
            {/* Double the array for seamless infinite looping */}
            {[...CORE_PRIMITIVES, ...CORE_PRIMITIVES].map((term, idx) => (
              <div 
                key={idx} 
                className="flex items-center justify-center font-bold tracking-tighter text-2xl text-neutral-200 dark:text-neutral-800"
              >
                {term}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
