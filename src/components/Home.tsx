/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Search, SlidersHorizontal, Zap, ShieldCheck, ArrowRight } from 'lucide-react';
import { OFFERS, MERCHANTS } from '../constants';
import OfferCard from './OfferCard';
import { Offer } from '../types';

interface HomeProps {
  onActivate: (offer: Offer) => void;
  onNavigate?: () => void;
}

export default function Home({ onActivate, onNavigate }: HomeProps) {
  const [selectedCategory, setSelectedCategory] = useState('All Brands');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { name: 'Electronics', icon: '📱', color: 'bg-indigo-50 text-brand-indigo' },
    { name: 'Fashion', icon: '👗', color: 'bg-emerald-50 text-brand-emerald' },
    { name: 'Travel', icon: '✈️', color: 'bg-amber-50 text-brand-amber' },
    { name: 'Food & Dining', icon: '🍕', color: 'bg-red-50 text-brand-red' },
    { name: 'Groceries', icon: '🥦', color: 'bg-green-50 text-brand-emerald' },
    { name: 'Lifestyle', icon: '🏠', color: 'bg-rose-50 text-rose-500' },
  ];

  const filteredOffers = OFFERS.filter(offer => {
    const merchant = MERCHANTS.find(m => m.id === offer.merchantId);
    if (!merchant) return false;

    const matchesCategory = selectedCategory === 'All Brands' || merchant.category === selectedCategory;
    const matchesSearch = merchant.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         offer.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  const festivalOffers = filteredOffers.filter(o => o.label?.toLowerCase().includes('festival'));
  const flashOffers = filteredOffers.filter(o => o.isLimitedTime);
  const otherOffers = filteredOffers.filter(o => !o.label?.toLowerCase().includes('festival') && !o.isLimitedTime);

  return (
    <div className="flex flex-col gap-10 pb-32 px-1">
      <header className="flex flex-col gap-8 pt-4">
        {/* Search Bar - Global Style */}
        <div className="relative group max-w-2xl">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-indigo transition-colors" size={20} />
          <input
            type="text"
            placeholder="Search 50+ premium brands..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-brand-slate-100 rounded-[2rem] py-5 pl-14 pr-6 text-base font-bold shadow-sm focus:ring-2 focus:ring-brand-indigo outline-none transition-all placeholder:text-slate-300"
          />
        </div>

        {/* Hero Banner */}
        <div className="trust-gradient rounded-[3rem] p-10 md:p-14 text-white relative overflow-hidden shadow-2xl shadow-indigo-100/30">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-10">
            <div className="flex flex-col gap-6 max-w-xl">
              <div className="bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] w-fit border border-white/20">
                Neural Audit Engine • Active v4.2
              </div>
              <h2 className="text-4xl md:text-7xl font-display font-black leading-[0.9] tracking-tighter uppercase italic">
                TRUE CASHBACK,<br />
                <span className="text-brand-emerald">NO SURPRISES.</span>
              </h2>
              <p className="text-sm md:text-lg opacity-90 font-medium leading-relaxed max-w-md">
                TrueBack is the only platform that audits every single transaction in real-time. No more missing rewards or hidden terms—just the cashback you earned, guaranteed.
                <span className="block mt-2 font-black text-white px-2 py-0.5 bg-brand-indigo w-fit rounded-lg">Audit Nodes: Online & Secure</span>
              </p>
            </div>
            
            <div className="hidden lg:flex flex-col items-end text-right gap-6">
              <div className="bg-white/10 backdrop-blur-xl p-6 rounded-[2.5rem] shadow-2xl border border-white/20 flex flex-col gap-4">
                <div className="flex items-center gap-3 justify-end text-brand-emerald">
                  <ShieldCheck size={24} />
                  <span className="text-sm font-black uppercase tracking-widest text-white">Trust Assurance</span>
                </div>
                <div className="flex flex-col items-end">
                  <p className="text-[10px] opacity-60 font-black uppercase tracking-[0.3em]">Network Integrity</p>
                  <p className="text-4xl font-display font-black text-white">99.9%</p>
                </div>
              </div>
              <div className="flex gap-4 items-center opacity-40 grayscale group-hover:grayscale-0 transition-all">
                <span className="text-[9px] font-black uppercase tracking-widest">Enterprise Ready</span>
              </div>
            </div>
          </div>
          
          {/* Abstract visuals */}
          <div className="absolute right-[-5%] top-[-10%] w-96 h-96 bg-white/10 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute left-[-5%] bottom-[-10%] w-64 h-64 bg-emerald-400/10 rounded-full blur-[100px]" />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5 pointer-events-none" />
        </div>

        {/* Categories Grid */}
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4 -mx-1 px-1">
          <button 
            onClick={() => setSelectedCategory('All Brands')}
            className={`flex items-center gap-3 transition-all px-8 py-4 rounded-full shrink-0 group ${selectedCategory === 'All Brands' ? 'bg-brand-indigo shadow-lg shadow-indigo-100' : 'bg-white border border-brand-slate-100 hover:border-brand-indigo/30'}`}
          >
            <span className={`text-[10px] font-black uppercase tracking-widest ${selectedCategory === 'All Brands' ? 'text-white' : 'text-slate-400'}`}>All Brands</span>
          </button>
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setSelectedCategory(cat.name)}
              className={`flex items-center gap-3 transition-all px-8 py-4 rounded-full shrink-0 group ${selectedCategory === cat.name ? 'bg-brand-indigo shadow-lg shadow-indigo-100' : 'bg-white border border-brand-slate-100 hover:border-brand-indigo/30'}`}
            >
              <span className={`text-lg`}>{cat.icon}</span>
              <span className={`text-[10px] font-black uppercase tracking-widest ${selectedCategory === cat.name ? 'text-white' : 'text-slate-400'}`}>
                {cat.name}
              </span>
            </button>
          ))}
        </div>
      </header>

      {/* Flash Deals */}
      {flashOffers.length > 0 && (
        <section className="flex flex-col gap-6">
          <div className="flex items-center gap-4 px-2">
            <div className="w-1.5 h-6 bg-slate-900 rounded-full" />
            <h2 className="font-display font-black text-2xl text-slate-900 tracking-tight uppercase">High-Voltage Flash Deals</h2>
            <div className="ml-auto bg-slate-900 text-white px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest">
              Live Audits
            </div>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {flashOffers.map((offer) => {
              const merchant = MERCHANTS.find((m) => m.id === offer.merchantId)!;
              return (
                <OfferCard 
                  key={offer.id} 
                  offer={offer} 
                  merchant={merchant} 
                  onActivate={() => onActivate(offer)}
                />
              );
            })}
          </div>
        </section>
      )}

      {/* Festival Spotlight */}
      {festivalOffers.length > 0 && (
        <section className="flex flex-col gap-6">
          <div className="flex items-center gap-4 px-2">
            <div className="w-1.5 h-6 bg-brand-red rounded-full" />
            <h2 className="font-display font-black text-2xl text-slate-900 tracking-tight uppercase">Festival Spotlight</h2>
            <div className="ml-auto bg-brand-red/10 text-brand-red px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest animate-pulse">
              Limited Period
            </div>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {festivalOffers.map((offer) => {
              const merchant = MERCHANTS.find((m) => m.id === offer.merchantId)!;
              return (
                <OfferCard 
                  key={offer.id} 
                  offer={offer} 
                  merchant={merchant} 
                  onActivate={() => onActivate(offer)}
                />
              );
            })}
          </div>
        </section>
      )}

      {/* All Other Offers */}
      <section className="flex flex-col gap-6">
        <div className="flex justify-between items-center px-2">
          <div className="flex items-center gap-4">
            <div className="w-1.5 h-6 bg-brand-indigo rounded-full" />
            <h2 className="font-display font-black text-2xl text-slate-900 tracking-tight uppercase">
              {selectedCategory === 'All Brands' ? 'Premium Network' : `${selectedCategory} Deals`}
            </h2>
          </div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{otherOffers.length} Verified Brands</p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {otherOffers.map((offer) => {
            const merchant = MERCHANTS.find((m) => m.id === offer.merchantId)!;
            return (
              <OfferCard 
                key={offer.id} 
                offer={offer} 
                merchant={merchant} 
                onActivate={() => onActivate(offer)}
              />
            );
          })}
          {filteredOffers.length === 0 && (
            <div className="col-span-full py-32 text-center bg-white rounded-[3rem] border-2 border-dashed border-slate-100">
              <p className="text-slate-300 font-black uppercase tracking-[0.3em] text-xs">No merchant nodes found in database</p>
            </div>
          )}
        </div>
      </section>

      {/* Trust Stats */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'Active Sessions', value: '1,248', icon: Zap, color: 'text-brand-amber' },
          { label: 'Audit Progress', value: '99.9%', icon: ShieldCheck, color: 'text-brand-emerald' },
          { label: 'Verified Cashback', value: '₹42.8L', icon: ArrowRight, color: 'text-brand-indigo' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-brand-slate-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className={`w-12 h-12 rounded-2xl bg-brand-slate-50 flex items-center justify-center ${stat.color}`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
              <p className="text-xl font-bold font-display text-slate-800">{stat.value}</p>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
