'use client';

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  CheckCircle2, 
  Clock, 
  Filter, 
  RotateCcw,
  Palette,
  Coffee,
  ChevronDown,
  ChevronUp,
  Check
} from 'lucide-react';
import { 
  StationProgressStatus
} from '../types';
import { normalizeStatus } from '../utils/orderStatus';

interface StageConfig {
  id: StationProgressStatus;
  label: string;
  workshopDesc: string;
  cafeDesc: string;
  stepNumber: number;
  badgeColor: string;
}

const STAGES: StageConfig[] = [
  {
    id: 'hazirlaniyor',
    label: 'Hazırlanıyor',
    workshopDesc: 'Heykel ve boya kiti toplanıyor',
    cafeDesc: 'Kahve & mutfak hazırlanıyor',
    stepNumber: 1,
    badgeColor: 'bg-[#FAF0E6] text-[#B3542E] border-[#E8D4C4]'
  },
  {
    id: 'yola_cikti',
    label: 'Masaya Çıktı',
    workshopDesc: 'Tepsi masaya servis ediliyor',
    cafeDesc: 'Garson masaya servis ediyor',
    stepNumber: 2,
    badgeColor: 'bg-[#EBF1F5] text-[#2C5282] border-[#C3D9E8]'
  },
  {
    id: 'teslim_edildi',
    label: 'Teslim Edildi',
    workshopDesc: 'Masa teslim aldı, boyama başladı',
    cafeDesc: 'Masanıza servis edildi',
    stepNumber: 3,
    badgeColor: 'bg-[#EEF3EC] text-[#4E5E48] border-[#CFDFCB]'
  }
];

interface StationProgressProps {
  stationType: 'workshop' | 'kitchen';
  title: string;
  currentStatus: string;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onSelectStatus: (status: StationProgressStatus) => void;
}

const StationProgressItem: React.FC<StationProgressProps> = ({
  stationType,
  title,
  currentStatus,
  isExpanded,
  onToggleExpand,
  onSelectStatus
}) => {
  const normalized = normalizeStatus(currentStatus);
  const activeIndex = STAGES.findIndex(s => s.id === normalized);
  const currentStage = STAGES[activeIndex] || STAGES[0];

  const brandBg = stationType === 'workshop' ? 'bg-[#B3542E]' : 'bg-[#2C5282]';

  return (
    <div className="bg-[#FAF7F2] border border-[#E7DFD5] rounded-xl overflow-hidden transition-all duration-200">
      
      {/* Clickable Header Bar (Expands Accordion) */}
      <div 
        onClick={onToggleExpand}
        className="p-3 flex items-center justify-between cursor-pointer hover:bg-[#F5EFE6] transition-colors select-none"
      >
        <div className="flex items-center gap-2">
          {stationType === 'workshop' ? (
            <Palette className="w-3.5 h-3.5 text-[#B3542E]" />
          ) : (
            <Coffee className="w-3.5 h-3.5 text-[#2C5282]" />
          )}
          <span className="text-xs font-semibold text-[#211D1A]">{title}</span>
          <div className="text-[#8C827A] hover:text-[#211D1A] transition-transform">
            {isExpanded ? (
              <ChevronUp className="w-3.5 h-3.5" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5" />
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Quick 1-tap advance button for floor staff */}
          {normalized === 'hazirlaniyor' && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onSelectStatus('yola_cikti');
              }}
              className="px-2 py-1 rounded-lg text-[11px] font-semibold bg-[#EBF1F5] text-[#2C5282] border border-[#C3D9E8] hover:bg-[#D8E6F0] transition-colors cursor-pointer"
              title="Doğrudan 'Masaya Çıktı' aşamasına ilerlet"
            >
              Masaya Çıkar →
            </button>
          )}
          {normalized === 'yola_cikti' && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onSelectStatus('teslim_edildi');
              }}
              className="px-2 py-1 rounded-lg text-[11px] font-semibold bg-[#EEF3EC] text-[#4E5E48] border border-[#CFDFCB] hover:bg-[#DDEBD7] transition-colors cursor-pointer"
              title="Doğrudan 'Teslim Edildi' olarak kaydet"
            >
              Teslim Et ✓
            </button>
          )}

          {/* Current Status Pill */}
          <span 
            className={`px-2.5 py-1 rounded-lg text-xs font-bold border shadow-2xs transition-all ${currentStage.badgeColor}`}
            title="Tüm aşamaları görmek için tıklayın"
          >
            {currentStage.label}
          </span>
        </div>
      </div>

      {/* Expanded Stepper ("Bir doğru üstündeki aşama seçimi") */}
      {isExpanded && (
        <div className="px-4 pt-2 pb-4 border-t border-[#EBE4DA] bg-white/70 animate-in fade-in slide-in-from-top-1 duration-150 space-y-3">
          
          <div className="flex items-center justify-between text-[10px] text-[#8C827A] font-medium pt-1">
            <span>Aşamayı Seçin (3 Adım):</span>
            <span className="font-bold text-[#211D1A]">
              Adım {currentStage.stepNumber} / 3: {currentStage.label}
            </span>
          </div>

          {/* Interactive Stepper Track Line ("Doğru") */}
          <div className="relative pt-2 pb-1">
            {/* Background connecting track */}
            <div className="absolute left-6 right-6 top-5.5 h-1 bg-[#E7DFD5] rounded-full -z-0" />
            
            {/* Active connecting track progress */}
            <div 
              className={`absolute left-6 top-5.5 h-1 ${brandBg} rounded-full -z-0 transition-all duration-300`}
              style={{
                width: activeIndex === 0 
                  ? '0%' 
                  : activeIndex === 1 
                  ? 'calc(50% - 1.5rem)' 
                  : 'calc(100% - 3rem)'
              }}
            />

            {/* 3 Step Nodes */}
            <div className="flex items-start justify-between relative z-10">
              {STAGES.map((stage, idx) => {
                const isSelected = stage.id === normalized;
                const isPassed = activeIndex > idx;

                return (
                  <button
                    key={stage.id}
                    type="button"
                    onClick={() => onSelectStatus(stage.id)}
                    className="flex flex-col items-center group cursor-pointer focus:outline-none w-20 text-center"
                  >
                    {/* Circle Node */}
                    <div 
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all shadow-xs ${
                        isSelected
                          ? `${brandBg} text-white ring-4 ring-[#FAF0E6] scale-110 shadow-sm`
                          : isPassed
                          ? 'bg-[#4E5E48] text-white'
                          : 'bg-white border-2 border-[#D5C9BC] text-[#8C827A] group-hover:border-[#211D1A] group-hover:text-[#211D1A]'
                      }`}
                    >
                      {isPassed ? (
                        <Check className="w-4 h-4 stroke-[2.5]" />
                      ) : (
                        <span>{stage.stepNumber}</span>
                      )}
                    </div>

                    {/* Stage Label */}
                    <span 
                      className={`text-[11px] mt-2 font-semibold transition-colors leading-tight ${
                        isSelected 
                          ? 'text-[#211D1A] font-bold' 
                          : isPassed
                          ? 'text-[#4E5E48]'
                          : 'text-[#8C827A] group-hover:text-[#211D1A]'
                      }`}
                    >
                      {stage.label}
                    </span>

                    {/* Step Description */}
                    <span className="text-[9px] text-[#A69B91] leading-tight mt-0.5 line-clamp-2">
                      {stationType === 'workshop' ? stage.workshopDesc : stage.cafeDesc}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

        </div>
      )}

    </div>
  );
};

export const StaffDashboard: React.FC = () => {
  const { 
    orders, 
    updateOrderStatus, 
    updateWorkshopStationStatus, 
    updateKitchenStationStatus,
    currentStaff,
    logout
  } = useApp();

  const [stationFilter, setStationFilter] = useState<'all' | 'workshop' | 'kitchen'>('all');
  const [expandedStationKey, setExpandedStationKey] = useState<string | null>(null);

  const toggleExpand = (key: string) => {
    setExpandedStationKey(prev => prev === key ? null : key);
  };

  const activeOrders = orders.filter(o => o.status !== 'completed' && o.status !== 'cancelled');
  const pendingWorkshopCount = orders.filter(o => normalizeStatus(o.workshopStatus) !== 'teslim_edildi' && o.items.some(i => i.itemType === 'workshop')).length;
  const pendingKitchenCount = orders.filter(o => normalizeStatus(o.kitchenStatus) !== 'teslim_edildi' && o.items.some(i => i.itemType === 'cafe')).length;

  const displayedOrders = orders.filter(order => {
    if (stationFilter === 'workshop') {
      return order.items.some(i => i.itemType === 'workshop');
    }
    if (stationFilter === 'kitchen') {
      return order.items.some(i => i.itemType === 'cafe');
    }
    return true;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      
      {/* Editorial Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#E7DFD5]">
        <div className="space-y-1">
          <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#211D1A]">
            İstasyon & Adisyon Takibi
          </h1>
          <p className="text-xs text-[#6E655F]">
            Masa siparişlerini hazırlayın ve masaya servis durumunu anlık yönetin.
            {currentStaff && (
              <span className="text-[#8C827A] ml-2">• Görevli: <strong>{currentStaff.name}</strong></span>
            )}
          </p>
        </div>

        {/* Operational Interactive KPI Gateways & Logout */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-xs">
            <button
              type="button"
              onClick={() => setStationFilter('all')}
              className={`px-3.5 py-1.5 rounded-xl border text-center transition-all cursor-pointer ${
                stationFilter === 'all'
                  ? 'bg-white border-[#211D1A] ring-1 ring-[#211D1A]/20 shadow-xs'
                  : 'bg-white border-[#E7DFD5] hover:border-[#D5C9BC]'
              }`}
              title="Tüm aktif masaları listele"
            >
              <span className="text-[#8C827A] block text-[10px] font-medium">Aktif Masa</span>
              <span className="font-serif text-base font-bold text-[#211D1A]">{activeOrders.length}</span>
            </button>

            <button
              type="button"
              onClick={() => setStationFilter('workshop')}
              className={`px-3.5 py-1.5 rounded-xl border text-center transition-all cursor-pointer ${
                stationFilter === 'workshop'
                  ? 'bg-[#FAF0E6] border-[#B3542E] ring-1 ring-[#B3542E]/30 shadow-xs'
                  : 'bg-white border-[#E7DFD5] hover:border-[#B3542E]'
              }`}
              title="Yalnızca bekleyen atölye siparişlerini filtrele"
            >
              <span className="text-[#B3542E] block text-[10px] font-medium">Bekleyen Atölye</span>
              <span className="font-serif text-base font-bold text-[#B3542E]">{pendingWorkshopCount}</span>
            </button>

            <button
              type="button"
              onClick={() => setStationFilter('kitchen')}
              className={`px-3.5 py-1.5 rounded-xl border text-center transition-all cursor-pointer ${
                stationFilter === 'kitchen'
                  ? 'bg-[#EBF1F5] border-[#2C5282] ring-1 ring-[#2C5282]/30 shadow-xs'
                  : 'bg-white border-[#E7DFD5] hover:border-[#2C5282]'
              }`}
              title="Yalnızca bekleyen mutfak & içecek siparişlerini filtrele"
            >
              <span className="text-[#2C5282] block text-[10px] font-medium">Bekleyen Mutfak</span>
              <span className="font-serif text-base font-bold text-[#2C5282]">{pendingKitchenCount}</span>
            </button>
          </div>

          <button
            onClick={logout}
            className="px-3.5 py-2 rounded-xl border border-[#E7DFD5] bg-white hover:bg-[#FAF7F2] text-xs font-semibold text-[#6E655F] hover:text-[#211D1A] transition-colors cursor-pointer"
          >
            Çıkış Yap
          </button>
        </div>
      </div>

      {/* Filter Control Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white border border-[#E7DFD5] p-3 rounded-2xl shadow-2xs">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-[#8C827A] ml-1" />
          <span className="text-xs font-semibold text-[#8C827A]">Görünüm:</span>
          
          <div className="flex gap-1 bg-[#FAF7F2] p-1 rounded-xl text-xs border border-[#EBE4DA]">
            <button
              onClick={() => setStationFilter('all')}
              className={`px-3 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
                stationFilter === 'all'
                  ? 'bg-white text-[#211D1A] font-bold shadow-xs'
                  : 'text-[#6E655F] hover:text-[#211D1A]'
              }`}
            >
              Tümü ({orders.length})
            </button>
            <button
              onClick={() => setStationFilter('workshop')}
              className={`px-3 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
                stationFilter === 'workshop'
                  ? 'bg-white text-[#211D1A] font-bold shadow-xs'
                  : 'text-[#6E655F] hover:text-[#211D1A]'
              }`}
            >
              Atölye
            </button>
            <button
              onClick={() => setStationFilter('kitchen')}
              className={`px-3 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
                stationFilter === 'kitchen'
                  ? 'bg-white text-[#211D1A] font-bold shadow-xs'
                  : 'text-[#6E655F] hover:text-[#211D1A]'
              }`}
            >
              Mutfak
            </button>
          </div>
        </div>

        <span className="text-[11px] text-[#8C827A]">
          İstasyon satırına tıklayarak 3 adımlı ilerleme doğrusunu açıp aşamayı seçebilirsiniz.
        </span>
      </div>

      {/* Orders Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedOrders.map((order) => {
          const hasWorkshopItems = order.items.some(i => i.itemType === 'workshop');
          const hasCafeItems = order.items.some(i => i.itemType === 'cafe');
          const isDone = order.status === 'completed';

          const workshopKey = `${order.id}-workshop`;
          const kitchenKey = `${order.id}-kitchen`;

          return (
            <div 
              key={order.id}
              className={`bg-white border rounded-2xl p-5 flex flex-col justify-between transition-all ${
                isDone 
                  ? 'border-[#E7DFD5] opacity-60' 
                  : 'border-[#E7DFD5] shadow-sm hover:border-[#D5C9BC]'
              }`}
            >
              {/* Card Header */}
              <div className="space-y-3 pb-3 border-b border-[#F0EAE1]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="w-9 h-9 rounded-full bg-[#FAF7F2] border border-[#E7DFD5] flex items-center justify-center font-bold text-[#211D1A] text-xs">
                      #{order.tableNumber.toString().padStart(2, '0')}
                    </span>
                    <div>
                      <h4 className="font-serif font-bold text-sm text-[#211D1A]">{order.customerName}</h4>
                      <span className="text-[10px] text-[#8C827A] flex items-center gap-1 mt-0.5">
                        <Clock className="w-3 h-3 text-[#A69B91]" /> {order.createdAt} • {order.id}
                      </span>
                    </div>
                  </div>

                  <span className="font-bold text-sm text-[#211D1A]">
                    {order.totalAmount} ₺
                  </span>
                </div>

                {/* Interactive Progress Stepper Rows */}
                <div className="grid grid-cols-1 gap-2 pt-1">
                  
                  {/* Workshop Station Stepper */}
                  {hasWorkshopItems && (
                    <StationProgressItem
                      stationType="workshop"
                      title="Atölye"
                      currentStatus={order.workshopStatus}
                      isExpanded={expandedStationKey === workshopKey}
                      onToggleExpand={() => toggleExpand(workshopKey)}
                      onSelectStatus={(newStatus) => updateWorkshopStationStatus(order.id, newStatus)}
                    />
                  )}

                  {/* Kitchen Stepper */}
                  {hasCafeItems && (
                    <StationProgressItem
                      stationType="kitchen"
                      title="Mutfak"
                      currentStatus={order.kitchenStatus}
                      isExpanded={expandedStationKey === kitchenKey}
                      onToggleExpand={() => toggleExpand(kitchenKey)}
                      onSelectStatus={(newStatus) => updateKitchenStationStatus(order.id, newStatus)}
                    />
                  )}

                </div>
              </div>

              {/* Items List */}
              <div className="py-3.5 space-y-2 flex-1">
                {order.items.map((item, idx) => (
                  <div key={idx} className="text-xs bg-[#FAF7F2] p-2.5 rounded-xl border border-[#EBE4DA] space-y-1">
                    <div className="flex items-start justify-between">
                      <span className="font-semibold text-[#211D1A]">
                        {item.quantity}x {item.itemType === 'workshop' ? item.workshopItem.title : item.cafeItem.name}
                      </span>
                      <span className="text-[#6E655F] font-medium">{item.totalPrice} ₺</span>
                    </div>

                    {item.itemType === 'workshop' && (
                      <div className="text-[11px] text-[#6E655F] pl-2 border-l border-[#B3542E]/60 space-y-0.5">
                        <div>Boyut: <span className="text-[#211D1A] font-medium">{item.selectedSize.name}</span></div>
                        {item.selectedExtras.length > 0 && (
                          <div className="text-[#B3542E]">
                            Ek: {item.selectedExtras.map(e => e.name).join(', ')}
                          </div>
                        )}
                      </div>
                    )}

                    {item.itemType === 'cafe' && Object.keys(item.selectedOptions).length > 0 && (
                      <div className="text-[11px] text-[#6E655F] pl-2 border-l border-[#8C827A]">
                        {Object.values(item.selectedOptions).map(o => o.label).join(' • ')}
                      </div>
                    )}

                    {item.specialNotes && (
                      <div className="text-[10px] text-[#6E655F] italic bg-white px-2 py-0.5 rounded border border-[#E7DFD5]">
                        &ldquo;{item.specialNotes}&rdquo;
                      </div>
                    )}
                  </div>
                ))}

                {order.notes && (
                  <div className="text-[11px] text-[#211D1A] bg-[#F5EFE6] p-2.5 rounded-xl border border-[#E4DCD1]">
                    <span className="text-[#8C827A] font-semibold">Müşteri Notu: </span>
                    {order.notes}
                  </div>
                )}
              </div>

              {/* Card Footer */}
              <div className="pt-3 border-t border-[#F0EAE1] flex items-center justify-between">
                <span className="text-[11px] text-[#8C827A]">
                  Masa Durumu: <strong className="text-[#211D1A] font-semibold">{order.status === 'completed' ? 'Kapandı' : 'Açık'}</strong>
                </span>

                <div className="flex gap-2">
                  {order.status !== 'completed' ? (
                    <button
                      onClick={() => updateOrderStatus(order.id, 'completed')}
                      className="px-3 py-1.5 rounded-lg bg-[#211D1A] hover:bg-[#38322D] text-white font-semibold text-xs flex items-center gap-1 transition-all cursor-pointer shadow-xs"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Masayı Kapat</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => updateOrderStatus(order.id, 'preparing')}
                      className="px-2.5 py-1 rounded-lg border border-[#E7DFD5] hover:bg-[#FAF7F2] text-[#6E655F] text-xs flex items-center gap-1 cursor-pointer"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Tekrar Aç</span>
                    </button>
                  )}
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
