'use client';

import React, { useState } from 'react';
import { CafeItem, CafeItemOptionChoice } from '../types';
import { useApp } from '../context/AppContext';
import { X, Plus, Minus } from 'lucide-react';

interface CafeModalProps {
  item: CafeItem;
  onClose: () => void;
}

export const CafeModal: React.FC<CafeModalProps> = ({ item, onClose }) => {
  const { addCafeToCart } = useApp();

  const [selectedOptions, setSelectedOptions] = useState<Record<string, CafeItemOptionChoice>>(() => {
    const initial: Record<string, CafeItemOptionChoice> = {};
    item.options?.forEach(opt => {
      if (opt.choices.length > 0) {
        initial[opt.id] = opt.choices[0];
      }
    });
    return initial;
  });

  const [quantity, setQuantity] = useState<number>(1);
  const [notes, setNotes] = useState<string>('');

  const handleChoiceSelect = (optionId: string, choice: CafeItemOptionChoice) => {
    setSelectedOptions(prev => ({
      ...prev,
      [optionId]: choice
    }));
  };

  const optionsDelta = Object.values(selectedOptions).reduce((sum, c) => sum + c.priceDelta, 0);
  const unitPrice = item.price + optionsDelta;
  const totalPrice = unitPrice * quantity;

  const handleAddToCart = () => {
    addCafeToCart(item, selectedOptions, quantity, notes.trim() || undefined);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white border border-[#E7DFD5] rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto text-[#211D1A] shadow-xl relative flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/90 hover:bg-white border border-[#E7DFD5] flex items-center justify-center text-[#6E655F] hover:text-[#211D1A] transition-colors shadow-xs"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Hero Photo */}
        <div className="relative h-52 w-full bg-[#EFE7DC] overflow-hidden shrink-0">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
          {item.badge && (
            <span className="absolute bottom-3 left-4 bg-[#211D1A] text-white font-medium text-xs px-2.5 py-1 rounded shadow-xs">
              {item.badge}
            </span>
          )}
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5 flex-1">
          <div>
            <h2 className="font-serif text-2xl font-bold tracking-tight text-[#211D1A] mb-1">
              {item.name}
            </h2>
            <p className="text-xs sm:text-sm text-[#6E655F] leading-relaxed">
              {item.description}
            </p>
          </div>

          {/* Options */}
          {item.options?.map((option) => (
            <div key={option.id} className="space-y-2">
              <label className="block text-xs font-medium text-[#6E655F]">
                {option.name}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {option.choices.map((choice) => {
                  const isSelected = selectedOptions[option.id]?.id === choice.id;
                  return (
                    <button
                      key={choice.id}
                      type="button"
                      onClick={() => handleChoiceSelect(option.id, choice)}
                      className={`p-3 rounded-xl border flex items-center justify-between transition-colors text-xs text-left ${
                        isSelected
                          ? 'border-[#211D1A] bg-[#FAF7F2] font-semibold text-[#211D1A]'
                          : 'border-[#E7DFD5] bg-white text-[#6E655F] hover:border-[#D5C9BC]'
                      }`}
                    >
                      <span>{choice.label}</span>
                      {choice.priceDelta > 0 && (
                        <span className="text-[#B3542E] font-medium">
                          +{choice.priceDelta} ₺
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Notes for Kitchen */}
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-[#6E655F]">
              Siparişe Özel Not
            </label>
            <input
              type="text"
              placeholder="Örn: Ekstra sıcak veya az buzlu..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white border border-[#E7DFD5] rounded-xl text-xs sm:text-sm text-[#211D1A] placeholder-[#9E948C] focus:outline-none focus:border-[#B3542E]"
            />
          </div>

          {/* Footer Bar */}
          <div className="pt-4 border-t border-[#F0EAE1] flex flex-col sm:flex-row items-center justify-between gap-3">
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
