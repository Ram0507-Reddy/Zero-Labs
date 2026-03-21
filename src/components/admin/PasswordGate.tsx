"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export function PasswordGate({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  // In a real production app this would interact with an API route or real Auth.
  // For a solo-SaaS fast-auth, we use a hardcoded client check.
  const ADMIN_SECRET = "zero"; 

  const handleSetup = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_SECRET) {
      setIsAuthenticated(true);
      setError(false);
    } else {
      setError(true);
      setPassword("");
    }
  };

  if (isAuthenticated) {
    return <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{children}</motion.div>;
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        <div className="flex items-center gap-3 mb-8">
          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span className="text-xs font-mono font-bold tracking-widest text-red-500 uppercase">Restricted Access</span>
        </div>
        
        <h1 className="text-4xl font-medium tracking-tight mb-2">Identify.</h1>
        <p className="text-neutral-500 text-sm mb-8">Enter the master clearance code to access the Command Center.</p>
        
        <form onSubmit={handleSetup} className="space-y-6">
          <div className="space-y-2 group">
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full bg-transparent border-b py-3 text-white focus:outline-none focus:border-white transition-colors tracking-widest font-mono
                ${error ? 'border-red-500/50' : 'border-neutral-800'}`}
              placeholder="••••••••"
              autoFocus
            />
            {error && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-500 text-xs font-mono uppercase tracking-widest mt-2">
                [ACCESS DENIED] OVERRIDE FAILED.
              </motion.p>
            )}
          </div>
          <button 
            type="submit" 
            className="w-full px-8 py-3 bg-white text-black font-semibold text-sm hover:opacity-90 transition-opacity"
          >
            AUTHORIZE
          </button>
        </form>
      </motion.div>
    </div>
  );
}
