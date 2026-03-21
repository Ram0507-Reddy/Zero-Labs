"use client";

import { motion, Variants } from 'framer-motion';
import Link from 'next/link';
import { ZeroLabsLogo } from '@/components/ui/ZeroLabsLogo';

export function Hero3D() {
  const brandingVars: Variants = {
    hidden: { opacity: 0, scale: 0.8, filter: 'blur(20px)' },
    show: {
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 0.8,
        ease: "easeOut" as const
      }
    }
  };

  const textVars: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVars: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
  };

  return (
    <section className="relative w-full min-h-screen pt-32 md:pt-40 pb-20 flex items-center justify-center bg-black overflow-hidden selection:bg-white selection:text-black">

      {/* Premium Dark Grid with subtle animation */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-[0.5]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black"></div>
        {/* Radial glow for branding - Dark Grey as requested */}
        <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neutral-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left: Branding Excellence */}
          <motion.div
            variants={brandingVars}
            initial="hidden"
            animate="show"
            className="flex flex-col items-center lg:items-center text-center space-y-8 order-2 lg:order-1"
          >
            <div className="relative w-full max-w-lg lg:max-w-2xl">
              <div className="relative aspect-square w-full max-w-[480px] md:max-w-[680px] mx-auto">
                <ZeroLabsLogo mode="hero" className="w-full h-full" />
              </div>
            </div>
          </motion.div>

          {/* Right: Core Value Proposition */}
          <motion.div
            variants={textVars}
            initial="hidden"
            animate="show"
            className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-8 lg:space-y-10 order-1 lg:order-2"
          >
            <motion.div variants={itemVars} className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-neutral-800 bg-white/5 backdrop-blur-sm mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neutral-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-neutral-100"></span>
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-400">System Genesis v1.0.4</span>
            </motion.div>

            <motion.h1 variants={itemVars} className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.1]">
              <span className="block text-white opacity-40 uppercase">
                PRIVACY IS THE
              </span>
              <span className="block text-white uppercase mt-1">
                DEFAULT STATE.
              </span>
            </motion.h1>

            <motion.p variants={itemVars} className="mt-8 text-neutral-400 max-w-lg text-base md:text-lg leading-relaxed font-medium">
              Privacy-first by design, delivering secure, reliable systems for high-trust and regulated environments.
              A <span className="text-white">sophisticated</span> environment where we build systems from scratch.
            </motion.p>

            <motion.div variants={itemVars} className="mt-12 flex flex-wrap items-center justify-center lg:justify-start gap-5">
              <Link
                href="/build"
                className="group relative inline-flex items-center justify-center px-10 py-4 rounded-full bg-white text-black font-bold text-sm tracking-widest uppercase transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]"
              >
                Initiate Build
              </Link>

              <Link
                href="/systems"
                className="px-10 py-4 rounded-full border border-neutral-800 bg-black/50 backdrop-blur-md text-white font-medium text-sm tracking-widest uppercase transition-all duration-300 hover:bg-neutral-900 hover:border-neutral-700"
              >
                Active Systems
              </Link>
            </motion.div>
          </motion.div>

        </div>
      </div>

      {/* Bottom fade for smoother transition */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent z-10"></div>
    </section>
  );
}
