'use client';

import React, { useState } from 'react';
import { AppProvider, useApp } from '../context/AppContext';
import { Header } from '../components/Header';
import { StoreLanding } from '../components/StoreLanding';
import { CustomerMenu } from '../components/CustomerMenu';
import { StaffDashboard } from '../components/StaffDashboard';
import { AdminPortal } from '../components/AdminPortal';
import { StaffLogin } from '../components/StaffLogin';
import { StoreCustomizer } from '../components/StoreCustomizer';
import { OrderTrackingView } from '../components/OrderTrackingView';
import { CartDrawer } from '../components/CartDrawer';
import { Lock } from 'lucide-react';

function MainContent() {
  const { activeView, setActiveView, venueSettings, currentStaff } = useApp();
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Is customer facing (store landing, menu or live tracking)
  const isCustomerArea = activeView === 'store' || activeView === 'customer_menu' || activeView === 'order_tracking';
  const isEditorArea = activeView === 'editor';
  const canAccessAdmin = currentStaff?.role === 'admin' || currentStaff?.role === 'analyst';

  // Theme Scope & Font Evaluation
  const themeConfig = venueSettings.theme || {
    preset: 'terracotta',
    fontFamily: 'serif_classic',
    headingFont: 'serif_cormorant',
    bodyFont: 'sans_inter',
    scope: 'all',
    primaryColor: '#B3542E',
    secondaryColor: '#C97A4E',
    cardColor: '#FFFFFF',
    textColor: '#211D1A',
    backgroundColor: '#FAF7F2'
  };

  const isThemeActive = 
    themeConfig.scope === 'all' || 
    (themeConfig.scope === 'storefront_only' && isCustomerArea) ||
    (themeConfig.scope === 'admin_only' && !isCustomerArea);

  const themeBgClass = isThemeActive ? (
    themeConfig.preset === 'midnight_espresso' 
      ? 'bg-[#181513] text-[#F5EFEB]' 
      : themeConfig.preset === 'sage_olive'
      ? 'bg-[#F5F7F4] text-[#1E2620]'
      : 'bg-[#FAF7F2] text-[#211D1A]'
  ) : 'bg-[#FAF7F2] text-[#211D1A]';

  const headingFontClass = isThemeActive ? (
    themeConfig.headingFont === 'serif_cormorant' ? '[&_.font-serif]:font-heading-cormorant' :
    themeConfig.headingFont === 'serif_playfair' ? '[&_.font-serif]:font-heading-playfair' :
    themeConfig.headingFont === 'serif_lora' ? '[&_.font-serif]:font-heading-lora' :
    themeConfig.headingFont === 'sans_jakarta' ? '[&_.font-serif]:font-heading-jakarta' :
    themeConfig.headingFont === 'sans_inter' ? '[&_.font-serif]:font-heading-inter' :
    themeConfig.fontFamily === 'sans_modern' ? '[&_.font-serif]:font-sans' : ''
  ) : '';

  const bodyFontClass = isThemeActive ? (
    themeConfig.bodyFont === 'serif_lora' ? 'font-body-lora' :
    themeConfig.bodyFont === 'sans_jakarta' ? 'font-body-jakarta' :
    'font-body-inter'
  ) : '';

  return (
    <div 
      className={`min-h-screen flex flex-col ${themeBgClass} ${headingFontClass} ${bodyFontClass} transition-colors duration-300`}
      style={{
        backgroundColor: isThemeActive ? (themeConfig.backgroundColor || undefined) : undefined,
        color: isThemeActive ? (themeConfig.textColor || undefined) : undefined
      }}
    >
      
      {/* Customer Header only shows in customer areas */}
      {isCustomerArea && (
        <Header onOpenCart={() => setIsCartOpen(true)} />
      )}

      <main className={`flex-1 ${isEditorArea ? '' : 'pb-16'}`}>
        {activeView === 'store' && <StoreLanding />}
        {activeView === 'customer_menu' && <CustomerMenu />}
        {activeView === 'order_tracking' && <OrderTrackingView />}
        {activeView === 'login' && <StaffLogin />}
        {activeView === 'kitchen' && <StaffDashboard />}
        {activeView === 'admin' && (canAccessAdmin ? <AdminPortal /> : <StoreCustomizer />)}
        {activeView === 'editor' && <StoreCustomizer />}
      </main>

      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
      />

      {/* Discreet Footer with Staff Portal Link (Hidden in Editor for Fullscreen Studio Mode) */}
      {!isEditorArea && (
        <footer className="border-t border-[#E7DFD5] py-8 text-center text-xs text-[#8C827A] bg-transparent">
          <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="font-serif font-bold text-current">{venueSettings.venueName}</p>
            
            <div className="flex items-center gap-4">
              {isCustomerArea ? (
                <button
                  onClick={() => setActiveView('login')}
                  className="text-[11px] opacity-75 hover:opacity-100 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Lock className="w-3 h-3" />
                  <span>Personel Portalı</span>
                </button>
              ) : (
                <button
                  onClick={() => setActiveView('store')}
                  className="text-[11px] opacity-75 hover:opacity-100 transition-colors cursor-pointer"
                >
                  ← Müşteri Mağazasına Dön
                </button>
              )}
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}

export default function Home() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
