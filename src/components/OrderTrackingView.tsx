'use client';

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Palette, 
  Coffee, 
  Check, 
  Clock, 
  ArrowLeft, 
  Plus, 
  Sparkles, 
  CreditCard, 
  CheckCircle2, 
  BellRing,
  HelpCircle,
  Package
} from 'lucide-react';
import { StationProgressStatus } from '../types';

interface StageMeta {
  id: StationProgressStatus;
  label: string;
  stepNumber: number;
  workshopText: string;
  cafeText: string;
}

const STAGES: StageMeta[] = [
  {
    id: 'hazirlaniyor',
    label: 'Hazırlanıyor',
    stepNumber: 1,
    workshopText: 'Ham modeliniz, 6 renk boya seti, fırçalar ve önlüğünüz raftan toplanıyor.',
    cafeText: 'Kahveniz taze çekilip demleniyor ve tatlı porsiyonunuz hazırlanıyor.'
  },
  {
    id: 'yola_cikti',
    label: 'Masaya Çıktı',
    stepNumber: 2,
    workshopText: 'Atölye malzeme tepsiniz hazırlandı, servis ekibi masanıza getiriyor.',
    cafeText: 'Mutfağımız içeceklerinizi hazırladı, masanıza servis ediliyor.'
  },
  {
    id: 'teslim_edildi',
    label: 'Teslim Edildi',
    stepNumber: 3,
    workshopText: 'Boya kiti masanıza ulaştı! Fırçanızı alıp keyifle boyamaya başlayabilirsiniz.',
    cafeText: 'İçecekleriniz masanıza servis edildi. Afiyet olsun!'
  }
];

const normalizeStatus = (status: string | undefined): StationProgressStatus => {
  if (status === 'teslim_edildi' || status === 'masaya_teslim' || status === 'paketlendi' || status === 'servis_edildi') {
    return 'teslim_edildi';
  }
  if (status === 'yola_cikti' || status === 'boyaniyor' || status === 'vernik_kurutma') {
    return 'yola_cikti';
  }
  return 'hazirlaniyor';
};

export const OrderTrackingView: React.FC = () => {
  const { 
    orders, 
    activeOrderId, 
    setActiveOrderId, 
    tableNumber, 
    setActiveView, 
    venueSettings 
  } = useApp();

  const [waiterCalled, setWaiterCalled] = useState(false);

  // Find active order: first by activeOrderId, or by current tableNumber
  const currentOrder = orders.find(o => o.id === activeOrderId) || 
                       orders.find(o => o.tableNumber === tableNumber && o.status !== 'completed') || 
                       orders[0];

  const handleCallWaiter = () => {
    setWaiterCalled(true);
    setTimeout(() => setWaiterCalled(false), 4000);
  };

  if (!currentOrder) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-12 h-12 rounded-full bg-[#FAF7F2] border border-[#E7DFD5] flex items-center justify-center mx-auto text-[#8C827A]">
          <Package className="w-6 h-6" />
        </div>
        <h2 className="font-serif text-2xl font-bold text-[#211D1A]">Aktif Sipariş Bulunamadı</h2>
        <p className="text-xs text-[#6E655F]">
          Masa #{tableNumber} için henüz kayıtlı bir sipariş bulunmuyor. Menüden dilediğiniz heykel veya içeceği sipariş verebilirsiniz.
        </p>
        <button
          onClick={() => setActiveView('customer_menu')}
          className="px-6 py-3 bg-[#211D1A] text-white text-xs font-semibold rounded-xl inline-flex items-center gap-2 cursor-pointer"
        >
          <span>Menüyü Aç & Sipariş Ver</span>
        </button>
      </div>
    );
  }

  const hasWorkshop = currentOrder.items.some(i => i.itemType === 'workshop');
  const hasCafe = currentOrder.items.some(i => i.itemType === 'cafe');

  const normalizedWorkshopStatus = normalizeStatus(currentOrder.workshopStatus);
  const normalizedCafeStatus = normalizeStatus(currentOrder.kitchenStatus);

  const workshopActiveIndex = STAGES.findIndex(s => s.id === normalizedWorkshopStatus);
  const cafeActiveIndex = STAGES.findIndex(s => s.id === normalizedCafeStatus);

  const currentWorkshopStage = STAGES[workshopActiveIndex] || STAGES[0];
  const currentCafeStage = STAGES[cafeActiveIndex] || STAGES[0];

  const isEverythingDelivered = 
    (!hasWorkshop || normalizedWorkshopStatus === 'teslim_edildi') &&
    (!hasCafe || normalizedCafeStatus === 'teslim_edildi');

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4 sm:py-8 space-y-5 sm:space-y-8 animate-in fade-in duration-200">
      
      {/* Top Navigation */}
      <div className="flex items-center justify-between border-b border-[#E7DFD5] pb-3 sm:pb-4">
        <button
          onClick={() => setActiveView('customer_menu')}
          className="text-xs font-semibold text-[#8C827A] hover:text-[#211D1A] flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Menüye Dön & Ek Sipariş Ver</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-[#211D1A] bg-[#EFE7DC] px-2.5 py-1 rounded-full border border-[#E4DCD1]">
            Masa #{currentOrder.tableNumber.toString().padStart(2, '0')}
          </span>
          <span className="text-xs text-[#8C827A]">
            • {currentOrder.id}
          </span>
        </div>
      </div>

      {/* Hero Tracking Banner */}
      <div className="bg-white border border-[#E7DFD5] rounded-3xl p-5 sm:p-8 space-y-5 sm:space-y-6 shadow-sm">
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
          <div>
            <h1 className="font-serif text-xl sm:text-3xl font-bold tracking-tight text-[#211D1A]">
              {isEverythingDelivered ? 'Siparişiniz Masanızda!' : 'Siparişiniz Hazırlanıyor'}
            </h1>
            <p className="text-xs text-[#6E655F] mt-0.5 sm:mt-1">
              İstasyon görevlileri setinizi ve kahvenizi hazırladıkça bu ekran anlık olarak güncellenir.
            </p>
          </div>

          <div className="bg-[#FAF7F2] border border-[#E7DFD5] rounded-2xl px-3.5 py-2 text-center shrink-0 self-end sm:self-auto">
            <span className="text-[10px] text-[#8C827A] block font-medium">Toplam Tutar</span>
            <span className="font-serif font-bold text-lg sm:text-xl text-[#211D1A]">{currentOrder.totalAmount} ₺</span>
          </div>
        </div>

        {/* TRACKER 1: Workshop Station Tracker */}
        {hasWorkshop && (
          <div className="bg-[#FAF7F2] border border-[#E7DFD5] rounded-2xl p-5 space-y-4">
            
            <div className="flex items-center justify-between pb-3 border-b border-[#EBE4DA]">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#FAF0E6] text-[#B3542E] flex items-center justify-center">
                  <Palette className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-sm text-[#211D1A]">Atölye</h3>
                  <span className="text-[11px] text-[#8C827A]">Heykel & Boyama Malzeme Seti</span>
                </div>
              </div>

              {/* Status Badge */}
              <span className={`text-xs font-bold px-3 py-1 rounded-full border ${
                normalizedWorkshopStatus === 'teslim_edildi'
                  ? 'bg-[#EEF3EC] text-[#4E5E48] border-[#CFDFCB]'
                  : normalizedWorkshopStatus === 'yola_cikti'
                  ? 'bg-[#EBF1F5] text-[#2C5282] border-[#C3D9E8]'
                  : 'bg-[#FAF0E6] text-[#B3542E] border-[#E8D4C4]'
              }`}>
                {currentWorkshopStage.label}
              </span>
            </div>

            {/* Stepper Track Line ("3 Aşamalı Doğru") */}
            <div className="pt-2 px-2 sm:px-6">
              <div className="relative">
                {/* Background Line */}
                <div className="absolute left-4 right-4 top-4 h-1 bg-[#E7DFD5] rounded-full -z-0" />
                
                {/* Active Filled Line */}
                <div 
                  className="absolute left-4 top-4 h-1 bg-[#B3542E] rounded-full -z-0 transition-all duration-500"
                  style={{
                    width: workshopActiveIndex === 0 
                      ? '0%' 
                      : workshopActiveIndex === 1 
                      ? '50%' 
                      : 'calc(100% - 2rem)'
                  }}
                />

                {/* 3 Step Nodes */}
                <div className="flex items-start justify-between relative z-10">
                  {STAGES.map((stage, idx) => {
                    const isSelected = stage.id === normalizedWorkshopStatus;
                    const isPassed = workshopActiveIndex > idx;

                    return (
                      <div key={stage.id} className="flex flex-col items-center w-24 text-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all shadow-xs ${
                          isSelected
                            ? 'bg-[#B3542E] text-white ring-4 ring-[#FAF0E6] scale-110'
                            : isPassed
                            ? 'bg-[#4E5E48] text-white'
                            : 'bg-white border-2 border-[#D5C9BC] text-[#8C827A]'
                        }`}>
                          {isPassed ? (
                            <Check className="w-4 h-4 stroke-[2.5]" />
                          ) : (
                            <span>{stage.stepNumber}</span>
                          )}
                        </div>

                        <span className={`text-xs mt-2 font-semibold ${
                          isSelected ? 'text-[#B3542E] font-bold' : isPassed ? 'text-[#4E5E48]' : 'text-[#8C827A]'
                        }`}>
                          {stage.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Stage Description Context */}
            <div className="bg-white/80 border border-[#E7DFD5] rounded-xl p-3 text-xs text-[#6E655F] leading-relaxed">
              <span className="font-semibold text-[#211D1A]">Güncel Durum: </span>
              {currentWorkshopStage.workshopText}
            </div>

          </div>
        )}

        {/* TRACKER 2: Kitchen Station Tracker */}
        {hasCafe && (
          <div className="bg-[#FAF7F2] border border-[#E7DFD5] rounded-2xl p-5 space-y-4">
            
            <div className="flex items-center justify-between pb-3 border-b border-[#EBE4DA]">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#EBF1F5] text-[#2C5282] flex items-center justify-center">
                  <Coffee className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-sm text-[#211D1A]">Mutfak</h3>
                  <span className="text-[11px] text-[#8C827A]">Nitelikli Kahve & Taze Tatlılar</span>
                </div>
              </div>

              {/* Status Badge */}
              <span className={`text-xs font-bold px-3 py-1 rounded-full border ${
                normalizedCafeStatus === 'teslim_edildi'
                  ? 'bg-[#EEF3EC] text-[#4E5E48] border-[#CFDFCB]'
                  : normalizedCafeStatus === 'yola_cikti'
                  ? 'bg-[#EBF1F5] text-[#2C5282] border-[#C3D9E8]'
                  : 'bg-[#FAF0E6] text-[#B3542E] border-[#E8D4C4]'
              }`}>
                {currentCafeStage.label}
              </span>
            </div>

            {/* Stepper Track Line ("3 Aşamalı Doğru") */}
            <div className="pt-2 px-2 sm:px-6">
              <div className="relative">
                {/* Background Line */}
                <div className="absolute left-4 right-4 top-4 h-1 bg-[#E7DFD5] rounded-full -z-0" />
                
                {/* Active Filled Line */}
                <div 
                  className="absolute left-4 top-4 h-1 bg-[#2C5282] rounded-full -z-0 transition-all duration-500"
                  style={{
                    width: cafeActiveIndex === 0 
                      ? '0%' 
                      : cafeActiveIndex === 1 
                      ? '50%' 
                      : 'calc(100% - 2rem)'
                  }}
                />

                {/* 3 Step Nodes */}
                <div className="flex items-start justify-between relative z-10">
                  {STAGES.map((stage, idx) => {
                    const isSelected = stage.id === normalizedCafeStatus;
                    const isPassed = cafeActiveIndex > idx;

                    return (
                      <div key={stage.id} className="flex flex-col items-center w-24 text-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all shadow-xs ${
                          isSelected
                            ? 'bg-[#2C5282] text-white ring-4 ring-[#EBF1F5] scale-110'
                            : isPassed
                            ? 'bg-[#4E5E48] text-white'
                            : 'bg-white border-2 border-[#D5C9BC] text-[#8C827A]'
                        }`}>
                          {isPassed ? (
                            <Check className="w-4 h-4 stroke-[2.5]" />
                          ) : (
                            <span>{stage.stepNumber}</span>
                          )}
                        </div>

                        <span className={`text-xs mt-2 font-semibold ${
                          isSelected ? 'text-[#2C5282] font-bold' : isPassed ? 'text-[#4E5E48]' : 'text-[#8C827A]'
                        }`}>
                          {stage.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Stage Description Context */}
            <div className="bg-white/80 border border-[#E7DFD5] rounded-xl p-3 text-xs text-[#6E655F] leading-relaxed">
              <span className="font-semibold text-[#211D1A]">Güncel Durum: </span>
              {currentCafeStage.cafeText}
            </div>

          </div>
        )}

        {/* In-Venue Payment Assurance Note (No Online Payment Confusion) */}
        <div className="p-4 bg-[#FAF7F2] border border-[#E7DFD5] rounded-2xl flex items-start gap-3">
          <div className="w-8 h-8 rounded-xl bg-white border border-[#E7DFD5] flex items-center justify-center text-[#B3542E] shrink-0">
            <CreditCard className="w-4 h-4" />
          </div>
          <div className="space-y-1 text-xs">
            <span className="font-bold text-[#211D1A] block">Ödeme Bilgisi (Kasada veya Masada POS)</span>
            <p className="text-[#6E655F] leading-relaxed">
              Bu ekrandan herhangi bir online kart girişi yapmanız gerekmez. Atölye deneyiminiz bittiğinde ödemenizi masanıza gelecek kablosuz POS cihazı ile veya direkt kasadan (nakit / kredi kartı) güvenle yapabilirsiniz.
            </p>
          </div>
        </div>

        {/* Order Items Breakdown */}
        <div className="pt-2 border-t border-[#F0EAE1] space-y-3">
          <h4 className="font-serif font-bold text-sm text-[#211D1A]">Masanıza Gelecek Ürünler</h4>
          <div className="divide-y divide-[#F0EAE1]">
            {currentOrder.items.map((item, idx) => (
              <div key={idx} className="py-2.5 flex items-center justify-between text-xs">
                <div className="space-y-0.5">
                  <span className="font-semibold text-[#211D1A]">
                    {item.quantity}x {item.itemType === 'workshop' ? item.workshopItem.title : item.cafeItem.name}
                  </span>
                  {item.itemType === 'workshop' && (
                    <div className="text-[11px] text-[#8C827A]">
                      Boyut: {item.selectedSize.name} {item.selectedExtras.length > 0 && `• Ek: ${item.selectedExtras.map(e => e.name).join(', ')}`}
                    </div>
                  )}
                  {item.itemType === 'cafe' && Object.keys(item.selectedOptions).length > 0 && (
                    <div className="text-[11px] text-[#8C827A]">
                      {Object.values(item.selectedOptions).map(o => o.label).join(' • ')}
                    </div>
                  )}
                </div>
                <span className="font-bold text-[#211D1A]">{item.totalPrice} ₺</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="pt-2">
          <button
            onClick={() => setActiveView('customer_menu')}
            className="w-full py-3.5 bg-[#211D1A] hover:bg-[#38322D] text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs active:scale-[0.99]"
          >
            <Plus className="w-4 h-4" />
            <span>Menüye Dön & Ek İçecek / Heykel Ekle</span>
          </button>
        </div>

      </div>

    </div>
  );
};
