/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import Navigation from './components/Navigation';
import Home from './components/Home';
import CashbackTracker from './components/CashbackTracker';
import LiveLedger from './components/LiveLedger';
import ClaimBot from './components/ClaimBot';
import Wallet from './components/Wallet';
import Profile from './components/Profile';
import OfferDetail from './components/OfferDetail';
import ActivationModal from './components/ActivationModal';
import { TRANSACTIONS, MERCHANTS } from './constants';
import { Offer, Merchant } from './types';
import { Shield, Home as HomeIcon, ClipboardCheck, LifeBuoy, Wallet as WalletIcon, Search, ChevronLeft, ChevronRight, Activity } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [viewingOffer, setViewingOffer] = useState<{offer: Offer, merchant: Merchant} | null>(null);
  const [activationOffer, setActivationOffer] = useState<{offer: Offer, merchant: Merchant} | null>(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const resetScroll = React.useCallback(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, []);

  useEffect(() => {
    resetScroll();
  }, [activeTab, viewingOffer, resetScroll]);

  const handleSelectOffer = (offer: Offer) => {
    const merchant = MERCHANTS.find(m => m.id === offer.merchantId)!;
    setViewingOffer({ offer, merchant });
  };

  const handleActivate = (offer: Offer) => {
    const merchant = MERCHANTS.find(m => m.id === offer.merchantId)!;
    setActivationOffer({ offer, merchant });
    setViewingOffer(null);
  };

  const renderScreen = () => {
    if (viewingOffer) {
      return (
        <OfferDetail 
          offer={viewingOffer.offer} 
          merchant={viewingOffer.merchant} 
          onBack={() => setViewingOffer(null)}
          onActivate={() => handleActivate(viewingOffer.offer)}
        />
      );
    }

    switch (activeTab) {
      case 'home':
        return <Home onActivate={handleSelectOffer} onNavigate={resetScroll} />;
      case 'tracking':
        return <CashbackTracker onNavigate={resetScroll} />;
      case 'ledger':
        return <LiveLedger transactions={TRANSACTIONS} />;
      case 'claims':
        return <ClaimBot />;
      case 'wallet':
        return <Wallet />;
      case 'profile':
        return <Profile />;
      default:
        return <Home onActivate={handleSelectOffer} />;
    }
  };

  const sidebarTabs = [
    { id: 'home', icon: HomeIcon, label: 'Overview' },
    { id: 'tracking', icon: ClipboardCheck, label: 'Cashback Status' },
    { id: 'ledger', icon: Activity, label: 'Audit Ledger' },
    { id: 'claims', icon: LifeBuoy, label: 'Claims' },
    { id: 'wallet', icon: WalletIcon, label: 'Wallet' },
  ];

  return (
    <div className="min-h-screen bg-brand-slate-50 text-slate-900 selection:bg-brand-indigo/10 flex overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className={`hidden md:flex ${isSidebarCollapsed ? 'w-20' : 'w-64'} bg-brand-slate-900 text-white flex-col shrink-0 transition-all duration-300 relative`}>
        <div className={`p-6 flex items-center ${isSidebarCollapsed ? 'justify-center' : 'space-x-3'}`}>
          <div className="w-8 h-8 bg-brand-indigo rounded-lg flex items-center justify-center shrink-0">
            <Shield size={18} className="text-white" />
          </div>
          {!isSidebarCollapsed && <span className="font-bold text-xl tracking-tight">TrueBack</span>}
        </div>
        <nav className="flex-1 px-4 py-4 space-y-2">
          {sidebarTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id && !viewingOffer;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setViewingOffer(null);
                }}
                title={tab.label}
                className={`w-full flex items-center ${isSidebarCollapsed ? 'justify-center' : 'space-x-3'} px-4 py-3 rounded-xl transition-all ${
                  isActive 
                    ? 'bg-brand-indigo text-white shadow-lg shadow-indigo-900/50' 
                    : 'text-slate-400 hover:bg-brand-slate-800 hover:text-white'
                }`}
              >
                <Icon size={20} className="shrink-0" />
                {!isSidebarCollapsed && <span className="font-medium text-sm">{tab.label}</span>}
              </button>
            );
          })}
        </nav>
        
        {/* Collapse Toggle */}
        <button 
          onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          className="absolute -right-3 top-24 bg-brand-indigo text-white p-1.5 rounded-full shadow-lg border-2 border-brand-slate-50 hover:bg-indigo-700 transition-colors z-20"
        >
          {isSidebarCollapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
        </button>

        {!isSidebarCollapsed && (
          <div className="p-4" />
        )}
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Desktop Header */}
        <header className="hidden md:flex h-20 bg-white border-b border-brand-slate-200 items-center justify-between px-8 shrink-0">
          <div>
            <h1 className="text-xl font-bold text-slate-900 font-display">Dashboard</h1>
            <p className="text-xs text-slate-500">Shop with confidence, earn with certainty.</p>
          </div>
          <div className="flex items-center space-x-6">
            <div className="relative">
              <input type="text" placeholder="Search brands..." className="bg-brand-slate-100 border-none rounded-full px-4 py-2 text-sm w-64 focus:ring-2 focus:ring-brand-indigo transition-all outline-none" />
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
            </div>
            <button 
              onClick={() => setActiveTab('profile')}
              className={`flex items-center gap-3 p-1 rounded-full transition-all border-2 ${activeTab === 'profile' ? 'border-brand-indigo' : 'border-transparent hover:bg-brand-slate-50'}`}
            >
              <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-brand-indigo font-bold shadow-sm whitespace-pre"> AM </div>
            </button>
          </div>
        </header>

        {/* Scrollable Content */}
        <div id="main-scroll-container" ref={scrollContainerRef} className="flex-1 overflow-y-auto no-scrollbar scroll-smooth">
          <div className="max-w-screen-2xl mx-auto px-4 sm:px-8 lg:px-12 pt-8 md:pt-12">
            <div className="max-w-6xl mx-auto">
              {renderScreen()}
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Navigation */}
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />

      <ActivationModal
        offer={activationOffer?.offer || null}
        merchant={activationOffer?.merchant || null}
        onClose={() => setActivationOffer(null)}
      />
      
      {/* Mobile-style system bar background */}
      <div className="fixed top-0 left-0 right-0 h-6 bg-brand-slate-50 md:hidden z-[60]" />
    </div>
  );
}
