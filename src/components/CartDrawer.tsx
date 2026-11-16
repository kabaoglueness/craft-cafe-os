'use client';

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  CheckCircle2, 
  ArrowRight,
  AlertCircle
} from 'lucide-react';
import { ActiveOrder } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const { 
    cart, 
    removeFromCart, 
    updateQuantity, 
    cartTotal, 
    tableNumber, 
    setTableNumber,
    customerName, 
    setCustomerName, 
    submitCurrentOrder,
    setActiveView,
    venueSettings
  } = useApp();

  const [orderNotes, setOrderNotes] = useState('');
  const [createdOrder, setCreatedOrder] = useState<ActiveOrder | null>(null);
  const [isChangingTable, setIsChangingTable] = useState(false);
  const [nameError, setNameError] = useState<string | null>(null);
  const [ruleError, setRuleError] = useState<string | null>(null);
  const [generalError, setGeneralError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCheckout = () => {
    setNameError(null);
    setRuleError(null);
    setGeneralError(null);

    if (!customerName.trim()) {
      setNameError('Lütfen sipariş sahibi adını veya masa adını giriniz.');
      return;
    }

    const result = submitCurrentOrder(orderNotes);
    if (result.error) {
      if (result.error.includes('sipariş sahibi') || result.error.includes('masa adı')) {
        setNameError(result.error);
      } else if (result.error.includes('içecek') || result.error.includes('atölye')) {
        setRuleError(result.error);
      } else {
        setGeneralError(result.error);
      }
    } else if (result.order) {
      setCreatedOrder(result.order);
    }
  };

  const handleViewLiveTracking = () => {
    setCreatedOrder(null);
    onClose();
    setActiveView('order_tracking');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md bg-white border-l border-[#E7DFD5] h-full flex flex-col text-[#211D1A] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-5 border-b border-[#E7DFD5] flex items-center justify-between bg-[#FAF7F2]">
          <div>
            <h3 className="font-serif text-lg font-bold text-[#211D1A]">Masa Adisyonu</h3>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-xs text-[#8C827A]">Masa #{tableNumber} • {cart.length} çeşit</span>
              <span className="text-[#D5C9BC]">•</span>
              <button
                type="button"
                onClick={() => setIsChangingTable(!isChangingTable)}
                className="text-[11px] text-[#B3542E] font-semibold hover:underline cursor-pointer"
                title="Masa değiştirme veya QR hata düzeltme"
              >
                {isChangingTable ? 'Vazgeç' : 'Masa Değiştir'}
              </button>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white border border-[#E7DFD5] flex items-center justify-center text-[#6E655F] hover:text-[#211D1A] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* QR Code Mismatch Protection / Table Change Dropdown */}
        {isChangingTable && (
          <div className="p-4 bg-[#FAF0E6] border-b border-[#E8D4C4] space-y-2 animate-in fade-in duration-150">
            <span className="text-xs font-bold text-[#211D1A] block">Masa Değiştir</span>
            <p className="text-[11px] text-[#6E655F] leading-relaxed">
              Farklı bir masaya geçtiyseniz siparişinizin doğru masaya servis edilmesi için numaranızı seçin:
            </p>
            <div className="flex items-center gap-2 pt-1">
              <select
                value={tableNumber}
                onChange={(e) => {
                  setTableNumber(Number(e.target.value));
                  setIsChangingTable(false);
                }}
                className="flex-1 px-3 py-2 bg-white border border-[#D5C9BC] rounded-xl text-xs font-bold text-[#211D1A] focus:outline-none focus:border-[#B3542E] cursor-pointer"
              >
                {Array.from({ length: venueSettings.tableCount || 24 }, (_, i) => i + 1).map((num) => (
                  <option key={num} value={num}>
                    Masa #{num.toString().padStart(2, '0')} {num === tableNumber ? '(Mevcut Masa)' : ''}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => setIsChangingTable(false)}
                className="px-3.5 py-2 bg-[#211D1A] text-white text-xs font-semibold rounded-xl hover:bg-[#38322D] cursor-pointer"
              >
                Onayla
              </button>
            </div>
          </div>
        )}

        {/* Confirmation Screen */}
        {createdOrder ? (
          <div className="p-8 flex-1 flex flex-col items-center justify-center text-center space-y-5">
            <div className="w-14 h-14 rounded-full bg-[#EEF3EC] text-[#4E5E48] flex items-center justify-center">
              <CheckCircle2 className="w-7 h-7" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-medium text-[#6E655F]">
                Siparişiniz İletildi
              </span>
              <h2 className="font-serif text-3xl font-bold text-[#211D1A]">
                {createdOrder.id}
              </h2>
              <p className="text-xs text-[#6E655F] max-w-xs mx-auto leading-relaxed pt-1">
                Masa #{createdOrder.tableNumber} için atölye seti ve içecekler eşzamanlı olarak istasyonlarda hazırlanmaya başlandı.
              </p>
            </div>

            <div className="w-full bg-[#FAF7F2] border border-[#E7DFD5] rounded-xl p-4 text-left space-y-2.5 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-[#EBE4DA]">
                <span className="text-[#6E655F] font-medium">Atölye</span>
                <span className="font-semibold text-[#B3542E]">Kit Hazırlanıyor</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#6E655F] font-medium">Mutfak</span>
                <span className="font-semibold text-[#211D1A]">Sırada</span>
              </div>
            </div>

            <div className="w-full bg-[#FAF0E6] border border-[#E8D4C4] rounded-xl p-3 text-left space-y-1 text-xs">
              <span className="font-bold text-[#B3542E] block">Ödeme Bilgisi</span>
              <p className="text-[11px] text-[#6E655F]">
                Herhangi bir online ödeme gerekmez. Deneyiminiz bittiğinde masanıza gelecek POS cihazı veya kasadan (nakit/kredi kartı) ödeyebilirsiniz.
              </p>
            </div>

            <div className="w-full space-y-2 pt-1">
              <button
                onClick={handleViewLiveTracking}
                className="w-full py-3.5 rounded-xl bg-[#211D1A] hover:bg-[#38322D] text-white font-semibold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs active:scale-[0.99]"
              >
                <span>Siparişimi Canlı Takip Et</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  setCreatedOrder(null);
                  onClose();
                }}
                className="w-full py-2.5 rounded-xl border border-[#E7DFD5] text-[#6E655F] hover:text-[#211D1A] text-xs font-medium cursor-pointer"
              >
                Menüye Dön
              </button>
            </div>
          </div>
        ) : (
          /* Normal Cart List */
          <>
            <div className="p-5 flex-1 overflow-y-auto space-y-4 divide-y divide-[#F0EAE1]">
              
              {/* Active Venue Rules Info Banner with contextual warning */}
              {(venueSettings.minDrinkRequired || venueSettings.requireWorkshopItem) && (
                <div className={`p-3 rounded-xl border text-[11px] transition-all ${
                  ruleError 
                    ? 'bg-red-50/70 border-red-300 text-red-900' 
                    : 'bg-[#FAF7F2] border-[#E8D4C4] text-[#8C827A]'
                } space-y-1.5`}>
                  <div className="flex items-center justify-between">
                    <span className={`font-semibold ${ruleError ? 'text-red-700' : 'text-[#211D1A]'}`}>
                      Mekan Sipariş Kuralları:
                    </span>
                    {ruleError && (
                      <span className="text-[10px] font-semibold text-red-600 bg-red-100 px-2 py-0.5 rounded-full">
                        Kural Sağlanmadı
                      </span>
                    )}
                  </div>

                  {venueSettings.minDrinkRequired && (
                    <div className={`flex items-center gap-1.5 ${
                      ruleError && ruleError.includes('içecek') ? 'text-red-600 font-semibold' : 'text-[#6E655F]'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        ruleError && ruleError.includes('içecek') ? 'bg-red-600' : 'bg-[#B3542E]'
                      }`}></span>
                      <span>Masa için en az 1 içecek zorunludur.</span>
                    </div>
                  )}

                  {venueSettings.requireWorkshopItem && (
                    <div className={`flex items-center gap-1.5 ${
                      ruleError && ruleError.includes('atölye') ? 'text-red-600 font-semibold' : 'text-[#6E655F]'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        ruleError && ruleError.includes('atölye') ? 'bg-red-600' : 'bg-[#B3542E]'
                      }`}></span>
                      <span>Masa için en az 1 atölye/heykel parçası zorunludur.</span>
                    </div>
                  )}

                  {ruleError && (
                    <p className="text-[10px] text-red-600 pt-1 border-t border-red-200">
                      {ruleError}
                    </p>
                  )}
                </div>
              )}

              {/* General Validation Error Message (Only for non-field specific errors) */}
              {generalError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <div className="leading-snug">{generalError}</div>
                </div>
              )}

              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center text-[#8C827A] py-16 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-[#FAF7F2] border border-[#E7DFD5] flex items-center justify-center text-[#8C827A]">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <p className="text-sm font-medium text-[#211D1A]">Adisyon henüz boş</p>
                  <p className="text-xs text-[#8C827A] max-w-xs">
                    Heykel veya içecek ekleyerek sipariş oluşturun.
                  </p>
                </div>
              ) : (
                cart.map((cartItem) => (
                  <div key={cartItem.cartItemId} className="pt-4 first:pt-0 space-y-2.5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h4 className="font-serif font-bold text-sm text-[#211D1A]">
                          {cartItem.itemType === 'workshop' 
                            ? cartItem.workshopItem.title 
                            : cartItem.cafeItem.name}
                        </h4>

                        {/* Workshop specifics */}
                        {cartItem.itemType === 'workshop' && (
                          <div className="text-xs text-[#6E655F] space-y-0.5 mt-1">
                            <div>Boyut: <span className="text-[#211D1A] font-medium">{cartItem.selectedSize.name}</span></div>
                            {cartItem.selectedExtras.length > 0 && (
                              <div className="text-[11px] text-[#B3542E]">
                                + {cartItem.selectedExtras.map(e => e.name).join(', ')}
                              </div>
                            )}
                          </div>
                        )}

                        {/* Cafe specifics */}
                        {cartItem.itemType === 'cafe' && Object.keys(cartItem.selectedOptions).length > 0 && (
                          <div className="text-xs text-[#6E655F] space-y-0.5 mt-1">
                            {Object.entries(cartItem.selectedOptions).map(([key, opt]) => (
                              <div key={key} className="text-[11px] text-[#211D1A]">
                                • {opt.label}
                              </div>
                            ))}
                          </div>
                        )}

                        {cartItem.specialNotes && (
                          <p className="text-[11px] text-[#8C827A] italic mt-1">
                            "{cartItem.specialNotes}"
                          </p>
                        )}
                      </div>

                      {/* Price */}
                      <div className="text-right shrink-0">
                        <span className="font-bold text-sm text-[#211D1A]">
                          {cartItem.totalPrice} ₺
                        </span>
                        <div className="text-[10px] text-[#8C827A]">
                          {cartItem.unitPrice} ₺ x {cartItem.quantity}
                        </div>
                      </div>
                    </div>

                    {/* Stepper & Remove */}
                    <div className="flex items-center justify-between pt-1">
                      <button
                        onClick={() => removeFromCart(cartItem.cartItemId)}
                        className="text-[#8C827A] hover:text-[#B3542E] text-xs flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span className="text-[11px]">Kaldır</span>
                      </button>

                      <div className="flex items-center gap-2 bg-[#FAF7F2] rounded-lg px-2 py-0.5 border border-[#E7DFD5]">
                        <button
                          onClick={() => updateQuantity(cartItem.cartItemId, -1)}
                          className="w-5 h-5 flex items-center justify-center text-[#6E655F] hover:text-[#211D1A] cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold text-[#211D1A] w-4 text-center">{cartItem.quantity}</span>
                        <button
                          onClick={() => updateQuantity(cartItem.cartItemId, 1)}
                          className="w-5 h-5 flex items-center justify-center text-[#6E655F] hover:text-[#211D1A] cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                  </div>
                ))
              )}
            </div>

            {/* Bottom Checkout */}
            {cart.length > 0 && (
              <div className="p-5 border-t border-[#E7DFD5] bg-[#FAF7F2] space-y-3.5">
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className={`text-xs font-medium ${
                      nameError ? 'text-red-600' : 'text-[#6E655F]'
                    }`}>
                      Sipariş Sahibi / İsim <span className="text-[#B3542E]">*</span>
                    </label>
                    {nameError && (
                      <span className="text-[10px] text-red-600 font-medium animate-in fade-in">
                        Zorunlu alan
                      </span>
                    )}
                  </div>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => {
                      setCustomerName(e.target.value);
                      if (nameError) setNameError(null);
                    }}
                    onFocus={() => {
                      if (customerName === 'Sipariş Masası') {
                        setCustomerName('');
                      }
                    }}
                    placeholder="Sipariş Masası"
                    className={`w-full px-3.5 py-2.5 bg-white border rounded-xl text-xs text-[#211D1A] placeholder-[#9E948C] focus:outline-none transition-all ${
                      nameError 
                        ? 'border-red-500 bg-red-50/20 focus:border-red-500 ring-2 ring-red-500/10' 
                        : 'border-[#E7DFD5] focus:border-[#B3542E]'
                    }`}
                  />
                  {nameError && (
                    <p className="text-[11px] text-red-600 font-medium pt-0.5 animate-in fade-in duration-150">
                      {nameError}
                    </p>
                  )}
                </div>

                <input
                  type="text"
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                  placeholder="Genel sipariş notu (varsa)..."
                  className="w-full px-3.5 py-2.5 bg-white border border-[#E7DFD5] rounded-xl text-xs text-[#211D1A] placeholder-[#9E948C] focus:outline-none focus:border-[#B3542E]"
                />

                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs text-[#6E655F] font-medium">Toplam Tutar:</span>
                  <span className="font-serif text-xl font-bold text-[#211D1A]">
                    {cartTotal} ₺
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleCheckout}
                  className="w-full py-3 rounded-xl bg-[#211D1A] hover:bg-[#38322D] text-white font-semibold text-xs sm:text-sm shadow-xs transition-all flex items-center justify-center gap-2 active:scale-[0.99] cursor-pointer"
                >
                  <span>Siparişi Onayla</span>
                </button>

                <p className="text-[10px] text-[#8C827A] text-center">
                  Ödeme masada POS veya kasadan tahsil edilir
                </p>
              </div>
            )}
          </>
        )}

      </div>
    </div>
  );
};
