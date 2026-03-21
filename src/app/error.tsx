"use client";

import { useEffect } from 'react';
import { Container } from '@/components/global/Container';
import { motion } from 'framer-motion';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Optionally log the error to an observability provider like Sentry
    console.error("[CRITICAL SYSTEM FAULT]", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white p-6">
      <Container className="max-w-xl border border-red-900/50 bg-red-950/5 p-12 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-8"
        >
          <div className="inline-flex items-center space-x-3 text-red-500 font-mono text-xs uppercase tracking-[0.3em]">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
            <span>Critical Exception Detected</span>
          </div>

          <h2 className="text-4xl font-bold tracking-tight">
            System Failure
          </h2>

          <div className="p-4 bg-black/40 border border-neutral-800 rounded font-mono text-[10px] text-neutral-500 overflow-auto max-h-32">
            {error.message || "An unexpected error occurred in the execution kernel."}
            {error.digest && <div className="mt-2 opacity-50">Digest: {error.digest}</div>}
          </div>

          <div className="flex flex-wrap gap-4 pt-4">
            <button
              onClick={() => reset()}
              className="px-8 py-3 bg-white text-black text-xs font-bold uppercase tracking-widest hover:bg-neutral-200 transition-colors"
            >
              Reboot Process
            </button>
            <a
              href="/"
              className="px-8 py-3 border border-neutral-800 text-white text-xs font-bold uppercase tracking-widest hover:bg-neutral-900 transition-colors"
            >
              Emergency Exit
            </a>
          </div>
        </motion.div>
      </Container>
    </div>
  );
}
