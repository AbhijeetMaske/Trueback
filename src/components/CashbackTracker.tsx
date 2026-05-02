/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Calendar, 
  ChevronRight, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  ArrowUpRight,
  ShieldCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TRANSACTIONS, MERCHANTS } from '../constants';
import { Transaction } from '../types';
import TransactionDetail from './TransactionDetail';

interface CashbackTrackerProps {
  onNavigate?: () => void;
}

export default function CashbackTracker({ onNavigate }: CashbackTrackerProps) {
  const [activeTx, setActiveTx] = useState<Transaction>(TRANSACTIONS[0]);
  const [viewingDetail, setViewingDetail] = useState<Transaction | null>(null);

  useEffect(() => {
    onNavigate?.();
  }, [viewingDetail, onNavigate]);

  const stages = [
    { id: 'tracked', label: 'Tracked', icon: Search },
    { id: 'validating', label: 'Validating', icon: ShieldCheck },
    { id: 'confirmed', label: 'Confirmed', icon: CheckCircle2 },
    { id: 'paid', label: 'Paid', icon: ArrowUpRight },
  ];

  // Map status to stage index
  const getStageIndex = (status: string) => {
    switch (status) {
      case 'Payable': return 3;
      case 'Confirmed': return 2;
      case 'Validating': return 1;
      case 'Issue': return -1;
      default: return 0;
    }
  };

  const currentStageIndex = getStageIndex(activeTx.status);

  return (
    <AnimatePresence mode="wait">
      {viewingDetail ? (
        <TransactionDetail
          transaction={viewingDetail}
          merchant={MERCHANTS.find(m => m.id === viewingDetail.merchantId)!}
          onBack={() => setViewingDetail(null)}
        />
      ) : (
        <motion.div 
          key="list"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="flex flex-col gap-10 pb-24"
        >
          {/* Header */}
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-1">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-brand-indigo">
                <ShieldCheck size={16} />
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">Compliance Secured</span>
              </div>
              <h1 className="font-display font-black text-4xl text-slate-900 tracking-tight uppercase italic">
                Audit <span className="text-brand-indigo">Ledger.</span>
              </h1>
              <p className="text-slate-500 text-sm font-medium max-w-sm">Every internal handshake and merchant audit verified in real-time.</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-white border border-brand-slate-100 p-4 rounded-2xl flex flex-col gap-1 min-w-[140px]">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none">Total Nodes</span>
                <span className="text-xl font-display font-black text-slate-900">1,204</span>
              </div>
              <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-2xl flex flex-col gap-1 min-w-[140px]">
                <span className="text-[9px] font-black text-brand-emerald uppercase tracking-widest leading-none">Global TAT</span>
                <span className="text-xl font-display font-black text-brand-emerald">2.4h</span>
              </div>
            </div>
          </header>

      {/* Transaction List */}
      <section className="flex flex-col gap-6">
        <div className="flex justify-between items-center px-1">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-6 bg-slate-900 rounded-full" />
            <h3 className="font-display font-black text-xl text-slate-800 uppercase tracking-tight">Recent Handshakes</h3>
          </div>
          <button className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] hover:text-brand-indigo transition-colors bg-white px-4 py-2 rounded-xl border border-brand-slate-100">
            <Filter size={14} />
            Filter By Status
          </button>
        </div>

        <div className="grid gap-4">
          {TRANSACTIONS.map((tx) => {
            const merchant = MERCHANTS.find(m => m.id === tx.merchantId);
            const cashbackPercent = ((tx.cashbackAmount / tx.amount) * 100).toFixed(1);
            
            // Status styles
            const statusConfig = {
              'Payable': { bg: 'bg-emerald-50', text: 'text-brand-emerald', icon: CheckCircle2, label: 'Verified' },
              'Confirmed': { bg: 'bg-emerald-50', text: 'text-brand-emerald', icon: CheckCircle2, label: 'Confirmed' },
              'Validating': { bg: 'bg-amber-50', text: 'text-brand-amber', icon: Clock, label: 'Audit' },
              'Issue': { bg: 'bg-rose-50', text: 'text-brand-red', icon: AlertCircle, label: 'Failed' },
              'Tracked': { bg: 'bg-slate-50', text: 'text-slate-400', icon: Search, label: 'Tracked' },
            }[tx.status] || { bg: 'bg-slate-50', text: 'text-slate-400', icon: Clock, label: tx.status };

            const StatusIcon = statusConfig.icon;

            return (
              <button
                key={tx.id}
                onClick={() => setViewingDetail(tx)}
                className="group flex flex-col md:flex-row md:items-center justify-between p-6 rounded-[2rem] transition-all bg-white border border-brand-slate-100 hover:border-brand-indigo/30 hover:shadow-xl hover:shadow-indigo-50/50"
              >
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 rounded-2xl bg-brand-slate-50 flex items-center justify-center text-3xl shadow-inner border border-brand-slate-100 group-hover:scale-105 transition-transform">
                    {merchant?.logo || '🏷️'}
                  </div>
                  <div className="text-left flex flex-col gap-0.5">
                    <h4 className="font-display font-black text-lg text-slate-800">{merchant?.name}</h4>
                    <div className="flex items-center gap-2">
                       <p className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-tighter">ID: {tx.orderId || 'ORD-UNKN-0001'}</p>
                       <span className="text-[10px] text-slate-200">/</span>
                       <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{tx.date}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between md:justify-end mt-4 md:mt-0 gap-8">
                  <div className="text-left md:text-right flex flex-col gap-1">
                    <div className="flex items-baseline gap-1 md:justify-end">
                      <span className="text-[10px] font-black text-slate-400 uppercase">Order:</span>
                      <span className="text-sm font-black text-slate-800">₹{tx.amount.toLocaleString()}</span>
                    </div>
                    <div className="flex items-baseline gap-1 md:justify-end">
                      <span className="text-[10px] font-black text-brand-indigo uppercase">Reward:</span>
                      <span className="text-base font-display font-black text-brand-indigo">₹{tx.cashbackAmount.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <div className={`flex items-center gap-2 px-3 py-1 rounded-lg ${statusConfig.bg} ${statusConfig.text} border border-transparent`}>
                      <StatusIcon size={12} strokeWidth={3} />
                      <span className="text-[10px] font-black uppercase tracking-widest">{statusConfig.label} ({cashbackPercent}%)</span>
                    </div>
                    <div className="hidden md:flex items-center gap-1 text-[9px] font-black uppercase tracking-widest text-slate-300">
                      Transparency Pass <CheckCircle2 size={10} />
                    </div>
                  </div>
                  
                  <ChevronRight size={20} className="hidden md:block text-slate-200 group-hover:text-brand-indigo group-hover:translate-x-1 transition-all" />
                </div>
              </button>
            );
          })}
        </div>
      </section>
    </motion.div>
    )}
    </AnimatePresence>
  );
}
