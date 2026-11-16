'use client';

import React, { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { Lock, ArrowRight, ArrowLeft, AlertCircle, Eye, EyeOff } from 'lucide-react';

export const StaffLogin: React.FC = () => {
  const { loginWithPasscode, setActiveView } = useApp();
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!passcode.trim()) {
      setError('Lütfen bir personel şifresi giriniz.');
      inputRef.current?.focus();
      return;
    }

    const res = loginWithPasscode(passcode);
    if (!res.success) {
      setError(res.message || 'Geçersiz personel şifresi. Lütfen tekrar deneyin.');
      setPasscode('');
      setTimeout(() => {
        inputRef.current?.focus();
      }, 10);
    }
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
            <div className="relative">
              <input
                ref={inputRef}
                type={showPassword ? 'text' : 'password'}
                required
                autoFocus
                placeholder="••••••••"
                value={passcode}
                onChange={(e) => {
                  setPasscode(e.target.value);
                  if (error) setError(null);
                }}
                className="w-full pl-10 pr-10 py-3 bg-[#FAF7F2] border border-[#E7DFD5] rounded-xl text-center text-sm font-medium text-[#211D1A] placeholder-[#9E948C] focus:outline-none focus:border-[#B3542E] transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
                aria-label={showPassword ? 'Şifreyi gizle' : 'Şifreyi göster'}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8C827A] hover:text-[#211D1A] p-1.5 rounded-lg transition-colors cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-[#211D1A] hover:bg-[#38322D] text-white font-medium text-xs sm:text-sm tracking-[0.01em] flex items-center justify-center gap-2 transition-all active:scale-[0.99] cursor-pointer"
          >
            <span>Panele Giriş Yap</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

      </div>
    </div>
  );
};
