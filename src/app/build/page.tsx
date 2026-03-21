"use client";

import { Container } from '@/components/global/Container';
import { FormEvent, useState } from 'react';
import { motion } from 'framer-motion';
import { transmitAction } from '@/app/actions/transmit';

export default function BuildRequestPage() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error' | 'ratelimited'>('idle');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    
    console.log("[TELEMETRY] Server Pipeline Initialized.");
    const formData = new FormData(e.currentTarget);
    
    const rawData = {
      name: (formData.get('name') as string) || '',
      email: (formData.get('email') as string) || '',
      budget: (formData.get('budget') as string) || '',
      timeline: (formData.get('timeline') as string) || '',
      projectDetails: (formData.get('description') as string) || '',
    };

    const res = await transmitAction(rawData);

    if (res.error === '429_TOO_MANY_REQUESTS') {
      setStatus('ratelimited');
    } else if (res.error) {
      console.error("[CRITICAL TRANSMISSION ERROR]", res.error);
      setStatus('error');
    } else {
      setStatus('success');
      (e.target as HTMLFormElement).reset();
    }
  }

  const containerVars = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, staggerChildren: 0.1 } }
  };

  const itemVars = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0, transition: { duration: 0.4 } }
  };

  return (
    <motion.div 
      initial="hidden" 
      animate="show" 
      variants={containerVars}
      className="pt-24 pb-32 bg-black min-h-[90vh]"
    >
      <Container className="max-w-2xl">
        <motion.div variants={itemVars} className="mb-16">
          <h1 className="text-5xl font-medium tracking-tighter mb-6 text-white">
            INITIATE BUILD
          </h1>
          <p className="text-lg text-neutral-400">
            Submit your parameters. We will review the specifications and determine if the project aligns with our operational capabilities.
          </p>
        </motion.div>

        <motion.form variants={itemVars} onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2 group">
              <label htmlFor="name" className="block text-xs uppercase tracking-widest text-neutral-500 group-focus-within:text-white transition-colors">
                Designation (Name)
              </label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                required
                className="w-full bg-transparent border-b border-neutral-800 py-3 text-white focus:outline-none focus:border-white transition-colors"
                placeholder="John Doe"
              />
            </div>

            <div className="space-y-2 group">
              <label htmlFor="email" className="block text-xs uppercase tracking-widest text-neutral-500 group-focus-within:text-white transition-colors">
                Communication Vector (Email)
              </label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                required
                className="w-full bg-transparent border-b border-neutral-800 py-3 text-white focus:outline-none focus:border-white transition-colors"
                placeholder="john@example.com"
              />
            </div>
          </div>

          <div className="space-y-2 group">
            <label htmlFor="description" className="block text-xs uppercase tracking-widest text-neutral-500 group-focus-within:text-white transition-colors">
              System Parameters (Project Details)
            </label>
            <textarea 
              id="description" 
              name="description" 
              required
              rows={4}
              className="w-full bg-transparent border-b border-neutral-800 py-3 text-white focus:outline-none focus:border-white transition-colors resize-none"
              placeholder="Describe the architectural requirements..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2 group">
              <label htmlFor="budget" className="block text-xs uppercase tracking-widest text-neutral-500 group-focus-within:text-white transition-colors">
                Allocated Resources (Budget)
              </label>
              <input 
                type="text" 
                id="budget" 
                name="budget" 
                className="w-full bg-transparent border-b border-neutral-800 py-3 text-white focus:outline-none focus:border-white transition-colors"
                placeholder="e.g. $50k+"
              />
            </div>

            <div className="space-y-2 group">
              <label htmlFor="timeline" className="block text-xs uppercase tracking-widest text-neutral-500 group-focus-within:text-white transition-colors">
                Deployment Target (Timeline)
              </label>
              <input 
                type="text" 
                id="timeline" 
                name="timeline" 
                className="w-full bg-transparent border-b border-neutral-800 py-3 text-white focus:outline-none focus:border-white transition-colors"
                placeholder="e.g. Q3 2024"
              />
            </div>
          </div>

          <motion.div variants={itemVars} className="pt-8">
            <button 
              type="submit" 
              disabled={status === 'loading' || status === 'success' || status === 'ratelimited'}
              className="group relative w-full md:w-auto px-12 py-4 bg-white text-black font-semibold tracking-wide overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="absolute inset-0 w-full h-full bg-neutral-200 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out z-0"></div>
              <span className="relative z-10 transition-colors duration-300">
                {status === 'loading' ? 'TRANSMITTING...' : 
                 status === 'success' ? 'TRANSMITTING COMPLETE' : 
                 status === 'ratelimited' ? 'LOCKED: RATE LIMIT ACTIVE' :
                 'TRANSMIT REQUEST'}
              </span>
            </button>

            {status === 'success' && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 text-sm text-green-500 font-mono tracking-wide">
                [SUCCESS] Transmission received. We will respond shortly.
              </motion.p>
            )}

            {status === 'ratelimited' && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 text-xs text-red-500 font-mono tracking-widest uppercase">
                [SYSTEM LOCKOUT] Transmission rate exceeded. Wait 60s.
              </motion.p>
            )}
            
            {status === 'error' && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 text-sm text-red-500 font-mono tracking-wide">
                [ERROR] Transmission failed. Please try again.
              </motion.p>
            )}
          </motion.div>
        </motion.form>
      </Container>
    </motion.div>
  );
}
