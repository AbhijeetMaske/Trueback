/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { CheckCircle2, Clock, AlertCircle, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';
import { Transaction, CashbackStatus } from '../types';
import { MERCHANTS } from '../constants';

interface LiveLedgerProps {
  transactions: Transaction[];
}

const statusColors: Record<CashbackStatus, { color: string; bg: string; icon: any }> = {
  Tracked: { color: 'text-brand-indigo', bg: 'bg-indigo-50', icon: TrendingUp },
  Validating: { color: 'text-brand-amber', bg: 'bg-amber-50', icon: Clock },
  Confirmed: { color: 'text-brand-emerald', bg: 'bg-emerald-50', icon: CheckCircle2 },
  Payable: { color: 'text-white bg-brand-emerald', bg: 'bg-emerald-500', icon: CheckCircle2 },
  Issue: { color: 'text-brand-red', bg: 'bg-red-50', icon: AlertCircle },
};

export default function LiveLedger({ transactions }: LiveLedgerProps) {
  return (
    <div className="flex flex-col gap-6 pb-24">
      <header className="flex flex-col gap-2 md:hidden">
        <h1 className="font-display text-2xl font-bold">Audit Ledger</h1>
        <p className="text-slate-500 text-sm">Transparency ledger for every reward handshake.</p>
      </header>

      {/* Desktop Stat Cards from Design */}
      <div className="hidden md:grid grid-cols-3 gap-6 mb-4">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-brand-slate-100">
          <p className="text-slate-500 text-sm font-medium">Network Hash Rate</p>
          <h2 className="text-3xl font-bold mt-1 text-brand-emerald">99.9%</h2>
          <div className="mt-2 flex items-center text-[10px] uppercase font-bold text-brand-emerald tracking-widest">
            <TrendingUp size={12} className="mr-1" />
            Integrity Guaranteed
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-brand-slate-100">
          <p className="text-slate-500 text-sm font-medium">Audit Confidence</p>
          <h2 className="text-3xl font-bold mt-1 text-slate-900">High</h2>
          <div className="mt-2 flex items-center text-[10px] font-bold uppercase text-slate-400 tracking-widest">Verification Node v4.2</div>
        </div>
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-brand-slate-100">
          <p className="text-slate-500 text-sm font-medium">Verified Handshakes</p>
          <h2 className="text-3xl font-bold mt-1 text-brand-indigo">1,204</h2>
          <div className="mt-2 flex items-center text-[10px] font-bold uppercase text-brand-indigo tracking-widest">Global Sync Active</div>
        </div>
      </div>

      <div className="bg-white rounded-[2rem] shadow-sm border border-brand-slate-100 overflow-hidden flex flex-col">
        <div className="p-6 border-b border-brand-slate-50 flex justify-between items-center">
          <h3 className="font-bold text-slate-800 font-display uppercase tracking-widest text-xs">Immutable Audit History</h3>
          <button className="text-brand-indigo text-xs font-bold uppercase tracking-widest hover:underline">Export Ledger</button>
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-brand-slate-50/50 text-slate-400 text-[10px] uppercase tracking-widest text-left font-bold border-b border-brand-slate-50">
              <tr>
                <th className="px-6 py-4 font-bold">Audit Subject</th>
                <th className="px-6 py-4 font-bold">Network Status</th>
                <th className="px-6 py-4 font-bold text-right">Audit Time</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {transactions.map((tx) => {
                const merchant = MERCHANTS.find(m => m.id === tx.merchantId);
                const status = statusColors[tx.status];
                return (
                  <tr key={tx.id} className="border-b border-brand-slate-50 hover:bg-brand-slate-50/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-brand-slate-50 rounded-lg flex items-center justify-center text-lg">{merchant?.logo}</div>
                        <div className="flex flex-col">
                          <span className="font-bold text-slate-700">{merchant?.name} Activity</span>
                          <span className="text-[9px] font-mono text-slate-400 uppercase tracking-tighter">Hash: {tx.orderId || 'ORD-' + Math.random().toString(36).substring(7).toUpperCase()}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full ${status.bg} border border-white shadow-sm ${status.color.includes('text-white') ? 'bg-brand-emerald' : ''}`} />
                        <span className={`text-[10px] font-bold uppercase tracking-widest ${status.color.includes('text-white') ? 'text-brand-emerald' : status.color}`}>
                          {tx.status} • Verified
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-400 text-[10px] font-mono text-right uppercase tracking-tighter">
                      {tx.date} T23:59:59Z
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile List View (Maintain functionality) */}
        <div className="md:hidden grid gap-0 divide-y divide-brand-slate-50">
          {transactions.map((tx) => {
            const merchant = MERCHANTS.find(m => m.id === tx.merchantId);
            const status = statusColors[tx.status];
            const Icon = status.icon;

            return (
              <motion.div
                layout
                key={tx.id}
                className="p-5 flex flex-col gap-4"
              >
                <div className="flex justify-between items-start">
                  <div className="flex gap-3">
                    <div className="w-10 h-10 bg-brand-slate-50 rounded-lg flex items-center justify-center text-xl">
                      {merchant?.logo}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-800">{merchant?.name}</h4>
                      <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">{tx.orderId}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-display font-bold text-lg text-slate-900">
                      <span className="text-xs font-medium text-slate-400 mr-1 italic whitespace-pre">₹{tx.cashbackAmount.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Timeline simplified for mobile in table container */}
                <div className="flex items-center gap-1.5 pt-2 border-t border-brand-slate-50/50">
                  <div className={`w-2 h-2 rounded-full ${status.bg} border-2 border-white shadow-sm ${status.color.includes('text-white') ? 'bg-brand-emerald' : ''}`} />
                  <span className={`text-[10px] font-bold uppercase tracking-widest ${status.color.includes('text-white') ? 'text-brand-emerald' : status.color}`}>
                    {tx.status} Verified
                  </span>
                  <div className="flex-1" />
                  <Clock size={10} className="text-slate-300" />
                  <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">{tx.date}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
