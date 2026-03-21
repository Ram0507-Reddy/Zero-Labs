"use client";

import { motion } from "framer-motion";
import { Container } from "../global/Container";

export function FounderMessage() {
  return (
    <section className="py-24 bg-black relative overflow-hidden transition-colors duration-500 border-y border-neutral-900/50">
      <Container className="max-w-[1000px] mx-auto px-6 md:px-8">
        <div className="flex flex-col md:flex-row gap-16 md:gap-24">
          
          {/* Left Column: Heading & Signature */}
          <div className="w-full md:w-1/3 flex flex-col gap-12">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center bg-card-bg shadow-inner"
            >
              <svg className="w-4 h-4 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </motion.div>
            
            <div>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-xl font-semibold tracking-tight text-foreground mb-2"
              >
                From the desk of the founder
              </motion.h2>
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="w-10 h-[2px] bg-foreground opacity-20"
              />
            </div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="mt-auto hidden md:block"
            >
              <p className="text-foreground font-semibold tracking-tight uppercase text-xs mb-1">Shriram Reddy</p>
              <p className="text-muted text-[10px] tracking-widest uppercase">FOUNDER & SECURITY LEAD</p>
              <p className="text-muted/50 text-[10px] tracking-[0.2em] font-mono mt-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-neutral-700 inline-block animate-pulse"></span>
                DATA
              </p>
            </motion.div>
          </div>

          {/* Right Column: Letter Content */}
          <div className="w-full md:w-2/3">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg md:text-xl leading-[1.8] text-muted space-y-8"
            >
              <p>
                <span className="text-foreground font-semibold tracking-tighter">ZERO</span> was not started to compete with existing platforms. It was started because something fundamental was missing.
              </p>
              <p>
                Today&apos;s technology landscape prioritizes speed, scale, and growth — often at the cost of privacy, control, and long-term trust. Systems are built to extract data, lock users into subscriptions, and centralize power.
              </p>
              <div className="pl-6 border-l-2 border-border text-foreground italic my-12 py-2">
                <p>
                  &quot;I believe privacy should not be a feature you enable.<br />
                  <span className="font-semibold not-italic text-foreground">It should be the default state of a system.</span>&quot;
                </p>
              </div>
            </motion.div>
            
            {/* Signature for mobile */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="mt-16 md:hidden block"
            >
              <p className="text-foreground font-semibold tracking-tight uppercase text-xs mb-1">Shriram Reddy</p>
              <p className="text-muted text-[10px] tracking-widest uppercase">FOUNDER & SECURITY LEAD</p>
              <p className="text-muted/50 text-[10px] tracking-[0.2em] font-mono mt-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-muted/20 inline-block animate-pulse"></span>
                DATA
              </p>
            </motion.div>
          </div>

        </div>
      </Container>
    </section>
  );
}
