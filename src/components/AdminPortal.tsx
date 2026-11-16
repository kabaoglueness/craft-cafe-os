'use client';

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { AnalyticsDashboard } from './AnalyticsDashboard';
import { AdminGuide } from './AdminGuide';
import { 
  Palette, 
  Coffee, 
  Plus, 
  Trash2, 
  Sliders, 
  Package, 
  AlertTriangle,
  Minus,
  TrendingUp,
  Tag,
  BarChart3,
  LayoutTemplate,
  BookOpen,
  Info,
  Users,
  UserPlus,
  Shield,
  KeyRound,
  CheckCircle2,
  Lock,
  Edit2,
  QrCode,
  Printer,
  ExternalLink,
  Copy,
  Check,
  Download,
  FileDown,
  Upload,
  Image as ImageIcon,
  Star,
  LogOut
} from 'lucide-react';
import QRCode from 'qrcode';
import { WorkshopCategory, CafeCategory, WorkshopItem, CafeItem, StaffRole, StaffUser } from '../types';

export const AdminPortal: React.FC = () => {
  const { 
    venueSettings, 
    updateVenueSettings, 
    workshopItems, 
    cafeItems, 
    addWorkshopItem, 
    deleteWorkshopItem, 
    toggleWorkshopAvailability,
    updateWorkshopStock,
    setWorkshopStock,
    updateWorkshopPrice,
    addCafeItem,
    deleteCafeItem,
    toggleCafeAvailability,
    updateCafeStock,
    setCafeStock,
    updateCafePrice,
    orders,
    currentStaff,
    logout,
    setActiveView,
    staffList,
    addStaffUser,
    updateStaffUser,
    deleteStaffUser,
    setTableNumber
  } = useApp();

  const isAnalyst = currentStaff?.role === 'analyst';
  const [activeTab, setActiveTab] = useState<'workshop' | 'cafe' | 'qr_codes' | 'rules' | 'analytics' | 'guide' | 'staff'>(
    isAnalyst ? 'analytics' : 'workshop'
  );
  const [copiedTable, setCopiedTable] = useState<number | null>(null);
  const [downloadingTable, setDownloadingTable] = useState<number | null>(null);
  const [filterLowStockOnly, setFilterLowStockOnly] = useState(false);

  const getTableUrl = (tableNum: number) => {
    if (typeof window !== 'undefined') {
      return `${window.location.origin}/?table=${tableNum}`;
    }
    return `https://atelierbrew.com/?table=${tableNum}`;
  };

  const handleDownloadQrOnly = async (tableNum: number) => {
    try {
      setDownloadingTable(tableNum);
      const url = getTableUrl(tableNum);
      const qrDataUrl = await QRCode.toDataURL(url, {
        width: 1200,
        margin: 2,
        color: {
          dark: '#211D1A',
          light: '#FFFFFF'
        }
      });
      const link = document.createElement('a');
      link.href = qrDataUrl;
      link.download = `masa-${tableNum.toString().padStart(2, '0')}-qr-kod.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error('QR indirme hatası:', err);
    } finally {
      setDownloadingTable(null);
    }
  };

  const handleDownloadStandCard = async (tableNum: number) => {
    try {
      setDownloadingTable(tableNum);
      const url = getTableUrl(tableNum);
      const qrDataUrl = await QRCode.toDataURL(url, {
        width: 600,
        margin: 1,
        color: {
          dark: '#211D1A',
          light: '#FFFFFF'
        }
      });

      const canvas = document.createElement('canvas');
      canvas.width = 900;
      canvas.height = 1260;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Background - Artisan linen/stone
      ctx.fillStyle = '#FAF7F2';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Outer border
      ctx.lineWidth = 4;
      ctx.strokeStyle = '#E8D4C4';
      ctx.strokeRect(36, 36, canvas.width - 72, canvas.height - 72);

      // Inner thin border
      ctx.lineWidth = 1;
      ctx.strokeStyle = '#D5C9BC';
      ctx.strokeRect(46, 46, canvas.width - 92, canvas.height - 92);

      // Venue brand header
      ctx.fillStyle = '#B3542E';
      ctx.font = '600 24px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('ATELIER & BREW', canvas.width / 2, 120);

      ctx.fillStyle = '#6E655F';
      ctx.font = '400 20px sans-serif';
      ctx.fillText('Seramik & Heykel Atölyesi • Nitelikli Kahve', canvas.width / 2, 160);

      // Divider line
      ctx.strokeStyle = '#E8D4C4';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(canvas.width / 2 - 120, 195);
      ctx.lineTo(canvas.width / 2 + 120, 195);
      ctx.stroke();

      // Big Table Number
      ctx.fillStyle = '#211D1A';
      ctx.font = 'bold 76px Georgia, serif';
      ctx.fillText(`MASA ${tableNum.toString().padStart(2, '0')}`, canvas.width / 2, 280);

      // QR container card (white box with soft rounded corners)
      const qrBoxX = (canvas.width - 560) / 2;
      const qrBoxY = 320;
      const qrBoxW = 560;
      const qrBoxH = 560;

      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      if (ctx.roundRect) {
        ctx.roundRect(qrBoxX, qrBoxY, qrBoxW, qrBoxH, 28);
      } else {
        ctx.rect(qrBoxX, qrBoxY, qrBoxW, qrBoxH);
      }
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#E7DFD5';
      ctx.stroke();

      // Load QR Image onto canvas
      const img = new Image();
      img.src = qrDataUrl;
      await new Promise((resolve) => {
        img.onload = resolve;
      });
      ctx.drawImage(img, qrBoxX + 40, qrBoxY + 40, 480, 480);

      // Instruction heading
      ctx.fillStyle = '#211D1A';
      ctx.font = 'bold 32px Georgia, serif';
      ctx.fillText('Kameranızı Açın & QR Kodu Okutun', canvas.width / 2, 950);

      // Instruction body
      ctx.fillStyle = '#6E655F';
      ctx.font = '400 22px sans-serif';
      ctx.fillText('Masadan siparişinizi verin, atölye kiti ve içecekleriniz gelsin.', canvas.width / 2, 1000);

      // Table lock notice pill
      const pillW = 560;
      const pillH = 54;
      const pillX = (canvas.width - pillW) / 2;
      const pillY = 1050;
      ctx.fillStyle = '#FAF0E6';
      ctx.beginPath();
      if (ctx.roundRect) {
        ctx.roundRect(pillX, pillY, pillW, pillH, 27);
      } else {
        ctx.rect(pillX, pillY, pillW, pillH);
      }
      ctx.fill();
      ctx.lineWidth = 1;
      ctx.strokeStyle = '#E8D4C4';
      ctx.stroke();

      ctx.fillStyle = '#B3542E';
      ctx.font = '600 18px sans-serif';
      ctx.fillText(`Masa #${tableNum.toString().padStart(2, '0')} otomatik tanımlıdır • Masa no yazmanıza gerek yoktur`, canvas.width / 2, 1084);

      // Download triggered
      const cardPngUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = cardPngUrl;
      link.download = `masa-${tableNum.toString().padStart(2, '0')}-akrilik-stand-karti.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error('Stand kartı indirme hatası:', err);
    } finally {
      setDownloadingTable(null);
    }
  };

  React.useEffect(() => {
    if (isAnalyst) {
      setActiveTab('analytics');
    }
  }, [isAnalyst]);

  // New staff form states
  const [isAddingStaff, setIsAddingStaff] = useState(false);
  const [newStaffName, setNewStaffName] = useState('');
  const [newStaffPhone, setNewStaffPhone] = useState('');
  const [newStaffPasscode, setNewStaffPasscode] = useState('');
  const [newStaffRole, setNewStaffRole] = useState<StaffRole>('analyst');
  const [editingStaffId, setEditingStaffId] = useState<string | null>(null);
  const [editPasscode, setEditPasscode] = useState('');
  const [editRole, setEditRole] = useState<StaffRole>('kitchen');

  // Form states
  const [isAddingWorkshop, setIsAddingWorkshop] = useState(false);
  const [newWsTitle, setNewWsTitle] = useState('');
  const [newWsCategory, setNewWsCategory] = useState<WorkshopCategory>('sculpture');
  const [newWsDescription, setNewWsDescription] = useState('');
  const [newWsPrice, setNewWsPrice] = useState(380);
  const [newWsStock, setNewWsStock] = useState(15);
  const [newWsDuration, setNewWsDuration] = useState(60);
  
  // Multi-photo gallery states for new workshop model
  const [newWsPhotos, setNewWsPhotos] = useState<string[]>([
    'https://images.unsplash.com/photo-1576014131341-fe1486fb2475?w=600&auto=format&fit=crop&q=80'
  ]);
  const [customPhotoUrl, setCustomPhotoUrl] = useState('');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setNewWsPhotos(prev => [...prev, event.target!.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleAddPhotoUrl = () => {
    if (!customPhotoUrl.trim()) return;
    setNewWsPhotos(prev => [...prev, customPhotoUrl.trim()]);
    setCustomPhotoUrl('');
  };

  const handleRemovePhoto = (index: number) => {
    setNewWsPhotos(prev => prev.filter((_, i) => i !== index));
  };

  const handleMakeCoverPhoto = (index: number) => {
    setNewWsPhotos(prev => {
      const item = prev[index];
      const rest = prev.filter((_, i) => i !== index);
      return [item, ...rest];
    });
  };

  const [isAddingCafe, setIsAddingCafe] = useState(false);
  const [newCfName, setNewCfName] = useState('');
  const [newCfCategory, setNewCfCategory] = useState<CafeCategory>('espresso_bar');
  const [newCfDescription, setNewCfDescription] = useState('');
  const [newCfPrice, setNewCfPrice] = useState(140);
  const [newCfStock, setNewCfStock] = useState(40);
  const [newCfImage, setNewCfImage] = useState('https://images.unsplash.com/photo-1577968897966-3d4325b36b61?w=600&auto=format&fit=crop&q=80');

  // Inline editing states for quick changes
  const [editingPriceId, setEditingPriceId] = useState<string | null>(null);
  const [tempPrice, setTempPrice] = useState<number>(0);

  const handleCreateWorkshop = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWsTitle.trim()) return;

    const coverPhoto = newWsPhotos[0] || 'https://images.unsplash.com/photo-1576014131341-fe1486fb2475?w=600&auto=format&fit=crop&q=80';

    const newItem: WorkshopItem = {
      id: `ws-${Date.now()}`,
      category: newWsCategory,
      title: newWsTitle.trim(),
      description: newWsDescription.trim() || 'Döküm atölye parçası.',
      image: coverPhoto,
      images: newWsPhotos.length > 0 ? newWsPhotos : [coverPhoto],
      difficulty: 'Orta',
      estimatedMinutes: newWsDuration,
      isAvailable: true,
      stockCount: Number(newWsStock) || 10,
      totalSold: 0,
      sizes: [
        { id: `sz-std-${Date.now()}`, name: 'Standart Boy', price: Number(newWsPrice), isPopular: true }
      ],
      includedKit: [
        '6 Renk Akrilik Boya',
        '2 Sanat Fırçası',
        'Vernik ve Önlük'
      ],
      availableExtras: [
        { id: `ext-box-${Date.now()}`, name: 'Kraft Taşıma Kutusu', price: 50, category: 'addon' }
      ]
    };

    addWorkshopItem(newItem);
    setNewWsTitle('');
    setNewWsDescription('');
    setNewWsPhotos(['https://images.unsplash.com/photo-1576014131341-fe1486fb2475?w=600&auto=format&fit=crop&q=80']);
    setIsAddingWorkshop(false);
  };

  const handleCreateCafe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCfName.trim()) return;

    const newItem: CafeItem = {
      id: `cf-${Date.now()}`,
      category: newCfCategory,
      name: newCfName.trim(),
      description: newCfDescription.trim() || 'Taze kafe ürünü.',
      price: Number(newCfPrice),
      stockCount: Number(newCfStock) || 25,
      totalSold: 0,
      image: newCfImage,
      isAvailable: true
    };

    addCafeItem(newItem);
    setNewCfName('');
    setNewCfDescription('');
    setIsAddingCafe(false);
  };

  const handleCreateStaff = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStaffName.trim() || !newStaffPasscode.trim()) return;
    addStaffUser({
      name: newStaffName.trim(),
      phone: newStaffPhone.trim() || '+90 5xx xxx xx xx',
      passcode: newStaffPasscode.trim().toLowerCase(),
      role: newStaffRole
    });
    setNewStaffName('');
    setNewStaffPhone('');
    setNewStaffPasscode('');
    setIsAddingStaff(false);
  };

  const handleSaveStaffEdit = (id: string) => {
    updateStaffUser(id, {
      passcode: editPasscode.toLowerCase(),
      role: editRole
    });
    setEditingStaffId(null);
  };

  const handleDeleteStaff = (id: string) => {
    if (id === currentStaff?.id) {
      alert('Kendi aktif yönetici hesabınızı silemezsiniz.');
      return;
    }
    if (confirm('Bu personelin sistem erişim yetkisini iptal etmek istediğinize emin misiniz?')) {
      deleteStaffUser(id);
    }
  };

  // Metrics
  const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);
  const totalWorkshopStock = workshopItems.reduce((sum, w) => sum + (w.stockCount || 0), 0);
  const lowStockWorkshopCount = workshopItems.filter(w => (w.stockCount || 0) <= 3 && w.isAvailable !== false).length;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      
      {/* 1. Header Bar: Identity on Left, Core Operations on Right */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-[#E7DFD5]">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-[#6E655F]">
              {isAnalyst ? 'Finans & Analiz Portalı' : 'Yönetici Paneli'}
            </span>
            {currentStaff && (
              <span className={`text-xs font-medium px-2.5 py-0.5 rounded-md border ${
                isAnalyst 
                  ? 'bg-[#F7F4FD] text-[#6B46C1] border-[#D0C2EE]' 
                  : 'bg-[#FAF0E6] text-[#211D1A] border-[#E8D4C4]'
              }`}>
                {isAnalyst ? 'Analist: ' : 'Yönetici: '}
                <strong>{currentStaff.name}</strong>
              </span>
            )}
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#211D1A]">
            {isAnalyst ? 'Satış & Gelir Analitiği' : 'Envanter & Mekan Yönetimi'}
          </h1>
        </div>

        {/* Global Nav Actions */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setActiveView('store')}
            className="px-3.5 py-2 rounded-xl border border-[#E7DFD5] bg-white hover:bg-[#FAF7F2] text-xs font-medium text-[#211D1A] flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
            title="Müşteri vitrinini doğrudan aç ve incele"
          >
            <ExternalLink className="w-3.5 h-3.5 text-[#B3542E]" />
            <span>Canlı Mağazayı Aç</span>
          </button>

          {!isAnalyst && (
            <button
              onClick={() => setActiveView('editor')}
              className="px-3.5 py-2 rounded-xl bg-[#211D1A] hover:bg-[#38322D] text-white text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
              title="Görsel mağaza ve tema düzenleyicisini aç"
            >
              <LayoutTemplate className="w-3.5 h-3.5 text-[#E8D4C4]" />
              <span>Görsel Vitrin Editörü</span>
            </button>
          )}

          <button
            onClick={logout}
            className="px-3.5 py-2 rounded-xl border border-[#E7DFD5] bg-white hover:bg-red-50 hover:border-red-200 text-xs font-medium text-[#6E655F] hover:text-red-700 flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
            title="Oturumu sonlandır"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Çıkış Yap</span>
          </button>
        </div>
      </div>

      {/* 2. Interactive Actionable KPI Cards Strip (Clicking any card directs you to that action!) */}
      {!isAnalyst && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          
          {/* Action Card 1: Total Workshop Stock */}
          <button
            type="button"
            onClick={() => {
              setActiveTab('workshop');
              setFilterLowStockOnly(false);
            }}
            className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
              activeTab === 'workshop' && !filterLowStockOnly
                ? 'bg-white border-[#B3542E] ring-1 ring-[#B3542E]/20 shadow-xs'
                : 'bg-white border-[#E7DFD5] hover:border-[#D5C9BC]'
            }`}
          >
            <div className="flex items-center justify-between text-xs text-[#8C827A] mb-1">
              <span className="font-medium">Atölye Stoğu</span>
              <Package className="w-3.5 h-3.5 text-[#B3542E]" />
            </div>
            <div className="font-serif text-lg font-bold text-[#211D1A]">
              {totalWorkshopStock} <span className="text-xs font-normal text-[#8C827A]">parça</span>
            </div>
            <span className="text-[10px] text-[#8C827A] block mt-0.5">Envanteri incele →</span>
          </button>

          {/* Action Card 2: Critical Stock (Clicking immediately filters critical items!) */}
          <button
            type="button"
            onClick={() => {
              setActiveTab('workshop');
              setFilterLowStockOnly(true);
            }}
            className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
              lowStockWorkshopCount > 0
                ? filterLowStockOnly
                  ? 'bg-[#FAF0E6] border-[#B3542E] ring-1 ring-[#B3542E]/30 shadow-xs'
                  : 'bg-[#FAF0E6]/80 border-[#E8D4C4] hover:border-[#B3542E]'
                : 'bg-white border-[#E7DFD5] opacity-75'
            }`}
          >
            <div className="flex items-center justify-between text-xs text-[#B3542E] mb-1">
              <span className="font-semibold flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5" /> Kritik Stok
              </span>
              {lowStockWorkshopCount > 0 && (
                <span className="w-2 h-2 rounded-full bg-[#B3542E]" />
              )}
            </div>
            <div className="font-serif text-lg font-bold text-[#B3542E]">
              {lowStockWorkshopCount} <span className="text-xs font-normal">model</span>
            </div>
            <span className="text-[10px] text-[#B3542E] font-medium block mt-0.5">
              {lowStockWorkshopCount > 0 ? 'Filtrele & Stoğu Artır →' : 'Stoklar yeterli'}
            </span>
          </button>

          {/* Action Card 3: Cash Revenue (Clicking directs to Analytics) */}
          <button
            type="button"
            onClick={() => setActiveTab('analytics')}
            className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
              activeTab === 'analytics'
                ? 'bg-white border-[#4E5E48] ring-1 ring-[#4E5E48]/20 shadow-xs'
                : 'bg-white border-[#E7DFD5] hover:border-[#D5C9BC]'
            }`}
          >
            <div className="flex items-center justify-between text-xs text-[#8C827A] mb-1">
              <span className="font-medium">Kasa Cirosu</span>
              <TrendingUp className="w-3.5 h-3.5 text-[#4E5E48]" />
            </div>
            <div className="font-serif text-lg font-bold text-[#4E5E48]">
              {totalRevenue} ₺
            </div>
            <span className="text-[10px] text-[#4E5E48] font-medium block mt-0.5">Raporları aç →</span>
          </button>

          {/* Action Card 4: Tables & QR Operation (Clicking directs to QR Codes tab) */}
          <button
            type="button"
            onClick={() => setActiveTab('qr_codes')}
            className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
              activeTab === 'qr_codes'
                ? 'bg-white border-[#B3542E] ring-1 ring-[#B3542E]/20 shadow-xs'
                : 'bg-white border-[#E7DFD5] hover:border-[#D5C9BC]'
            }`}
          >
            <div className="flex items-center justify-between text-xs text-[#8C827A] mb-1">
              <span className="font-medium">Masa & QR</span>
              <QrCode className="w-3.5 h-3.5 text-[#B3542E]" />
            </div>
            <div className="font-serif text-lg font-bold text-[#211D1A]">
              {venueSettings.tableCount || 18} <span className="text-xs font-normal text-[#8C827A]">masa</span>
            </div>
            <span className="text-[10px] text-[#8C827A] block mt-0.5">QR kartları & baskı →</span>
          </button>

        </div>
      )}

      {/* 3. Analyst Role Info Banner (When logged in as Analyst) */}
      {isAnalyst && (
        <div className="p-4 bg-[#F7F4FD] border border-[#D0C2EE] rounded-2xl flex items-start gap-3">
          <Shield className="w-5 h-5 text-[#6B46C1] shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <h4 className="text-xs font-semibold text-[#6B46C1]">
              Salt-Okunur Finans & Analist Modu Aktif
            </h4>
            <p className="text-xs text-[#553C9A]">
              Bu hesap işletmenin gizliliğini korumak adına yalnızca ciro, sipariş hacmi, AOV ve saatlik pik yoğunluk grafiklerini incelemek için yetkilendirilmiştir. Envanter, menü fiyatları, mekan kuralları ve personel şifrelerine erişiminiz kısıtlanmıştır.
            </p>
          </div>
        </div>
      )}

      {/* 4. Streamlined Horizontal Tabs Bar */}
      {!isAnalyst && (
        <div className="flex items-center gap-1.5 p-1.5 bg-[#FAF7F2] border border-[#E7DFD5] rounded-2xl overflow-x-auto">
          <button
            onClick={() => {
              setActiveTab('workshop');
              setFilterLowStockOnly(false);
            }}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium transition-all shrink-0 cursor-pointer ${
              activeTab === 'workshop'
                ? 'bg-[#211D1A] text-white shadow-xs'
                : 'text-[#6E655F] hover:text-[#211D1A] hover:bg-white'
            }`}
          >
            <Palette className="w-3.5 h-3.5" />
            <span>Atölye Envanteri</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
              activeTab === 'workshop' ? 'bg-white/20 text-white' : 'bg-[#EFE7DC] text-[#6E655F]'
            }`}>
              {workshopItems.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('cafe')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium transition-all shrink-0 cursor-pointer ${
              activeTab === 'cafe'
                ? 'bg-[#211D1A] text-white shadow-xs'
                : 'text-[#6E655F] hover:text-[#211D1A] hover:bg-white'
            }`}
          >
            <Coffee className="w-3.5 h-3.5" />
            <span>Kafe Menüsü</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
              activeTab === 'cafe' ? 'bg-white/20 text-white' : 'bg-[#EFE7DC] text-[#6E655F]'
            }`}>
              {cafeItems.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('qr_codes')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium transition-all shrink-0 cursor-pointer ${
              activeTab === 'qr_codes'
                ? 'bg-[#211D1A] text-white shadow-xs'
                : 'text-[#6E655F] hover:text-[#211D1A] hover:bg-white'
            }`}
          >
            <QrCode className="w-3.5 h-3.5" />
            <span>Masa QR Kodları</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
              activeTab === 'qr_codes' ? 'bg-white/20 text-white' : 'bg-[#EFE7DC] text-[#6E655F]'
            }`}>
              {venueSettings.tableCount || 18}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('rules')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium transition-all shrink-0 cursor-pointer ${
              activeTab === 'rules'
                ? 'bg-[#211D1A] text-white shadow-xs'
                : 'text-[#6E655F] hover:text-[#211D1A] hover:bg-white'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Mekan Kuralları</span>
          </button>

          <button
            onClick={() => setActiveTab('analytics')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium transition-all shrink-0 cursor-pointer ${
              activeTab === 'analytics'
                ? 'bg-[#211D1A] text-white shadow-xs'
                : 'text-[#6E655F] hover:text-[#211D1A] hover:bg-white'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Analitik & Raporlar</span>
          </button>

          <button
            onClick={() => setActiveTab('staff')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium transition-all shrink-0 cursor-pointer ${
              activeTab === 'staff'
                ? 'bg-[#211D1A] text-white shadow-xs'
                : 'text-[#6E655F] hover:text-[#211D1A] hover:bg-white'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Personel & Roller</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
              activeTab === 'staff' ? 'bg-white/20 text-white' : 'bg-[#EFE7DC] text-[#6E655F]'
            }`}>
              {staffList.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('guide')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium transition-all shrink-0 cursor-pointer ${
              activeTab === 'guide'
                ? 'bg-[#211D1A] text-white shadow-xs'
                : 'text-[#6E655F] hover:text-[#211D1A] hover:bg-white'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Rehber & Sürüm Notları</span>
          </button>
        </div>
      )}

      {/* TAB 1: WORKSHOP INVENTORY (Real Management Controls) */}
      {activeTab === 'workshop' && !isAnalyst && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-serif text-lg font-bold text-[#211D1A]">
                Atölye Parçaları ve Stok Sayımı
              </h3>
              <p className="text-xs text-[#6E655F]">
                Raftaki ham ürün adetlerini, fiyatları ve satış durumunu doğrudan güncelleyin.
              </p>
            </div>

            <button
              onClick={() => setIsAddingWorkshop(!isAddingWorkshop)}
              className="px-4 py-2 bg-[#211D1A] hover:bg-[#38322D] text-white text-xs font-medium rounded-xl flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer self-start sm:self-auto"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Yeni Model Ekle</span>
            </button>
          </div>

          {/* Active Filter Notice */}
          {filterLowStockOnly && (
            <div className="p-3.5 bg-[#FAF0E6] border border-[#E8D4C4] rounded-xl flex items-center justify-between text-xs text-[#B3542E] animate-in fade-in">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>
                  <strong>Kritik Stok Filtresi Aktif:</strong> Yalnızca stoğu 3 ve altı kalan modeller gösteriliyor. Stoğu kutudan artırıp 'Kaydet'e basabilirsiniz.
                </span>
              </div>
              <button
                type="button"
                onClick={() => setFilterLowStockOnly(false)}
                className="px-3 py-1 bg-white border border-[#E8D4C4] rounded-lg text-xs font-medium hover:bg-[#FBEFE9] cursor-pointer shrink-0"
              >
                Tümünü Göster ({workshopItems.length})
              </button>
            </div>
          )}

          {/* Quick Operator Hint */}
          <div className="bg-[#FAF7F2] border border-[#EBE4DA] rounded-xl px-3.5 py-2.5 flex items-center justify-between gap-3 text-xs text-[#6E655F]">
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-[#B3542E] shrink-0" />
              <span>Fiyatın üzerine tıklayarak (✎) anında güncelleyebilir, [-] [+] butonlarıyla raftaki stok adedini değiştirebilirsiniz.</span>
            </div>
            <button 
              onClick={() => setActiveTab('guide')} 
              className="text-[11px] text-[#B3542E] font-semibold hover:underline shrink-0 cursor-pointer"
            >
              Kullanım Rehberi →
            </button>
          </div>

          {/* New Workshop Item Form */}
          {isAddingWorkshop && (
            <form onSubmit={handleCreateWorkshop} className="bg-white border border-[#E7DFD5] rounded-2xl p-6 space-y-4 animate-in fade-in duration-150">
              <h4 className="font-serif font-bold text-sm text-[#211D1A] pb-2 border-b border-[#F0EAE1]">
                Yeni Heykel / Atölye Parçası Kaydı
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-[#8C827A]">Model Adı</label>
                  <input
                    type="text"
                    required
                    placeholder="Örn: Küçük Prens Heykeli"
                    value={newWsTitle}
                    onChange={(e) => setNewWsTitle(e.target.value)}
                    className="w-full px-3 py-2 border border-[#E7DFD5] rounded-xl text-xs focus:outline-none focus:border-[#B3542E]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-[#8C827A]">Kategori</label>
                  <select
                    value={newWsCategory}
                    onChange={(e) => setNewWsCategory(e.target.value as WorkshopCategory)}
                    className="w-full px-3 py-2 border border-[#E7DFD5] rounded-xl text-xs focus:outline-none focus:border-[#B3542E]"
                  >
                    <option value="sculpture">Heykel Boyama</option>
                    <option value="ceramic">Seramik & Çini</option>
                    <option value="canvas">Tuval & Akrilik</option>
                    <option value="candle">Soya Mum & Koku</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-[#8C827A]">Fiyat (TL)</label>
                  <input
                    type="number"
                    required
                    value={newWsPrice}
                    onChange={(e) => setNewWsPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-[#E7DFD5] rounded-xl text-xs focus:outline-none focus:border-[#B3542E]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-[#8C827A]">Başlangıç Stok Adedi</label>
                  <input
                    type="number"
                    required
                    value={newWsStock}
                    onChange={(e) => setNewWsStock(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-[#E7DFD5] rounded-xl text-xs focus:outline-none focus:border-[#B3542E]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-[#8C827A]">Malzeme Tanımı</label>
                <input
                  type="text"
                  placeholder="Döküm alçı figür, 16 cm boy..."
                  value={newWsDescription}
                  onChange={(e) => setNewWsDescription(e.target.value)}
                  className="w-full px-3 py-2 border border-[#E7DFD5] rounded-xl text-xs focus:outline-none focus:border-[#B3542E]"
                />
              </div>

              {/* Multi-Photo Gallery & Upload Section */}
              <div className="space-y-3 pt-2 border-t border-[#F0EAE1]">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-[#211D1A] flex items-center gap-1.5">
                    <ImageIcon className="w-3.5 h-3.5 text-[#B3542E]" />
                    <span>Model Fotoğrafları & Çoklu Galeri</span>
                  </label>
                  <span className="text-[11px] text-[#8C827A]">
                    {newWsPhotos.length} fotoğraf yüklendi (İlki kapak görselidir)
                  </span>
                </div>

                {/* Photo Previews Strip */}
                <div className="flex flex-wrap items-center gap-2.5">
                  {newWsPhotos.map((photo, idx) => (
                    <div 
                      key={idx}
                      className="relative w-16 h-16 rounded-xl border-2 border-[#E7DFD5] overflow-hidden group bg-[#FAF7F2] shrink-0"
                    >
                      <img src={photo} alt={`Model ${idx + 1}`} className="w-full h-full object-cover" />
                      
                      {idx === 0 && (
                        <span className="absolute bottom-0 inset-x-0 bg-[#B3542E] text-white text-[9px] font-bold text-center py-0.5">
                          Kapak
                        </span>
                      )}

                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-1 transition-opacity">
                        {idx !== 0 && (
                          <button
                            type="button"
                            onClick={() => handleMakeCoverPhoto(idx)}
                            className="p-1 rounded bg-white text-[#211D1A] hover:bg-[#FAF0E6] cursor-pointer"
                            title="Kapak Görseli Yap"
                          >
                            <Star className="w-3 h-3 text-[#B3542E]" />
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => handleRemovePhoto(idx)}
                          className="p-1 rounded bg-white text-red-600 hover:bg-red-50 cursor-pointer"
                          title="Fotoğrafı Kaldır"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}

                  {/* Add via File Upload */}
                  <label className="w-16 h-16 rounded-xl border-2 border-dashed border-[#D5C9BC] hover:border-[#B3542E] flex flex-col items-center justify-center text-[#8C827A] hover:text-[#B3542E] cursor-pointer transition-colors shrink-0 bg-[#FAF7F2]/50">
                    <Upload className="w-4 h-4 mb-0.5" />
                    <span className="text-[9px] font-medium">Yükle</span>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* Add via URL */}
                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="url"
                    placeholder="Veya görsel bağlantısı yapıştırın (https://...)"
                    value={customPhotoUrl}
                    onChange={(e) => setCustomPhotoUrl(e.target.value)}
                    className="flex-1 px-3 py-1.5 border border-[#E7DFD5] rounded-xl text-xs focus:outline-none focus:border-[#B3542E]"
                  />
                  <button
                    type="button"
                    onClick={handleAddPhotoUrl}
                    className="px-3 py-1.5 bg-[#FAF7F2] border border-[#D5C9BC] hover:bg-[#F3ECE2] text-[#211D1A] text-xs font-semibold rounded-xl cursor-pointer shrink-0"
                  >
                    + Fotoğraf Ekle
                  </button>
                </div>

                {/* Quick Presets */}
                <div className="flex items-center gap-1.5 pt-1 text-[11px] text-[#8C827A]">
                  <span className="shrink-0">Örnekler:</span>
                  <button
                    type="button"
                    onClick={() => setNewWsPhotos(prev => [...prev, 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=600&auto=format&fit=crop&q=80'])}
                    className="px-2 py-0.5 rounded-lg border border-[#E7DFD5] bg-white hover:bg-[#FAF7F2] text-[#6E655F] cursor-pointer"
                  >
                    + Büst
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewWsPhotos(prev => [...prev, 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=600&auto=format&fit=crop&q=80'])}
                    className="px-2 py-0.5 rounded-lg border border-[#E7DFD5] bg-white hover:bg-[#FAF7F2] text-[#6E655F] cursor-pointer"
                  >
                    + Seramik Kupa
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewWsPhotos(prev => [...prev, 'https://images.unsplash.com/photo-1569173112611-52a7cd38bea9?w=600&auto=format&fit=crop&q=80'])}
                    className="px-2 py-0.5 rounded-lg border border-[#E7DFD5] bg-white hover:bg-[#FAF7F2] text-[#6E655F] cursor-pointer"
                  >
                    + Balon Figür
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewWsPhotos(prev => [...prev, 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=600&auto=format&fit=crop&q=80'])}
                    className="px-2 py-0.5 rounded-lg border border-[#E7DFD5] bg-white hover:bg-[#FAF7F2] text-[#6E655F] cursor-pointer"
                  >
                    + Tuval
                  </button>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddingWorkshop(false)}
                  className="px-4 py-2 border border-[#E7DFD5] text-[#6E655F] text-xs font-medium rounded-xl hover:bg-[#FAF7F2] cursor-pointer"
                >
                  Vazgeç
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#B3542E] hover:bg-[#984422] text-white text-xs font-semibold rounded-xl cursor-pointer"
                >
                  Envantere Kaydet
                </button>
              </div>
            </form>
          )}

          {/* Workshop Inventory Table */}
          {(() => {
            const displayedWorkshopItems = filterLowStockOnly
              ? workshopItems.filter((item) => (item.stockCount || 0) <= 3 && item.isAvailable !== false)
              : workshopItems;

            if (displayedWorkshopItems.length === 0) {
              return (
                <div className="p-8 text-center bg-white border border-[#E7DFD5] rounded-2xl space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-[#4E5E48] mx-auto" />
                  <p className="text-sm font-medium text-[#211D1A]">
                    {filterLowStockOnly ? "Kritik stok seviyesinde ürün bulunmuyor" : "Henüz ürün eklenmemiş"}
                  </p>
                  <p className="text-xs text-[#8C827A]">
                    {filterLowStockOnly 
                      ? "Tüm atölye modellerinizin raf stoğu yeterli düzeyde (3'ün üzerinde)."
                      : "Yeni model ekle butonunu kullanarak ilk parçanızı kaydedebilirsiniz."}
                  </p>
                  {filterLowStockOnly && (
                    <button
                      type="button"
                      onClick={() => setFilterLowStockOnly(false)}
                      className="mt-2 px-3 py-1.5 bg-[#FAF7F2] border border-[#E7DFD5] rounded-xl text-xs font-medium text-[#211D1A] hover:bg-[#F0EAE1] cursor-pointer"
                    >
                      Tüm Ürünleri Göster ({workshopItems.length})
                    </button>
                  )}
                </div>
              );
            }

            return (
              <div className="bg-white border border-[#E7DFD5] rounded-2xl overflow-hidden divide-y divide-[#F0EAE1]">
                {displayedWorkshopItems.map((item) => {
                  const isLowStock = (item.stockCount || 0) <= 3 && item.isAvailable !== false;
                  const isOutOfStock = (item.stockCount || 0) === 0 || item.isAvailable === false;
                  const isEditingThisPrice = editingPriceId === item.id;

                  return (
                    <div key={item.id} className="p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:bg-[#FAF7F2]/40 transition-colors">
                      
                      {/* Item Info */}
                      <div className="flex items-center gap-3.5 min-w-[280px]">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-14 h-14 rounded-xl object-cover bg-[#EFE7DC] shrink-0 border border-[#E7DFD5]"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-serif font-bold text-base text-[#211D1A]">{item.title}</h4>
                            {isLowStock && (
                              <span className="text-[10px] bg-[#FAF0E6] text-[#B3542E] px-2 py-0.5 rounded font-semibold border border-[#E8D4C4]">
                                Kritik Stok
                              </span>
                            )}
                            {isOutOfStock && (
                              <span className="text-[10px] bg-red-100 text-red-700 px-2 py-0.5 rounded font-semibold">
                                Tükendi
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-[#8C827A] line-clamp-1 mt-0.5">{item.description}</p>
                          
                          <div className="flex items-center gap-3 mt-1.5 text-xs">
                            {/* Price Edit */}
                            {isEditingThisPrice ? (
                              <div className="flex items-center gap-1">
                                <input
                                  type="number"
                                  value={tempPrice}
                                  onChange={(e) => setTempPrice(Number(e.target.value))}
                                  className="w-16 px-1.5 py-0.5 border border-[#B3542E] rounded text-xs font-bold"
                                  autoFocus
                                />
                                <button
                                  onClick={() => {
                                    updateWorkshopPrice(item.id, tempPrice);
                                    setEditingPriceId(null);
                                  }}
                                  className="text-xs text-[#B3542E] font-bold"
                                >
                                  Kaydet
                                </button>
                              </div>
                            ) : (
                              <button
                                onClick={() => {
                                  setEditingPriceId(item.id);
                                  setTempPrice(item.sizes[0]?.price || 0);
                                }}
                                className="font-bold text-[#B3542E] hover:underline flex items-center gap-1 cursor-pointer"
                                title="Fiyatı değiştirmek için tıkla"
                              >
                                <span>{item.sizes[0]?.price} ₺</span>
                                <span className="text-[10px] text-[#A69B91] font-normal">✎</span>
                              </button>
                            )}

                            <span className="text-[#A69B91]">•</span>
                            <span className="text-[11px] text-[#6E655F]">
                              {item.totalSold || 0} adet satıldı
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Stock Management & Controls */}
                      <div className="flex items-center gap-5 w-full md:w-auto justify-between md:justify-end pt-2 md:pt-0 border-t md:border-t-0 border-[#F0EAE1]">
                        
                        {/* Stock Counter Stepper */}
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-[#8C827A] font-medium hidden sm:inline">Raftaki Stok:</span>
                          <div className="flex items-center bg-[#FAF7F2] border border-[#E7DFD5] rounded-xl px-2 py-1">
                            <button
                              onClick={() => updateWorkshopStock(item.id, -1)}
                              className="w-6 h-6 rounded-lg bg-white border border-[#E7DFD5] flex items-center justify-center text-[#6E655F] hover:text-[#211D1A] cursor-pointer"
                              title="1 Adet Düşür"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <input
                              type="number"
                              value={item.stockCount ?? 0}
                              onChange={(e) => setWorkshopStock(item.id, parseInt(e.target.value, 10) || 0)}
                              className="w-12 text-center text-xs font-bold text-[#211D1A] bg-transparent focus:outline-none"
                            />
                            <button
                              onClick={() => updateWorkshopStock(item.id, 1)}
                              className="w-6 h-6 rounded-lg bg-white border border-[#E7DFD5] flex items-center justify-center text-[#6E655F] hover:text-[#211D1A] cursor-pointer"
                              title="1 Adet Ekle"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>

                        {/* Stock Availability Custom Toggle Switch (Exactly Image 2 Style!) */}
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => toggleWorkshopAvailability(item.id)}
                            className="flex items-center gap-2 group cursor-pointer"
                            title={item.isAvailable !== false ? "Satışı Kapat" : "Satışa Aç"}
                          >
                            <span className="text-xs font-medium text-[#6E655F] hidden sm:inline">
                              {item.isAvailable !== false ? 'Satışta' : 'Kapalı'}
                            </span>
                            
                            {/* Custom Sleek Switch from user image */}
                            <div className={`w-11 h-6 rounded-full border-2 transition-all relative flex items-center px-0.5 ${
                              item.isAvailable !== false 
                                ? 'border-[#B3542E] bg-[#FAF0E6]' 
                                : 'border-[#A69B91] bg-[#FAF7F2]'
                            }`}>
                              <div className={`w-4 h-4 rounded-full transition-transform ${
                                item.isAvailable !== false 
                                  ? 'translate-x-5 bg-[#B3542E]' 
                                  : 'translate-x-0 bg-[#A69B91]'
                              }`} />
                            </div>
                          </button>

                          {/* Delete */}
                          <button
                            onClick={() => deleteWorkshopItem(item.id)}
                            className="p-1.5 text-[#A69B91] hover:text-red-600 rounded-lg transition-colors cursor-pointer"
                            title="Modeli Sil"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                      </div>

                    </div>
                  );
                })}
              </div>
            );
          })()}

        </div>
      )}

      {/* TAB 2: CAFE INVENTORY */}
      {activeTab === 'cafe' && !isAnalyst && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif text-lg font-bold text-[#211D1A]">
                Kafe Menüsü & İçecek Stokları
              </h3>
              <p className="text-xs text-[#6E655F]">
                Günlük kahve çekirdeği, süt ve tatlı porsiyon adetlerini yönetin.
              </p>
            </div>

            <button
              onClick={() => setIsAddingCafe(!isAddingCafe)}
              className="px-4 py-2 bg-[#211D1A] hover:bg-[#38322D] text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Yeni Ürün Ekle</span>
            </button>
          </div>

          {/* Add Cafe Form */}
          {isAddingCafe && (
            <form onSubmit={handleCreateCafe} className="bg-white border border-[#E7DFD5] rounded-2xl p-6 space-y-4 animate-in fade-in duration-150">
              <h4 className="font-serif font-bold text-sm text-[#211D1A] pb-2 border-b border-[#F0EAE1]">
                Yeni Kafe Ürünü Kaydı
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-[#8C827A]">Ürün Adı</label>
                  <input
                    type="text"
                    required
                    placeholder="Örn: Sıcak Cortado"
                    value={newCfName}
                    onChange={(e) => setNewCfName(e.target.value)}
                    className="w-full px-3 py-2 border border-[#E7DFD5] rounded-xl text-xs focus:outline-none focus:border-[#B3542E]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-[#8C827A]">Kategori</label>
                  <select
                    value={newCfCategory}
                    onChange={(e) => setNewCfCategory(e.target.value as CafeCategory)}
                    className="w-full px-3 py-2 border border-[#E7DFD5] rounded-xl text-xs focus:outline-none focus:border-[#B3542E]"
                  >
                    <option value="espresso_bar">Sıcak Kahveler</option>
                    <option value="iced_coffee">Soğuk Kahveler</option>
                    <option value="tea_herbal">Bitki Çayları & Matcha</option>
                    <option value="cold_refreshers">Ferahlatıcılar</option>
                    <option value="bakery_dessert">Fırın & Tatlı</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-[#8C827A]">Fiyat (TL)</label>
                  <input
                    type="number"
                    required
                    value={newCfPrice}
                    onChange={(e) => setNewCfPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-[#E7DFD5] rounded-xl text-xs focus:outline-none focus:border-[#B3542E]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-[#8C827A]">Günlük Porsiyon</label>
                  <input
                    type="number"
                    required
                    value={newCfStock}
                    onChange={(e) => setNewCfStock(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-[#E7DFD5] rounded-xl text-xs focus:outline-none focus:border-[#B3542E]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-[#8C827A]">İçerik Açıklaması</label>
                <input
                  type="text"
                  placeholder="İki shot espresso ve az süt..."
                  value={newCfDescription}
                  onChange={(e) => setNewCfDescription(e.target.value)}
                  className="w-full px-3 py-2 border border-[#E7DFD5] rounded-xl text-xs focus:outline-none focus:border-[#B3542E]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddingCafe(false)}
                  className="px-4 py-2 border border-[#E7DFD5] text-[#6E655F] text-xs font-medium rounded-xl hover:bg-[#FAF7F2] cursor-pointer"
                >
                  Vazgeç
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#B3542E] hover:bg-[#984422] text-white text-xs font-semibold rounded-xl cursor-pointer"
                >
                  Menüye Kaydet
                </button>
              </div>
            </form>
          )}

          {/* Cafe Items List */}
          <div className="bg-white border border-[#E7DFD5] rounded-2xl overflow-hidden divide-y divide-[#F0EAE1]">
            {cafeItems.map((item) => {
              const isLowStock = (item.stockCount || 0) <= 5 && item.isAvailable !== false;
              const isEditingThisPrice = editingPriceId === item.id;

              return (
                <div key={item.id} className="p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:bg-[#FAF7F2]/40 transition-colors">
                  
                  {/* Info */}
                  <div className="flex items-center gap-3.5 min-w-[280px]">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-14 h-14 rounded-xl object-cover bg-[#EFE7DC] shrink-0 border border-[#E7DFD5]"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-serif font-bold text-base text-[#211D1A]">{item.name}</h4>
                        {isLowStock && (
                          <span className="text-[10px] bg-[#FAF0E6] text-[#B3542E] px-2 py-0.5 rounded font-semibold border border-[#E8D4C4]">
                            Az Kaldı
                          </span>
                        )}
                        {item.isAvailable === false && (
                          <span className="text-[10px] bg-red-100 text-red-700 px-2 py-0.5 rounded font-semibold">
                            Tükendi
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[#8C827A] line-clamp-1 mt-0.5">{item.description}</p>
                      
                      <div className="flex items-center gap-3 mt-1.5 text-xs">
                        {/* Price Edit */}
                        {isEditingThisPrice ? (
                          <div className="flex items-center gap-1">
                            <input
                              type="number"
                              value={tempPrice}
                              onChange={(e) => setTempPrice(Number(e.target.value))}
                              className="w-16 px-1.5 py-0.5 border border-[#B3542E] rounded text-xs font-bold"
                              autoFocus
                            />
                            <button
                              onClick={() => {
                                updateCafePrice(item.id, tempPrice);
                                setEditingPriceId(null);
                              }}
                              className="text-xs text-[#B3542E] font-bold"
                            >
                              Kaydet
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => {
                              setEditingPriceId(item.id);
                              setTempPrice(item.price);
                            }}
                            className="font-bold text-[#211D1A] hover:underline flex items-center gap-1 cursor-pointer"
                            title="Fiyatı değiştirmek için tıkla"
                          >
                            <span>{item.price} ₺</span>
                            <span className="text-[10px] text-[#A69B91] font-normal">✎</span>
                          </button>
                        )}

                        <span className="text-[#A69B91]">•</span>
                        <span className="text-[11px] text-[#6E655F]">
                          {item.totalSold || 0} satıldı
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Stock Stepper & Toggle Switch */}
                  <div className="flex items-center gap-5 w-full md:w-auto justify-between md:justify-end pt-2 md:pt-0 border-t md:border-t-0 border-[#F0EAE1]">
                    
                    {/* Stepper */}
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-[#8C827A] font-medium hidden sm:inline">Porsiyon:</span>
                      <div className="flex items-center bg-[#FAF7F2] border border-[#E7DFD5] rounded-xl px-2 py-1">
                        <button
                          onClick={() => updateCafeStock(item.id, -1)}
                          className="w-6 h-6 rounded-lg bg-white border border-[#E7DFD5] flex items-center justify-center text-[#6E655F] hover:text-[#211D1A] cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <input
                          type="number"
                          value={item.stockCount ?? 0}
                          onChange={(e) => setCafeStock(item.id, parseInt(e.target.value, 10) || 0)}
                          className="w-12 text-center text-xs font-bold text-[#211D1A] bg-transparent focus:outline-none"
                        />
                        <button
                          onClick={() => updateCafeStock(item.id, 1)}
                          className="w-6 h-6 rounded-lg bg-white border border-[#E7DFD5] flex items-center justify-center text-[#6E655F] hover:text-[#211D1A] cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    {/* Toggle Switch */}
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => toggleCafeAvailability(item.id)}
                        className="flex items-center gap-2 group cursor-pointer"
                      >
                        <span className="text-xs font-medium text-[#6E655F] hidden sm:inline">
                          {item.isAvailable !== false ? 'Satışta' : 'Kapalı'}
                        </span>
                        
                        <div className={`w-11 h-6 rounded-full border-2 transition-all relative flex items-center px-0.5 ${
                          item.isAvailable !== false 
                            ? 'border-[#B3542E] bg-[#FAF0E6]' 
                            : 'border-[#A69B91] bg-[#FAF7F2]'
                        }`}>
                          <div className={`w-4 h-4 rounded-full transition-transform ${
                            item.isAvailable !== false 
                              ? 'translate-x-5 bg-[#B3542E]' 
                              : 'translate-x-0 bg-[#A69B91]'
                          }`} />
                        </div>
                      </button>

                      <button
                        onClick={() => deleteCafeItem(item.id)}
                        className="p-1.5 text-[#A69B91] hover:text-red-600 rounded-lg transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                  </div>

                </div>
              );
            })}
          </div>

        </div>
      )}

      {/* TAB 3: RULES */}
      {activeTab === 'rules' && !isAnalyst && (
        <div className="bg-white border border-[#E7DFD5] rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="border-b border-[#F0EAE1] pb-4">
            <h3 className="font-serif text-lg font-bold text-[#211D1A]">
              Mekan Sipariş Kuralları
            </h3>
            <p className="text-xs text-[#6E655F] mt-0.5">
              Masanın en az bir içecek veya atölye ürünü alma zorunluluğunu buradan yönetin.
            </p>
          </div>

          <div className="space-y-4 max-w-2xl">
            
            {/* Rule 1 */}
            <div className="flex items-center justify-between p-4 bg-[#FAF7F2] border border-[#EBE4DA] rounded-xl">
              <div className="space-y-0.5 pr-4">
                <span className="font-semibold text-sm text-[#211D1A] block">
                  Masada En Az 1 İçecek Zorunluluğu
                </span>
                <p className="text-xs text-[#6E655F]">
                  Müşteri içecek seçmeden heykel siparişi vermeye kalktığında sistemi uyarır.
                </p>
              </div>
              <button
                type="button"
                onClick={() => updateVenueSettings({ minDrinkRequired: !venueSettings.minDrinkRequired })}
                className="shrink-0 group cursor-pointer"
              >
                <div className={`w-11 h-6 rounded-full border-2 transition-all relative flex items-center px-0.5 ${
                  venueSettings.minDrinkRequired 
                    ? 'border-[#B3542E] bg-[#FAF0E6]' 
                    : 'border-[#A69B91] bg-[#FAF7F2]'
                }`}>
                  <div className={`w-4 h-4 rounded-full transition-transform ${
                    venueSettings.minDrinkRequired 
                      ? 'translate-x-5 bg-[#B3542E]' 
                      : 'translate-x-0 bg-[#A69B91]'
                  }`} />
                </div>
              </button>
            </div>

            {/* Rule 2 */}
            <div className="flex items-center justify-between p-4 bg-[#FAF7F2] border border-[#EBE4DA] rounded-xl">
              <div className="space-y-0.5 pr-4">
                <span className="font-semibold text-sm text-[#211D1A] block">
                  Her Masaya Atölye Parçası Şartı
                </span>
                <p className="text-xs text-[#6E655F]">
                  Masanın en az bir heykel, seramik veya tuval seçmesini zorunlu kılar.
                </p>
              </div>
              <button
                type="button"
                onClick={() => updateVenueSettings({ requireWorkshopItem: !venueSettings.requireWorkshopItem })}
                className="shrink-0 group cursor-pointer"
              >
                <div className={`w-11 h-6 rounded-full border-2 transition-all relative flex items-center px-0.5 ${
                  venueSettings.requireWorkshopItem 
                    ? 'border-[#B3542E] bg-[#FAF0E6]' 
                    : 'border-[#A69B91] bg-[#FAF7F2]'
                }`}>
                  <div className={`w-4 h-4 rounded-full transition-transform ${
                    venueSettings.requireWorkshopItem 
                      ? 'translate-x-5 bg-[#B3542E]' 
                      : 'translate-x-0 bg-[#A69B91]'
                  }`} />
                </div>
              </button>
            </div>

            {/* General Info */}
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-medium text-[#6E655F]">
                  Mekan / Şube Adı
                </label>
                <input
                  type="text"
                  value={venueSettings.venueName}
                  onChange={(e) => updateVenueSettings({ venueName: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white border border-[#E7DFD5] rounded-xl text-xs text-[#211D1A] focus:outline-none focus:border-[#B3542E]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-[#6E655F]">
                  Masa Sayısı Kapasitesi
                </label>
                <input
                  type="number"
                  value={venueSettings.tableCount}
                  onChange={(e) => updateVenueSettings({ tableCount: parseInt(e.target.value, 10) || 1 })}
                  className="w-full px-3.5 py-2.5 bg-white border border-[#E7DFD5] rounded-xl text-xs text-[#211D1A] focus:outline-none focus:border-[#B3542E]"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-[#6E655F]">
                Müşteri Menüsü Bilgilendirme Notu
              </label>
              <textarea
                rows={2}
                value={venueSettings.venueNotice}
                onChange={(e) => updateVenueSettings({ venueNotice: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-white border border-[#E7DFD5] rounded-xl text-xs text-[#211D1A] focus:outline-none focus:border-[#B3542E]"
              />
            </div>

          </div>
        </div>
      )}

      {/* TAB: TABLE QR CODES (Masa QR Kodları & Tanımlama) */}
      {activeTab === 'qr_codes' && !isAnalyst && (
        <div className="space-y-6 animate-in fade-in duration-150">
          
          {/* Header & Controls */}
          <div className="bg-white border border-[#E7DFD5] rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-1 max-w-xl">
              <div className="flex items-center gap-2">
                <QrCode className="w-5 h-5 text-[#B3542E]" />
                <h3 className="font-serif text-xl font-bold text-[#211D1A]">
                  Masa QR Kodları & Otomatik Masa Tanıma
                </h3>
              </div>
              <p className="text-xs text-[#6E655F] leading-relaxed">
                Her masaya özel QR kod tanımlıdır. Müşteri masadaki kodu okuttuğunda menü doğrudan o masaya kilitlenir; müşterinin masa numarası yazmasına gerek kalmaz.
              </p>
              <div className="pt-2 flex items-center gap-2 text-[11px] text-[#4E5E48] bg-[#EEF3EC] px-3 py-1.5 rounded-lg border border-[#D8E6D5] inline-flex">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Masa değişimi koruması: Müşteri yanlış masaya oturursa adisyon kısmından masasını düzeltebilir.</span>
              </div>
            </div>

            {/* Quick Actions & Table Count Control */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
              <div className="bg-[#FAF7F2] border border-[#E7DFD5] px-3.5 py-2 rounded-xl flex items-center gap-3">
                <span className="text-xs font-semibold text-[#8C827A]">Toplam Masa:</span>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => updateVenueSettings({ tableCount: Math.max(1, (venueSettings.tableCount || 24) - 1) })}
                    className="w-6 h-6 rounded-lg bg-white border border-[#D5C9BC] flex items-center justify-center text-xs font-bold hover:bg-[#F3ECE2] cursor-pointer"
                  >
                    -
                  </button>
                  <span className="font-serif font-bold text-sm text-[#211D1A] w-6 text-center">
                    {venueSettings.tableCount || 24}
                  </span>
                  <button
                    type="button"
                    onClick={() => updateVenueSettings({ tableCount: (venueSettings.tableCount || 24) + 1 })}
                    className="w-6 h-6 rounded-lg bg-white border border-[#D5C9BC] flex items-center justify-center text-xs font-bold hover:bg-[#F3ECE2] cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                type="button"
                onClick={() => window.print()}
                className="px-4 py-2.5 bg-[#211D1A] hover:bg-[#38322D] text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Masa Kartlarını Yazdır</span>
              </button>
            </div>
          </div>

          {/* QR Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: venueSettings.tableCount || 24 }, (_, i) => i + 1).map((tableNum) => {
              const tableUrl = `https://atelierbrew.com/?table=${tableNum}`;
              const isCopied = copiedTable === tableNum;

              return (
                <div 
                  key={tableNum}
                  className="bg-white border border-[#E7DFD5] hover:border-[#B3542E] rounded-2xl p-5 space-y-3.5 transition-all shadow-2xs group flex flex-col justify-between"
                >
                  {/* Card Top */}
                  <div className="flex items-center justify-between">
                    <h4 className="font-serif font-bold text-base text-[#211D1A]">
                      Masa #{tableNum.toString().padStart(2, '0')}
                    </h4>

                    <span className="text-[10px] font-medium text-[#6E655F] bg-[#FAF7F2] px-2 py-0.5 rounded-md border border-[#E7DFD5]">
                      Aktif
                    </span>
                  </div>

                  {/* High Quality Styled QR Graphic */}
                  <div className="bg-[#FAF7F2] border border-[#E8D4C4]/50 rounded-xl p-4 flex flex-col items-center justify-center space-y-2">
                    <div className="w-32 h-32 bg-white rounded-lg p-2.5 shadow-xs border border-[#E7DFD5] flex flex-col items-center justify-center relative">
                      {/* Stylized Scalable Vector QR Matrix */}
                      <svg viewBox="0 0 100 100" className="w-full h-full fill-[#211D1A]">
                        {/* Corner Finder Patterns */}
                        <rect x="0" y="0" width="28" height="28" rx="4" />
                        <rect x="4" y="4" width="20" height="20" fill="white" rx="2" />
                        <rect x="8" y="8" width="12" height="12" rx="2" />

                        <rect x="72" y="0" width="28" height="28" rx="4" />
                        <rect x="76" y="4" width="20" height="20" fill="white" rx="2" />
                        <rect x="80" y="8" width="12" height="12" rx="2" />

                        <rect x="0" y="72" width="28" height="28" rx="4" />
                        <rect x="4" y="76" width="20" height="20" fill="white" rx="2" />
                        <rect x="8" y="80" width="12" height="12" rx="2" />

                        {/* Stylized QR Matrix Dots */}
                        <rect x="36" y="6" width="6" height="6" rx="1" />
                        <rect x="46" y="6" width="6" height="6" rx="1" />
                        <rect x="56" y="6" width="6" height="6" rx="1" />
                        <rect x="36" y="18" width="6" height="6" rx="1" />
                        <rect x="56" y="18" width="6" height="6" rx="1" />

                        <rect x="6" y="36" width="6" height="6" rx="1" />
                        <rect x="18" y="36" width="6" height="6" rx="1" />
                        <rect x="6" y="54" width="6" height="6" rx="1" />
                        <rect x="18" y="46" width="6" height="6" rx="1" />

                        <rect x="76" y="36" width="6" height="6" rx="1" />
                        <rect x="88" y="36" width="6" height="6" rx="1" />
                        <rect x="76" y="54" width="6" height="6" rx="1" />
                        <rect x="86" y="46" width="6" height="6" rx="1" />

                        <rect x="36" y="76" width="6" height="6" rx="1" />
                        <rect x="48" y="76" width="6" height="6" rx="1" />
                        <rect x="58" y="86" width="6" height="6" rx="1" />
                        <rect x="42" y="88" width="6" height="6" rx="1" />

                        {/* Center Logo Pill */}
                        <rect x="36" y="36" width="28" height="28" fill="#B3542E" rx="6" />
                        <text x="50" y="55" fill="white" fontSize="16" fontWeight="bold" fontFamily="serif" textAnchor="middle">A</text>
                      </svg>
                    </div>

                    <span className="text-[10px] text-[#8C827A] font-mono truncate max-w-[190px]">
                      ?table={tableNum}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-2 pt-1">
                    {/* Primary: Standalone QR PNG Download */}
                    <button
                      type="button"
                      disabled={downloadingTable === tableNum}
                      onClick={() => handleDownloadQrOnly(tableNum)}
                      className="w-full py-2 bg-[#211D1A] hover:bg-[#38322D] text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-2xs disabled:opacity-50"
                    >
                      <Download className="w-3.5 h-3.5 text-[#E8D4C4]" />
                      <span>{downloadingTable === tableNum ? 'Hazırlanıyor...' : 'QR Kodu İndir (PNG)'}</span>
                    </button>

                    {/* Secondary: Ready-to-print Acrylic Table Stand Card */}
                    <button
                      type="button"
                      disabled={downloadingTable === tableNum}
                      onClick={() => handleDownloadStandCard(tableNum)}
                      className="w-full py-2 bg-[#FAF7F2] hover:bg-[#FAF0E6] text-[#B3542E] border border-[#E8D4C4] rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer disabled:opacity-50"
                    >
                      <FileDown className="w-3.5 h-3.5" />
                      <span>Stand Kartı İndir (Baskı)</span>
                    </button>

                    {/* Auxiliary Actions */}
                    <div className="grid grid-cols-2 gap-1.5 pt-0.5">
                      <button
                        type="button"
                        onClick={() => {
                          setTableNumber(tableNum);
                          setActiveView('store');
                        }}
                        className="py-1.5 px-2 bg-white hover:bg-[#FAF7F2] text-[#6E655F] hover:text-[#211D1A] border border-[#E7DFD5] rounded-lg text-[11px] font-medium flex items-center justify-center gap-1 transition-colors cursor-pointer"
                        title="Masayı canlı mağazada simüle et"
                      >
                        <ExternalLink className="w-3 h-3" />
                        <span>Masayı Aç</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          if (navigator.clipboard) {
                            navigator.clipboard.writeText(tableUrl);
                          }
                          setCopiedTable(tableNum);
                          setTimeout(() => setCopiedTable(null), 2000);
                        }}
                        className="py-1.5 px-2 bg-white hover:bg-[#FAF7F2] text-[#6E655F] hover:text-[#211D1A] border border-[#E7DFD5] rounded-lg text-[11px] font-medium flex items-center justify-center gap-1 transition-colors cursor-pointer"
                        title="Masa URL bağlantısını kopyala"
                      >
                        {isCopied ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-600" />
                            <span className="text-emerald-700 font-semibold">Kopyalandı</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Linki Al</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      )}

      {/* TAB 4: ANALYTICS & REPORTS (Accessible to Admin AND Analyst) */}
      {(isAnalyst || activeTab === 'analytics') && (
        <AnalyticsDashboard />
      )}

      {/* TAB 5: KNOWLEDGE BASE & CHANGELOG */}
      {activeTab === 'guide' && !isAnalyst && (
        <AdminGuide />
      )}

      {/* TAB 6: STAFF & RBAC MANAGEMENT (Strictly Admin Only) */}
      {activeTab === 'staff' && !isAnalyst && (
        <div className="space-y-6">
          
          {/* Header & New Staff Trigger */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#6B46C1]" />
                <h3 className="font-serif text-lg font-bold text-[#211D1A]">
                  Personel Rolleri & Yetki Güvenliği (RBAC)
                </h3>
              </div>
              <p className="text-xs text-[#6E655F] mt-0.5">
                Kafede çalışan personellerin şifrelerini, telefonlarını ve sistem yetki sınırlarını yönetin.
              </p>
            </div>

            <button
              onClick={() => setIsAddingStaff(!isAddingStaff)}
              className="px-4 py-2.5 bg-[#211D1A] hover:bg-[#38322D] text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>{isAddingStaff ? 'Formu Kapat' : 'Yeni Personel Yetkilendir'}</span>
            </button>
          </div>

          {/* Quick RBAC Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-white border border-[#E7DFD5] rounded-2xl p-4">
              <span className="text-xs font-medium text-[#6E655F] block">Yöneticiler</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-xl font-bold font-serif text-[#B3542E]">
                  {staffList.filter(s => s.role === 'admin').length}
                </span>
                <span className="text-[11px] text-[#8C827A]">Tam Erişim</span>
              </div>
            </div>

            <div className="bg-white border border-[#E7DFD5] rounded-2xl p-4">
              <span className="text-xs font-medium text-[#6E655F] block">Mutfak / KDS</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-xl font-bold font-serif text-[#2C5282]">
                  {staffList.filter(s => s.role === 'kitchen').length}
                </span>
                <span className="text-[11px] text-[#8C827A]">Hazırlık Ekranı</span>
              </div>
            </div>

            <div className="bg-white border border-[#E7DFD5] rounded-2xl p-4">
              <span className="text-xs font-medium text-[#6E655F] block">Mağaza Editörleri</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-xl font-bold font-serif text-[#3D5A40]">
                  {staffList.filter(s => s.role === 'editor').length}
                </span>
                <span className="text-[11px] text-[#8C827A]">Vitrin Tasarımı</span>
              </div>
            </div>

            <div className="bg-white border border-[#E7DFD5] rounded-2xl p-4">
              <span className="text-xs font-medium text-[#6E655F] block">Finans & Analist</span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-xl font-bold font-serif text-[#6B46C1]">
                  {staffList.filter(s => s.role === 'analyst').length}
                </span>
                <span className="text-[11px] text-[#8C827A]">Salt-Okunur Rapor</span>
              </div>
            </div>
          </div>

          {/* Add Staff Form Accordion */}
          {isAddingStaff && (
            <div className="bg-white border border-[#D0C2EE] rounded-2xl p-5 sm:p-6 space-y-4 shadow-sm animate-in fade-in duration-200">
              <div className="flex items-center justify-between border-b border-[#F0EAE1] pb-3">
                <div className="flex items-center gap-2">
                  <UserPlus className="w-4 h-4 text-[#6B46C1]" />
                  <h4 className="font-serif font-bold text-sm text-[#211D1A]">Yeni Ekip Üyesi Ekle</h4>
                </div>
                <span className="text-xs text-[#8C827A]">Şifre ve Rol Tanımlama</span>
              </div>

              <form onSubmit={handleCreateStaff} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-[#6E655F]">
                      Ad Soyad / Ünvan
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Örn: Selin Demir (Finans Uzmanı)"
                      value={newStaffName}
                      onChange={(e) => setNewStaffName(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#E7DFD5] rounded-xl text-xs text-[#211D1A] focus:outline-none focus:border-[#6B46C1]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-medium text-[#6E655F]">
                      İletişim Telefonu
                    </label>
                    <input
                      type="text"
                      placeholder="+90 53x xxx xx xx"
                      value={newStaffPhone}
                      onChange={(e) => setNewStaffPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#E7DFD5] rounded-xl text-xs text-[#211D1A] focus:outline-none focus:border-[#6B46C1]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-[#6E655F] flex items-center justify-between">
                      <span>Giriş Şifresi (Passcode)</span>
                      <span className="text-[10px] text-[#B3542E]">küçük harf veya rakam</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Örn: analist2026 veya selin"
                      value={newStaffPasscode}
                      onChange={(e) => setNewStaffPasscode(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#E7DFD5] rounded-xl text-xs font-mono font-semibold text-[#211D1A] focus:outline-none focus:border-[#6B46C1]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-medium text-[#6E655F]">
                      Sistem Yetki Rolü
                    </label>
                    <select
                      value={newStaffRole}
                      onChange={(e) => setNewStaffRole(e.target.value as StaffRole)}
                      className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#E7DFD5] rounded-xl text-xs font-semibold text-[#211D1A] focus:outline-none focus:border-[#6B46C1]"
                    >
                      <option value="analyst">Finans & Analist (Yalnızca Raporlar - Güvenli)</option>
                      <option value="kitchen">Mutfak KDS (Yalnızca İstasyon Ekranı)</option>
                      <option value="editor">Mağaza Editörü (Yalnızca Görsel Vitrin)</option>
                      <option value="admin">Yönetici (Tam Yetki & Envanter & Personel)</option>
                    </select>
                  </div>
                </div>

                {/* Helpful Role Note */}
                <div className="p-3 bg-[#FAF7F2] border border-[#E8D4C4] rounded-xl text-[11px] text-[#6E655F] flex items-start gap-2">
                  <Shield className="w-3.5 h-3.5 text-[#B3542E] mt-0.5 shrink-0" />
                  <div>
                    <strong className="text-[#211D1A]">Rol Güvenliği:</strong> <em>Analist</em> rolü atanan kişi ürün silemez, fiyatları değiştiremez ve personel şifrelerini göremez. Yalnızca ciro ve analiz grafiklerini inceler.
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsAddingStaff(false)}
                    className="px-4 py-2 border border-[#E7DFD5] rounded-xl text-xs font-medium text-[#6E655F] hover:bg-[#FAF7F2] transition-colors cursor-pointer"
                  >
                    Vazgeç
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#6B46C1] hover:bg-[#553C9A] text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                  >
                    Personeli Kaydet & Yetkilendir
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Staff List Table */}
          <div className="bg-white border border-[#E7DFD5] rounded-2xl overflow-hidden shadow-xs">
            <div className="p-4 sm:p-5 border-b border-[#F0EAE1] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-[#8C827A]" />
                <h4 className="font-serif font-bold text-sm text-[#211D1A]">Yetkili Personel Listesi</h4>
              </div>
              <span className="text-xs text-[#8C827A]">{staffList.length} kayıtlı kullanıcı</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#FAF7F2] text-[#6E655F] text-xs font-medium border-b border-[#E7DFD5]">
                  <tr>
                    <th className="py-3 px-4">Personel & İletişim</th>
                    <th className="py-3 px-4">Sistem Rolü</th>
                    <th className="py-3 px-4">Giriş Şifresi</th>
                    <th className="py-3 px-4">Erişim Sınırı</th>
                    <th className="py-3 px-4 text-right">İşlemler</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F0EAE1]">
                  {staffList.map((member) => {
                    const isSelf = member.id === currentStaff?.id;
                    const isEditing = editingStaffId === member.id;

                    const roleBadge = {
                      admin: { label: 'Yönetici', bg: 'bg-[#FAF0E6]', text: 'text-[#B3542E]', border: 'border-[#E8D4C4]', scope: 'Tüm Sistem (Tam Yetki)' },
                      kitchen: { label: 'Mutfak / KDS', bg: 'bg-[#EBF4FA]', text: 'text-[#2C5282]', border: 'border-[#BEE3F8]', scope: 'Mutfak & İçecek İstasyonları' },
                      editor: { label: 'Mağaza Editörü', bg: 'bg-[#EFF7EE]', text: 'text-[#3D5A40]', border: 'border-[#C6E2C3]', scope: 'Canlı Vitrin Düzenleyicisi' },
                      analyst: { label: 'Finans & Analist', bg: 'bg-[#F7F4FD]', text: 'text-[#6B46C1]', border: 'border-[#D0C2EE]', scope: 'Salt-Okunur Ciro & Raporlar' },
                    }[member.role];

                    return (
                      <tr key={member.id} className="hover:bg-[#FAF7F2]/50 transition-colors">
                        
                        {/* Name & Phone */}
                        <td className="py-3.5 px-4">
                          <div className="font-semibold text-[#211D1A] flex items-center gap-1.5">
                            <span>{member.name}</span>
                            {isSelf && (
                              <span className="text-[10px] bg-[#211D1A] text-white px-1.5 py-0.5 rounded font-normal">
                                Siz
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] text-[#8C827A]">{member.phone}</span>
                        </td>

                        {/* Role Badge */}
                        <td className="py-3.5 px-4">
                          {isEditing ? (
                            <select
                              value={editRole}
                              onChange={(e) => setEditRole(e.target.value as StaffRole)}
                              className="px-2 py-1 bg-white border border-[#E7DFD5] rounded-lg text-xs font-semibold text-[#211D1A]"
                            >
                              <option value="analyst">Finans & Analist</option>
                              <option value="kitchen">Mutfak / KDS</option>
                              <option value="editor">Mağaza Editörü</option>
                              <option value="admin">Yönetici</option>
                            </select>
                          ) : (
                            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold border ${roleBadge.bg} ${roleBadge.text} ${roleBadge.border}`}>
                              {roleBadge.label}
                            </span>
                          )}
                        </td>

                        {/* Passcode */}
                        <td className="py-3.5 px-4">
                          {isEditing ? (
                            <input
                              type="text"
                              value={editPasscode}
                              onChange={(e) => setEditPasscode(e.target.value)}
                              className="px-2 py-1 bg-white border border-[#E7DFD5] rounded-lg text-xs font-mono w-28 text-[#211D1A]"
                            />
                          ) : (
                            <div className="flex items-center gap-1.5 text-xs font-mono text-[#4A423D] bg-[#FAF7F2] px-2 py-1 rounded-md border border-[#E7DFD5] w-fit">
                              <KeyRound className="w-3 h-3 text-[#8C827A]" />
                              <span>{member.passcode}</span>
                            </div>
                          )}
                        </td>

                        {/* Scope */}
                        <td className="py-3.5 px-4 text-[11px] text-[#6E655F]">
                          {roleBadge.scope}
                        </td>

                        {/* Actions */}
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            {isEditing ? (
                              <>
                                <button
                                  type="button"
                                  onClick={() => handleSaveStaffEdit(member.id)}
                                  className="px-2.5 py-1 bg-[#6B46C1] hover:bg-[#553C9A] text-white rounded-lg text-[11px] font-semibold transition-colors cursor-pointer"
                                >
                                  Kaydet
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setEditingStaffId(null)}
                                  className="px-2 py-1 border border-[#E7DFD5] rounded-lg text-[11px] text-[#8C827A] hover:bg-[#FAF7F2] cursor-pointer"
                                >
                                  İptal
                                </button>
                              </>
                            ) : (
                              <>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setEditingStaffId(member.id);
                                    setEditPasscode(member.passcode);
                                    setEditRole(member.role);
                                  }}
                                  className="p-1.5 rounded-lg border border-[#E7DFD5] hover:bg-[#FAF7F2] text-[#8C827A] hover:text-[#211D1A] transition-colors cursor-pointer"
                                  title="Şifre veya Rolü Düzenle"
                                >
                                  <Edit2 className="w-3.5 h-3.5" />
                                </button>
                                {!isSelf && (
                                  <button
                                    type="button"
                                    onClick={() => handleDeleteStaff(member.id)}
                                    className="p-1.5 rounded-lg border border-[#E7DFD5] hover:border-red-300 hover:bg-red-50 text-[#8C827A] hover:text-red-600 transition-colors cursor-pointer"
                                    title="Yetkiyi Kaldır"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                )}
                              </>
                            )}
                          </div>
                        </td>

                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* RBAC Matrix Explanatory Card */}
          <div className="bg-[#FAF7F2] border border-[#E8D4C4] rounded-2xl p-5 space-y-3">
            <h4 className="font-serif font-bold text-xs text-[#211D1A] flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-[#B3542E]" />
              <span>Yetki Ayrımı (Least Privilege) Güvenlik Matrisi</span>
            </h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              <div className="p-3 bg-white rounded-xl border border-[#E7DFD5] space-y-1">
                <span className="font-bold text-[#B3542E] block">Yönetici</span>
                <p className="text-[11px] text-[#6E655F]">
                  Atölye/kafe ürünleri ekleme-çıkarma, fiyat ve stok değişimi, mekan kuralları, tüm personel şifreleri ve tema özelleştirme.
                </p>
              </div>

              <div className="p-3 bg-white rounded-xl border border-[#E7DFD5] space-y-1">
                <span className="font-bold text-[#2C5282] block">Mutfak / KDS</span>
                <p className="text-[11px] text-[#6E655F]">
                  Yalnızca gelen siparişleri görme, hazırlık aşamalarını (Hazırlanıyor, Masaya Çıktı, Teslim Edildi) güncelleme.
                </p>
              </div>

              <div className="p-3 bg-white rounded-xl border border-[#E7DFD5] space-y-1">
                <span className="font-bold text-[#3D5A40] block">Mağaza Editörü</span>
                <p className="text-[11px] text-[#6E655F]">
                  Müşteri vitrini manşet metinleri, duyuru şeridi, SSS soruları ve sayfa blok sıralamaları. Yönetici paneline erişemez.
                </p>
              </div>

              <div className="p-3 bg-white rounded-xl border border-[#E7DFD5] space-y-1">
                <span className="font-bold text-[#6B46C1] block">Finans & Analist</span>
                <p className="text-[11px] text-[#6E655F]">
                  Kasa cirosu, ortalama sipariş tutarı, saatlik pik yoğunluk ve en çok satan modeller. Fiyat, stok ve şifrelere erişemez.
                </p>
              </div>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
