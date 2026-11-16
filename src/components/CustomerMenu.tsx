'use client';

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { WORKSHOP_CATEGORIES, CAFE_CATEGORIES } from '../data/mockData';
import { WorkshopItem, CafeItem } from '../types';
import { WorkshopModal } from './WorkshopModal';
import { CafeModal } from './CafeModal';
import { Search, ArrowUpRight, Clock, Plus, Info, Ban } from 'lucide-react';

export const CustomerMenu: React.FC = () => {
  const { workshopItems, cafeItems, venueSettings } = useApp();

  const [activeTab, setActiveTab] = useState<'workshop' | 'cafe'>('workshop');
  const [selectedWorkshopCategory, setSelectedWorkshopCategory] = useState<string>('all');
  const [selectedCafeCategory, setSelectedCafeCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const [activeWorkshopModal, setActiveWorkshopModal] = useState<WorkshopItem | null>(null);
  const [activeCafeModal, setActiveCafeModal] = useState<CafeItem | null>(null);

  const filteredWorkshopItems = workshopItems.filter(item => {
    const matchesCategory = selectedWorkshopCategory === 'all' || item.category === selectedWorkshopCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const filteredCafeItems = cafeItems.filter(item => {
    const matchesCategory = selectedCafeCategory === 'all' || item.category === selectedCafeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      
      {/* Editorial Intro Banner */}
      <div className="border-b border-[#E7DFD5] pb-5 space-y-2">
        <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#211D1A]">
          Atölye Kataloğu & Menü
        </h1>
        <p className="text-xs sm:text-sm text-[#6E655F] max-w-2xl font-normal leading-relaxed">
          Masanızda boyamak istediğiniz ham heykeli veya seramik modelini seçin. Seçtiğiniz parça; boya paleti, fırça seti, su kabı ve önlükle birlikte doğrudan masanıza teslim edilir.
        </p>

        {/* Dynamic Venue Rule Notice */}
        {venueSettings.venueNotice && (
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#FAF0E6] border border-[#E8D4C4] text-xs text-[#B3542E] font-medium">
            <Info className="w-3.5 h-3.5 shrink-0" />
            <span>{venueSettings.venueNotice}</span>
          </div>
        )}
      </div>

      {/* Main Tab Controls & Search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        
        {/* Tab Toggle */}
        <div className="inline-flex p-1 bg-[#EFE7DC] rounded-xl self-start">
          <button
            onClick={() => setActiveTab('workshop')}
            className={`px-5 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'workshop'
                ? 'bg-white text-[#211D1A] shadow-xs'
                : 'text-[#6E655F] hover:text-[#211D1A]'
            }`}
          >
            Atölye Parçaları ({workshopItems.length})
          </button>
          <button
            onClick={() => setActiveTab('cafe')}
            className={`px-5 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'cafe'
                ? 'bg-white text-[#211D1A] shadow-xs'
                : 'text-[#6E655F] hover:text-[#211D1A]'
            }`}
          >
            Kafe & Mutfak ({cafeItems.length})
          </button>
        </div>

        {/* Search Input */}
        <div className="w-full sm:w-72 relative">
          <Search className="w-4 h-4 text-[#8C827A] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder={activeTab === 'workshop' ? "Heykel, seramik ara..." : "Kahve, tatlı ara..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-white border border-[#E7DFD5] rounded-xl text-xs text-[#211D1A] placeholder-[#9E948C] focus:outline-none focus:border-[#B3542E]"
          />
        </div>

      </div>

      {/* Subcategory Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {activeTab === 'workshop' ? (
          WORKSHOP_CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedWorkshopCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium shrink-0 transition-colors ${
                selectedWorkshopCategory === cat.id
                  ? 'bg-[#211D1A] text-white'
                  : 'bg-white text-[#6E655F] border border-[#E7DFD5] hover:border-[#D5C9BC] hover:text-[#211D1A]'
              }`}
            >
              {cat.label}
            </button>
          ))
        ) : (
          CAFE_CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCafeCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium shrink-0 transition-colors ${
                selectedCafeCategory === cat.id
                  ? 'bg-[#211D1A] text-white'
                  : 'bg-white text-[#6E655F] border border-[#E7DFD5] hover:border-[#D5C9BC] hover:text-[#211D1A]'
              }`}
            >
              {cat.label}
            </button>
          ))
        )}
      </div>

      {/* Grid: Workshop Items */}
      {activeTab === 'workshop' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWorkshopItems.map((item) => {
            const minPrice = Math.min(...item.sizes.map(s => s.price));
            const isOutOfStock = item.isAvailable === false;

            return (
              <div 
                key={item.id}
                onClick={() => !isOutOfStock && setActiveWorkshopModal(item)}
                className={`group bg-white border rounded-2xl overflow-hidden transition-all duration-200 flex flex-col ${
                  isOutOfStock 
                    ? 'border-[#E7DFD5] opacity-60 cursor-not-allowed' 
                    : 'border-[#E7DFD5] hover:border-[#D5C9BC] hover:-translate-y-0.5 cursor-pointer'
                }`}
              >
                {/* Photo */}
                <div className="relative aspect-[4/3] w-full bg-[#EFE7DC] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=600&auto=format&fit=crop&q=80';
                    }}
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 flex gap-1.5">
                    <span className="bg-white/95 text-[#211D1A] text-[11px] font-semibold px-2 py-0.5 rounded shadow-xs">
                      {item.difficulty}
                    </span>
                    <span className="bg-white/95 text-[#6E655F] text-[11px] px-2 py-0.5 rounded shadow-xs flex items-center gap-1 font-medium">
                      <Clock className="w-3 h-3 text-[#B3542E]" />
                      {item.estimatedMinutes} dk
                    </span>
                  </div>

                  {isOutOfStock ? (
                    <span className="absolute top-3 right-3 bg-red-700 text-white font-medium text-[10px] tracking-wide px-2 py-0.5 rounded shadow-xs">
                      Tükendi
                    </span>
                  ) : item.badge && (
                    <span className="absolute top-3 right-3 bg-[#B3542E] text-white font-medium text-[10px] tracking-wide px-2 py-0.5 rounded shadow-xs">
                      {item.badge}
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-1.5">
                    <h3 className="font-serif text-lg font-bold text-[#211D1A] group-hover:text-[#B3542E] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#6E655F] line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Included Kit Summary */}
                  <div className="bg-[#FAF7F2] rounded-xl p-2.5 border border-[#EBE4DA] text-[11px] text-[#7A7067] space-y-0.5">
                    <span className="font-medium text-[#211D1A] block text-xs">
                      Masa Kiti Dahil
                    </span>
                    <p className="truncate">
                      {item.includedKit.slice(0, 2).join(' • ')}
                    </p>
                  </div>

                  {/* Pricing and Action */}
                  <div className="pt-3 border-t border-[#F0EAE1] flex items-center justify-between">
                    <div>
                      <span className="text-[11px] text-[#968B83] font-medium block">
                        Başlangıç
                      </span>
                      <span className="text-base font-bold text-[#211D1A]">
                        {minPrice} ₺
                      </span>
                    </div>

                    {!isOutOfStock ? (
                      <div className="inline-flex items-center gap-1 text-xs font-semibold text-[#B3542E] group-hover:text-[#984422]">
                        <span>İncele & Seç</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </div>
                    ) : (
                      <span className="text-xs font-medium text-[#8C827A] flex items-center gap-1">
                        <Ban className="w-3.5 h-3.5" />
                        Tükendi
                      </span>
                    )}
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Grid: Cafe Items */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCafeItems.map((item) => {
            const isOutOfStock = item.isAvailable === false;

            return (
              <div 
                key={item.id}
                onClick={() => !isOutOfStock && setActiveCafeModal(item)}
                className={`group bg-white border rounded-2xl overflow-hidden transition-all duration-200 flex flex-col ${
                  isOutOfStock 
                    ? 'border-[#E7DFD5] opacity-60 cursor-not-allowed' 
                    : 'border-[#E7DFD5] hover:border-[#D5C9BC] hover:-translate-y-0.5 cursor-pointer'
                }`}
              >
                {/* Photo */}
                <div className="relative aspect-[4/3] w-full bg-[#EFE7DC] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80';
                    }}
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                  />
                  {isOutOfStock ? (
                    <span className="absolute top-3 right-3 bg-red-700 text-white font-medium text-[10px] px-2 py-0.5 rounded shadow-xs">
                      Tükendi
                    </span>
                  ) : item.badge && (
                    <span className="absolute top-3 right-3 bg-[#211D1A] text-white font-medium text-[10px] px-2 py-0.5 rounded shadow-xs">
                      {item.badge}
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-1">
                    <h3 className="font-serif text-lg font-bold text-[#211D1A] group-hover:text-[#B3542E] transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-xs text-[#6E655F] line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Price & Action */}
                  <div className="pt-3 border-t border-[#F0EAE1] flex items-center justify-between">
                    <span className="text-base font-bold text-[#211D1A]">
                      {item.price} ₺
                    </span>

                    {!isOutOfStock ? (
                      <div className="inline-flex items-center gap-1 text-xs font-semibold text-[#211D1A] group-hover:text-[#B3542E]">
                        <span>Özelleştir</span>
                        <Plus className="w-3.5 h-3.5" />
                      </div>
                    ) : (
                      <span className="text-xs font-medium text-[#8C827A] flex items-center gap-1">
                        <Ban className="w-3.5 h-3.5" />
                        Tükendi
                      </span>
                    )}
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modals */}
      {activeWorkshopModal && (
        <WorkshopModal 
          item={activeWorkshopModal} 
          onClose={() => setActiveWorkshopModal(null)} 
        />
      )}

      {activeCafeModal && (
        <CafeModal 
          item={activeCafeModal} 
          onClose={() => setActiveCafeModal(null)} 
        />
      )}

    </div>
  );
};
