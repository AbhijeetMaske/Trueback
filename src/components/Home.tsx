/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

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

      </header>

      {/* The Audit Protocol Banner - Responsive Integration */}
      <section className="bg-slate-900 rounded-[2.5rem] p-6 sm:p-10 text-white relative overflow-hidden shadow-2xl">
        <div className="relative z-10 flex flex-col gap-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex flex-col gap-1 text-left">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-brand-emerald rounded-full animate-pulse" />
                <h2 className="font-display font-black text-lg sm:text-xl uppercase tracking-widest italic">The Audit Protocol</h2>
              </div>
              <p className="text-slate-400 text-[10px] sm:text-xs font-medium">Verify your session via our neural ledger sequence.</p>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-brand-indigo/10 rounded-full border border-brand-indigo/20 self-start sm:self-center">
              <ShieldCheck size={12} className="text-brand-indigo" />
              <span className="text-[9px] font-black uppercase tracking-widest text-brand-indigo">Protocol Active</span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 relative">
            {[
              { id: '01', title: 'Select', icon: Search },
              { id: '02', title: 'Sync', icon: Zap },
              { id: '03', title: 'Order', icon: ShieldCheck },
              { id: '04', title: 'Verify', icon: ArrowRight }
            ].map((step, i) => (
              <div key={step.id} className="relative group flex flex-col items-center text-center gap-3">
                <div className="relative">
                  <motion.div 
                    animate={{ 
                      backgroundColor: activeStep === i ? '#4f46e5' : 'rgba(255, 255, 255, 0.05)',
                      borderColor: activeStep === i ? '#4f46e5' : 'rgba(255, 255, 255, 0.1)',
                      scale: activeStep === i ? 1.05 : 1
                    }}
                    className="w-12 h-12 sm:w-16 sm:h-16 backdrop-blur-xl rounded-xl sm:rounded-2xl flex items-center justify-center text-white border relative z-10 transition-all duration-500"
                  >
                    <step.icon size={20} className="sm:w-6 sm:h-6" />
                  </motion.div>
                  
                  <motion.div 
                    animate={{ 
                      scale: activeStep === i ? 1.1 : 1,
                      backgroundColor: activeStep === i ? '#4f46e5' : '#1e293b'
                    }}
                    className="absolute -top-2 -right-2 w-6 h-6 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center text-[8px] sm:text-[10px] font-black shadow-lg z-20 border border-white/10"
                  >
                    {step.id}
                  </motion.div>

                  <AnimatePresence>
                    {activeStep === i && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1.2 }}
                        exit={{ opacity: 0, scale: 1.5 }}
                        className="absolute inset-0 bg-brand-indigo/30 rounded-2xl blur-xl -z-0"
                      />
                    )}
                  </AnimatePresence>
                </div>
                <motion.h4 
                  animate={{ color: activeStep === i ? '#ffffff' : '#64748b' }}
                  className="text-[10px] sm:text-xs font-black uppercase tracking-widest transition-colors"
                >
                  {step.title}
                </motion.h4>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Background Details */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-brand-indigo/10 rounded-full blur-[100px] -mr-24 -mt-24 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-brand-emerald/5 rounded-full blur-[100px] -ml-24 -mb-24 pointer-events-none" />
      </section>

      {/* Categories Grid */}
      <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2 -mx-1 px-1">
        <button 
          onClick={() => setSelectedCategory('All Brands')}
          className={`flex items-center gap-3 transition-all px-6 py-3 rounded-full shrink-0 group border ${selectedCategory === 'All Brands' ? 'bg-brand-indigo shadow-lg shadow-indigo-100 border-brand-indigo text-white' : 'bg-white border-brand-slate-100 text-slate-400 hover:border-brand-indigo/30'}`}
        >
          <span className="text-[10px] font-black uppercase tracking-widest">All Brands</span>
        </button>
        {categories.map((cat) => (
          <button
            key={cat.name}
            onClick={() => setSelectedCategory(cat.name)}
            className={`flex items-center gap-3 transition-all px-6 py-3 rounded-full shrink-0 group border ${selectedCategory === cat.name ? 'bg-brand-indigo shadow-lg shadow-indigo-100 border-brand-indigo text-white' : 'bg-white border-brand-slate-100 text-slate-400 hover:border-brand-indigo/30'}`}
          >
            <span className="text-sm">{cat.icon}</span>
            <span className="text-[10px] font-black uppercase tracking-widest">
              {cat.name}
            </span>
          </button>
        ))}
      </div>

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
