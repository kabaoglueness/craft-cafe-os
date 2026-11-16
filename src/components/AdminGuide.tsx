'use client';

import React, { useState } from 'react';
import { 
  CHANGELOG_RELEASES, 
  OPERATIONAL_GUIDES, 
  FAQ_KAFIYE, 
  GuideTopic 
} from '../data/guideData';
import { 
  BookOpen, 
  History, 
  HelpCircle, 
  Search, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  Sparkles, 
  Layers, 
  Lightbulb, 
  ShieldCheck 
} from 'lucide-react';

export const AdminGuide: React.FC = () => {
  const [subTab, setSubTab] = useState<'guides' | 'changelog' | 'faq'>('guides');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedGuideId, setExpandedGuideId] = useState<string | null>('guide-inventory');

  const filteredGuides = OPERATIONAL_GUIDES.filter(g => 
    g.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    g.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
    g.steps.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const filteredFaq = FAQ_KAFIYE.filter(f =>
    f.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#E7DFD5]">
        <div>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#211D1A]">
            Kullanım Rehberi & Sürüm Notları
          </h3>
          <p className="text-xs text-[#6E655F] mt-0.5">
            Kafenin sistemi takılmadan işletmesi için adım adım kılavuzlar ve yeni özelliklerin değişiklik günlüğü.
          </p>
        </div>

        {/* Sub-tabs toggle */}
        <div className="flex items-center gap-1 bg-[#FAF7F2] p-1 border border-[#E7DFD5] rounded-xl text-xs">
          <button
            onClick={() => setSubTab('guides')}
            className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
              subTab === 'guides' ? 'bg-[#211D1A] text-white shadow-xs' : 'text-[#6E655F] hover:text-[#211D1A]'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Nasıl Kullanılır?</span>
          </button>

          <button
            onClick={() => setSubTab('changelog')}
            className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
              subTab === 'changelog' ? 'bg-[#211D1A] text-white shadow-xs' : 'text-[#6E655F] hover:text-[#211D1A]'
            }`}
          >
            <History className="w-3.5 h-3.5" />
            <span>Sürüm Notları ({CHANGELOG_RELEASES.length})</span>
          </button>

          <button
            onClick={() => setSubTab('faq')}
            className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
              subTab === 'faq' ? 'bg-[#211D1A] text-white shadow-xs' : 'text-[#6E655F] hover:text-[#211D1A]'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Kafe SSS</span>
          </button>
        </div>
      </div>

      {/* Search Input for Guides */}
      {subTab !== 'changelog' && (
        <div className="relative max-w-md">
          <Search className="w-4 h-4 text-[#8C827A] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Rehberde veya sorularda ara (örn: stok, POS, kds, yetki)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#E7DFD5] rounded-xl text-xs text-[#211D1A] placeholder-[#9E948C] focus:outline-none focus:border-[#B3542E]"
          />
        </div>
      )}

      {/* SUB-TAB 1: OPERATIONAL GUIDES */}
      {subTab === 'guides' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-3.5">
            {filteredGuides.map((guide) => {
              const isExpanded = expandedGuideId === guide.id;

              return (
                <div 
                  key={guide.id}
                  className="bg-white border border-[#E7DFD5] rounded-2xl overflow-hidden transition-all shadow-xs"
                >
                  <div 
                    onClick={() => setExpandedGuideId(isExpanded ? null : guide.id)}
                    className="p-4 sm:p-5 flex items-center justify-between cursor-pointer hover:bg-[#FAF7F2]/60 transition-colors select-none"
                  >
                    <div className="space-y-0.5 pr-4">
                      <h4 className="font-serif font-bold text-base text-[#211D1A] flex items-center gap-2">
                        <span>{guide.title}</span>
                      </h4>
                      <p className="text-xs text-[#6E655F]">{guide.summary}</p>
                    </div>

                    <div className="w-7 h-7 rounded-lg bg-[#FAF7F2] border border-[#E7DFD5] flex items-center justify-center text-[#6E655F] shrink-0">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="px-5 pb-5 pt-2 border-t border-[#F0EAE1] bg-[#FAF7F2]/30 space-y-3 animate-in fade-in duration-150">
                      <span className="text-xs font-semibold text-[#211D1A] block">
                        Adım Adım Uygulama
                      </span>

                      <ol className="space-y-2 text-xs text-[#211D1A]">
                        {guide.steps.map((step, idx) => (
                          <li key={idx} className="flex items-start gap-2.5">
                            <span className="w-5 h-5 rounded-full bg-[#EFE7DC] text-[#B3542E] text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                              {idx + 1}
                            </span>
                            <span className="leading-relaxed">{step}</span>
                          </li>
                        ))}
                      </ol>

                      {guide.tips && (
                        <div className="mt-3 p-3 bg-[#FAF0E6] border border-[#E8D4C4] rounded-xl text-xs text-[#B3542E] flex items-start gap-2">
                          <Lightbulb className="w-4 h-4 shrink-0 mt-0.5" />
                          <div>
                            <strong className="block font-semibold">İşletme İpucu:</strong>
                            <span className="text-[#6E655F]">{guide.tips}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SUB-TAB 2: CHANGELOG RELEASES */}
      {subTab === 'changelog' && (
        <div className="space-y-6">
          <div className="relative pl-6 border-l-2 border-[#E7DFD5] space-y-8">
            {CHANGELOG_RELEASES.map((rel, idx) => (
              <div key={rel.version} className="relative space-y-3">
                {/* Node dot */}
                <div className={`absolute -left-[31px] top-1 w-4 h-4 rounded-full border-2 border-white ${
                  idx === 0 ? 'bg-[#B3542E] ring-4 ring-[#FAF0E6]' : 'bg-[#A69B91]'
                }`} />

                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-serif font-bold text-lg text-[#211D1A]">{rel.version}</span>
                  <span className="text-xs text-[#8C827A]">• {rel.date}</span>
                  {rel.badge && (
                    <span className="text-[10px] bg-[#FAF0E6] text-[#B3542E] font-bold px-2 py-0.5 rounded border border-[#E8D4C4]">
                      {rel.badge}
                    </span>
                  )}
                </div>

                <h4 className="font-bold text-sm text-[#211D1A]">{rel.title}</h4>

                <ul className="space-y-1.5 text-xs text-[#6E655F] bg-white border border-[#E7DFD5] rounded-xl p-4">
                  {rel.changes.map((item, cIdx) => (
                    <li key={cIdx} className="flex items-start gap-2">
                      <span className="text-[#B3542E] font-bold leading-none mt-1">✓</span>
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 3: CAFE FAQ */}
      {subTab === 'faq' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredFaq.map((item, idx) => (
            <div key={idx} className="bg-white border border-[#E7DFD5] rounded-2xl p-5 space-y-2">
              <h4 className="font-serif font-bold text-sm text-[#211D1A] flex items-start gap-2">
                <HelpCircle className="w-4 h-4 text-[#B3542E] shrink-0 mt-0.5" />
                <span>{item.q}</span>
              </h4>
              <p className="text-xs text-[#6E655F] leading-relaxed pl-6">
                {item.a}
              </p>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
