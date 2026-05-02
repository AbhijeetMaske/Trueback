/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { User, Settings, Bell, CreditCard, ShieldCheck, LogOut, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

export default function Profile() {
  const user = {
    name: 'Abhijeet Maske',
    email: 'Abhijeet.maske@yahoo.com',
    memberSince: 'Oct 2023',
    accountStatus: 'Enterprise Core',
  };

  const menuItems = [
    { icon: Bell, label: 'Notifications', value: '4 New' },
    { icon: CreditCard, label: 'Payment Methods', value: '2 Saved' },
    { icon: ShieldCheck, label: 'Privacy & Security', value: 'Verified' },
    { icon: Settings, label: 'Settings', value: null },
  ];

  return (
    <div className="flex flex-col gap-12 pb-32 max-w-5xl mx-auto">
      <div className="flex flex-col lg:grid lg:grid-cols-3 gap-12 items-start">
        <header className="flex flex-col items-center lg:items-start text-center lg:text-left gap-6 lg:pt-8 bg-white lg:bg-transparent p-6 sm:p-10 lg:p-0 rounded-[2.5rem] sm:rounded-[3.0rem] lg:rounded-none border border-brand-slate-100 lg:border-none shadow-xl shadow-slate-100/50 lg:shadow-none">
          <div className="relative group">
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-[2rem] sm:rounded-[2.5rem] bg-brand-indigo flex items-center justify-center text-white text-4xl sm:text-5xl font-bold border-4 border-white shadow-2xl transform transition-transform group-hover:scale-105">
              AM
            </div>
            <div className="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 w-8 h-8 sm:w-10 sm:h-10 bg-brand-emerald text-white rounded-full flex items-center justify-center border-[3px] sm:border-4 border-white shadow-lg">
              <ShieldCheck size={16} className="sm:w-[18px]" />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="font-display text-2xl sm:text-3xl font-black text-slate-900 uppercase tracking-tight">{user.name}</h1>
            <p className="text-slate-500 text-xs sm:text-sm font-medium tracking-wide">{user.email}</p>
          </div>
          <div className="bg-brand-emerald/10 text-brand-emerald px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl sm:rounded-2xl text-[9px] sm:text-[10px] font-black uppercase tracking-widest border border-brand-emerald/20 flex items-center gap-2">
            <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-brand-emerald rounded-full animate-pulse" />
            {user.accountStatus}
          </div>
          
          <div className="hidden lg:flex flex-col gap-4 w-full mt-4">
            <div className="bg-brand-indigo/5 p-6 rounded-3xl border border-brand-indigo/10">
              <p className="text-[10px] font-black text-brand-indigo uppercase tracking-[0.2em] mb-1">Trust Score</p>
              <p className="text-2xl font-display font-black text-slate-800">99.8%</p>
              <div className="w-full bg-slate-200 h-1 rounded-full mt-3 overflow-hidden">
                <div className="w-[99.8%] h-full bg-emerald-400" />
              </div>
            </div>
          </div>
        </header>

        <div className="lg:col-span-2 grid gap-6 w-full">
          <section className="bg-white rounded-[3rem] p-8 border border-brand-slate-100 shadow-xl shadow-slate-100/30">
            <h3 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] mb-8 px-2">Account Architecture</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.label}
                    className="flex items-center justify-between p-6 rounded-[2rem] hover:bg-brand-slate-50 transition-all group border border-transparent hover:border-brand-slate-100"
                  >
                    <div className="flex items-center gap-5">
                      <div className="w-14 h-14 rounded-2xl bg-brand-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-brand-indigo shadow-inner group-hover:text-white group-hover:shadow-indigo-200 transition-all">
                        <Icon size={24} strokeWidth={1.5} />
                      </div>
                      <span className="font-bold text-slate-800 group-hover:text-brand-indigo transition-colors">{item.label}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      {item.value && (
                        <span className="hidden sm:inline-block text-[10px] font-black uppercase tracking-widest text-slate-400 bg-brand-slate-100 px-3 py-1.5 rounded-xl">
                          {item.value}
                        </span>
                      )}
                      <ChevronRight size={20} className="text-slate-200 group-hover:text-brand-indigo group-hover:translate-x-1 transition-all" />
                    </div>
                  </button>
                );
              })}
            </div>
          </section>

          <button className="bg-white rounded-[2rem] p-8 border border-brand-red/10 flex items-center justify-center gap-4 text-brand-red font-black text-sm uppercase tracking-widest hover:bg-brand-red hover:text-white transition-all w-full shadow-2xl shadow-red-50">
            <LogOut size={20} />
            Sign Out of Secure Session
          </button>
        </div>
      </div>

      <div className="text-center opacity-30 mt-4 pointer-events-none">
        <p className="text-[10px] font-bold uppercase tracking-[0.5em]">TrueBack v2.4.0</p>
      </div>
    </div>
  );
}
