'use client';

import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  ArrowRight, 
  ArrowDown,
  Palette, 
  Clock, 
  MapPin, 
  Info, 
  HelpCircle, 
  Users,
  Compass,
  ExternalLink
} from 'lucide-react';
import { StorefrontSectionItem } from '../types';

export const StoreLanding: React.FC = () => {
  const { setActiveView, venueSettings, workshopItems, tableNumber } = useApp();
  const config = venueSettings.storefront;
  const theme = venueSettings.theme;
  const isDark = theme?.preset === 'midnight_espresso';
  const primaryColor = theme?.primaryColor || '#B3542E';
  const secondaryColor = theme?.secondaryColor || '#C97A4E';
  const cardColor = theme?.cardColor || (isDark ? '#221E1C' : '#FFFFFF');
  const textColor = theme?.textColor || (isDark ? '#F5EFEB' : '#211D1A');

  // Dynamic typography font classes
  const getHeadingFont = () => {
    if (theme?.headingFont === 'serif_cormorant') return 'font-heading-cormorant';
    if (theme?.headingFont === 'serif_playfair') return 'font-heading-playfair';
    if (theme?.headingFont === 'serif_lora') return 'font-heading-lora';
    if (theme?.headingFont === 'sans_jakarta') return 'font-heading-jakarta';
    if (theme?.headingFont === 'sans_inter') return 'font-heading-inter';
    return theme?.fontFamily === 'sans_modern' ? 'font-sans' : 'font-serif';
  };

  const getBodyFont = () => {
    if (theme?.bodyFont === 'serif_lora') return 'font-body-lora';
    if (theme?.bodyFont === 'sans_jakarta') return 'font-body-jakarta';
    return 'font-body-inter';
  };

  const headingFontClass = getHeadingFont();
  const bodyFontClass = getBodyFont();

  // Default section order if not present
  const defaultSections: StorefrontSectionItem[] = [
    { id: 'steps', title: '3 Adımda Atölye Rehberi', subtitle: 'Nasıl çalışır kartları', enabled: config?.showSteps !== false },
    { id: 'featured', title: 'Öne Çıkan Modeller Vitrini', subtitle: 'Popüler heykeller bölümü', enabled: config?.showFeatured !== false },
    { id: 'hours_location', title: 'Seans Saatleri & Konum', subtitle: 'Adres ve çalışma saatleri', enabled: config?.showHoursAndLocation !== false },
    { id: 'faq', title: 'Sıkça Sorulan Sorular', subtitle: 'Merak edilenler', enabled: true },
    { id: 'private_events', title: 'Özel Etkinlik & Grup Seansları', subtitle: 'Doğum günü ve toplu atölyeler', enabled: false }
  ];

  const sectionsToRender = config?.sectionsList || defaultSections;

  return (
    <div className={`space-y-16 py-8 sm:py-14 ${bodyFontClass}`}>
      
      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
        
        <h1 
          className={`${headingFontClass} text-4xl sm:text-6xl font-bold tracking-tight leading-[1.15]`}
          style={{ color: textColor }}
        >
          {config?.heroTitle || 'Sanatını Seç, Kahveni Yudumla'}
        </h1>

        <p 
          className="text-base sm:text-lg opacity-80 max-w-2xl mx-auto font-normal leading-relaxed"
          style={{ color: textColor }}
        >
          {config?.heroSubtitle || 'Ham heykel ve seramik modellerini seçin; boya seti, fırçalar ve kahveniz masanıza servis edilsin.'}
        </p>

        {/* Hero Actions (Primary & Secondary CTA Buttons) */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => setActiveView('customer_menu')}
            className="w-full sm:w-auto px-7 py-3 sm:py-3.5 text-white font-medium text-sm sm:text-[15px] rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.99] cursor-pointer hover:opacity-95 shadow-xs"
            style={{ backgroundColor: primaryColor }}
          >
            <span>{config?.ctaButtonText || 'Masa Menüsünü Aç & Sipariş Ver'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {config?.showSecondaryButton !== false && (
            <button
              onClick={() => {
                const stepsEl = document.getElementById('steps-section');
                if (stepsEl) {
                  stepsEl.scrollIntoView({ behavior: 'smooth' });
                } else {
                  setActiveView('customer_menu');
                }
              }}
              className="w-full sm:w-auto px-6 py-3 sm:py-3.5 font-medium text-sm sm:text-[15px] rounded-xl flex items-center justify-center gap-2 border border-[#E7DFD5] bg-white hover:bg-[#FAF7F2] text-[#211D1A] transition-all active:scale-[0.99] cursor-pointer"
            >
              <span>{config?.secondaryButtonText || '3 Adımda Rehber'}</span>
              <ArrowDown className="w-3.5 h-3.5 text-[#8C827A]" />
            </button>
          )}
        </div>

        {/* Hero Banner Visual Image (When enabled) */}
        {config?.showHeroImage !== false && config?.heroImageUrl && (
          <div className="pt-4 max-w-3xl mx-auto">
            <div className="relative aspect-[21/9] sm:aspect-[16/7] w-full rounded-3xl overflow-hidden border"
                 style={{ borderColor: isDark ? '#38322D' : '#E7DFD5' }}>
              <img
                src={config.heroImageUrl}
                alt="Atölye ve Sanat Atmosferi"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1200&auto=format&fit=crop&q=80';
                }}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}
      </section>

      {/* DYNAMIC ORDERED SECTIONS */}
      {sectionsToRender.map((section) => {
        if (!section.enabled) return null;

        // SECTION 1: STEPS
        if (section.id === 'steps') {
          return (
            <section id="steps-section" key={section.id} className="max-w-5xl mx-auto px-4 sm:px-6 space-y-4">
              <div className="text-center sm:text-left">
                <h2 className={`${headingFontClass} text-xl sm:text-2xl font-bold tracking-tight`} style={{ color: textColor }}>
                  {section.title}
                </h2>
                <p className="text-xs sm:text-sm text-[#6E655F] mt-1">{section.subtitle}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
                <div 
                  className="border rounded-2xl p-5 sm:p-6 space-y-2.5 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#D5C9BC]"
                  style={{ backgroundColor: cardColor, borderColor: isDark ? '#38322D' : '#E7DFD5' }}
                >
                  <span className="font-serif text-lg font-bold" style={{ color: primaryColor }}>01</span>
                  <h3 className="font-sans font-semibold text-sm sm:text-base" style={{ color: textColor }}>Modelinizi Seçin</h3>
                  <p className="text-xs opacity-75 leading-relaxed" style={{ color: textColor }}>
                    David büstünden balon köpeğe, ham seramik fincandan tuvale dilediğiniz parçayı menüden belirleyin.
                  </p>
                </div>

                <div 
                  className="border rounded-2xl p-5 sm:p-6 space-y-2.5 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#D5C9BC]"
                  style={{ backgroundColor: cardColor, borderColor: isDark ? '#38322D' : '#E7DFD5' }}
                >
                  <span className="font-serif text-lg font-bold" style={{ color: primaryColor }}>02</span>
                  <h3 className="font-sans font-semibold text-sm sm:text-base" style={{ color: textColor }}>Malzemeniz Masaya Gelsin</h3>
                  <p className="text-xs opacity-75 leading-relaxed" style={{ color: textColor }}>
                    6 renk akrilik boya tüpü, sanat fırçaları, koruyucu pamuklu önlük ve ahşap palet masanıza hazır servis edilir.
                  </p>
                </div>

                <div 
                  className="border rounded-2xl p-5 sm:p-6 space-y-2.5 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#D5C9BC]"
                  style={{ backgroundColor: cardColor, borderColor: isDark ? '#38322D' : '#E7DFD5' }}
                >
                  <span className="font-serif text-lg font-bold" style={{ color: primaryColor }}>03</span>
                  <h3 className="font-sans font-semibold text-sm sm:text-base" style={{ color: textColor }}>Boyayın ve Teslim Alın</h3>
                  <p className="text-xs opacity-75 leading-relaxed" style={{ color: textColor }}>
                    Taze demlenmiş kahveniz eşliğinde boyamanızı tamamlayın, vernikleyip özel taşıma kutusunda evinize götürün.
                  </p>
                </div>
              </div>
            </section>
          );
        }

        // SECTION 2: FEATURED (PRIMARY COMMERCIAL SHOWCASE)
        if (section.id === 'featured') {
          return (
            <section key={section.id} className="max-w-5xl mx-auto px-4 sm:px-6 space-y-6">
              <div className="flex items-center justify-between border-b border-[#E7DFD5] pb-4">
                <div>
                  <h2 className={`${headingFontClass} text-2xl sm:text-3xl font-bold tracking-tight`} style={{ color: textColor }}>
                    {section.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-[#6E655F] mt-1">
                    {section.subtitle}
                  </p>
                </div>

                <button
                  onClick={() => setActiveView('customer_menu')}
                  className="text-xs font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                  style={{ color: primaryColor }}
                >
                  <span>{config?.allMenuButtonText || 'Tüm Menüyü İncele'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {workshopItems.slice(0, 3).map((item) => (
                  <div 
                    key={item.id}
                    onClick={() => setActiveView('customer_menu')}
                    className="border rounded-2xl overflow-hidden hover:border-[#D5C9BC] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group"
                    style={{ backgroundColor: cardColor, borderColor: isDark ? '#38322D' : '#E7DFD5' }}
                  >
                    <div className="relative aspect-[4/3] w-full bg-[#EFE7DC] overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=600&auto=format&fit=crop&q=80';
                        }}
                        className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4 space-y-1.5">
                      <h3 
                        className={`${headingFontClass} font-bold text-base group-hover:opacity-80 transition-colors`}
                        style={{ color: textColor }}
                      >
                        {item.title}
                      </h3>
                      <p className="text-xs text-[#6E655F] line-clamp-1">{item.description}</p>
                      <div className="pt-2 flex items-center justify-between border-t border-[#F0EAE1]">
                        <span className="text-xs font-bold" style={{ color: textColor }}>{item.sizes[0]?.price} ₺'den başlayan</span>
                        <span className="text-xs font-semibold" style={{ color: primaryColor }}>
                          {config?.itemCardButtonText || 'Sipariş Ver →'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          );
        }

        // SECTION 3: HOURS & LOCATION (OPERATIONAL UTILITY)
        if (section.id === 'hours_location') {
          return (
            <section key={section.id} className="max-w-5xl mx-auto px-4 sm:px-6">
              <div 
                className="border rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5"
                style={{ backgroundColor: isDark ? '#1F1B18' : '#FAF7F2', borderColor: isDark ? '#38322D' : '#E7DFD5' }}
              >
                <div className="space-y-1">
                  <h3 className={`${headingFontClass} text-base sm:text-lg font-bold`} style={{ color: textColor }}>
                    {venueSettings.venueName} • {config?.district || 'Kadıköy, Moda'}
                  </h3>
                  <p className="text-xs text-[#6E655F]">
                    {section.subtitle || 'Rezervasyonsuz serbest boyama seansları. Masaya oturduğunuz an boyamaya başlayabilirsiniz.'}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 text-xs">
                  <div 
                    className="flex items-center gap-2 px-3 py-1.5 rounded-xl border"
                    style={{ backgroundColor: cardColor, borderColor: isDark ? '#38322D' : '#E7DFD5' }}
                  >
                    <Clock className="w-3.5 h-3.5" style={{ color: primaryColor }} />
                    <span className="font-medium" style={{ color: textColor }}>{config?.workingHours || 'Her gün 10:00 - 22:00'}</span>
                  </div>
                  <div 
                    className="flex items-center gap-2 px-3 py-1.5 rounded-xl border"
                    style={{ backgroundColor: cardColor, borderColor: isDark ? '#38322D' : '#E7DFD5' }}
                  >
                    <MapPin className="w-3.5 h-3.5" style={{ color: primaryColor }} />
                    <span className="font-medium" style={{ color: textColor }}>{config?.district || 'Moda Caddesi No: 42'}</span>
                  </div>
                  <a
                    href={config?.googleMapsUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${venueSettings.venueName} ${config?.fullAddress || config?.district || 'Moda Kadıköy İstanbul'}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-white transition-opacity hover:opacity-90 cursor-pointer shadow-xs inline-flex items-center gap-1.5"
                    style={{ backgroundColor: primaryColor }}
                    title="Google Maps'te konumu aç ve yol tarifi al"
                  >
                    <span>{config?.locationButtonText || 'Haritada Göster'}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </section>
          );
        }

        // SECTION 4: FAQ (SECONDARY REFERENCE & REASSURANCE)
        if (section.id === 'faq') {
          const faqItems = config?.faqItems || [
            { question: 'Önceden heykel boyama deneyimim olması gerekir mi?', answer: 'Kesinlikle gerekmez. Masanıza fırçalar, 6 renk akrilik set ve başlangıç rehberiyle birlikte tüm malzemeler eksiksiz getirilir.' },
            { question: 'Boyadığım heykeli hemen yanımda götürebilir miyim?', answer: 'Evet, su bazlı akrilik boyalarımız yaklaşık 15-20 dakikada kurur. Çıkmadan önce masanıza vernik sıkılıp özel kraft kutusunda teslim edilir.' },
            { question: 'Rezervasyon yaptırmadan gelebilir miyiz?', answer: 'Hafta içi genellikle çat kapı yer bulunur; hafta sonu pik saatler için önceden aramanızı öneririz.' }
          ];

          return (
            <section key={section.id} className="max-w-5xl mx-auto px-4 sm:px-6 space-y-4">
              <div className="border-b border-[#E7DFD5]/70 pb-3">
                <h3 className={`${headingFontClass} text-base sm:text-lg font-bold`} style={{ color: textColor }}>
                  {section.title}
                </h3>
                <p className="text-xs text-[#8C827A] mt-0.5">
                  {section.subtitle || 'Ziyaret öncesi ve atölye işleyişine dair pratik bilgiler.'}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {faqItems.map((faq, idx) => (
                  <div 
                    key={idx} 
                    className="border rounded-xl p-4 sm:p-5 space-y-1.5 transition-colors"
                    style={{ backgroundColor: cardColor, borderColor: isDark ? '#38322D' : '#E7DFD5' }}
                  >
                    <h4 className="font-sans font-semibold text-xs sm:text-sm text-[#211D1A] leading-snug">
                      {faq.question}
                    </h4>
                    <p className="text-xs text-[#6E655F] leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          );
        }

        // SECTION 5: PRIVATE EVENTS / GRUP ETKİNLİKLERİ
        if (section.id === 'private_events') {
          return (
            <section key={section.id} className="max-w-5xl mx-auto px-4 sm:px-6">
              <div 
                className="border rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5"
                style={{ backgroundColor: isDark ? '#221E1C' : '#FAF0E6', borderColor: isDark ? '#38322D' : '#E8D4C4' }}
              >
                <div className="space-y-1.5 max-w-xl">
                  <h3 className={`${headingFontClass} text-base sm:text-lg font-bold`} style={{ color: textColor }}>
                    {section.title}
                  </h3>
                  <p className="text-xs text-[#6E655F] leading-relaxed">
                    {config?.privateEventText || 'Doğum günü, şirket içi motivasyon veya arkadaş gruplarınız için 10 kişiden 25 kişiye kadar kapalı atölye seansları düzenliyoruz.'}
                  </p>
                </div>

                <div 
                  className="shrink-0 border rounded-xl px-4 py-2.5 text-center"
                  style={{ backgroundColor: cardColor, borderColor: isDark ? '#38322D' : '#E8D4C4' }}
                >
                  <span className="text-[10px] text-[#8C827A] block font-medium">Grup Rezervasyonu</span>
                  <span className="text-xs font-bold mt-0.5 block" style={{ color: textColor }}>0216 450 12 34</span>
                  <span className="text-[10px] font-semibold" style={{ color: primaryColor }}>Hafta içi & Sonu</span>
                </div>
              </div>
            </section>
          );
        }

        return null;
      })}

    </div>
  );
};
