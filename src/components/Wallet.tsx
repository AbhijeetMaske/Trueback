/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  ArrowUpRight, 
  Zap, 
  History, 
  Wallet as WalletIcon, 
  ChevronRight, 
  ShieldCheck, 
  ArrowDownRight,
  TrendingUp,
  Banknote,
  CheckCircle2,
  Clock,
  ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CounterUp } from './CounterUp';

export default function Wallet() {
  const [balance, setBalance] = useState(8422.50);
  const pending = 2140.30;
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState('');

  const [transactions, setTransactions] = useState([
    { id: 1, type: 'Withdrawal', amount: 4500, date: 'May 01, 2026', status: 'Completed', method: 'Bank Transfer' },
    { id: 2, type: 'Cashback Confirmed', amount: 1240.50, date: 'Apr 28, 2026', status: 'Added', merchant: 'Adidas' },
    { id: 3, type: 'Cashback Confirmed', amount: 850.00, date: 'Apr 25, 2026', status: 'Added', merchant: 'Samsung' },
    { id: 4, type: 'FastCash Payout', amount: 3200, date: 'Apr 20, 2026', status: 'Completed', method: 'Instant' },
    { id: 5, type: 'Cashback Confirmed', amount: 2100.44, date: 'Apr 15, 2026', status: 'Added', merchant: 'Apple' },
    { id: 6, type: 'Cashback Confirmed', amount: 542.20, date: 'Apr 10, 2026', status: 'Added', merchant: 'Myntra' },
  ]);

  const handleWithdraw = () => {
    const amount = parseFloat(withdrawAmount);
    if (!withdrawAmount || amount > balance || amount <= 0) return;
    setIsWithdrawing(true);

    const newTx = {
      id: Date.now(),
      type: 'Withdrawal',
      amount: amount,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      status: 'Processing',
      method: 'Bank Transfer'
    };

    setTimeout(() => {
      setBalance(prev => prev - amount);
      setTransactions(prev => [newTx, ...prev]);
      setIsWithdrawing(false);
      setShowSuccess(true);
      setWithdrawAmount('');
    }, 2000);
  };

  return (
    <div className="flex flex-col gap-8 pb-32">
      <AnimatePresence mode="wait">
        {!showSuccess ? (
          <motion.div 
            key="wallet-main"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex flex-col gap-8"
          >
            {/* Header */}
            <header className="flex flex-col gap-1">
              <h1 className="font-display text-3xl font-bold text-slate-900 tracking-tight text-brand-slate-900">Audit Wallet</h1>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-brand-emerald rounded-full animate-pulse" />
                <p className="text-slate-500 text-xs font-medium uppercase tracking-widest">Secured Node Connection</p>
              </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              {/* Balance Card - Now part of grid */}
              <div className="lg:col-span-2 flex flex-col gap-8">
                <div className="trust-gradient rounded-[2.5rem] sm:rounded-[3rem] p-6 sm:p-10 text-white shadow-2xl shadow-indigo-200 relative overflow-hidden group">
                  <div className="relative z-10">
                    <div className="flex flex-col sm:flex-row justify-between items-start mb-10 sm:mb-16 gap-6 sm:gap-4">
                      <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 sm:p-3 bg-white/10 rounded-2xl backdrop-blur-md border border-white/20 shrink-0">
                            <WalletIcon size={20} className="sm:w-6 sm:h-6" strokeWidth={1.5} />
                          </div>
                          <span className="text-[9px] sm:text-[10px] uppercase font-black tracking-[0.2em] opacity-80 leading-none">Available for Withdrawal</span>
                        </div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-xl sm:text-2xl font-bold opacity-60">₹</span>
                          <h2 className="text-4xl sm:text-6xl font-display font-black tabular-nums tracking-tighter">
                            <CounterUp value={balance} />
                          </h2>
                        </div>
                      </div>
                      <div className="bg-white/10 border border-white/20 backdrop-blur-xl px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl sm:rounded-2xl text-[9px] sm:text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shrink-0 whitespace-nowrap self-start sm:self-auto">
                        <ShieldCheck size={14} className="text-brand-emerald shrink-0" />
                        Audit Pass
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white/10 backdrop-blur-md rounded-[2rem] p-6 border border-white/10">
                        <p className="text-[9px] uppercase font-black tracking-widest text-white mb-2">Pending Audit</p>
                        <p className="text-xl font-display font-bold">
                          ₹<CounterUp value={pending} duration={1.5} />
                        </p>
                      </div>
                      <button 
                        onClick={() => setIsWithdrawing(true)}
                        className="bg-white text-brand-slate-900 rounded-[2rem] p-6 font-black flex flex-col justify-center items-center gap-1 shadow-xl hover:bg-brand-indigo hover:text-white transition-all transform hover:-translate-y-1"
                      >
                        <span className="text-[9px] uppercase tracking-widest opacity-60">Withdraw</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm">Initiate</span>
                          <ArrowUpRight size={16} />
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* Abstract luxury shapes */}
                  <div className="absolute top-[-20%] right-[-10%] w-80 h-80 bg-indigo-400/20 rounded-full blur-3xl" />
                  <div className="absolute bottom-[-20%] left-[-10%] w-64 h-64 bg-emerald-400/10 rounded-full blur-3xl" />
                </div>
              </div>

              {/* FastCash - Sidebar on desktop */}
              <section className="bg-brand-slate-900 rounded-[3rem] p-8 border border-brand-slate-800 shadow-xl overflow-hidden relative lg:h-full flex flex-col justify-between">
                <div className="relative z-10 flex flex-col gap-6">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 bg-brand-indigo rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-900/50">
                      <Zap size={24} className="text-white" fill="white" />
                    </div>
                    <div className="px-3 py-1 bg-brand-indigo/20 border border-brand-indigo/30 rounded-full">
                      <span className="text-[10px] font-black text-brand-indigo uppercase tracking-widest">PRO</span>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-display font-bold text-xl text-white">FastCash™</h3>
                    <p className="text-[10px] text-white uppercase font-black tracking-widest mt-1">Instant Liquidity System</p>
                  </div>

                  <div className="p-5 bg-brand-slate-800/50 rounded-2xl border border-brand-slate-800">
                    <p className="text-xs text-white font-medium leading-relaxed">
                      Unlock pending cashback instantly. Safe-audit technology ensures 0.8% flat fee.
                    </p>
                  </div>

                  <button className="w-full bg-brand-indigo hover:bg-white hover:text-brand-indigo text-white font-black py-4 rounded-xl transition-all flex items-center justify-center gap-2 font-display uppercase tracking-widest text-[10px]">
                    Unlock ₹{pending.toLocaleString()}
                    <TrendingUp size={14} />
                  </button>
                </div>
              </section>
            </div>

            {/* Transaction History Section */}
            <section className="flex flex-col gap-6">
              <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-brand-slate-100 flex items-center justify-center text-slate-500">
                    <History size={16} />
                  </div>
                  <h3 className="font-display font-bold text-xl text-slate-800 tracking-tight">Recent Activity</h3>
                </div>
                <button className="text-[10px] font-black text-brand-indigo uppercase tracking-widest flex items-center gap-1">
                  Statements <ExternalLink size={12} />
                </button>
              </div>

              <div className="grid gap-3">
                {transactions.map((item) => (
                  <div 
                    key={item.id} 
                    className="bg-white p-6 rounded-[2rem] border border-brand-slate-100 flex justify-between items-center shadow-sm hover:border-brand-indigo/20 transition-all cursor-pointer group"
                  >
                    <div className="flex gap-4 items-center">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-105 ${
                        item.type === 'Withdrawal' || item.type === 'FastCash Payout' ? 'bg-slate-900 text-white shadow-lg shadow-slate-100' : 'bg-brand-slate-50 text-brand-indigo'
                      }`}>
                        {item.type === 'Withdrawal' ? (
                          <Banknote size={24} strokeWidth={1.5} />
                        ) : item.type === 'FastCash Payout' ? (
                          <Zap size={24} fill="currentColor" />
                        ) : (
                          <ArrowDownRight size={24} className="text-brand-emerald" />
                        )}
                      </div>
                      <div className="text-left">
                        <h4 className="font-bold text-slate-900">{item.type}</h4>
                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">
                          {item.merchant || item.method} • {item.date}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-lg font-display font-black ${item.type === 'Withdrawal' || item.type === 'FastCash Payout' ? 'text-slate-900' : 'text-brand-emerald'}`}>
                        {item.type === 'Withdrawal' || item.type === 'FastCash Payout' ? '-' : '+'}₹{item.amount.toLocaleString()}
                      </p>
                      <div className="flex items-center gap-1.5 justify-end mt-1">
                        <CheckCircle2 size={10} className="text-brand-emerald" />
                        <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">{item.status}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </motion.div>
        ) : (
          <motion.div 
            key="success-screen"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8 bg-white rounded-[3rem] border border-brand-slate-100 shadow-2xl"
          >
            <div className="w-24 h-24 bg-brand-emerald/10 text-brand-emerald rounded-[2.5rem] flex items-center justify-center mb-8 border border-brand-emerald/20 shadow-inner">
              <CheckCircle2 size={48} strokeWidth={1.5} />
            </div>
            <h2 className="font-display font-black text-4xl text-slate-900 mb-4 tracking-tighter uppercase">Transfer Initiated</h2>
            <p className="text-slate-500 text-sm max-w-xs mx-auto font-medium leading-relaxed mb-12">
              Your funds are on their way to your primary linked account. This usually takes 1-3 business days.
            </p>
            <div className="w-full bg-brand-slate-50 border border-brand-slate-100 rounded-3xl p-6 mb-8 text-left">
              <div className="flex justify-between items-center mb-4 pb-4 border-bottom border-brand-slate-200 border-dashed border-b">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Payout Method</span>
                <span className="text-xs font-bold text-slate-800">Primary Bank Transfer</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Transaction Ref</span>
                <span className="text-xs font-mono font-bold text-slate-800">#WT-{Math.random().toString(36).substring(7).toUpperCase()}</span>
              </div>
            </div>
            <button 
              onClick={() => setShowSuccess(false)}
              className="w-full bg-brand-slate-900 text-white font-black py-6 rounded-[2rem] shadow-xl hover:bg-brand-indigo transition-all font-display uppercase tracking-widest text-xs"
            >
              Back to Wallet
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Withdrawal Modal Overlay */}
      <AnimatePresence>
        {isWithdrawing && !showSuccess && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div 
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              className="bg-white rounded-[3rem] w-full max-w-md p-10 shadow-2xl relative overflow-hidden"
            >
              <button 
                onClick={() => setIsWithdrawing(false)}
                className="absolute top-8 right-8 text-slate-300 hover:text-slate-600"
              >
                <Clock size={24} className="rotate-45" />
              </button>

              <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-2">
                  <h3 className="font-display font-black text-2xl text-slate-900 uppercase tracking-tight">Withdraw Funds</h3>
                  <p className="text-xs text-slate-500 font-medium tracking-wide">Enter the amount you'd like to transfer to your bank.</p>
                </div>

                <div className="relative">
                  <div className="absolute left-6 top-1/2 -translate-y-1/2 text-2xl font-display font-black text-slate-300">₹</div>
                  <input 
                    type="number" 
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full bg-brand-slate-50 border border-brand-slate-100 rounded-[2rem] p-8 pl-12 text-4xl font-display font-black outline-none focus:ring-4 focus:ring-brand-indigo/10 transition-all"
                  />
                  <div className="absolute right-6 top-1/2 -translate-y-1/2">
                    <button 
                      onClick={() => setWithdrawAmount(balance.toString())}
                      className="bg-brand-indigo/10 text-brand-indigo px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest"
                    >
                      MAX
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between px-2">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Available: ₹{balance.toLocaleString()}</span>
                  {parseFloat(withdrawAmount) > balance && (
                    <span className="text-[10px] font-black text-brand-red uppercase tracking-widest">Insufficient Funds</span>
                  )}
                </div>

                <button 
                  onClick={handleWithdraw}
                  disabled={!withdrawAmount || parseFloat(withdrawAmount) > balance || parseFloat(withdrawAmount) <= 0}
                  className="w-full bg-brand-slate-900 disabled:opacity-30 text-white font-black py-6 rounded-[2rem] flex items-center justify-center gap-3 shadow-xl font-display uppercase tracking-widest text-xs transition-all"
                >
                  {withdrawAmount ? `Withdraw ₹${parseFloat(withdrawAmount).toLocaleString()}` : 'Enter Amount'}
                  <ArrowUpRight size={18} />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
