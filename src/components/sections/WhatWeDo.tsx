"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/global/Container";

export function WhatWeDo() {
  return (
    <section className="py-12 md:py-20 bg-white relative z-10 w-full overflow-hidden">
      <Container className="max-w-[1000px] mx-auto px-6 md:px-8">
        
        {/* Sleek Typography Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-start text-left max-w-4xl mx-auto"
        >
          <h2 className="text-sm font-bold tracking-widest text-neutral-400 uppercase mb-4">Core Primitives</h2>
          <h3 className="text-3xl md:text-5xl lg:text-6xl font-semibold tracking-tighter text-black leading-[1.05]">
            Engineered for scale.<br/>
            <span className="text-neutral-400 font-medium tracking-tight">Built for resilience.</span>
          </h3>
          <p className="text-lg md:text-xl text-neutral-500 mt-6 font-medium max-w-2xl">
             We bypass traditional constraints to deliver raw, uncompromised infrastructure. Your dedicated substrate awaits.
          </p>
        </motion.div>
      </Container>
    </section>
  );
}
