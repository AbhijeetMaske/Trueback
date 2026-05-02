/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Bot, Send, CheckCircle2, AlertCircle, TrendingUp, Search, ShieldCheck, ArrowRight, CornerRightUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function ClaimBot() {
  const [orderId, setOrderId] = useState('');
  const [status, setStatus] = useState<'idle' | 'analyzing' | 'success' | 'fail'>('idle');
  const [validationError, setValidationError] = useState<string | null>(null);

  // Auto-validation message as user types
  useEffect(() => {
    const formatRegex = /^ORD-[A-Z]{3,4}-[0-9A-Z]{7,12}$/;
    if (orderId && !formatRegex.test(orderId)) {
      setValidationError('Invalid Format. Expected: ORD-MERCHANT-XXXXXXXXX');
    } else {
      setValidationError(null);
    }
  }, [orderId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId || validationError) return;
    
    setStatus('analyzing');
    setTimeout(() => {
      // Strict Protocol Validation: Must match specific length and prefix criteria
      const standardFormat = /^ORD-[A-Z]{3,4}-[0-9]{9}$/;
      if (standardFormat.test(orderId)) {
        setStatus('success');
      } else {
        setStatus('fail');
      }
    }, 2500);
  };

  return (
    <div className="flex flex-col gap-8 md:gap-12 pb-32 max-w-5xl mx-auto px-4">
      <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
        <header className="flex flex-col items-center lg:items-start text-center lg:text-left gap-6 lg:max-w-md lg:sticky lg:top-8">
          <div className="relative">
            <div className="w-16 h-16 sm:w-24 sm:h-24 bg-brand-slate-900 rounded-[1.5rem] sm:rounded-[2.5rem] flex items-center justify-center text-white shadow-2xl shadow-slate-200 relative z-10">
              <Bot size={32} className="sm:w-[44px] sm:h-[44px]" strokeWidth={1.5} />
            </div>
            <div className="absolute -inset-4 sm:-inset-6 bg-brand-indigo/10 rounded-full blur-2xl sm:blur-3xl -z-0 animate-pulse" />
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 justify-center lg:justify-start">
              <span className="w-2 h-2 bg-brand-emerald rounded-full animate-pulse" />
              <h1 className="font-display text-2xl sm:text-4xl font-black text-slate-900 tracking-tight uppercase">Audit Retrieval</h1>
            </div>
            <p className="text-slate-500 text-xs sm:text-sm font-medium leading-relaxed max-w-sm">
              If your rewards aren't showing up, our neural blockchain ledger can recover them. 
              <span className="block mt-1 text-slate-400">Total audits this hour: <span className="text-slate-800 font-bold">12,402</span></span>
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full">
            <div className="bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-brand-slate-100 shadow-sm text-left">
              <p className="text-[8px] sm:text-[9px] font-black text-slate-300 uppercase tracking-widest mb-1">Audit Success</p>
              <p className="text-lg sm:text-xl font-bold text-brand-emerald">99.4%</p>
            </div>
            <div className="bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-brand-slate-100 shadow-sm text-left">
              <p className="text-[8px] sm:text-[9px] font-black text-slate-300 uppercase tracking-widest mb-1">Avg. Recovery</p>
              <p className="text-lg sm:text-xl font-bold text-brand-indigo">0.4s</p>
            </div>
          </div>

          <div className="w-full mt-2 lg:mt-6 flex flex-col gap-4">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em] px-2">Recent Claim History</h3>
            <div className="space-y-2 sm:space-y-3">
              {[
                { id: 'C-9921', order: 'ORD-AMZ-228133445', status: 'Failed', reason: 'Non-Eligible Category', date: 'Yesterday' },
                { id: 'C-9920', order: 'ORD-NKE-112211223', status: 'Recovered', amount: '₹124.50', date: '2 days ago' },
                { id: 'C-9918', order: 'ORD-APPLE-8877665', status: 'Failed', reason: 'Ad-Blocker Detected', date: '3 days ago' },
              ].map((claim) => (
                <div key={claim.id} className="bg-white/50 backdrop-blur-sm p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-100 flex items-center justify-between gap-3">
                  <div className="flex flex-col text-left overflow-hidden">
                    <span className="text-[10px] font-bold text-slate-900 leading-none">Claim #{claim.id}</span>
                    <span className="text-[8px] sm:text-[9px] font-mono text-slate-400 mt-1 uppercase truncate">{claim.order}</span>
                  </div>
                  <div className="text-right shrink-0">
                    <span className={`text-[8px] sm:text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded ${
                      claim.status === 'Recovered' ? 'bg-emerald-50 text-brand-emerald' : 'bg-red-50 text-brand-red'
                    }`}>
                      {claim.status}
                    </span>
                    <p className="text-[8px] sm:text-[9px] text-slate-300 font-bold uppercase mt-1">{claim.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </header>

        <div className="w-full bg-white rounded-[3rem] sm:rounded-[4rem] p-6 sm:p-10 lg:p-14 border border-brand-slate-100 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.06)] relative overflow-hidden">
        <AnimatePresence mode="wait">
          {status === 'idle' && (
            <motion.form
              key="idle"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onSubmit={handleSubmit}
              className="flex flex-col gap-6"
            >
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center px-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Transaction / Order ID</label>
                  {orderId && !validationError && (
                    <span className="text-[10px] font-bold text-brand-emerald flex items-center gap-1">
                      <ShieldCheck size={12} /> Valid Format
                    </span>
                  )}
                </div>
                <div className="relative">
                  <input
                    type="text"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value.toUpperCase())}
                    placeholder="e.g. ORD-AMZ-228133445"
                    className={`w-full bg-brand-slate-50 border ${validationError ? 'border-rose-200 focus:ring-rose-500' : 'border-brand-slate-100 focus:ring-brand-indigo'} rounded-[1.5rem] p-5 text-sm font-mono font-bold outline-none transition-all placeholder:text-slate-300 shadow-inner`}
                  />
                  {orderId && (
                    <button 
                      type="button"
                      onClick={() => setOrderId('')}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500"
                    >
                      ×
                    </button>
                  )}
                </div>
                {validationError && (
                  <p className="text-[10px] font-bold text-rose-500 px-1 animate-in fade-in slide-in-from-top-1">
                    {validationError}
                  </p>
                )}
              </div>

              <div className="bg-brand-slate-50/50 rounded-2xl p-4 border border-brand-slate-50">
                <div className="flex gap-3 items-start">
                  <CornerRightUp size={16} className="text-brand-indigo mt-0.5" />
                  <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
                    Check your email confirmation or store account history to find your unique identifier.
                  </p>
                </div>
              </div>

              <button
                type="submit"
                disabled={!orderId || !!validationError}
                className="w-full bg-brand-indigo disabled:opacity-50 text-white font-bold py-6 rounded-[1.5rem] flex items-center justify-center gap-3 shadow-xl shadow-indigo-100 hover:bg-brand-slate-900 transition-all font-display uppercase tracking-widest text-xs"
              >
                Start Audit Search
                <Search size={18} />
              </button>
            </motion.form>
          )}

          {status === 'analyzing' && (
            <motion.div
              key="analyzing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center py-12 gap-8"
            >
              <div className="relative">
                <div className="w-24 h-24 border-4 border-brand-slate-50 rounded-full" />
                <div className="absolute inset-0 border-4 border-brand-indigo border-t-transparent rounded-full animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center text-brand-indigo">
                  <ShieldCheck size={32} strokeWidth={1.5} className="animate-pulse" />
                </div>
              </div>
              <div className="text-center space-y-2">
                <h3 className="font-display font-bold text-xl text-slate-900">Scanning Clusters</h3>
                <div className="flex flex-col items-center gap-1.5">
                  <div className="h-1 w-32 bg-brand-slate-100 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ x: '-100%' }}
                      animate={{ x: '100%' }}
                      transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                      className="w-1/2 h-full bg-brand-indigo"
                    />
                  </div>
                  <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em]">Hash Verification in Progress</p>
                </div>
              </div>
            </motion.div>
          )}

          {status === 'success' && (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center py-4 gap-8 text-center"
            >
              <div className="w-20 h-20 bg-emerald-50 text-brand-emerald rounded-[2rem] flex items-center justify-center border border-emerald-100 shadow-inner">
                <CheckCircle2 size={40} strokeWidth={1.5} />
              </div>
              <div className="space-y-3">
                <h3 className="font-display font-bold text-2xl text-slate-900">Integrity Verified</h3>
                <p className="text-slate-500 text-sm font-medium leading-relaxed">
                  We found your session! The cashback has been manually associated with your wallet address.
                </p>
              </div>

              <div className="w-full bg-emerald-50/50 border border-emerald-100 rounded-[2rem] p-6 relative overflow-hidden">
                <div className="flex items-center justify-between relative z-10">
                  <div className="text-left">
                    <p className="text-[10px] font-bold text-brand-emerald uppercase tracking-widest mb-1">Recovered Value</p>
                    <p className="text-3xl font-display font-black text-slate-900">₹452.88</p>
                  </div>
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-brand-emerald shadow-sm border border-emerald-50">
                    <TrendingUp size={24} />
                  </div>
                </div>
                <div className="absolute right-[-10%] bottom-[-10%] text-6xl text-emerald-500/10 font-black pointer-events-none">
                  PASS
                </div>
              </div>

              <button
                onClick={() => setStatus('idle')}
                className="w-full bg-brand-slate-900 text-white font-bold py-5 rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-slate-200 transition-all font-display uppercase tracking-widest text-xs"
              >
                View in Wallet
                <ArrowRight size={18} />
              </button>
            </motion.div>
          )}

          {status === 'fail' && (
            <motion.div
              key="fail"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center py-4 gap-8 text-center"
            >
              <div className="w-20 h-20 bg-rose-50 text-brand-red rounded-[2rem] flex items-center justify-center border border-rose-100 shadow-inner">
                <AlertCircle size={40} strokeWidth={1.5} />
              </div>
              <div className="space-y-3">
                <h3 className="font-display font-bold text-2xl text-slate-900">Audit Negative</h3>
                <p className="text-slate-500 text-sm font-medium leading-relaxed">
                  No tracking beacon was found for ID <span className="font-mono font-bold text-slate-800 bg-brand-slate-100 px-2 rounded">{orderId}</span>. This usually happens if ad-blockers were active.
                </p>
              </div>

              <div className="w-full bg-slate-50 border border-slate-100 rounded-[2rem] p-6 text-left">
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Next Steps</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-xs text-slate-600 font-medium">
                    <div className="w-1.5 h-1.5 bg-slate-300 rounded-full" />
                    Wait 24h for store sync
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-600 font-medium">
                    <div className="w-1.5 h-1.5 bg-slate-300 rounded-full" />
                    Verify ad-blocker status
                  </div>
                </div>
              </div>

              <div className="flex flex-col w-full gap-3">
                <button
                  onClick={() => setStatus('idle')}
                  className="w-full bg-brand-indigo text-white font-bold py-5 rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-indigo-100"
                >
                  Retry Search
                </button>
                <button
                  className="text-slate-400 text-[10px] font-bold uppercase tracking-widest hover:text-slate-600 py-2"
                >
                  Contact Human Auditor
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      </div>

      <p className="mt-4 text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-relaxed">
        System processed by TrueBack Core v2.4a <br />
        Integrity Protocol: SHA-256 Enabled
      </p>
    </div>
  );
}

