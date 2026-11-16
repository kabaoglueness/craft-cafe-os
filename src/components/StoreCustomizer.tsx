'use client';

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Check, 
  Smartphone, 
  Monitor, 
  ArrowLeft, 
  Sparkles, 
  Save, 
  Type, 
  Layers, 
  Clock, 
  ChevronUp, 
  ChevronDown, 
  LogOut, 
  Palette, 
  CheckCircle2, 
  Paintbrush, 
  Globe, 
  Image as ImageIcon, 
  SlidersHorizontal,
  Compass,
  ArrowRight
} from 'lucide-react';
import { 
  StorefrontConfig, 
  ThemeConfig, 
  ThemePreset, 
  HeadingFontChoice, 
  BodyFontChoice, 
  ThemeTargetScope 
} from '../types';

const THEME_PRESETS: {
  preset: ThemePreset;
  name: string;
  tagline: string;
  desc: string;
  primaryColor: string;
  secondaryColor: string;
  cardColor: string;
  textColor: string;
  backgroundColor: string;
  headingFont: HeadingFontChoice;
  bodyFont: BodyFontChoice;
}[] = [
  {
    preset: 'terracotta',
    name: 'Şablon 1: Toprak & Zanaat',
    tagline: 'Geleneksel Atölye',
    desc: 'Sıcak bej zemin, terracotta kiremit vurgusu ve zanaatkar serif başlıklar.',
    primaryColor: '#B3542E',
    secondaryColor: '#C97A4E',
    cardColor: '#FFFFFF',
    textColor: '#211D1A',
    backgroundColor: '#FAF7F2',
    headingFont: 'serif_cormorant',
    bodyFont: 'sans_inter'
  },
  {
    preset: 'sage_olive',
    name: 'Şablon 2: İskandinav & Zeytin',
    tagline: 'Minimal Galeri',
    desc: 'Taş grisi zemin, adaçayı zeytin yeşili vurgusu ve modern geometrik sans tipografi.',
    primaryColor: '#3D5A40',
    secondaryColor: '#5B7A5F',
    cardColor: '#FFFFFF',
    textColor: '#1E2620',
    backgroundColor: '#F5F7F4',
    headingFont: 'sans_jakarta',
    bodyFont: 'sans_jakarta'
  },
  {
    preset: 'midnight_espresso',
    name: 'Şablon 3: Gece Atölyesi & Kehribar',
    tagline: 'Loş Akşam Seansı',
    desc: 'Espresso gece zemini, sıcak kehribar parıltısı ve şık mum ışığı atmosferi.',
    primaryColor: '#C67D38',
    secondaryColor: '#E29A52',
    cardColor: '#221E1C',
    textColor: '#F5EFEB',
    backgroundColor: '#181513',
    headingFont: 'serif_playfair',
    bodyFont: 'serif_lora'
  }
];

const PHOTO_PRESETS = [
  {
    title: 'Atölye Masası & Boyalar',
    tag: 'Akrilik & Palet',
    url: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1200&auto=format&fit=crop&q=80'
  },
  {
    title: 'Heykel Sanatı & Büst',
    tag: 'Klasik Figürler',
    url: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=1200&auto=format&fit=crop&q=80'
  },
  {
    title: 'Nitelikli Kahve Barı',
    tag: 'Espresso & Latte',
    url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=1200&auto=format&fit=crop&q=80'
  },
  {
    title: 'Seramik & Çömlek Çarkı',
    tag: 'Ham Çamur & Zanaat',
    url: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=1200&auto=format&fit=crop&q=80'
  }
];

export const StoreCustomizer: React.FC = () => {
  const { 
    venueSettings, 
    updateStorefrontConfig, 
    updateVenueSettings, 
    updateThemeConfig,
    setActiveView, 
    currentStaff, 
    logout 
  } = useApp();
  
  const [editorTab, setEditorTab] = useState<'content' | 'media' | 'theme'>('content');

  // Local draft state initialized with current storefront config
  const [draft, setDraft] = useState<StorefrontConfig>({
    ...venueSettings.storefront,
    heroImageUrl: venueSettings.storefront.heroImageUrl || PHOTO_PRESETS[0].url,
    showHeroImage: venueSettings.storefront.showHeroImage !== false,
    secondaryButtonText: venueSettings.storefront.secondaryButtonText || '3 Adımda Rehber',
    showSecondaryButton: venueSettings.storefront.showSecondaryButton !== false,
    allMenuButtonText: venueSettings.storefront.allMenuButtonText || 'Tüm Menüyü İncele',
    itemCardButtonText: venueSettings.storefront.itemCardButtonText || 'Sipariş Ver →',
    locationButtonText: venueSettings.storefront.locationButtonText || 'Haritada Göster',
    sectionsList: venueSettings.storefront.sectionsList || [
      { id: 'steps', title: '3 Adımda Atölye Rehberi', subtitle: 'Nasıl çalışır kartları', enabled: true },
      { id: 'featured', title: 'Öne Çıkan Modeller Vitrini', subtitle: 'Popüler heykeller bölümü', enabled: true },
      { id: 'hours_location', title: 'Seans Saatleri & Konum', subtitle: 'Adres ve çalışma saatleri', enabled: true },
      { id: 'faq', title: 'Sıkça Sorulan Sorular', subtitle: 'Boya ve rezervasyon bilgileri', enabled: true },
      { id: 'private_events', title: 'Grup & Doğum Günü Atölyeleri', subtitle: 'Toplu etkinlik duyuru kartı', enabled: false }
    ]
  });

  const [themeDraft, setThemeDraft] = useState<ThemeConfig>(venueSettings.theme || {
    preset: 'terracotta',
    fontFamily: 'serif_classic',
    headingFont: 'serif_cormorant',
    bodyFont: 'sans_inter',
    scope: 'all',
    primaryColor: '#B3542E',
    secondaryColor: '#C97A4E',
    cardColor: '#FFFFFF',
    textColor: '#211D1A',
    backgroundColor: '#FAF7F2'
  });

  const [noticeDraft, setNoticeDraft] = useState(venueSettings.venueNotice);
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('desktop');
  const [isSavedNotice, setIsSavedNotice] = useState(false);

  // Apply quick preset
  const handleSelectPreset = (p: typeof THEME_PRESETS[0]) => {
    setThemeDraft(prev => ({
      ...prev,
      preset: p.preset,
      primaryColor: p.primaryColor,
      secondaryColor: p.secondaryColor,
      cardColor: p.cardColor,
      textColor: p.textColor,
      backgroundColor: p.backgroundColor,
      headingFont: p.headingFont,
      bodyFont: p.bodyFont,
      fontFamily: p.headingFont.startsWith('serif') ? 'serif_classic' : 'sans_modern'
    }));
  };

  // Section Reordering Helpers
  const moveSection = (index: number, direction: 'up' | 'down') => {
    const list = [...(draft.sectionsList || [])];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= list.length) return;

    const [moved] = list.splice(index, 1);
    list.splice(targetIndex, 0, moved);

    setDraft(prev => ({
      ...prev,
      sectionsList: list
    }));
  };

  const toggleSection = (id: string) => {
    setDraft(prev => ({
      ...prev,
      sectionsList: (prev.sectionsList || []).map(sec => 
        sec.id === id ? { ...sec, enabled: !sec.enabled } : sec
      )
    }));
  };

  const updateSectionTitle = (id: string, newTitle: string) => {
    setDraft(prev => ({
      ...prev,
      sectionsList: (prev.sectionsList || []).map(sec => 
        sec.id === id ? { ...sec, title: newTitle } : sec
      )
    }));
  };

  const handleSaveAndPublish = () => {
    updateStorefrontConfig(draft);
    updateVenueSettings({ 
      venueNotice: noticeDraft,
      theme: themeDraft
    });
    updateThemeConfig(themeDraft);
    setIsSavedNotice(true);
    setTimeout(() => setIsSavedNotice(false), 2500);
  };

  const isAdmin = currentStaff?.role === 'admin';

  // Dynamic preview font helper
  const getHeadingFontClass = () => {
    if (themeDraft.headingFont === 'serif_cormorant') return 'font-heading-cormorant';
    if (themeDraft.headingFont === 'serif_playfair') return 'font-heading-playfair';
    if (themeDraft.headingFont === 'serif_lora') return 'font-heading-lora';
    if (themeDraft.headingFont === 'sans_jakarta') return 'font-heading-jakarta';
    if (themeDraft.headingFont === 'sans_inter') return 'font-heading-inter';
    return themeDraft.fontFamily === 'sans_modern' ? 'font-sans' : 'font-serif';
  };

  const isDarkTheme = themeDraft.preset === 'midnight_espresso';

  return (
    <div className="min-h-screen bg-[#F3ECE2] flex flex-col text-[#211D1A]">
      
      {/* Top Customizer Header */}
      <header className="bg-white border-b border-[#E7DFD5] px-3 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between sticky top-0 z-50 gap-2 overflow-x-auto custom-scrollbar">
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          
          {isAdmin ? (
            <button
              onClick={() => setActiveView('admin')}
              className="text-xs text-[#6E655F] hover:text-[#211D1A] flex items-center gap-1.5 font-medium px-2 py-1 rounded-lg hover:bg-[#FAF7F2] transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Yönetici Paneli</span>
            </button>
          ) : (
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setActiveView('store')}
                className="text-xs text-[#6E655F] hover:text-[#211D1A] flex items-center gap-1 font-medium px-2 py-1 rounded-lg hover:bg-[#FAF7F2] transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Mağazaya Dön</span>
              </button>
              <span className="text-[#D5C9BC]">•</span>
              <button
                onClick={() => { logout(); setActiveView('store'); }}
                className="text-xs text-red-600 hover:text-red-700 flex items-center gap-1 font-medium cursor-pointer whitespace-nowrap shrink-0"
              >
                <LogOut className="w-3 h-3" />
                <span>Çıkış</span>
              </button>
            </div>
          )}
          
          <div className="h-4 w-px bg-[#E7DFD5] shrink-0" />

          <div className="flex items-center gap-2 shrink-0">
            <span className="font-serif font-bold text-sm text-[#211D1A] whitespace-nowrap">Vitrin Editörü</span>
            <span className="text-[10px] bg-[#FAF0E6] text-[#B3542E] px-2 py-0.5 rounded-full font-semibold border border-[#E8D4C4] whitespace-nowrap hidden xs:inline">
              {isAdmin ? 'Yönetici' : 'Editör'}
            </span>
          </div>
        </div>

        {/* Device Switcher & Save Button */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <div className="flex bg-[#FAF7F2] border border-[#E7DFD5] rounded-xl p-0.5 shrink-0">
            <button
              type="button"
              onClick={() => setPreviewDevice('desktop')}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                previewDevice === 'desktop' ? 'bg-white shadow-xs text-[#211D1A]' : 'text-[#8C827A]'
              }`}
              title="Masaüstü Görünümü"
            >
              <Monitor className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
            <button
              type="button"
              onClick={() => setPreviewDevice('mobile')}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                previewDevice === 'mobile' ? 'bg-white shadow-xs text-[#211D1A]' : 'text-[#8C827A]'
              }`}
              title="Mobil Önizleme"
            >
              <Smartphone className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          </div>

          <button
            onClick={handleSaveAndPublish}
            className="px-3.5 sm:px-5 py-2 rounded-xl bg-[#211D1A] hover:bg-[#38322D] text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer active:scale-95 whitespace-nowrap shrink-0"
          >
            {isSavedNotice ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Yayınlandı!</span>
              </>
            ) : (
              <>
                <Save className="w-3.5 h-3.5" />
                <span className="hidden xs:inline">Değişiklikleri </span><span>Yayınla</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* Main Split Layout: Editor Left vs Live Preview Right */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        
        {/* LEFT: Controls Panel */}
        <div className="w-full lg:w-[460px] bg-white border-r border-[#E7DFD5] h-full overflow-y-auto p-5 sm:p-6 space-y-6 shrink-0 custom-scrollbar">
          
          {/* 3 Tab Mode Switcher */}
          <div className="p-1 bg-[#EFE7DC] rounded-xl flex gap-1">
            <button
              type="button"
              onClick={() => setEditorTab('content')}
              className={`flex-1 py-2 px-2.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                editorTab === 'content'
                  ? 'bg-white text-[#211D1A] shadow-xs'
                  : 'text-[#6E655F] hover:text-[#211D1A]'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Sayfa Blokları</span>
            </button>

            <button
              type="button"
              onClick={() => setEditorTab('media')}
              className={`flex-1 py-2 px-2.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                editorTab === 'media'
                  ? 'bg-white text-[#211D1A] shadow-xs'
                  : 'text-[#6E655F] hover:text-[#211D1A]'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5 text-[#B3542E]" />
              <span>Görseller & Butonlar</span>
            </button>

            <button
              type="button"
              onClick={() => setEditorTab('theme')}
              className={`flex-1 py-2 px-2.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                editorTab === 'theme'
                  ? 'bg-white text-[#211D1A] shadow-xs'
                  : 'text-[#6E655F] hover:text-[#211D1A]'
              }`}
            >
              <Palette className="w-3.5 h-3.5 text-[#B3542E]" />
              <span>Renk & Tipografi</span>
            </button>
          </div>

          {/* TAB 1: SAYFA BLOKLARI & SIRALAMA */}
          {editorTab === 'content' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="border-b border-[#F0EAE1] pb-3">
                <h3 className="font-serif font-bold text-base text-[#211D1A]">
                  Sayfa Blokları & Sıralama
                </h3>
                <p className="text-xs text-[#6E655F]">
                  Bölümleri yukarı/aşağı taşıyarak sıralayabilir, başlıkları özelleştirebilirsiniz.
                </p>
              </div>

              {/* Section 1: Hero Texts */}
              <div className="space-y-3.5">
                <span className="text-xs font-semibold text-[#211D1A] flex items-center gap-1.5">
                  <Type className="w-3.5 h-3.5 text-[#B3542E]" />
                  <span>Karşılama Metinleri</span>
                </span>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-[#8C827A]">Rozet Metni (Üst Etiket)</label>
                  <input
                    type="text"
                    value={draft.heroBadge}
                    onChange={(e) => setDraft(prev => ({ ...prev, heroBadge: e.target.value }))}
                    className="w-full px-3 py-2 border border-[#E7DFD5] rounded-xl text-xs focus:outline-none focus:border-[#B3542E]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-[#8C827A]">Ana Manşet Başlık</label>
                  <input
                    type="text"
                    value={draft.heroTitle}
                    onChange={(e) => setDraft(prev => ({ ...prev, heroTitle: e.target.value }))}
                    className="w-full px-3 py-2 border border-[#E7DFD5] rounded-xl text-xs focus:outline-none focus:border-[#B3542E]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-[#8C827A]">Alt Açıklama Metni</label>
                  <textarea
                    rows={2}
                    value={draft.heroSubtitle}
                    onChange={(e) => setDraft(prev => ({ ...prev, heroSubtitle: e.target.value }))}
                    className="w-full px-3 py-2 border border-[#E7DFD5] rounded-xl text-xs focus:outline-none focus:border-[#B3542E]"
                  />
                </div>
              </div>

              {/* Section 2: Reorderable Sections with Up/Down Steppers */}
              <div className="space-y-3 pt-3 border-t border-[#F0EAE1]">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#211D1A] flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-[#B3542E]" />
                    <span>Sayfa Bölüm Sıralaması</span>
                  </span>
                  <span className="text-[10px] text-[#8C827A]">⬆ ⬇ butonlarıyla taşı</span>
                </div>

                <div className="space-y-2.5">
                  {(draft.sectionsList || []).map((sec, idx) => (
                    <div 
                      key={sec.id}
                      className={`p-3.5 rounded-xl border transition-all ${
                        sec.enabled ? 'bg-[#FAF7F2] border-[#E0D7CC]' : 'bg-[#FAF7F2]/40 border-[#EFE7DC] opacity-70'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        
                        {/* Stepper buttons & Titles */}
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          <div className="flex flex-col gap-0.5">
                            <button
                              type="button"
                              disabled={idx === 0}
                              onClick={() => moveSection(idx, 'up')}
                              className="p-1 rounded hover:bg-white disabled:opacity-20 text-[#6E655F] hover:text-[#211D1A] cursor-pointer"
                              title="Yukarı Taşı"
                            >
                              <ChevronUp className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              disabled={idx === (draft.sectionsList?.length || 0) - 1}
                              onClick={() => moveSection(idx, 'down')}
                              className="p-1 rounded hover:bg-white disabled:opacity-20 text-[#6E655F] hover:text-[#211D1A] cursor-pointer"
                              title="Aşağı Taşı"
                            >
                              <ChevronDown className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <div className="flex-1 min-w-0 pr-2">
                            <input
                              type="text"
                              value={sec.title}
                              onChange={(e) => updateSectionTitle(sec.id, e.target.value)}
                              className="text-xs font-semibold text-[#211D1A] bg-transparent border-b border-transparent hover:border-[#D5C9BC] focus:border-[#B3542E] focus:outline-none w-full"
                              title="Bölüm başlığını düzenle"
                            />
                            <span className="text-[10px] text-[#8C827A] block truncate">{sec.subtitle}</span>
                          </div>
                        </div>

                        {/* Toggle Switch */}
                        <button
                          type="button"
                          onClick={() => toggleSection(sec.id)}
                          className="cursor-pointer shrink-0"
                          title={sec.enabled ? "Bölümü Kapat" : "Bölümü Aç"}
                        >
                          <div className={`w-11 h-6 rounded-full border-2 transition-all relative flex items-center px-0.5 ${
                            sec.enabled 
                              ? 'border-[#B3542E] bg-[#FAF0E6]' 
                              : 'border-[#A69B91] bg-[#FAF7F2]'
                          }`}>
                            <div className={`w-4 h-4 rounded-full transition-transform ${
                              sec.enabled 
                                ? 'translate-x-5 bg-[#B3542E]' 
                                : 'translate-x-0 bg-[#A69B91]'
                            }`} />
                          </div>
                        </button>

                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 3: Notice & Working Hours */}
              <div className="space-y-3 pt-3 border-t border-[#F0EAE1]">
                <span className="text-xs font-semibold text-[#211D1A] flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#B3542E]" />
                  <span>Mekan Detayları & Duyurular</span>
                </span>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-[#8C827A]">Çalışma & Seans Saatleri</label>
                  <input
                    type="text"
                    value={draft.workingHours}
                    onChange={(e) => setDraft(prev => ({ ...prev, workingHours: e.target.value }))}
                    className="w-full px-3 py-2 border border-[#E7DFD5] rounded-xl text-xs focus:outline-none focus:border-[#B3542E]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-[#8C827A]">Semt & Şube Konumu</label>
                  <input
                    type="text"
                    value={draft.district}
                    onChange={(e) => setDraft(prev => ({ ...prev, district: e.target.value }))}
                    className="w-full px-3 py-2 border border-[#E7DFD5] rounded-xl text-xs focus:outline-none focus:border-[#B3542E]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-[#8C827A]">Duyuru / Bilgilendirme Notu</label>
                  <textarea
                    rows={2}
                    value={noticeDraft}
                    onChange={(e) => setNoticeDraft(e.target.value)}
                    className="w-full px-3 py-2 border border-[#E7DFD5] rounded-xl text-xs focus:outline-none focus:border-[#B3542E]"
                  />
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: GÖRSELLER & BUTONLAR */}
          {editorTab === 'media' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="border-b border-[#F0EAE1] pb-3">
                <h3 className="font-serif font-bold text-base text-[#211D1A]">
                  Görseller & Buton Düzenleyici
                </h3>
                <p className="text-xs text-[#6E655F]">
                  Hero afiş görselini, buton metinlerini ve aksiyonlarını buradan kontrol edin.
                </p>
              </div>

              {/* 1. Hero Image Controls */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#211D1A] flex items-center gap-1.5">
                    <ImageIcon className="w-3.5 h-3.5 text-[#B3542E]" />
                    <span>1. Karşılama (Hero) Afiş Görseli</span>
                  </span>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <span className="text-xs font-medium text-[#6E655F]">
                      {draft.showHeroImage !== false ? 'Açık' : 'Kapalı'}
                    </span>
                    <input
                      type="checkbox"
                      checked={draft.showHeroImage !== false}
                      onChange={(e) => setDraft(prev => ({ ...prev, showHeroImage: e.target.checked }))}
                      className="sr-only"
                    />
                    <div className={`w-9 h-5 rounded-full border transition-colors relative flex items-center px-0.5 ${
                      draft.showHeroImage !== false ? 'bg-[#B3542E] border-[#B3542E]' : 'bg-[#E7DFD5] border-[#D5C9BC]'
                    }`}>
                      <div className={`w-3.5 h-3.5 rounded-full bg-white transition-transform ${
                        draft.showHeroImage !== false ? 'translate-x-4' : 'translate-x-0'
                      }`} />
                    </div>
                  </label>
                </div>

                {draft.showHeroImage !== false && (
                  <div className="space-y-3 bg-[#FAF7F2] p-3.5 rounded-2xl border border-[#E7DFD5]">
                    <div className="space-y-1">
                      <label className="text-[11px] font-medium text-[#8C827A]">Görsel Bağlantısı (URL)</label>
                      <input
                        type="url"
                        value={draft.heroImageUrl || ''}
                        onChange={(e) => setDraft(prev => ({ ...prev, heroImageUrl: e.target.value }))}
                        placeholder="https://..."
                        className="w-full px-3 py-1.5 bg-white border border-[#E7DFD5] rounded-xl text-xs focus:outline-none focus:border-[#B3542E]"
                      />
                    </div>

                    {/* Quick photo presets */}
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-semibold text-[#8C827A] block">
                        Önceden Seçilmiş Fotoğraf Galerisi:
                      </span>
                      <div className="grid grid-cols-2 gap-2">
                        {PHOTO_PRESETS.map((photo) => {
                          const isSelected = draft.heroImageUrl === photo.url;
                          return (
                            <button
                              key={photo.title}
                              type="button"
                              onClick={() => setDraft(prev => ({ ...prev, heroImageUrl: photo.url }))}
                              className={`p-1.5 rounded-xl border text-left flex items-center gap-2 transition-all cursor-pointer ${
                                isSelected 
                                  ? 'bg-[#FAF0E6] border-[#B3542E] shadow-2xs' 
                                  : 'bg-white border-[#E7DFD5] hover:border-[#D5C9BC]'
                              }`}
                            >
                              <img
                                src={photo.url}
                                alt={photo.title}
                                className="w-10 h-10 rounded-lg object-cover shrink-0"
                              />
                              <div className="min-w-0 flex-1">
                                <span className="text-[11px] font-bold text-[#211D1A] block truncate">{photo.title}</span>
                                <span className="text-[9px] text-[#8C827A] block truncate">{photo.tag}</span>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* 2. All Button Texts & Actions */}
              <div className="space-y-3.5 pt-3 border-t border-[#F0EAE1]">
                <span className="text-xs font-semibold text-[#211D1A] flex items-center gap-1.5">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-[#B3542E]" />
                  <span>2. Ana Sayfa Buton Metinleri</span>
                </span>

                {/* Primary CTA */}
                <div className="space-y-1">
                  <label className="text-xs font-medium text-[#8C827A]">Ana Sipariş Buton Yazısı</label>
                  <input
                    type="text"
                    value={draft.ctaButtonText}
                    onChange={(e) => setDraft(prev => ({ ...prev, ctaButtonText: e.target.value }))}
                    className="w-full px-3 py-2 border border-[#E7DFD5] rounded-xl text-xs focus:outline-none focus:border-[#B3542E]"
                  />
                  <span className="text-[10px] text-[#8C827A]">Hero bölümündeki büyük ana sipariş butonu.</span>
                </div>

                {/* Secondary Button Toggle + Text */}
                <div className="space-y-2 p-3 bg-[#FAF7F2] rounded-xl border border-[#E7DFD5]">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-[#211D1A]">İkincil Hero Butonu</label>
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <span className="text-[11px] text-[#6E655F]">
                        {draft.showSecondaryButton !== false ? 'Aktif' : 'Gizli'}
                      </span>
                      <input
                        type="checkbox"
                        checked={draft.showSecondaryButton !== false}
                        onChange={(e) => setDraft(prev => ({ ...prev, showSecondaryButton: e.target.checked }))}
                        className="sr-only"
                      />
                      <div className={`w-8 h-4.5 rounded-full border transition-colors relative flex items-center px-0.5 ${
                        draft.showSecondaryButton !== false ? 'bg-[#B3542E] border-[#B3542E]' : 'bg-[#E7DFD5] border-[#D5C9BC]'
                      }`}>
                        <div className={`w-3.5 h-3.5 rounded-full bg-white transition-transform ${
                          draft.showSecondaryButton !== false ? 'translate-x-3.5' : 'translate-x-0'
                        }`} />
                      </div>
                    </label>
                  </div>

                  {draft.showSecondaryButton !== false && (
                    <input
                      type="text"
                      value={draft.secondaryButtonText || '3 Adımda Rehber'}
                      onChange={(e) => setDraft(prev => ({ ...prev, secondaryButtonText: e.target.value }))}
                      placeholder="Örn: 3 Adımda Rehber"
                      className="w-full px-3 py-1.5 bg-white border border-[#E7DFD5] rounded-xl text-xs focus:outline-none focus:border-[#B3542E]"
                    />
                  )}
                </div>

                {/* All Menu Button */}
                <div className="space-y-1">
                  <label className="text-xs font-medium text-[#8C827A]">Vitrin "Tüm Menüyü İncele" Butonu</label>
                  <input
                    type="text"
                    value={draft.allMenuButtonText || 'Tüm Menüyü İncele'}
                    onChange={(e) => setDraft(prev => ({ ...prev, allMenuButtonText: e.target.value }))}
                    className="w-full px-3 py-2 border border-[#E7DFD5] rounded-xl text-xs focus:outline-none focus:border-[#B3542E]"
                  />
                </div>

                {/* Item Card Button */}
                <div className="space-y-1">
                  <label className="text-xs font-medium text-[#8C827A]">Ürün Kartı "Sipariş Ver" Butonu</label>
                  <input
                    type="text"
                    value={draft.itemCardButtonText || 'Sipariş Ver →'}
                    onChange={(e) => setDraft(prev => ({ ...prev, itemCardButtonText: e.target.value }))}
                    className="w-full px-3 py-2 border border-[#E7DFD5] rounded-xl text-xs focus:outline-none focus:border-[#B3542E]"
                  />
                </div>

                {/* Location Button */}
                <div className="space-y-1">
                  <label className="text-xs font-medium text-[#8C827A]">Konum & Harita Buton Metni</label>
                  <input
                    type="text"
                    value={draft.locationButtonText || 'Haritada Göster'}
                    onChange={(e) => setDraft(prev => ({ ...prev, locationButtonText: e.target.value }))}
                    className="w-full px-3 py-2 border border-[#E7DFD5] rounded-xl text-xs focus:outline-none focus:border-[#B3542E]"
                  />
                </div>

                {/* Google Maps Link */}
                <div className="space-y-1">
                  <label className="text-xs font-medium text-[#8C827A]">Google Maps Konum Bağlantısı (URL)</label>
                  <input
                    type="url"
                    value={draft.googleMapsUrl || ''}
                    onChange={(e) => setDraft(prev => ({ ...prev, googleMapsUrl: e.target.value }))}
                    placeholder="https://maps.google.com/?q=..."
                    className="w-full px-3 py-2 border border-[#E7DFD5] rounded-xl text-xs focus:outline-none focus:border-[#B3542E]"
                  />
                  <span className="text-[10px] text-[#8C827A]">Boş bırakılırsa kafe adı ve semte göre Google Maps otomatik aranır.</span>
                </div>

                {/* Full Address */}
                <div className="space-y-1">
                  <label className="text-xs font-medium text-[#8C827A]">Mekanın Açık Adresi</label>
                  <input
                    type="text"
                    value={draft.fullAddress || ''}
                    onChange={(e) => setDraft(prev => ({ ...prev, fullAddress: e.target.value }))}
                    placeholder="Örn: Caferağa Mah. Moda Cad. No: 42/A, Kadıköy"
                    className="w-full px-3 py-2 border border-[#E7DFD5] rounded-xl text-xs focus:outline-none focus:border-[#B3542E]"
                  />
                </div>
              </div>

              {/* 3. Event Card Text */}
              <div className="space-y-2 pt-3 border-t border-[#F0EAE1]">
                <span className="text-xs font-semibold text-[#211D1A] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#B3542E]" />
                  <span>3. Özel Grup Seansları Metni</span>
                </span>
                <textarea
                  rows={2}
                  value={draft.privateEventText || ''}
                  onChange={(e) => setDraft(prev => ({ ...prev, privateEventText: e.target.value }))}
                  placeholder="Doğum günü veya toplu atölye duyurusu..."
                  className="w-full px-3 py-2 border border-[#E7DFD5] rounded-xl text-xs focus:outline-none focus:border-[#B3542E]"
                />
              </div>

            </div>
          )}

          {/* TAB 3: RENKLER & TİPOGRAFİ */}
          {editorTab === 'theme' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="border-b border-[#F0EAE1] pb-3">
                <h3 className="font-serif font-bold text-base text-[#211D1A]">
                  Tema, Renk & Tipografi Düzenleyici
                </h3>
                <p className="text-xs text-[#6E655F]">
                  5 farklı renk rolü ve zengin yazı tipi kütüphanesiyle mekan kimliğinizi oluşturun.
                </p>
              </div>

              {/* Step 1: 3 Pre-designed Templates */}
              <div className="space-y-3">
                <span className="text-xs font-semibold text-[#211D1A] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#B3542E]" />
                  <span>1. Hazır Tasarım Şablonları</span>
                </span>

                <div className="space-y-2.5">
                  {THEME_PRESETS.map((p) => {
                    const isSelected = themeDraft.preset === p.preset;
                    return (
                      <div
                        key={p.preset}
                        onClick={() => handleSelectPreset(p)}
                        className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                          isSelected 
                            ? 'bg-[#FAF0E6] border-[#B3542E] shadow-xs' 
                            : 'bg-white border-[#E7DFD5] hover:border-[#D5C9BC]'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="font-serif font-bold text-xs text-[#211D1A]">
                                {p.name}
                              </span>
                              <span className="text-[10px] font-medium text-[#8C827A] bg-white px-2 py-0.5 rounded-full border border-[#E7DFD5]">
                                {p.tagline}
                              </span>
                            </div>
                            <p className="text-[11px] text-[#6E655F] leading-relaxed">
                              {p.desc}
                            </p>
                          </div>

                          <div className="flex items-center gap-1.5 shrink-0 mt-0.5">
                            <span 
                              className="w-5 h-5 rounded-full border border-black/10 shadow-xs" 
                              style={{ backgroundColor: p.primaryColor }}
                              title={`Vurgu: ${p.primaryColor}`}
                            />
                            <span 
                              className="w-5 h-5 rounded-full border border-black/10 shadow-xs" 
                              style={{ backgroundColor: p.backgroundColor }}
                              title={`Zemin: ${p.backgroundColor}`}
                            />
                            {isSelected && (
                              <CheckCircle2 className="w-4 h-4 text-[#B3542E] ml-1" />
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: 5-Color Palette Overrides */}
              <div className="space-y-3.5 pt-3 border-t border-[#F0EAE1]">
                <span className="text-xs font-semibold text-[#211D1A] flex items-center gap-1.5">
                  <Paintbrush className="w-3.5 h-3.5 text-[#B3542E]" />
                  <span>2. 5'li Gelişmiş Renk Paleti</span>
                </span>

                {/* 1. Primary Color */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <label className="font-medium text-[#211D1A]">1. Ana Vurgu Rengi (Buton & Rozet)</label>
                    <span className="font-mono text-[10px] text-[#8C827A]">{themeDraft.primaryColor}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {[
                      { hex: '#B3542E', label: 'Terracotta' },
                      { hex: '#3D5A40', label: 'Sage Zeytin' },
                      { hex: '#C67D38', label: 'Kehribar' },
                      { hex: '#2C5282', label: 'Gece Mavisi' },
                      { hex: '#8C3B58', label: 'Bordo Çini' },
                      { hex: '#211D1A', label: 'Siyah Taş' },
                    ].map((col) => (
                      <button
                        key={col.hex}
                        type="button"
                        onClick={() => setThemeDraft(prev => ({ ...prev, primaryColor: col.hex }))}
                        className={`w-6 h-6 rounded-full border-2 transition-transform cursor-pointer ${
                          themeDraft.primaryColor.toLowerCase() === col.hex.toLowerCase() 
                            ? 'scale-115 border-[#211D1A]' 
                            : 'border-white hover:scale-105'
                        }`}
                        style={{ backgroundColor: col.hex }}
                        title={col.label}
                      />
                    ))}
                    <input
                      type="color"
                      value={themeDraft.primaryColor}
                      onChange={(e) => setThemeDraft(prev => ({ ...prev, primaryColor: e.target.value }))}
                      className="w-6 h-6 rounded-full border border-[#E7DFD5] cursor-pointer p-0 bg-transparent"
                      title="Özel Ana Renk"
                    />
                  </div>
                </div>

                {/* 2. Secondary Color */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <label className="font-medium text-[#211D1A]">2. İkincil Renk (Çizgi & Vurgular)</label>
                    <span className="font-mono text-[10px] text-[#8C827A]">{themeDraft.secondaryColor || '#C97A4E'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {[
                      { hex: '#C97A4E', label: 'Kiremit Açık' },
                      { hex: '#5B7A5F', label: 'Adaçayı Açık' },
                      { hex: '#E29A52', label: 'Açık Kehribar' },
                      { hex: '#4A7BB0', label: 'Mavi Açık' },
                      { hex: '#6E655F', label: 'Nötr Gri' },
                    ].map((col) => (
                      <button
                        key={col.hex}
                        type="button"
                        onClick={() => setThemeDraft(prev => ({ ...prev, secondaryColor: col.hex }))}
                        className={`w-6 h-6 rounded-full border-2 transition-transform cursor-pointer ${
                          (themeDraft.secondaryColor || '').toLowerCase() === col.hex.toLowerCase() 
                            ? 'scale-115 border-[#211D1A]' 
                            : 'border-white hover:scale-105'
                        }`}
                        style={{ backgroundColor: col.hex }}
                        title={col.label}
                      />
                    ))}
                    <input
                      type="color"
                      value={themeDraft.secondaryColor || '#C97A4E'}
                      onChange={(e) => setThemeDraft(prev => ({ ...prev, secondaryColor: e.target.value }))}
                      className="w-6 h-6 rounded-full border border-[#E7DFD5] cursor-pointer p-0 bg-transparent"
                      title="Özel İkincil Renk"
                    />
                  </div>
                </div>

                {/* 3. Card/Surface Color */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <label className="font-medium text-[#211D1A]">3. Kart & Kutu Zemini</label>
                    <span className="font-mono text-[10px] text-[#8C827A]">{themeDraft.cardColor || '#FFFFFF'}</span>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { hex: '#FFFFFF', label: 'Saf Beyaz' },
                      { hex: '#FDFBF7', label: 'Krem Kart' },
                      { hex: '#F5F2EB', label: 'Sıcak Bej' },
                      { hex: '#221E1C', label: 'Gece Kutusu' }
                    ].map((card) => (
                      <button
                        key={card.hex}
                        type="button"
                        onClick={() => setThemeDraft(prev => ({ ...prev, cardColor: card.hex }))}
                        className={`p-1.5 rounded-lg border text-[10px] font-medium transition-all cursor-pointer text-center ${
                          (themeDraft.cardColor || '#FFFFFF').toLowerCase() === card.hex.toLowerCase()
                            ? 'border-[#B3542E] font-bold text-[#B3542E] shadow-2xs'
                            : 'border-[#E7DFD5] text-[#6E655F]'
                        }`}
                        style={{ backgroundColor: card.hex }}
                      >
                        {card.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 4. Text & Heading Color */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <label className="font-medium text-[#211D1A]">4. Başlık & Metin Rengi</label>
                    <span className="font-mono text-[10px] text-[#8C827A]">{themeDraft.textColor || '#211D1A'}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { hex: '#211D1A', label: 'Koyu Espresso' },
                      { hex: '#1E2620', label: 'Koyu Zeytin' },
                      { hex: '#F5EFEB', label: 'Açık Fildişi' }
                    ].map((txt) => (
                      <button
                        key={txt.hex}
                        type="button"
                        onClick={() => setThemeDraft(prev => ({ ...prev, textColor: txt.hex }))}
                        className={`p-1.5 rounded-lg border text-[10px] font-medium transition-all cursor-pointer text-center ${
                          (themeDraft.textColor || '#211D1A').toLowerCase() === txt.hex.toLowerCase()
                            ? 'border-[#B3542E] font-bold text-[#B3542E] shadow-2xs'
                            : 'border-[#E7DFD5] text-[#6E655F]'
                        }`}
                      >
                        {txt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 5. Background Color */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <label className="font-medium text-[#211D1A]">5. Sayfa Arka Planı (Ana Zemin)</label>
                    <span className="font-mono text-[10px] text-[#8C827A]">{themeDraft.backgroundColor}</span>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { hex: '#FAF7F2', label: 'Doğal Bej' },
                      { hex: '#F5F7F4', label: 'Ferah Taş' },
                      { hex: '#181513', label: 'Gece Espresso' },
                      { hex: '#FFFFFF', label: 'Beyaz' }
                    ].map((bg) => (
                      <button
                        key={bg.hex}
                        type="button"
                        onClick={() => setThemeDraft(prev => ({ ...prev, backgroundColor: bg.hex }))}
                        className={`p-1.5 rounded-lg border text-[10px] font-medium transition-all cursor-pointer text-center ${
                          themeDraft.backgroundColor.toLowerCase() === bg.hex.toLowerCase()
                            ? 'border-[#B3542E] bg-white font-bold text-[#B3542E] shadow-2xs'
                            : 'border-[#E7DFD5] bg-[#FAF7F2] text-[#6E655F]'
                        }`}
                      >
                        {bg.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Step 3: Rich Typography Choices */}
              <div className="space-y-3.5 pt-3 border-t border-[#F0EAE1]">
                <span className="text-xs font-semibold text-[#211D1A] flex items-center gap-1.5">
                  <Type className="w-3.5 h-3.5 text-[#B3542E]" />
                  <span>3. Zengin Tipografi & Yazı Tipleri</span>
                </span>

                {/* Heading Fonts */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-[#211D1A]">Başlık Yazı Tipi (Headings)</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {[
                      {
                        id: 'serif_cormorant' as HeadingFontChoice,
                        name: 'Cormorant Garamond',
                        tag: 'Klasik Zanaat Serif',
                        sample: 'Sanatını Seç',
                        fontClass: 'font-heading-cormorant'
                      },
                      {
                        id: 'serif_playfair' as HeadingFontChoice,
                        name: 'Playfair Display',
                        tag: 'Editoryal Zarafet',
                        sample: 'Atölye Kahvesi',
                        fontClass: 'font-heading-playfair'
                      },
                      {
                        id: 'sans_jakarta' as HeadingFontChoice,
                        name: 'Plus Jakarta Sans',
                        tag: 'Modern Geometrik',
                        sample: 'Modern Menü',
                        fontClass: 'font-heading-jakarta'
                      },
                      {
                        id: 'serif_lora' as HeadingFontChoice,
                        name: 'Lora Serif',
                        tag: 'Sıcak & Edebi',
                        sample: 'Zanaat & Sanat',
                        fontClass: 'font-heading-lora'
                      },
                      {
                        id: 'sans_inter' as HeadingFontChoice,
                        name: 'Inter Pro',
                        tag: 'Kurumsal & Yalın',
                        sample: 'Nitelikli Menü',
                        fontClass: 'font-heading-inter'
                      }
                    ].map((f) => {
                      const isSelected = (themeDraft.headingFont || 'serif_cormorant') === f.id;
                      return (
                        <button
                          key={f.id}
                          type="button"
                          onClick={() => setThemeDraft(prev => ({ 
                            ...prev, 
                            headingFont: f.id,
                            fontFamily: f.id.startsWith('serif') ? 'serif_classic' : 'sans_modern'
                          }))}
                          className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                            isSelected 
                              ? 'bg-[#FAF0E6] border-[#B3542E] shadow-2xs' 
                              : 'bg-white border-[#E7DFD5] hover:border-[#D5C9BC]'
                          }`}
                        >
                          <div className={`${f.fontClass} text-sm font-bold text-[#211D1A]`}>
                            {f.sample}
                          </div>
                          <div className="text-[10px] font-semibold text-[#8C827A] mt-0.5">{f.name}</div>
                          <div className="text-[9px] text-[#A69B91]">{f.tag}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Body Fonts */}
                <div className="space-y-2 pt-2">
                  <label className="text-xs font-semibold text-[#211D1A]">Gövde / Paragraf Yazı Tipi</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'sans_inter' as BodyFontChoice, name: 'Inter', tag: 'Okunaklı & Nötr' },
                      { id: 'sans_jakarta' as BodyFontChoice, name: 'Jakarta Sans', tag: 'Modern Yuvarlak' },
                      { id: 'serif_lora' as BodyFontChoice, name: 'Lora', tag: 'Edebi Serif' }
                    ].map((bf) => {
                      const isSelected = (themeDraft.bodyFont || 'sans_inter') === bf.id;
                      return (
                        <button
                          key={bf.id}
                          type="button"
                          onClick={() => setThemeDraft(prev => ({ ...prev, bodyFont: bf.id }))}
                          className={`p-2 rounded-xl border text-center transition-all cursor-pointer ${
                            isSelected 
                              ? 'bg-[#FAF0E6] border-[#B3542E] shadow-2xs font-bold text-[#B3542E]' 
                              : 'bg-white border-[#E7DFD5] text-[#6E655F]'
                          }`}
                        >
                          <div className="text-xs font-bold">{bf.name}</div>
                          <div className="text-[9px] text-[#8C827A]">{bf.tag}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Step 4: Theme Target Scope */}
              <div className="space-y-3 pt-3 border-t border-[#F0EAE1]">
                <span className="text-xs font-semibold text-[#211D1A] flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-[#B3542E]" />
                  <span>4. Tema Uygulama Kapsamı</span>
                </span>

                <div className="space-y-2">
                  {[
                    {
                      id: 'all' as ThemeTargetScope,
                      title: 'Tüm Mağaza & Yönetim Paneli',
                      desc: 'Seçtiğiniz renk ve fontlar hem müşteri vitrininde hem de yönetici/kasiyer arayüzünde uygulanır.'
                    },
                    {
                      id: 'storefront_only' as ThemeTargetScope,
                      title: 'Sadece Müşteri Vitrini',
                      desc: 'Müşteriler özel temayı görür; yönetici ve personel paneli standart nötr kalır.'
                    },
                    {
                      id: 'admin_only' as ThemeTargetScope,
                      title: 'Sadece Yönetici Paneli',
                      desc: 'Mağaza vitrini klasik zanaat temasında kalır; yönetim paneli bu şablonla özelleşir.'
                    }
                  ].map((sc) => {
                    const isSelected = themeDraft.scope === sc.id;
                    return (
                      <div
                        key={sc.id}
                        onClick={() => setThemeDraft(prev => ({ ...prev, scope: sc.id }))}
                        className={`p-3 rounded-xl border transition-all cursor-pointer ${
                          isSelected 
                            ? 'bg-[#FAF0E6] border-[#B3542E]' 
                            : 'bg-white border-[#E7DFD5] hover:border-[#D5C9BC]'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-[#211D1A]">{sc.title}</span>
                          <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                            isSelected ? 'border-[#B3542E] bg-[#B3542E]' : 'border-[#A69B91]'
                          }`}>
                            {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                          </div>
                        </div>
                        <p className="text-[10px] text-[#6E655F] mt-1">{sc.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          )}

        </div>

        {/* RIGHT: Live Interactive Preview Frame */}
        <div className="flex-1 bg-[#EBE4DA] p-4 sm:p-8 flex items-center justify-center overflow-auto">
          
          {/* Outer Phone/Desktop Frame - OVERFLOW-HIDDEN to strictly prevent scrollbar collision */}
          <div 
            className={`border shadow-2xl transition-all duration-300 flex flex-col overflow-hidden relative ${
              previewDevice === 'desktop'
                ? 'w-full max-w-4xl h-[780px] rounded-3xl'
                : 'w-[375px] h-[667px] rounded-[42px] border-[5px] border-[#211D1A]'
            }`}
            style={{ 
              backgroundColor: themeDraft.backgroundColor,
              borderColor: isDarkTheme ? '#38322D' : '#D5C9BC',
              color: themeDraft.textColor || '#211D1A'
            }}
          >
            {/* Pinned Browser Address Bar (Fixed at top, cleanly rendered with no mobile collision) */}
            <div className={`border-b px-4 py-2.5 flex items-center justify-between text-xs shrink-0 z-20 ${
              isDarkTheme ? 'bg-[#221E1C] border-[#38322D] text-[#A69B91]' : 'bg-white border-[#E7DFD5] text-[#8C827A]'
            }`}>
              {/* Left Dots + URL Pill */}
              <div className="flex items-center gap-2 min-w-0">
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                </div>
                
                <span className={`text-[11px] px-3 py-0.5 rounded-lg border ml-1 truncate ${
                  isDarkTheme 
                    ? 'bg-[#181513] border-[#38322D] text-[#D5C9BC]' 
                    : 'bg-[#FAF7F2] border-[#E7DFD5] text-[#6E655F]'
                }`}>
                  {previewDevice === 'mobile' ? 'atelierbrew.com' : 'atelierbrew.com • Canlı Önizleme'}
                </span>
              </div>

              {/* Scope & Template pill (Desktop only, hidden on mobile to avoid all overlaps!) */}
              {previewDevice === 'desktop' && (
                <div className="text-[10px] font-medium opacity-75 shrink-0 ml-2">
                  {themeDraft.preset === 'terracotta' && 'Toprak & Zanaat'}
                  {themeDraft.preset === 'sage_olive' && 'İskandinav & Adaçayı'}
                  {themeDraft.preset === 'midnight_espresso' && 'Gece Atölyesi'}
                  {' • '}
                  {themeDraft.headingFont ? themeDraft.headingFont.split('_')[1] : 'Serif'}
                </div>
              )}
            </div>

            {/* Inner Scrollable Storefront Content */}
            <div className="p-5 sm:p-8 space-y-10 flex-1 overflow-y-auto custom-scrollbar">
              
              {/* Simulated Hero */}
              <div className="text-center space-y-3.5 max-w-xl mx-auto">
                {draft.heroBadge && (
                  <div 
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold border"
                    style={{ 
                      borderColor: `${themeDraft.primaryColor}55`,
                      color: themeDraft.primaryColor,
                      backgroundColor: isDarkTheme ? '#221E1C' : '#EFE7DC'
                    }}
                  >
                    <Sparkles className="w-3 h-3" />
                    <span>{draft.heroBadge}</span>
                  </div>
                )}

                <h1 className={`${getHeadingFontClass()} text-2xl sm:text-4xl font-bold tracking-tight leading-tight`}
                    style={{ color: themeDraft.textColor || '#211D1A' }}>
                  {draft.heroTitle}
                </h1>

                <p className="text-xs sm:text-sm opacity-80 leading-relaxed"
                   style={{ color: themeDraft.textColor || '#211D1A' }}>
                  {draft.heroSubtitle}
                </p>

                {/* Hero Action Buttons in Preview */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2.5">
                  <div 
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-white text-xs font-semibold rounded-xl shadow-xs transition-transform"
                    style={{ backgroundColor: themeDraft.primaryColor }}
                  >
                    <span>{draft.ctaButtonText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>

                  {draft.showSecondaryButton !== false && (
                    <div 
                      className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-semibold rounded-xl border"
                      style={{ 
                        borderColor: `${themeDraft.primaryColor}40`,
                        color: themeDraft.textColor || '#211D1A',
                        backgroundColor: themeDraft.cardColor || '#FFFFFF'
                      }}
                    >
                      <Compass className="w-3.5 h-3.5" style={{ color: themeDraft.secondaryColor || '#C97A4E' }} />
                      <span>{draft.secondaryButtonText || '3 Adımda Rehber'}</span>
                    </div>
                  )}
                </div>

                {/* Hero Visual Banner in Preview */}
                {draft.showHeroImage !== false && draft.heroImageUrl && (
                  <div className="pt-3">
                    <div className="relative aspect-[16/8] w-full rounded-2xl overflow-hidden border shadow-sm"
                         style={{ borderColor: isDarkTheme ? '#38322D' : '#E7DFD5' }}>
                      <img
                        src={draft.heroImageUrl}
                        alt="Hero Preview"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                      <span className="absolute bottom-2 left-3 text-[10px] text-white/90 font-medium">
                        Canlı Önizleme Afişi
                      </span>
                    </div>
                  </div>
                )}

                {/* Notice in Preview */}
                {noticeDraft && (
                  <div 
                    className="text-[11px] px-3 py-1.5 rounded-xl font-medium max-w-md mx-auto border"
                    style={{
                      borderColor: `${themeDraft.primaryColor}40`,
                      color: themeDraft.primaryColor,
                      backgroundColor: isDarkTheme ? '#221E1C' : '#FAF0E6'
                    }}
                  >
                    {noticeDraft}
                  </div>
                )}
              </div>

              {/* Render dynamic ordered sections in preview */}
              {(draft.sectionsList || []).map((sec) => {
                if (!sec.enabled) return null;

                if (sec.id === 'steps') {
                  return (
                    <div key={sec.id} className="space-y-3">
                      <div className="text-center sm:text-left">
                        <span className={`${getHeadingFontClass()} font-bold text-sm`}
                              style={{ color: themeDraft.textColor || '#211D1A' }}>
                          {sec.title}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                        {[
                          { num: '01', title: 'Model Seçimi', desc: 'Heykel veya seramik belirleyin.' },
                          { num: '02', title: 'Set Masada', desc: 'Boya ve fırçalar masanıza gelsin.' },
                          { num: '03', title: 'Keyifle Boya', desc: 'Kahvenizle boyayıp teslim alın.' },
                        ].map(st => (
                          <div 
                            key={st.num} 
                            className="border rounded-xl p-3 space-y-1 text-xs"
                            style={{ 
                              backgroundColor: themeDraft.cardColor || '#FFFFFF',
                              borderColor: isDarkTheme ? '#38322D' : '#E7DFD5'
                            }}
                          >
                            <span className={`${getHeadingFontClass()} font-bold text-xs`} style={{ color: themeDraft.primaryColor }}>
                              {st.num}
                            </span>
                            <div className="font-bold" style={{ color: themeDraft.textColor || '#211D1A' }}>{st.title}</div>
                            <p className="text-[11px] opacity-75">{st.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                }

                if (sec.id === 'featured') {
                  return (
                    <div 
                      key={sec.id} 
                      className="border rounded-2xl p-4 space-y-2 text-xs"
                      style={{ 
                        backgroundColor: themeDraft.cardColor || '#FFFFFF',
                        borderColor: isDarkTheme ? '#38322D' : '#E7DFD5'
                      }}
                    >
                      <div className="flex justify-between items-center">
                        <span className={`${getHeadingFontClass()} font-bold text-sm`}
                              style={{ color: themeDraft.textColor || '#211D1A' }}>
                          {sec.title}
                        </span>
                        <span className="text-[11px] font-semibold" style={{ color: themeDraft.primaryColor }}>
                          {draft.allMenuButtonText || 'Tümünü Gör →'}
                        </span>
                      </div>
                      <p className="text-[11px] opacity-75">{sec.subtitle}</p>
                      <div className="grid grid-cols-3 gap-2 pt-1">
                        {[
                          { name: 'David Büstü', price: '340 ₺' },
                          { name: 'Balon Köpek', price: '310 ₺' },
                          { name: 'Venüs Büstü', price: '360 ₺' }
                        ].map(m => (
                          <div 
                            key={m.name} 
                            className="p-2 rounded-xl text-center border"
                            style={{ 
                              backgroundColor: isDarkTheme ? '#181513' : '#FAF7F2',
                              borderColor: isDarkTheme ? '#38322D' : '#E8D4C4'
                            }}
                          >
                            <div className="font-bold text-[11px]" style={{ color: themeDraft.textColor || '#211D1A' }}>{m.name}</div>
                            <span className="text-[10px] font-semibold block mt-0.5" style={{ color: themeDraft.primaryColor }}>
                              {m.price}
                            </span>
                            <span className="text-[9px] font-medium opacity-80 block mt-1" style={{ color: themeDraft.primaryColor }}>
                              {draft.itemCardButtonText || 'Sipariş Ver'}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                }

                if (sec.id === 'hours_location') {
                  return (
                    <div 
                      key={sec.id} 
                      className="border rounded-xl p-4 flex items-center justify-between text-xs"
                      style={{ 
                        backgroundColor: themeDraft.cardColor || '#FFFFFF',
                        borderColor: isDarkTheme ? '#38322D' : '#E7DFD5'
                      }}
                    >
                      <div>
                        <span className="text-xs font-medium" style={{ color: themeDraft.primaryColor }}>
                          {sec.title}
                        </span>
                        <div className="font-bold mt-0.5" style={{ color: themeDraft.textColor || '#211D1A' }}>
                          {draft.workingHours}
                        </div>
                      </div>
                      <div className="text-right flex items-center gap-2">
                        <div>
                          <span className="text-[10px] opacity-75 font-medium block">Konum</span>
                          <div className="font-bold" style={{ color: themeDraft.textColor || '#211D1A' }}>{draft.district}</div>
                        </div>
                        <span 
                          className="px-2.5 py-1 rounded-lg text-[10px] text-white font-semibold"
                          style={{ backgroundColor: themeDraft.primaryColor }}
                        >
                          {draft.locationButtonText || 'Haritada'}
                        </span>
                      </div>
                    </div>
                  );
                }

                if (sec.id === 'faq') {
                  return (
                    <div 
                      key={sec.id} 
                      className="border rounded-2xl p-4 space-y-2 text-xs"
                      style={{ 
                        backgroundColor: themeDraft.cardColor || '#FFFFFF',
                        borderColor: isDarkTheme ? '#38322D' : '#E7DFD5'
                      }}
                    >
                      <span className={`${getHeadingFontClass()} font-bold text-sm block`}
                            style={{ color: themeDraft.textColor || '#211D1A' }}>
                        {sec.title}
                      </span>
                      <div className="space-y-1.5 pt-1 text-[11px]">
                        <div className={`p-2 rounded-lg ${isDarkTheme ? 'bg-[#181513]' : 'bg-[#FAF7F2]'}`}>
                          <strong className="block" style={{ color: themeDraft.textColor || '#211D1A' }}>Deneyim gerekir mi?</strong>
                          <span className="opacity-75">Hayır, tüm malzemeler eksiksiz verilir.</span>
                        </div>
                        <div className={`p-2 rounded-lg ${isDarkTheme ? 'bg-[#181513]' : 'bg-[#FAF7F2]'}`}>
                          <strong className="block" style={{ color: themeDraft.textColor || '#211D1A' }}>Hemen alabilir miyim?</strong>
                          <span className="opacity-75">15-20 dakikada kurur ve teslim edilir.</span>
                        </div>
                      </div>
                    </div>
                  );
                }

                if (sec.id === 'private_events') {
                  return (
                    <div 
                      key={sec.id} 
                      className="border rounded-2xl p-4 text-xs space-y-1"
                      style={{ 
                        backgroundColor: isDarkTheme ? '#221E1C' : '#FAF0E6',
                        borderColor: isDarkTheme ? '#38322D' : '#E8D4C4'
                      }}
                    >
                      <span className={`${getHeadingFontClass()} font-bold text-sm block`}
                            style={{ color: themeDraft.textColor || '#211D1A' }}>
                        {sec.title}
                      </span>
                      <p className="text-[11px] opacity-80" style={{ color: themeDraft.textColor || '#211D1A' }}>
                        {draft.privateEventText || 'Doğum günü veya arkadaş gruplarınız için toplu atölye rezervasyonu.'}
                      </p>
                    </div>
                  );
                }

                return null;
              })}

            </div>
          </div>
        </div>

      </div>

    </div>
  );
};