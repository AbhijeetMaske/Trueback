/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  ArrowLeft, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Receipt, 
  Wallet, 
  Calendar,
  ShieldCheck,
  ExternalLink,
  ChevronRight,
  Info
} from 'lucide-react';
import { motion } from 'motion/react';
import { Transaction, Merchant } from '../types';

interface TransactionDetailProps {
  transaction: Transaction;
  merchant: Merchant;
  onBack: () => void;
}

export default function TransactionDetail({ transaction, merchant, onBack }: TransactionDetailProps) {
  const statusStyles = {
    'Payable': { bg: 'bg-emerald-50', text: 'text-brand-emerald', icon: CheckCircle2, description: 'The merchant has verified your purchase. Funds are ready for payout.' },
    'Confirmed': { bg: 'bg-indigo-50', text: 'text-brand-indigo', icon: CheckCircle2, description: 'Tracking confirmed by merchant. We are waiting for the final validation period.' },
    'Validating': { bg: 'bg-amber-50', text: 'text-brand-amber', icon: Clock, description: 'We track your order. Now waiting for the merchant to confirm the return window has closed.' },
    'Issue': { bg: 'bg-rose-50', text: 'text-brand-red', icon: AlertCircle, description: 'The tracking link was interrupted or the item was from an ineligible category.' },
  }[transaction.status] || { bg: 'bg-slate-50', text: 'text-slate-400', icon: Clock, description: 'Transaction is being audited.' };

  const StatusIcon = statusStyles.icon;

  const statusFlow = ['Tracked', 'Validating', 'Confirmed', 'Payable'];
  const currentStatusIndex = statusFlow.indexOf(transaction.status);

  const events = [
    { 
      title: 'Order Tracking Initiated', 
      tat: 'Instant', 
      time: '14:22:05', 
      date: transaction.date, 
      status: 'completed',
      description: 'Handshake established between TrueBack and merchant nodes.'
    },
    { 
      title: 'Transaction Captured', 
      tat: '< 1 min', 
      time: '14:45:12', 
      date: transaction.date, 
      status: currentStatusIndex >= 0 ? 'completed' : 'upcoming',
      description: 'The merchant has reported a successful order placement.'
    },
    { 
      title: 'Merchant Validation Audit', 
      tat: '2-3 Business Days', 
      time: transaction.status === 'Tracked' ? 'Pending' : '10:15:33', 
      date: transaction.status === 'Tracked' ? 'Awaiting Data' : transaction.date, 
      status: transaction.status === 'Tracked' ? 'next' : currentStatusIndex >= 1 ? 'completed' : 'upcoming',
      description: 'Audit engine verifies order items and eligibility.'
    },
    { 
      title: 'Post-Return Confirmation', 
      tat: '30-90 Days', 
      time: transaction.status === 'Confirmed' || transaction.status === 'Payable' ? '12:00:00' : 'Awaiting', 
      date: transaction.status === 'Confirmed' || transaction.status === 'Payable' ? transaction.date : 'TBD', 
      status: transaction.status === 'Validating' ? 'next' : currentStatusIndex >= 2 ? 'completed' : 'upcoming',
      description: 'Ensuring return window is closed and order is non-refundable.'
    },
    { 
      title: 'Cashback Disbursement', 
      tat: 'Instant', 
      time: transaction.status === 'Payable' ? 'Ready' : 'Est. TBD', 
      date: transaction.estimatedPayoutDate, 
      status: transaction.status === 'Confirmed' ? 'next' : currentStatusIndex >= 3 ? 'completed' : 'upcoming',
      description: 'Funds released to your primary TrueBack wallet.'
    },
  ];

  if (transaction.status === 'Issue') {
    events[2] = {
      title: 'Audit Failure Detected',
      tat: 'Final',
      time: '16:00:00',
      date: transaction.date,
      status: 'error',
      description: 'The transaction failed the integrity audit check.'
    };
  }

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col gap-6 pb-24"
    >
      {/* Header */}
      <div className="flex items-center gap-4">
        <button 
          onClick={onBack}
          className="w-10 h-10 rounded-xl bg-white border border-brand-slate-100 flex items-center justify-center text-slate-600 hover:bg-brand-slate-50 transition-colors shadow-sm"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h2 className="font-display font-bold text-lg text-slate-800">Audit Status</h2>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Order ID: {transaction.orderId || 'ORD-' + transaction.id.toUpperCase().padStart(11, '0')}</p>
        </div>
      </div>

      {/* Main Stats Card */}
      <div className="bg-white rounded-[2.5rem] p-8 border border-brand-slate-100 shadow-sm relative overflow-hidden">
        <div className="flex flex-col gap-8 relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-brand-slate-50 flex items-center justify-center text-3xl shadow-inner border border-brand-slate-100">
                {merchant.logo}
              </div>
              <div>
                <h3 className="font-bold text-xl text-slate-900">{merchant.name}</h3>
                <p className="text-xs text-slate-400 font-medium">{transaction.date}</p>
              </div>
            </div>
            <div className={`px-4 py-1.5 rounded-full ${
              transaction.status === 'Payable' ? 'bg-emerald-50 text-brand-emerald' :
              transaction.status === 'Confirmed' ? 'bg-emerald-50 text-brand-emerald' :
              transaction.status === 'Validating' ? 'bg-amber-50 text-brand-amber' :
              'bg-slate-50 text-slate-400'
            } flex items-center gap-2`}>
              <StatusIcon size={14} strokeWidth={3} />
              <span className="text-[10px] font-bold uppercase tracking-widest">{transaction.status}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-6 rounded-[2rem] bg-brand-slate-50 border border-brand-slate-100">
              <div className="flex items-center gap-2 mb-2">
                <Receipt size={14} className="text-slate-400" />
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Order Amount</span>
              </div>
              <p className="text-2xl font-display font-black text-slate-800">₹{transaction.amount.toLocaleString()}</p>
            </div>
            <div className="p-6 rounded-[2rem] bg-brand-indigo/5 border border-brand-indigo/10">
              <div className="flex items-center gap-2 mb-2">
                <Wallet size={14} className="text-brand-indigo" />
                <span className="text-[10px] font-bold text-brand-indigo uppercase tracking-widest leading-none">
                  Cashback ({((transaction.cashbackAmount / transaction.amount) * 100).toFixed(1)}%)
                </span>
              </div>
              <p className="text-2xl font-display font-black text-brand-indigo">₹{transaction.cashbackAmount.toLocaleString()}</p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ShieldCheck className="text-brand-emerald" size={20} />
              <p className="text-xs font-medium opacity-80">Secured with TrueBack Handshake</p>
            </div>
            <button className="text-[10px] font-bold uppercase tracking-widest text-brand-indigo flex items-center gap-1 hover:underline">
              Digital Receipt <ExternalLink size={10} />
            </button>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-indigo-50 rounded-full blur-3xl opacity-50" />
      </div>

      {/* Status Explanation */}
      <section className="bg-slate-50 rounded-3xl p-6 border border-slate-100 flex gap-4">
        <div className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${statusStyles.bg} ${statusStyles.text}`}>
          <Info size={20} />
        </div>
        <div className="flex flex-col gap-1">
          <h4 className="text-sm font-bold text-slate-800">Audit Insight</h4>
          <p className="text-xs text-slate-600 font-medium leading-relaxed">
            {statusStyles.description}
          </p>
        </div>
      </section>

      {/* Timeline Breakdown */}
      <section className="bg-white rounded-[2rem] p-8 border border-brand-slate-100">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center">
            <Calendar size={16} />
          </div>
          <h3 className="font-display font-bold text-lg text-slate-800">Audit Flow Timeline</h3>
        </div>

        <div className="flex flex-col gap-8 relative">
          {events.map((event, i) => (
            <div key={i} className="flex gap-4 relative">
              {/* Line */}
              {i < events.length - 1 && (
                <div className={`absolute left-4 top-10 w-0.5 h-10 rounded-full ${
                  event.status === 'completed' ? 'bg-brand-emerald' : 'bg-brand-slate-100'
                }`} />
              )}
              
              {/* Dot */}
              <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center z-10 border-4 border-white ${
                event.status === 'completed' ? 'bg-brand-emerald text-white shadow-lg shadow-emerald-100' :
                event.status === 'error' ? 'bg-brand-red text-white shadow-lg shadow-red-100' :
                event.status === 'next' ? 'bg-brand-amber text-white shadow-lg shadow-amber-100 animate-pulse' :
                'bg-brand-slate-50 text-slate-300'
              }`}>
                {event.status === 'completed' ? <CheckCircle2 size={12} /> : 
                 event.status === 'error' ? <AlertCircle size={12} /> :
                 event.status === 'next' ? <Clock size={12} /> :
                 <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />}
              </div>

              <div className="flex-1 flex flex-col pt-1">
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h4 className={`text-sm font-bold ${
                      event.status === 'upcoming' ? 'text-slate-400' : 
                      event.status === 'next' ? 'text-brand-amber' :
                      'text-slate-800'
                    }`}>
                      {event.title}
                    </h4>
                    <div className="flex items-center gap-2 mt-0.5">
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">{event.date}</p>
                      <span className="text-[10px] text-slate-200">•</span>
                      <p className="text-[10px] text-slate-400 font-mono">{event.time}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded ${
                      event.status === 'completed' ? 'bg-emerald-50 text-brand-emerald' :
                      event.status === 'next' ? 'bg-amber-50 text-brand-amber' :
                      'bg-slate-50 text-slate-400'
                    }`}>
                      TAT: {event.tat}
                    </span>
                  </div>
                </div>
                <p className={`text-[11px] leading-relaxed mt-1 ${
                  event.status === 'upcoming' ? 'text-slate-300' : 'text-slate-500'
                }`}>
                  {event.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom Action */}
      <div className="flex flex-col gap-3">
        <button className="w-full bg-brand-indigo/5 text-brand-indigo font-black py-5 rounded-2xl border border-brand-indigo/20 hover:bg-brand-indigo/10 transition-all text-xs uppercase tracking-widest flex items-center justify-center gap-2">
          Download Transparency Report
        </button>
        <button className="w-full bg-white text-slate-400 font-bold py-5 rounded-2xl border border-brand-slate-100 hover:border-brand-red/30 hover:text-brand-red transition-all text-xs uppercase tracking-widest flex items-center justify-center gap-2">
          Raise Audit Dispute
        </button>
      </div>
    </motion.div>
  );
}
