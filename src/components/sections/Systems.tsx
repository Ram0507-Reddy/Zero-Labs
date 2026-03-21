"use client";

import { motion } from "framer-motion";
import { Container } from "../global/Container";
import Link from 'next/link';

export function Systems() {
  return (
    <section id="systems" className="py-24 bg-white relative overflow-hidden transition-colors duration-500">
      <Container className="max-w-[1200px] mx-auto px-6 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
          <div>
            <h2 className="text-3xl md:text-5xl font-medium tracking-tighter text-black mb-4">
              ACTIVE SYSTEMS
            </h2>
            <p className="text-neutral-500 text-base md:text-lg max-w-xl">
              Real-time telemetry and operational status of our primary infrastructure clusters.
            </p>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="w-full border border-neutral-200 rounded-3xl p-12 md:p-24 flex flex-col items-center justify-center text-center bg-neutral-50"
        >
          {/* Construction Spinner */}
          <div className="w-12 h-12 border-[3px] border-neutral-200 border-t-black rounded-full animate-spin mb-10 shadow-sm"></div>
          
          <h3 className="text-xl md:text-3xl font-semibold tracking-tight text-black mb-4">
            INFRASTRUCTURE UNDER CONSTRUCTION
          </h3>
          <p className="text-neutral-500 text-base md:text-lg max-w-md mx-auto mb-10 leading-relaxed">
            We are currently engineering our foundational architecture from zero. Public telemetry and live operational nodes will be brought online shortly.
          </p>
          
          <Link 
            href="/build" 
            className="px-10 py-4 bg-black text-white rounded-full font-medium text-sm transition-transform hover:scale-105 shadow-[0_0_20px_rgba(0,0,0,0.1)]"
          >
            Deploy Architecture
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}
