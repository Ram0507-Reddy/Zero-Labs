"use client";

import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';

export function Navbar() {
  const { scrollY } = useScroll();
  const width = useTransform(scrollY, [0, 100], ["100%", "95%"]);
  const y = useTransform(scrollY, [0, 100], [24, 16]);

  return (
    <motion.header
      style={{ width, y, left: 0, right: 0, margin: "0 auto" }}
      className="fixed z-50 max-w-5xl px-4"
    >
      <div className="relative flex items-center justify-between h-16 px-6 bg-black/80 backdrop-blur-xl border border-white/10 rounded-full shadow-[0_8px_32px_-8px_rgba(0,0,0,0.3)] transition-colors duration-500">

        {/* Left: Branding */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center opacity-90 hover:opacity-100 transition-opacity">
            <div className="relative h-16 w-72 flex items-center justify-start">
              <Image
                src="/Navbar_Logo.svg"
                alt="Zero Labs"
                width={400}
                height={100}
                priority
                className="w-auto h-full transition-all duration-300 transform scale-[2.6] md:scale-[2.4] origin-left object-contain translate-y-1 md:translate-y-1.5"
              />
            </div>
          </Link>
        </div>

        {/* Right: Navigation Links & Icons */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/systems" className="text-xs font-semibold uppercase tracking-widest text-neutral-400 hover:text-white transition-colors">
            Systems
          </Link>
          <Link href="/about" className="text-xs font-semibold uppercase tracking-widest text-neutral-400 hover:text-white transition-colors">
            About
          </Link>
          <Link href="/build" className="text-xs font-semibold uppercase tracking-widest text-neutral-400 hover:text-white transition-colors mr-4">
            Deploy
          </Link>

          <div className="flex items-center gap-4 text-neutral-500">
            {/* Minimal Icons mimicking reference image */}
            <a href="https://github.com/devzeroapi-ship-it" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-white transition-colors">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
            </a>
            <a href="https://www.linkedin.com/company/zero-lab-s" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-white transition-colors">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z M2 9h4v12H2z M4 2a2 2 0 1 1-2 2 2 2 0 0 1 2-2z"></path></svg>
            </a>
            <a href="https://www.instagram.com/zero.dev_" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-white transition-colors">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
          </div>
            <div className="hidden md:flex items-center gap-6">
            <Link
              href="/build"
              className="px-6 py-2.5 bg-white text-black hover:bg-neutral-200 transition-all rounded-full text-xs font-bold tracking-widest uppercase shadow-lg shadow-black/20"
            >
              Initiate Build
            </Link>
          </div>
        </nav>

        {/* Mobile Nav Spacer */}
        <div className="flex md:hidden items-center gap-4">
          <Link href="/build" className="text-xs font-medium border border-white/20 hover:bg-white/5 px-4 py-2 rounded-full transition-all text-white">
            Deploy
          </Link>
        </div>

      </div>
    </motion.header>
  );
}
