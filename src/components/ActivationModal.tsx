/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, ArrowRight, X, CheckCircle2, Cpu } from 'lucide-react';
import { Offer, Merchant } from '../types';

interface ActivationModalProps {
  offer: Offer | null;
  merchant: Merchant | null;
  onClose: () => void;
}

const ProtocolVisual = ({ merchantLogo }: { merchantLogo: React.ReactNode }) => {
  const particles = useMemo(() => Array.from({ length: 8 }).map((_, i) => ({
    id: i,
    delay: i * 0.15,
    duration: 0.8 + Math.random() * 0.5
  })), []);

  return (
    <div className="relative w-full flex justify-center py-6 sm:py-10">
      {/* Background Tech Rings */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        <motion.div 
          animate={{ scale: [1, 1.1, 1], rotate: 360, opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="w-64 h-64 border-2 border-dashed border-brand-indigo/30 rounded-full" 
        />
        <motion.div 
          animate={{ scale: [1.2, 1, 1.2], rotate: -360, opacity: [0.05, 0.1, 0.05] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute w-80 h-80 border border-brand-indigo/20 rounded-full" 
        />
      </div>
      
      <div className="flex items-center gap-6 sm:gap-10 relative z-10">
        {/* Audit Node */}
        <div className="relative group">
          <motion.div 
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            className="w-16 h-16 sm:w-24 sm:h-24 bg-slate-900 rounded-[2rem] flex flex-col items-center justify-center text-white shadow-2xl relative z-10 border border-white/20"
          >
            <ShieldCheck size={32} className="sm:w-10 sm:h-10 text-brand-emerald" strokeWidth={1.5} />
            <span className="text-[6px] sm:text-[8px] font-black uppercase tracking-widest mt-1 opacity-50">Audit</span>
          </motion.div>
          {/* Pulsing Aura */}
          <motion.div 
            animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute -inset-2 bg-brand-emerald/20 rounded-[2.5rem] -z-10"
          />
        </div>

        {/* Data Stream & Protocol Logic */}
        <div className="flex flex-col gap-4 items-center min-w-[80px] sm:min-w-[120px] relative">
          {/* Scanner Beam */}
          <motion.div 
            animate={{ x: [-40, 40, -40] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 -translate-y-1/2 w-1 h-12 sm:h-16 bg-gradient-to-b from-transparent via-brand-indigo to-transparent blur-[2px] opacity-70 z-20"
          />

          {/* Particles */}
          <div className="flex gap-1 justify-center relative w-full h-8">
            {particles.map((p) => (
              <motion.div
                key={p.id}
                animate={{ 
                  x: [-30, 30], 
                  opacity: [0, 1, 0],
                  scale: [0.5, 1, 0.5]
                }}
                transition={{ 
                  duration: p.duration, 
                  repeat: Infinity, 
                  delay: p.delay,
                  ease: "linear"
                }}
                className="absolute left-1/2 top-1/2 w-1 h-1 bg-brand-indigo rounded-full"
              />
            ))}
          </div>

          <div className="flex flex-col items-center gap-1">
            <div className="flex gap-1">
              {[0, 1, 2].map(i => (
                <motion.div 
                  key={i}
                  animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
                  transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.1 }}
                  className="w-1 h-1 bg-brand-indigo rounded-full" 
                />
              ))}
            </div>
            <motion.span 
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="text-[8px] sm:text-[10px] font-black text-brand-indigo uppercase tracking-[0.4em] leading-none"
            >
              Protocol
            </motion.span>
          </div>
        </div>

        {/* Merchant Node */}
        <div className="relative group">
          <motion.div 
             initial={{ scale: 0, rotate: 45 }}
             animate={{ scale: 1, rotate: 0 }}
             className="w-16 h-16 sm:w-24 sm:h-24 bg-white rounded-[2rem] flex items-center justify-center text-4xl sm:text-5xl shadow-2xl shadow-indigo-100 border border-brand-slate-100 relative z-10"
          >
            {merchantLogo}
          </motion.div>
          <motion.div 
            animate={{ scale: [1, 1.4, 1], opacity: [0.2, 0, 0.2] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            className="absolute -inset-2 bg-brand-indigo/10 rounded-[2.5rem] -z-10"
          />
        </div>
      </div>

      {/* Floating Status Codes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {['AUTH', 'SYNC', 'NODE_OK', 'AES_256'].map((text, i) => (
          <motion.span
            key={text}
            initial={{ opacity: 0, x: i % 2 === 0 ? -100 : 100, y: (i * 20) + 40 }}
            animate={{ 
              opacity: [0, 0.3, 0],
              x: i % 2 === 0 ? [0, 10] : [0, -10],
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              delay: i * 0.8,
            }}
            className="absolute text-[8px] font-mono text-slate-300 font-bold"
            style={{ left: i % 2 === 0 ? '10%' : '80%' }}
          >
            {text}
          </motion.span>
        ))}
      </div>
    </div>
  );
};

export default function ActivationModal({ offer, merchant, onClose }: ActivationModalProps) {
  if (!offer || !merchant) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-24">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-brand-slate-900/40 backdrop-blur-sm"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white rounded-[2rem] sm:rounded-[3rem] w-full max-w-lg p-6 sm:p-10 relative z-10 shadow-[0_30px_60px_-12px_rgba(0,0,0,0.12)] border border-brand-slate-100 max-h-[90vh] overflow-y-auto no-scrollbar"
        >
          {/* Subtle Background Accents */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-indigo via-emerald-400 to-brand-indigo" />
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
               style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

          <button onClick={onClose} className="absolute top-4 right-4 sm:top-8 sm:right-10 text-slate-400 hover:text-slate-900 transition-colors z-20 hover:scale-110">
            <X size={20} />
          </button>

          <div className="flex flex-col items-center text-center gap-6 sm:gap-8 relative z-10">
            {/* Audit Protocol Visualization */}
            <ProtocolVisual merchantLogo={merchant.logo} />

            <div className="flex flex-col gap-2 sm:gap-3">
              <div className="flex items-center justify-center gap-2 mb-0.5">
                <span className="h-px w-6 sm:w-8 bg-brand-emerald/30" />
                <span className="text-[9px] sm:text-[10px] font-black text-brand-emerald uppercase tracking-[0.2em] sm:tracking-[0.3em]">Protocol Active</span>
                <span className="h-px w-6 sm:w-8 bg-brand-emerald/30" />
              </div>
              <h2 className="font-display font-black text-2xl sm:text-4xl text-slate-900 uppercase tracking-tight italic">
                Secure <span className="text-brand-indigo">Tunnel.</span>
              </h2>
              <p className="text-slate-500 text-xs sm:text-sm max-w-sm mx-auto font-medium leading-relaxed px-4">
                We've established a verified link with <span className="font-black text-slate-800 italic underline decoration-brand-indigo/20 decoration-4 underline-offset-4">{merchant.name}</span>.
              </p>
            </div>

            <div className="w-full bg-slate-50/50 rounded-[2rem] p-5 sm:p-8 flex flex-col gap-6 border border-brand-slate-100 shadow-inner">
              <div className="grid grid-cols-2 gap-4 sm:gap-8 items-center text-left">
                <div className="flex flex-col gap-1">
                  <h4 className="text-[8px] sm:text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Audit Yield</h4>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl sm:text-4xl font-display font-black text-brand-indigo tracking-tight">{offer.cashbackPercentage}%</span>
                    <span className="text-[10px] font-black text-brand-indigo/50 uppercase">Base</span>
                  </div>
                </div>
                <div className="flex flex-col gap-1 items-end">
                  <h4 className="text-[8px] sm:text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Session Hash</h4>
                  <div className="font-mono text-[8px] sm:text-[9px] font-bold text-slate-500 bg-white/80 p-2 rounded-lg border border-brand-slate-100 shadow-sm leading-tight max-w-[100px] sm:max-w-none truncate w-full">
                    {`AUD-${Math.random().toString(36).substring(2, 8).toUpperCase()}`}
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3 py-4 border-t border-brand-slate-100/60">
                <h4 className="text-[8px] sm:text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] text-center mb-1">Session Integrity</h4>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
                  {[
                    'Tab Locked',
                    'Direct Redirect',
                    'Neural Track',
                    '24h Validity'
                  ].map((step, i) => (
                    <motion.div 
                      key={i} 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + (i * 0.1) }}
                      className="flex gap-2 items-center text-[8px] sm:text-[9px] font-black text-slate-500 uppercase tracking-widest"
                    >
                      <CheckCircle2 size={10} className="text-brand-emerald shrink-0" />
                      {step}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full">
              <button
                onClick={onClose}
                className="flex-1 bg-slate-900 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-3 shadow-lg shadow-slate-200 hover:bg-brand-indigo transition-all group font-display uppercase tracking-widest text-[10px] sm:text-xs"
              >
                Shop at {merchant.name}
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={onClose}
                className="sm:w-32 bg-white text-slate-400 border border-slate-100 font-bold py-4 rounded-xl flex items-center justify-center gap-3 hover:bg-slate-50 transition-all font-display uppercase tracking-widest text-[10px] sm:text-xs shrink-0"
              >
                Cancel
              </button>
            </div>
            
            <div className="flex items-center gap-2 mb-2">
              <div className="w-1.5 h-1.5 bg-brand-emerald rounded-full animate-pulse" />
              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest leading-none">Redirecting via Secure Gateway</p>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
