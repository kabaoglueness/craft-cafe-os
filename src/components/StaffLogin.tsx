'use client';

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Lock, ArrowRight, ShieldCheck, UserCheck, ArrowLeft, AlertCircle, ChevronDown, ChevronUp, LayoutTemplate, BarChart3 } from 'lucide-react';

export const StaffLogin: React.FC = () => {
  const { loginWithPasscode, setActiveView } = useApp();
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [showTestHelpers, setShowTestHelpers] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!passcode.trim()) {
      setError('Lütfen bir personel şifresi giriniz.');
      return;
    }

    const res = loginWithPasscode(passcode);
    if (!res.success) {
      setError(res.message || 'Geçersiz şifre.');
    }
  };

  const handleQuickLogin = (code: string) => {
    setPasscode(code);
    setError(null);
    loginWithPasscode(code);
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 sm:py-24">
      <div className="bg-white border border-[#E7DFD5] rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
        
        {/* Back to store */}
        <button
          onClick={() => setActiveView('store')}
          className="text-xs text-[#8C827A] hover:text-[#211D1A] flex items-center gap-1 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Mağazaya Geri Dön</span>
        </button>

        {/* Minimal Production Header */}
        <div className="space-y-1.5 text-center">
          <div className="w-12 h-12 rounded-2xl bg-[#FAF7F2] border border-[#E7DFD5] text-[#211D1A] flex items-center justify-center mx-auto shadow-xs">
            <Lock className="w-5 h-5" />
          </div>
          <h2 className="font-serif text-2xl font-bold tracking-tight text-[#211D1A]">
            Personel Portalı
          </h2>
          <p className="text-xs text-[#6E655F]">
            Kasiyer veya yönetici şifrenizle giriş yapın.
          </p>
        </div>

        {/* Error message */}
        {error && (
          <div className="p-3 bg-[#FAF0E6] border border-[#E8D4C4] rounded-xl text-xs text-[#B3542E] flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Single Passcode Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-[#6E655F] block text-center">
              Giriş Şifresi
            </label>
            <input
              type="password"
              required
              autoFocus
              placeholder="••••••••"
              value={passcode}
              onChange={(e) => {
                setPasscode(e.target.value);
                if (error) setError(null);
              }}
              className="w-full px-4 py-3 bg-[#FAF7F2] border border-[#E7DFD5] rounded-xl text-center text-sm font-medium text-[#211D1A] placeholder-[#9E948C] focus:outline-none focus:border-[#B3542E]"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-[#211D1A] hover:bg-[#38322D] text-white font-medium text-xs sm:text-sm tracking-[0.01em] flex items-center justify-center gap-2 transition-all active:scale-[0.99] cursor-pointer"
          >
            <span>Panele Giriş Yap</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Collapsible Test Mode Helpers */}
        <div className="pt-3 border-t border-[#F0EAE1]">
          <button
            type="button"
            onClick={() => setShowTestHelpers(!showTestHelpers)}
            className="w-full py-1 text-center text-[11px] font-medium text-[#8C827A] hover:text-[#211D1A] flex items-center justify-center gap-1 cursor-pointer transition-colors"
          >
            <span>{showTestHelpers ? 'Hızlı Giriş Kısayollarını Gizle' : 'Hızlı Giriş Kısayolları'}</span>
            {showTestHelpers ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          {showTestHelpers && (
            <div className="pt-3 space-y-2.5 animate-in fade-in duration-150">
              <p className="text-[10px] text-[#A69B91] text-center">
                Canlı sürümde bu alan kapalıdır. Test aşamasında şifre yazmadan tek tıkla panele geçebilirsiniz:
              </p>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleQuickLogin('enes')}
                  className="p-2.5 rounded-xl border border-[#E7DFD5] bg-[#FAF7F2] hover:bg-[#F3ECE2] text-left transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-1 text-[11px] font-bold text-[#B3542E]">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Yönetici</span>
                  </div>
                  <div className="text-[11px] text-[#211D1A] font-semibold">Enes</div>
                  <div className="text-[10px] text-[#8C827A]">Yetkili Girişi</div>
                </button>

                <button
                  type="button"
                  onClick={() => handleQuickLogin('ömer')}
                  className="p-2.5 rounded-xl border border-[#E7DFD5] bg-[#FAF7F2] hover:bg-[#F3ECE2] text-left transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-1 text-[11px] font-bold text-[#2C5282]">
                    <UserCheck className="w-3.5 h-3.5" />
                    <span>Mutfak / KDS</span>
                  </div>
                  <div className="text-[11px] text-[#211D1A] font-semibold">Ömer</div>
                  <div className="text-[10px] text-[#8C827A]">İstasyon Girişi</div>
                </button>

                <button
                  type="button"
                  onClick={() => handleQuickLogin('editör')}
                  className="p-2.5 rounded-xl border border-[#E7DFD5] bg-[#FAF7F2] hover:bg-[#F3ECE2] text-left transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-1 text-[11px] font-bold text-[#4E5E48]">
                    <LayoutTemplate className="w-3.5 h-3.5" />
                    <span>Mağaza Editörü</span>
                  </div>
                  <div className="text-[11px] text-[#211D1A] font-semibold">Ayşe</div>
                  <div className="text-[10px] text-[#8C827A]">Tasarım Girişi</div>
                </button>

                <button
                  type="button"
                  onClick={() => handleQuickLogin('analist')}
                  className="p-2.5 rounded-xl border border-[#D0C2EE] bg-[#F7F4FD] hover:bg-[#EFE9FC] text-left transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-1 text-[11px] font-bold text-[#6B46C1]">
                    <BarChart3 className="w-3.5 h-3.5" />
                    <span>Finans & Analist</span>
                  </div>
                  <div className="text-[11px] text-[#211D1A] font-semibold">Selin</div>
                  <div className="text-[10px] text-[#8C827A]">Rapor Girişi</div>
                </button>
              </div>

              <div className="text-[10px] text-[#A69B91] text-center">
                Enes (Yönetici) • Ömer (KDS) • Ayşe (Vitrin Editörü) • Selin (Finans & Raporlar)
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
