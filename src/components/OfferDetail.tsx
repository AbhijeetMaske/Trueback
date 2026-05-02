/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowLeft, ShieldCheck, Info, ChevronRight, Zap, ExternalLink, ScrollText, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { Offer, Merchant } from '../types';

interface OfferDetailProps {
  offer: Offer;
  merchant: Merchant;
  onBack: () => void;
  onActivate: () => void;
}

export default function OfferDetail({ offer, merchant, onBack, onActivate }: OfferDetailProps) {
  const steps = [
    { title: 'Click Activate', description: 'Enable secure link tracking for this session.' },
    { title: 'Shop as Usual', description: 'Complete your purchase on the brand website.' },
    { title: 'Audit Sync', description: 'We automatically verify the transaction on the ledger.' },
    { title: 'Earn Cashback', description: 'Funds appear in your TrueBack wallet within 24h.' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex flex-col gap-8 pb-32 max-w-5xl mx-auto"
    >
      {/* Top Header */}
      <div className="flex items-center gap-4 py-2">
        <button 
          onClick={onBack}
          className="w-12 h-12 rounded-2xl bg-white border border-brand-slate-100 flex items-center justify-center text-slate-600 hover:bg-brand-slate-50 transition-all shadow-sm"
        >
          <ArrowLeft size={24} />
        </button>
        <div>
          <h2 className="font-display font-black text-2xl text-slate-900 uppercase tracking-tight">{merchant.name}</h2>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] leading-none">Security Node: {merchant.id.toUpperCase()}</p>
        </div>
      </div>

      <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 items-start">
        {/* Left Column: Hero Card + CTA */}
        <div className="flex flex-col gap-6 w-full">
          <div className="bg-white rounded-[3rem] p-10 border border-brand-slate-100 shadow-xl shadow-slate-100/50 relative overflow-hidden">
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-8 relative z-10">
              <div className="w-24 h-24 bg-brand-slate-50 rounded-[2rem] flex items-center justify-center text-6xl shadow-inner border border-brand-slate-100">
                {merchant.logo}
              </div>
              
              <div className="flex flex-col gap-3">
                <div className="flex items-baseline justify-center lg:justify-start gap-3">
                  <span className="text-7xl font-display font-black text-brand-indigo tabular-nums tracking-tighter">{offer.cashbackPercentage}%</span>
                  <span className="text-sm font-black text-slate-400 uppercase tracking-[0.3em]">Reward</span>
                </div>
                <p className="text-slate-500 font-medium text-lg leading-relaxed max-w-md">
                  {offer.description} Verified through our neural integrity ledger.
                </p>
              </div>

              <div className="w-full flex gap-4 p-5 bg-brand-emerald/10 rounded-2xl border border-brand-emerald/20 items-center justify-center lg:justify-start">
                <ShieldCheck size={20} className="text-brand-emerald" strokeWidth={2.5} />
                <span className="text-[10px] font-black text-brand-emerald uppercase tracking-[0.2em]">Session Link: Encrypted & Verified</span>
              </div>
            </div>

            {/* Abstract design elements */}
            <div className="absolute top-[-10%] right-[-5%] w-48 h-48 bg-indigo-50 rounded-full blur-3xl" />
            <div className="absolute bottom-[-5%] left-[-5%] w-32 h-32 bg-emerald-50 rounded-full blur-2xl" />
          </div>

          <button 
            onClick={onActivate}
            className="w-full bg-brand-indigo hover:bg-brand-slate-900 text-white font-black py-8 rounded-[2rem] transition-all flex items-center justify-center gap-4 shadow-2xl shadow-indigo-100 text-sm uppercase tracking-[0.2em] font-display"
          >
            Activate Tracking Session
            <Zap size={20} fill="white" />
          </button>
        </div>

        {/* Right Column: Info & Terms */}
        <div className="flex flex-col gap-6 w-full">
          {/* How it works Section */}
          <section className="bg-white rounded-[3rem] p-10 border border-brand-slate-100 shadow-sm">
            <div className="flex items-center gap-4 mb-10 px-2">
              <div className="w-12 h-12 rounded-2xl bg-brand-indigo text-white flex items-center justify-center shadow-lg shadow-indigo-100">
                <Info size={24} />
              </div>
              <h3 className="font-display font-black text-xl text-slate-800 uppercase tracking-tight">Audit Protocol</h3>
            </div>
            
            <div className="flex flex-col gap-8">
              {steps.map((step, i) => (
                <div key={i} className="flex gap-6">
                  <div className="flex flex-col items-center shrink-0">
                    <div className="w-10 h-10 rounded-full bg-brand-slate-50 border-2 border-brand-slate-100 flex items-center justify-center text-sm font-black text-slate-400">
                      {i + 1}
                    </div>
                    {i < steps.length - 1 && (
                      <div className="w-0.5 h-12 bg-brand-slate-100 mt-2 rounded-full" />
                    )}
                  </div>
                  <div className="flex flex-col gap-1">
                    <h4 className="text-base font-black text-slate-800 uppercase tracking-wide">{step.title}</h4>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Terms & Conditions */}
          <section className="bg-white rounded-[3rem] p-10 border border-brand-slate-100 shadow-sm">
            <div className="flex items-center gap-4 mb-8 px-2">
              <div className="w-12 h-12 rounded-2xl bg-brand-slate-900 text-white flex items-center justify-center shadow-lg">
                <ScrollText size={24} />
              </div>
              <h3 className="font-display font-black text-xl text-slate-800 uppercase tracking-tight">Governance</h3>
            </div>

            <div className="flex flex-col gap-4">
              {offer.terms.map((term, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-brand-slate-50 border border-brand-slate-100">
                  <CheckCircle2 size={16} className="text-brand-emerald shrink-0" />
                  <span className="text-xs font-bold text-slate-600">{term}</span>
                </div>
              ))}
            </div>

            <p className="mt-8 text-[9px] text-slate-300 font-black uppercase tracking-[0.3em] leading-loose text-center px-4">
              *Audit tracking is dependent on browser cookies. Do not clear cache during session.
            </p>
          </section>
        </div>
      </div>

      {/* Bottom Padding */}
      <div className="h-12" />
    </motion.div>
  );
}
