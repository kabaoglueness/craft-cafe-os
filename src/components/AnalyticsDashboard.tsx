'use client';

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  TrendingUp, 
  Users, 
  Palette, 
  Coffee, 
  Clock, 
  Calendar, 
  ArrowUpRight, 
  Sparkles,
  Award
} from 'lucide-react';

export const AnalyticsDashboard: React.FC = () => {
  const { orders, workshopItems, cafeItems, venueSettings } = useApp();
  const [timeRange, setTimeRange] = useState<'today' | 'week' | 'month'>('today');

  // Total metrics
  const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);
  const totalOrders = orders.length;
  const avgOrderValue = totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0;

  // Split Revenue: Workshop vs Cafe
  let workshopRevenue = 0;
  let cafeRevenue = 0;
  let totalWorkshopPieces = 0;
  let totalCafeCups = 0;

  orders.forEach(order => {
    order.items.forEach(item => {
      if (item.itemType === 'workshop') {
        workshopRevenue += item.totalPrice;
        totalWorkshopPieces += item.quantity;
      } else {
        cafeRevenue += item.totalPrice;
        totalCafeCups += item.quantity;
      }
    });
  });

  const workshopPercent = totalRevenue > 0 ? Math.round((workshopRevenue / totalRevenue) * 100) : 65;
  const cafePercent = 100 - workshopPercent;

  // Best selling items
  const sortedWorkshop = [...workshopItems].sort((a, b) => (b.totalSold || 0) - (a.totalSold || 0));
  const sortedCafe = [...cafeItems].sort((a, b) => (b.totalSold || 0) - (a.totalSold || 0));

  // Hourly density mock
  const hourlyData = [
    { hour: '11:00', orders: 2, percent: 20 },
    { hour: '13:00', orders: 5, percent: 50 },
    { hour: '15:00', orders: 9, percent: 90 },
    { hour: '17:00', orders: 10, percent: 100 },
    { hour: '19:00', orders: 7, percent: 70 },
    { hour: '21:00', orders: 4, percent: 40 },
  ];

  return (
    <div className="space-y-6">
      
      {/* Header & Filter Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#E7DFD5]">
        <div>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#211D1A]">
            Atölye Satış & Operasyon Analitiği
          </h3>
          <p className="text-xs text-[#6E655F] mt-0.5">
            Masa ciroları, atölye-kafe gelir dağılımı ve en çok satan modellerin anlık raporu.
          </p>
        </div>

        {/* Time Filter Pills */}
        <div className="flex items-center gap-1.5 bg-[#FAF7F2] p-1 border border-[#E7DFD5] rounded-xl text-xs">
          <button
            onClick={() => setTimeRange('today')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
              timeRange === 'today'
                ? 'bg-[#211D1A] text-white shadow-xs'
                : 'text-[#6E655F] hover:text-[#211D1A]'
            }`}
          >
            Bugün
          </button>
          <button
            onClick={() => setTimeRange('week')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
              timeRange === 'week'
                ? 'bg-[#211D1A] text-white shadow-xs'
                : 'text-[#6E655F] hover:text-[#211D1A]'
            }`}
          >
            Bu Hafta
          </button>
          <button
            onClick={() => setTimeRange('month')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
              timeRange === 'month'
                ? 'bg-[#211D1A] text-white shadow-xs'
                : 'text-[#6E655F] hover:text-[#211D1A]'
            }`}
          >
            Bu Ay
          </button>
        </div>
      </div>

      {/* 4 Primary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Total Revenue */}
        <div className="bg-white border border-[#E7DFD5] rounded-2xl p-5 space-y-2">
          <div className="flex items-center justify-between text-xs text-[#8C827A]">
            <span className="font-medium">Toplam Kasa Cirosu</span>
            <TrendingUp className="w-4 h-4 text-[#4E5E48]" />
          </div>
          <div className="font-serif text-3xl font-bold text-[#211D1A]">
            {totalRevenue} ₺
          </div>
          <span className="text-[11px] text-[#4E5E48] font-medium block">
            +18% geçen haftaya göre artışta
          </span>
        </div>

        {/* Average Table Spend (AOV) */}
        <div className="bg-white border border-[#E7DFD5] rounded-2xl p-5 space-y-2">
          <div className="flex items-center justify-between text-xs text-[#8C827A]">
            <span className="font-medium">Masa Başı Ortalama</span>
            <Users className="w-4 h-4 text-[#B3542E]" />
          </div>
          <div className="font-serif text-3xl font-bold text-[#211D1A]">
            {avgOrderValue} ₺
          </div>
          <span className="text-[11px] text-[#6E655F] block">
            Heykel + içecek birleşik sepet ortalaması
          </span>
        </div>

        {/* Sculptures Painted */}
        <div className="bg-white border border-[#E7DFD5] rounded-2xl p-5 space-y-2">
          <div className="flex items-center justify-between text-xs text-[#8C827A]">
            <span className="font-medium">Boyanan Heykel & Seramik</span>
            <Palette className="w-4 h-4 text-[#B3542E]" />
          </div>
          <div className="font-serif text-3xl font-bold text-[#211D1A]">
            {totalWorkshopPieces} adet
          </div>
          <span className="text-[11px] text-[#6E655F] block">
            Bugün masaya teslim edilen set
          </span>
        </div>

        {/* Coffee Served */}
        <div className="bg-white border border-[#E7DFD5] rounded-2xl p-5 space-y-2">
          <div className="flex items-center justify-between text-xs text-[#8C827A]">
            <span className="font-medium">Servis Edilen İçecek</span>
            <Coffee className="w-4 h-4 text-[#211D1A]" />
          </div>
          <div className="font-serif text-3xl font-bold text-[#211D1A]">
            {totalCafeCups} porsiyon
          </div>
          <span className="text-[11px] text-[#6E655F] block">
            Kahve, matcha ve taze tatlı
          </span>
        </div>

      </div>

      {/* Revenue Breakdown: Workshop vs Cafe */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Split Breakdown */}
        <div className="bg-white border border-[#E7DFD5] rounded-2xl p-6 space-y-4 lg:col-span-1">
          <h4 className="font-serif font-bold text-base text-[#211D1A]">
            Gelir Dağılımı (Hibrit Model)
          </h4>
          <p className="text-xs text-[#6E655F]">
            Mekanın cirosunun ne kadarının heykel/atölyeden, ne kadarının kafeden geldiğini gösterir.
          </p>

          <div className="space-y-3 pt-2">
            <div>
              <div className="flex items-center justify-between text-xs font-semibold mb-1">
                <span className="text-[#B3542E] flex items-center gap-1.5">
                  <Palette className="w-3.5 h-3.5" /> Atölye Parçaları
                </span>
                <span className="text-[#211D1A]">%{workshopPercent} ({workshopRevenue} ₺)</span>
              </div>
              <div className="w-full h-3 bg-[#FAF7F2] border border-[#E7DFD5] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#B3542E] rounded-full transition-all duration-500"
                  style={{ width: `${workshopPercent}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs font-semibold mb-1">
                <span className="text-[#211D1A] flex items-center gap-1.5">
                  <Coffee className="w-3.5 h-3.5" /> Kafe & İçecek
                </span>
                <span className="text-[#211D1A]">%{cafePercent} ({cafeRevenue} ₺)</span>
              </div>
              <div className="w-full h-3 bg-[#FAF7F2] border border-[#E7DFD5] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#211D1A] rounded-full transition-all duration-500"
                  style={{ width: `${cafePercent}%` }}
                />
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-[#F0EAE1] text-xs text-[#8C827A] space-y-1">
            <div className="flex justify-between">
              <span>Ortalama Masa Süresi:</span>
              <strong className="text-[#211D1A]">74 dakika</strong>
            </div>
            <div className="flex justify-between">
              <span>Masa Devir Hızı:</span>
              <strong className="text-[#211D1A]">1.8 seans / gün</strong>
            </div>
          </div>
        </div>

        {/* Hourly Rush Breakdown */}
        <div className="bg-white border border-[#E7DFD5] rounded-2xl p-6 space-y-4 lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-serif font-bold text-base text-[#211D1A]">
                Saatlik Masa Yoğunluğu
              </h4>
              <p className="text-xs text-[#6E655F] mt-0.5">
                Atölye masalarının en çok sipariş aldığı pik saatler
              </p>
            </div>
            <span className="text-xs font-semibold text-[#B3542E] bg-[#FAF0E6] px-2.5 py-1 rounded-lg border border-[#E8D4C4]">
              Zirve: 15:00 - 18:00
            </span>
          </div>

          <div className="pt-4 flex items-end justify-between gap-3 h-44">
            {hourlyData.map((slot, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                <span className="text-[10px] font-bold text-[#211D1A]">{slot.orders} sipariş</span>
                <div 
                  className="w-full max-w-[48px] bg-[#FAF7F2] border border-[#E7DFD5] rounded-t-lg relative overflow-hidden group hover:border-[#B3542E] transition-colors"
                  style={{ height: `${slot.percent}%` }}
                >
                  <div className="absolute inset-0 bg-[#B3542E]/80 group-hover:bg-[#B3542E] transition-colors" />
                </div>
                <span className="text-[11px] font-medium text-[#8C827A]">{slot.hour}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Top 5 Best Sellers Table */}
      <div className="bg-white border border-[#E7DFD5] rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-serif font-bold text-base text-[#211D1A]">
              En Çok Tercih Edilen Atölye Modelleri
            </h4>
            <p className="text-xs text-[#6E655F]">
              Kafede müşterilerin en çok sipariş verdiği heykeller ve getirdikleri hasılat
            </p>
          </div>
          <Award className="w-5 h-5 text-[#B3542E]" />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#E7DFD5] text-[#6E655F] text-xs font-medium">
                <th className="pb-3 font-semibold">Model / Heykel</th>
                <th className="pb-3 font-semibold">Kategori</th>
                <th className="pb-3 font-semibold">Satılan Adet</th>
                <th className="pb-3 font-semibold">Kalan Stok</th>
                <th className="pb-3 font-semibold text-right">Toplam Hasılat</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0EAE1]">
              {sortedWorkshop.map((item, idx) => (
                <tr key={item.id} className="hover:bg-[#FAF7F2]/40 transition-colors">
                  <td className="py-3.5 pr-4 flex items-center gap-3">
                    <span className="w-5 font-serif font-bold text-[#8C827A]">#{idx + 1}</span>
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-9 h-9 rounded-lg object-cover border border-[#E7DFD5]"
                    />
                    <span className="font-semibold text-sm text-[#211D1A]">{item.title}</span>
                  </td>
                  <td className="py-3.5 text-[#6E655F]">
                    {item.category === 'sculpture' ? 'Heykel Boyama' : item.category === 'ceramic' ? 'Seramik' : 'Tuval'}
                  </td>
                  <td className="py-3.5 font-bold text-[#211D1A]">
                    {item.totalSold || 0} adet
                  </td>
                  <td className="py-3.5">
                    <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                      (item.stockCount || 0) <= 3 
                        ? 'bg-[#FAF0E6] text-[#B3542E]' 
                        : 'bg-[#EEF3EC] text-[#4E5E48]'
                    }`}>
                      {item.stockCount || 0} adet
                    </span>
                  </td>
                  <td className="py-3.5 font-bold text-sm text-[#211D1A] text-right">
                    {((item.totalSold || 0) * (item.sizes[0]?.price || 0))} ₺
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
