'use client';

import React from 'react';
import { useApp } from '../context/AppContext';
import { ShoppingBag, Clock } from 'lucide-react';

interface HeaderProps {
  onOpenCart: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenCart }) => {
  const { 
    tableNumber, 
    cartCount, 
    cartTotal, 
    venueSettings,
    activeView,
    setActiveView,
    orders
  } = useApp();

  const hasActiveOrder = orders.some(o => o.tableNumber === tableNumber && o.status !== 'completed');

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E7DFD5] text-[#211D1A]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo / Brand Name */}
          <button 
            onClick={() => setActiveView('store')}
            className="flex items-center gap-2.5 text-left group"
          >
            <div className="w-8 h-8 rounded-full bg-[#211D1A] text-[#FAF7F2] flex items-center justify-center font-serif text-sm font-bold tracking-tight shrink-0">
              A
            </div>
            <span className="font-serif text-base sm:text-lg font-bold tracking-tight text-[#211D1A] group-hover:text-[#B3542E] transition-colors">
              {venueSettings.venueName}
            </span>
          </button>

          {/* Right: Table Number & Cart (Ultra compact, fits any mobile) */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Table Indicator - Quiet, cohesive artisan pill */}
            <div 
              className="flex items-center gap-1.5 bg-[#F3ECE2] border border-[#E7DFD5] rounded-full px-3 py-1 text-xs"
              title={`Masa #${tableNumber}`}
            >
              <span className="text-[#8C827A] text-[11px] font-normal">Masa</span>
              <span className="font-medium text-[#211D1A] tabular-nums">{tableNumber.toString().padStart(2, '0')}</span>
            </div>

            {/* Live Order Tracker Pill (Visible when table has active order) */}
            {hasActiveOrder && (
              <button
                onClick={() => setActiveView(activeView === 'order_tracking' ? 'customer_menu' : 'order_tracking')}
                className={`px-3 py-1 rounded-full text-xs font-medium tracking-[0.01em] flex items-center gap-1.5 transition-all cursor-pointer ${
                  activeView === 'order_tracking'
                    ? 'bg-[#B3542E] text-white'
                    : 'bg-[#FAF0E6] text-[#B3542E] border border-[#E8D4C4] hover:bg-[#F5E6D8]'
                }`}
                title="Sipariş Takibi"
              >
                <Clock className="w-3 h-3 text-current" />
                <span className="hidden sm:inline">Sipariş Durumu</span>
                <span className="sm:hidden">Takip</span>
              </button>
            )}

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-2 bg-[#211D1A] hover:bg-[#38322D] text-[#FAF7F2] px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all active:scale-[0.98] shrink-0"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-[#E7DFD5]" />
              <span className="font-semibold hidden xs:inline">Adisyon</span>
              {cartTotal > 0 && (
                <span className="font-bold text-[#FAF7F2]">
                  {cartTotal} ₺
                </span>
              )}
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#B3542E] text-white font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center shadow-xs">
                  {cartCount}
                </span>
              )}
            </button>

          </div>

        </div>
      </div>
    </header>
  );
};
