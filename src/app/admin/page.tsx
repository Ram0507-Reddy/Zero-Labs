"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/global/Container";

export default function AdminDashboard() {
  const [requests, setRequests] = useState<any[]>([]);

  useEffect(() => {
    let unsubscribe: () => void;
    
    async function setupStream() {
      try {
        const { collection, onSnapshot, query, orderBy } = await import('firebase/firestore');
        const { db } = await import('@/lib/firebase');
        
        const q = query(collection(db, 'requests'), orderBy('createdAt', 'desc'));
        unsubscribe = onSnapshot(q, (snapshot) => {
          const data = snapshot.docs.map(doc => {
            const d = doc.data();
            return {
              id: doc.id,
              name: d.name,
              email: d.email,
              budget: d.budget,
              timeline: d.timeline,
              desc: d.description,
              status: d.status || 'UNREAD',
              date: d.createdAt ? new Date(d.createdAt).toLocaleString() : 'Just now'
            };
          });
          setRequests(data);
        });
      } catch (e) {
        console.error('Firebase DB failed to load:', e);
      }
    }
    
    setupStream();
    return () => { if (unsubscribe) unsubscribe(); };
  }, []);

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const { doc, updateDoc } = await import('firebase/firestore');
      const { db } = await import('@/lib/firebase');
      const { toast } = await import('sonner');
      
      await updateDoc(doc(db, 'requests', id), { status: newStatus });
      toast.success(`Transmission designated as [${newStatus}]`);
    } catch (e) {
      console.error(e);
      const { toast } = await import('sonner');
      toast.error('Failed to update secure parameters');
    }
  };

  const unreadCount = requests.filter(r => r.status === 'UNREAD').length;

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-32">
      <Container className="max-w-[1200px]">
        {/* Header section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-2"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-xs font-mono font-bold tracking-widest text-red-500 uppercase">Live Systems</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tighter">Command Center</h1>
            <p className="text-neutral-500 text-sm font-medium">Encrypted terminal for incoming build requests.</p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-4 bg-white/5 border border-white/10 px-6 py-3 rounded-full"
          >
            <div className="flex flex-col">
              <span className="text-xs font-mono text-neutral-500">Unread</span>
              <span className="text-xl font-bold leading-none">{unreadCount < 10 ? `0${unreadCount}` : unreadCount}</span>
            </div>
            <div className="w-px h-8 bg-white/10 mx-2" />
            <div className="flex flex-col">
              <span className="text-xs font-mono text-neutral-500">Total</span>
              <span className="text-xl font-bold leading-none">{requests.length < 10 ? `0${requests.length}` : requests.length}</span>
            </div>
          </motion.div>
        </div>

        {/* Dynamic Data Table */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="w-full bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5 bg-white/[0.02]">
                  <th className="px-8 py-5 text-xs font-mono text-neutral-500 uppercase tracking-widest w-32">Status</th>
                  <th className="px-8 py-5 text-xs font-mono text-neutral-500 uppercase tracking-widest min-w-[200px]">Designation</th>
                  <th className="px-8 py-5 text-xs font-mono text-neutral-500 uppercase tracking-widest hidden md:table-cell">Timeline / Budget</th>
                  <th className="px-8 py-5 text-xs font-mono text-neutral-500 uppercase tracking-widest w-full">Parameters</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {requests.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-8 py-12 text-center text-neutral-500 font-mono text-sm">
                      [NO ACTIVE TRANSMISSIONS FOUND]
                    </td>
                  </tr>
                )}
                {requests.map((req, i) => (
                  <motion.tr 
                    key={req.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + (i * 0.05) }}
                    className="group hover:bg-white/[0.04] transition-colors cursor-pointer"
                  >
                    <td className="px-8 py-6 align-top">
                      <select 
                        value={req.status}
                        onChange={(e) => updateStatus(req.id, e.target.value)}
                        className={`inline-flex items-center px-3 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase border appearance-none outline-none cursor-pointer transition-colors
                          ${req.status === 'UNREAD' ? 'bg-white text-black border-white' : 
                            req.status === 'REVIEWING' ? 'bg-neutral-800 text-white border-neutral-700' : 
                            req.status === 'ACCEPTED' ? 'bg-green-950 text-green-400 border-green-900' :
                            'bg-transparent text-neutral-600 border-neutral-800'}`}
                      >
                        <option value="UNREAD">UNREAD</option>
                        <option value="REVIEWING">REVIEWING</option>
                        <option value="ACCEPTED">ACCEPTED</option>
                        <option value="DECLINED">DECLINED</option>
                        <option value="ARCHIVED">ARCHIVED</option>
                      </select>
                    </td>
                    <td className="px-8 py-6 align-top">
                      <div className="flex flex-col">
                        <span className="font-semibold text-white tracking-tight">{req.name}</span>
                        <span className="text-xs text-neutral-500 font-mono mt-1">{req.email}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 align-top hidden md:table-cell">
                      <div className="flex flex-col">
                        <span className="text-sm text-neutral-300">{req.timeline}</span>
                        <span className="text-xs text-neutral-600 font-mono mt-1">{req.budget}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 align-top">
                      <div className="flex flex-col max-w-xl">
                        <p className="text-sm text-neutral-400 leading-relaxed line-clamp-2 group-hover:line-clamp-none transition-all">
                          {req.desc}
                        </p>
                        <span className="text-[10px] font-mono text-neutral-600 uppercase mt-3 tracking-widest">{req.date}</span>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </Container>
    </div>
  );
}
