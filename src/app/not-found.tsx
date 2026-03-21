"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Container } from '@/components/global/Container';
import { ZeroLabsLogo } from '@/components/ui/ZeroLabsLogo';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white selection:bg-white selection:text-black pt-20">
      <Container className="max-w-xl text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 0.8 }}
          className="relative w-48 h-48 mx-auto mb-12"
        >
          <div className="absolute inset-0 bg-white/5 rounded-full blur-2xl animate-pulse"></div>
          <ZeroLabsLogo mode="navbar" className="w-full h-full opacity-20" />
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-7xl font-bold tracking-tighter mb-4"
        >
          404
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-neutral-500 font-mono text-sm uppercase tracking-[0.2em] mb-12"
        >
          [SYSTEM ERROR] RESOURCE NOT LOCATED
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Link 
            href="/"
            className="inline-flex items-center px-8 py-3 bg-white text-black text-xs font-bold uppercase tracking-widest hover:bg-neutral-200 transition-colors"
          >
            Return to Root
          </Link>
        </motion.div>
      </Container>
    </div>
  );
}
