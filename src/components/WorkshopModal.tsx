'use client';

import React, { useState } from 'react';
import { WorkshopItem, WorkshopSizeOption, WorkshopExtraOption } from '../types';
import { useApp } from '../context/AppContext';
import { X, Check, Clock, Plus, Minus, PackageCheck, ChevronLeft, ChevronRight, ImageIcon } from 'lucide-react';

interface WorkshopModalProps {
  item: WorkshopItem;
  onClose: () => void;
}

export const WorkshopModal: React.FC<WorkshopModalProps> = ({ item, onClose }) => {
  const { addWorkshopToCart } = useApp();

  const allImages = item.images && item.images.length > 0 ? item.images : [item.image];
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const [selectedSize, setSelectedSize] = useState<WorkshopSizeOption>(
    item.sizes.find(s => s.isPopular) || item.sizes[0]
  );
  const [selectedExtras, setSelectedExtras] = useState<WorkshopExtraOption[]>([]);
  const [quantity, setQuantity] = useState<number>(1);
  const [notes, setNotes] = useState<string>('');

  const toggleExtra = (extra: WorkshopExtraOption) => {
    setSelectedExtras(prev => {
      const exists = prev.some(e => e.id === extra.id);
      if (exists) {
        return prev.filter(e => e.id !== extra.id);
      } else {
        return [...prev, extra];
      }
    });
  };

  const extrasSum = selectedExtras.reduce((sum, e) => sum + e.price, 0);
  const unitPrice = selectedSize.price + extrasSum;
  const totalPrice = unitPrice * quantity;

  const handleAddToCart = () => {
    addWorkshopToCart(item, selectedSize, selectedExtras, quantity, notes.trim() || undefined);
    onClose();
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIndex(prev => (prev === 0 ? allImages.length - 1 : prev - 1));
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIndex(prev => (prev === allImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white border border-[#E7DFD5] rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto text-[#211D1A] shadow-xl relative flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/90 hover:bg-white border border-[#E7DFD5] flex items-center justify-center text-[#6E655F] hover:text-[#211D1A] transition-colors shadow-xs cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Hero Photo / Multi-Photo Gallery */}
        <div className="relative h-64 sm:h-72 w-full bg-[#EFE7DC] overflow-hidden shrink-0 group">
          <img
            src={allImages[activeImageIndex] || item.image}
            alt={`${item.title} - Görsel ${activeImageIndex + 1}`}
            className="w-full h-full object-cover transition-all duration-300"
          />

          {/* Prev/Next arrows if multiple photos */}
          {allImages.length > 1 && (
            <>
              <button
                type="button"
                onClick={handlePrevImage}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center backdrop-blur-xs transition-opacity cursor-pointer"
                title="Önceki Görsel"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={handleNextImage}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center backdrop-blur-xs transition-opacity cursor-pointer"
                title="Sonraki Görsel"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              {/* Photo counter badge */}
              <div className="absolute top-4 left-4 z-10 bg-black/60 backdrop-blur-xs text-white text-[11px] font-medium px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-xs">
                <ImageIcon className="w-3 h-3 text-[#E8D4C4]" />
                <span>{activeImageIndex + 1} / {allImages.length}</span>
              </div>
            </>
          )}

          {/* Badges on bottom-left */}
          <div className="absolute bottom-3 left-4 flex gap-2 z-10">
            <span className="bg-white/95 text-[#211D1A] text-xs font-semibold px-2.5 py-1 rounded shadow-xs">
              {item.difficulty} Seviye
            </span>
            <span className="bg-white/95 text-[#6E655F] text-xs px-2.5 py-1 rounded shadow-xs flex items-center gap-1 font-medium">
              <Clock className="w-3.5 h-3.5 text-[#B3542E]" />
              ~{item.estimatedMinutes} dk
            </span>
          </div>

          {/* Thumbnails strip for multiple photos */}
          {allImages.length > 1 && (
            <div className="absolute bottom-3 right-4 z-10 flex items-center gap-1.5 bg-black/40 backdrop-blur-xs p-1 rounded-xl">
              {allImages.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-7 h-7 rounded-lg overflow-hidden border transition-all cursor-pointer ${
                    activeImageIndex === idx 
                      ? 'border-white scale-105 ring-2 ring-white/50' 
                      : 'border-white/40 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="küçük önizleme" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 flex-1">
          <div>
            <h2 className="font-serif text-2xl font-bold tracking-tight text-[#211D1A] mb-1.5">
              {item.title}
            </h2>
            <p className="text-xs sm:text-sm text-[#6E655F] leading-relaxed">
              {item.description}
            </p>
          </div>

          {/* Included Kit Section */}
          <div className="bg-[#FAF7F2] border border-[#EBE4DA] rounded-xl p-4 space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#211D1A]">
              <PackageCheck className="w-4 h-4 text-[#B3542E]" />
              <span>Siparişinizle Masanıza Gelecek Set:</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-[#6E655F]">
              {item.includedKit.map((kitItem, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B3542E] shrink-0"></span>
                  <span>{kitItem}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div className="space-y-2.5">
            <label className="block text-xs font-medium text-[#6E655F]">
              Boyut Seçimi
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {item.sizes.map((size) => {
                const isSelected = selectedSize.id === size.id;
                return (
                  <button
                    key={size.id}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`relative p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between ${
                      isSelected
                        ? 'border-[#211D1A] bg-[#FAF7F2] text-[#211D1A] shadow-xs'
                        : 'border-[#E7DFD5] bg-white text-[#6E655F] hover:border-[#D5C9BC]'
                    }`}
                  >
                    <div>
                      <div className="font-semibold text-sm text-[#211D1A]">{size.name}</div>
                      {size.dimensions && (
                        <div className="text-[11px] text-[#968B83] mt-0.5">{size.dimensions}</div>
                      )}
                    </div>
                    <div className="mt-3 text-sm font-bold text-[#B3542E]">
                      {size.price} ₺
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Extras Selection */}
          {item.availableExtras.length > 0 && (
            <div className="space-y-2.5">
              <label className="block text-xs font-medium text-[#6E655F]">
                Ek Malzeme ve Vernik
              </label>
              <div className="space-y-2">
                {item.availableExtras.map((extra) => {
                  const isChecked = selectedExtras.some(e => e.id === extra.id);
                  return (
                    <button
                      key={extra.id}
                      type="button"
                      onClick={() => toggleExtra(extra)}
                      className={`w-full p-3 rounded-xl border flex items-center justify-between transition-colors text-left ${
                        isChecked
                          ? 'border-[#211D1A] bg-[#FAF7F2]'
                          : 'border-[#E7DFD5] bg-white hover:border-[#D5C9BC]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                          isChecked 
                            ? 'bg-[#211D1A] border-[#211D1A] text-white' 
                            : 'border-[#D5C9BC] bg-white'
                        }`}>
                          {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <span className="text-xs sm:text-sm font-medium text-[#211D1A]">{extra.name}</span>
                      </div>
                      <span className="text-xs font-bold text-[#6E655F]">
                        +{extra.price} ₺
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Notes for Master */}
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-[#6E655F]">
              Atölye Eğitmenine Not (Opsiyonel)
            </label>
            <input
              type="text"
              placeholder="Örn: Renk paletinde bol pastel tonları olsun..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white border border-[#E7DFD5] rounded-xl text-xs sm:text-sm text-[#211D1A] placeholder-[#9E948C] focus:outline-none focus:border-[#B3542E]"
            />
          </div>

          {/* Footer: Stepper & Add to Order */}
          <div className="pt-4 border-t border-[#F0EAE1] flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* Quantity Stepper */}
            <div className="flex items-center gap-3 bg-[#FAF7F2] border border-[#E7DFD5] rounded-xl px-3 py-1.5 w-full sm:w-auto justify-between sm:justify-start">
              <button
                type="button"
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                className="w-7 h-7 rounded-lg bg-white border border-[#E7DFD5] flex items-center justify-center text-[#6E655F] hover:text-[#211D1A]"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="font-bold text-sm text-[#211D1A] w-6 text-center">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity(q => q + 1)}
                className="w-7 h-7 rounded-lg bg-white border border-[#E7DFD5] flex items-center justify-center text-[#6E655F] hover:text-[#211D1A]"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Add to Cart Button */}
            <button
              type="button"
              onClick={handleAddToCart}
              className="w-full sm:flex-1 py-3 px-5 rounded-xl bg-[#211D1A] hover:bg-[#38322D] text-white font-semibold text-xs sm:text-sm flex items-center justify-between transition-all active:scale-[0.99] shadow-xs"
            >
              <span>Adisyona Ekle</span>
              <span className="font-bold">{totalPrice} ₺</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
