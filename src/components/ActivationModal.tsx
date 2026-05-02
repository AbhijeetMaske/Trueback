/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, ArrowRight, X, CheckCircle2 } from 'lucide-react';
import { Offer, Merchant } from '../types';

interface ActivationModalProps {
  offer: Offer | null;
  merchant: Merchant | null;
  onClose: () => void;
}

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
          className="bg-white rounded-[2rem] sm:rounded-[3rem] w-full max-w-lg p-6 sm:p-12 relative z-10 shadow-[0_30px_60px_-12px_rgba(0,0,0,0.12)] overflow-hidden border border-brand-slate-100"
        >
          {/* Subtle Background Accents */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-indigo via-emerald-400 to-brand-indigo" />
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
               style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

          <button onClick={onClose} className="absolute top-6 right-6 sm:top-8 sm:right-10 text-slate-400 hover:text-slate-900 transition-colors z-20 hover:scale-110">
            <X size={20} />
          </button>

          <div className="flex flex-col items-center text-center gap-6 sm:gap-8 relative z-10">
            {/* Visual Progress Indicator */}
            <div className="relative w-full flex justify-center py-4 sm:py-6">
              <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                  className="w-48 h-48 sm:w-56 sm:h-56 border border-brand-indigo/10 rounded-full" 
                />
                <motion.div 
                   animate={{ rotate: -360 }}
                   transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                   className="absolute w-64 h-64 sm:w-72 sm:h-72 border border-brand-indigo/5 rounded-full" 
                />
              </div>
              
              <div className="flex items-center gap-4 sm:gap-6 relative z-10">
                <motion.div 
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="w-16 h-16 sm:w-20 sm:h-20 bg-slate-900 rounded-2xl sm:rounded-3xl flex flex-col items-center justify-center text-white shadow-xl shadow-slate-200 border border-white/10"
                >
                  <ShieldCheck size={28} className="sm:w-8 sm:h-8" strokeWidth={1.5} />
                  <span className="text-[6px] sm:text-[7px] font-black uppercase tracking-tighter mt-1">Audit</span>
                </motion.div>

                <div className="flex flex-col gap-1.5 px-2">
                  <div className="flex gap-1 justify-center">
                    {[0, 1, 2].map(i => (
                      <motion.div 
                        key={i}
                        animate={{ scale: [1, 1.3, 1], opacity: [0.3, 1, 0.3] }}
                        transition={{ repeat: Infinity, duration: 1.2, delay: i * 0.2 }}
                        className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-brand-indigo rounded-full" 
                      />
                    ))}
                  </div>
                  <span className="text-[7px] sm:text-[8px] font-black text-brand-indigo uppercase tracking-[0.3em] leading-none">Syncing</span>
                </div>

                <motion.div 
                   initial={{ x: 20, opacity: 0 }}
                   animate={{ x: 0, opacity: 1 }}
                   transition={{ delay: 0.1 }}
                   className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-2xl sm:rounded-3xl flex items-center justify-center text-3xl sm:text-4xl shadow-xl shadow-indigo-50 border border-brand-slate-100"
                >
                  {merchant.logo}
                </motion.div>
              </div>
            </div>

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

            <div className="w-full bg-slate-50/50 rounded-[2rem] p-6 sm:p-8 flex flex-col gap-6 border border-brand-slate-100 shadow-inner">
              <div className="grid grid-cols-2 gap-4 sm:gap-8 items-center text-left sm:text-center md:text-left">
                <div className="flex flex-col gap-1">
                  <h4 className="text-[8px] sm:text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Audit Yield</h4>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl sm:text-4xl font-display font-black text-brand-indigo tracking-tight">{offer.cashbackPercentage}%</span>
                    <span className="text-[10px] font-black text-brand-indigo/50 uppercase">Base</span>
                  </div>
                </div>
                <div className="flex flex-col gap-1 items-end md:items-start text-right md:text-left">
                  <h4 className="text-[8px] sm:text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Session Hash</h4>
                  <div className="font-mono text-[8px] sm:text-[9px] font-bold text-slate-500 bg-white/80 p-2 rounded-lg border border-brand-slate-100 shadow-sm leading-tight max-w-[120px] sm:max-w-none truncate w-full">
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

            <button
              onClick={onClose}
              className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-3 shadow-lg shadow-slate-200 hover:bg-brand-indigo transition-all group font-display uppercase tracking-widest text-[10px] sm:text-xs"
            >
              Shop at {merchant.name}
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
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
