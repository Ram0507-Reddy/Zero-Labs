"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/global/Container";
import Link from 'next/link';

export function FinalCTA() {
  return (
    <section className="py-24 bg-white relative overflow-hidden transition-colors duration-500">
      <Container className="flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl"
        >
          <h2 className="text-2xl md:text-4xl font-medium text-black tracking-tight leading-tight">
            Not every problem needs a solution.<br/>
            But if yours does — we’ll build it.
          </h2>
          <div className="mt-12">
            <Link 
              href="/build"
              className="inline-flex h-12 px-8 items-center justify-center bg-black text-white font-medium text-sm hover:opacity-90 transition-all duration-150 rounded-full shadow-lg"
            >
              Submit Request
            </Link>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
