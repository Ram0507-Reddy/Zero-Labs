"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/global/Container";
import Link from 'next/link';

export function Hero() {
  return (
    <section className="pt-40 pb-32 md:pt-52 md:pb-40">
      <Container>
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="max-w-4xl"
        >
          <h1 className="text-5xl md:text-7xl font-medium tracking-tighter leading-tight">
            Systems built from zero.
          </h1>
          <p className="mt-6 text-neutral-400 max-w-xl text-lg md:text-xl leading-relaxed">
            We engineer fault-tolerant architecture. No assumptions. No dependency.
          </p>
          <div className="mt-12">
            <Link 
              href="/build"
              className="inline-flex h-12 px-8 items-center justify-center bg-white text-black font-medium text-sm hover:bg-neutral-200 transition-colors duration-150"
            >
              Request Build
            </Link>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
