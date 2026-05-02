/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Home, ClipboardCheck, LifeBuoy, Wallet } from 'lucide-react';
import { motion } from 'motion/react';

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Navigation({ activeTab, setActiveTab }: NavigationProps) {
  const tabs = [
    { id: 'home', icon: Home, label: 'Explore' },
    { id: 'tracking', icon: ClipboardCheck, label: 'Status' },
    { id: 'claims', icon: LifeBuoy, label: 'Claims' },
    { id: 'wallet', icon: Wallet, label: 'Wallet' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-6 py-3 pb-8 md:hidden z-50">
      <div className="max-w-md mx-auto flex justify-between items-center text-slate-500">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center gap-1 transition-colors ${
                isActive ? 'text-brand-indigo' : 'hover:text-slate-800'
              }`}
            >
              <div className="relative">
                <Icon size={24} />
                {isActive && (
                  <motion.div
                    layoutId="activeTabUnderline"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-brand-indigo rounded-full"
                  />
                )}
              </div>
              <span className="text-[10px] font-medium uppercase tracking-wider">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
