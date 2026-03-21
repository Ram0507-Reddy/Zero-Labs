'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { loginAction } from '@/app/actions/auth';
import { ZeroLabsLogo } from '@/components/ui/ZeroLabsLogo';

export default function AdminLogin() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    const formData = new FormData(e.currentTarget);
    const res = await loginAction(formData);
    
    if (res?.error) {
      setError(res.error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020202] text-white flex flex-col items-center justify-center p-6 selection:bg-red-500/30">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-[400px] w-full flex flex-col items-center"
      >
        <div className="w-48 h-24 mb-16 opacity-80">
          <ZeroLabsLogo mode="navbar" />
        </div>
        
        <div className="w-full bg-[#050505] border border-white/[0.05] rounded-xl p-10 relative overflow-hidden ring-1 ring-white/[0.02] shadow-2xl">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-red-500/80" />
          
          <h2 className="text-white text-xl font-mono tracking-widest uppercase mb-1">Restricted Zone</h2>
          <p className="text-neutral-500 text-xs mb-10 font-mono tracking-wider">Intercept vector requires master key.</p>
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input 
              type="password"
              name="password"
              placeholder="ENTER PASSCODE"
              autoComplete="off"
              autoFocus
              className="w-full bg-black border border-white/10 text-white font-mono px-4 py-4 text-sm rounded-lg focus:outline-none focus:border-red-500/50 transition-colors placeholder:text-neutral-700 tracking-widest"
            />
            
            <AnimatePresence>
              {error && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <span className="text-red-500 text-[10px] font-mono tracking-widest block pt-2">
                    [ERROR] {error}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
            
            <button 
              type="submit"
              disabled={loading}
              className="mt-6 w-full bg-white text-black font-bold font-mono text-sm tracking-widest uppercase py-4 rounded-lg hover:bg-neutral-200 transition-colors disabled:opacity-50"
            >
              {loading ? 'AUTHENTICATING...' : 'AUTHORIZE'}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
