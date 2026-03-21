"use client";

import { motion } from "framer-motion";
import { Container } from "../global/Container";

const PHILOSOPHY_POINTS = [
  {
    title: "No Legacy Constraints",
    desc: "We build from zero. We reject technical debt inherited from outdated paradigms. Every system is intentionally designed from raw primitives."
  },
  {
    title: "A Controlled Baseline",
    desc: "Zero is not nothing. It is a strictly controlled environment where every variable is mathematically accounted for to guarantee fault-tolerance."
  },
  {
    title: "Architectural Precision",
    desc: "We don't assemble pieces; we engineer solutions. By maintaining absolute control over the stack, we achieve unprecedented scalability."
  }
];

export function Philosophy() {
  return (
    <section className="min-h-screen py-24 bg-black relative overflow-hidden transition-colors duration-500">
      <Container className="max-w-[1200px] mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 relative">
          
          {/* Sticky Left: Title */}
          <div className="lg:col-span-5 relative">
            <div className="sticky top-32 h-auto">
              <motion.h2 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-6xl font-semibold tracking-tighter text-foreground mb-8 leading-[1.05]"
              >
                THE ZERO <br /> PHILOSOPHY.
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-muted text-base md:text-lg font-medium leading-relaxed max-w-sm"
              >
                Our approach to systems engineering is uncompromising. We do not inherit architectural problems; we engineer solutions from the ground up.
              </motion.p>
            </div>
          </div>

          {/* Scrolling Right: Content */}
          <div className="lg:col-span-6 lg:col-start-7 flex flex-col gap-24 mt-16 lg:mt-0 relative pb-16">
            
            {/* Background Line */}
            <div className="absolute top-0 bottom-0 left-0 w-px bg-neutral-800 ml-[11px] md:ml-[15px] z-0"></div>

            {PHILOSOPHY_POINTS.map((point, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-150px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative pl-12 md:pl-16 z-10"
              >
                <div className="absolute top-1 left-0 w-6 h-6 bg-background border-[3px] border-foreground rounded-full shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-colors"></div>
                <h3 className="text-2xl font-semibold tracking-tight text-foreground mb-5">
                  {point.title}
                </h3>
                <p className="text-base md:text-lg text-muted leading-relaxed max-w-lg">
                  {point.desc}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </Container>
    </section>
  );
}
