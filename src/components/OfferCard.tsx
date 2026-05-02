/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ExternalLink, ShieldCheck, Clock } from 'lucide-react';
import { Offer, Merchant } from '../types';
import { motion } from 'motion/react';
import { CountdownTimer } from './CountdownTimer';

interface OfferCardProps {
  offer: Offer;
  merchant: Merchant;
  onActivate: (offer: Offer) => void;
  key?: string;
}

export default function OfferCard({ offer, merchant, onActivate }: OfferCardProps) {
  const expiryDate = offer.expiresAt ? new Date(offer.expiresAt) : new Date(Date.now() + 24 * 60 * 60 * 1000);

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-white rounded-3xl p-6 shadow-sm border border-brand-slate-100 flex flex-col gap-4 relative overflow-hidden group"
    >
      {offer.label && (
        <div className={`absolute top-0 right-0 ${offer.label.toLowerCase().includes('festival') ? 'bg-brand-red text-white' : 'bg-brand-amber text-slate-900'} text-[9px] font-black px-4 py-1 rounded-bl-2xl uppercase tracking-[0.2em] z-10 shadow-sm`}>
          {offer.label}
        </div>
      )}

      {offer.isLimitedTime && !offer.label && (
        <div className="absolute top-0 right-0 bg-slate-900 text-white text-[9px] font-black px-4 py-1 rounded-bl-2xl uppercase tracking-[0.2em] z-10 shadow-sm">
          Limited Time
        </div>
      )}

      {offer.isFeatured && !offer.label && !offer.isLimitedTime && (
        <div className="absolute top-0 right-0 bg-brand-amber text-slate-900 text-[10px] font-bold px-4 py-1 rounded-bl-2xl uppercase tracking-widest z-10 shadow-sm">
          Top Rated
        </div>
      )}

      <div className="flex items-center gap-4">
        <div className="w-14 h-14 bg-brand-slate-50 rounded-2xl flex items-center justify-center text-3xl shadow-inner border border-brand-slate-100/50 grayscale group-hover:grayscale-0 transition-all">
          {merchant.logo}
        </div>
        <div>
          <h3 className="font-display font-bold text-lg leading-tight text-slate-800">{merchant.name}</h3>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-slate-400 text-[10px] uppercase font-bold tracking-widest">{merchant.category}</span>
            <div className="w-1 h-1 bg-brand-emerald rounded-full" />
            <span className="text-brand-emerald text-[10px] font-bold uppercase tracking-widest leading-none">Healthy Track</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <div className="flex items-baseline gap-1.5">
          <span className="text-3xl font-display font-bold text-brand-indigo">{offer.cashbackPercentage}%</span>
          <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">Cashback</span>
        </div>
        <p className="text-slate-500 text-sm line-clamp-2 leading-relaxed font-medium">
          {offer.description}
        </p>
      </div>

      {offer.isLimitedTime && (
        <div className="bg-brand-indigo/[0.03] border border-brand-indigo/10 rounded-2xl p-4 flex flex-col gap-3">
          <div className="flex items-center gap-2 text-brand-indigo">
            <Clock size={12} className="animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-widest">Offer Expires In</span>
          </div>
          <CountdownTimer expiryDate={expiryDate} />
        </div>
      )}

      <div className="mt-auto flex flex-col gap-3 pt-2">
        <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
          <ShieldCheck size={12} className="text-brand-indigo" strokeWidth={3} />
          <span>Verified integrity</span>
        </div>
        
        <button
          onClick={() => onActivate(offer)}
          className="w-full bg-brand-slate-900 hover:bg-brand-indigo text-white font-bold py-4 rounded-2xl transition-all flex items-center justify-center gap-2 shadow-xl shadow-slate-200"
        >
          Shop Now
        </button>
      </div>
    </motion.div>
  );
}
