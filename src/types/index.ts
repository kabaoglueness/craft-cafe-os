export type WorkshopCategory = 
  | 'sculpture'    // Heykel Boyama
  | 'ceramic'      // Seramik & Çini
  | 'canvas'       // Tuval & Resim
  | 'candle'       // Mum & Koku Atölyesi
  | 'punch';       // Punch & Tufting

export interface WorkshopSizeOption {
  id: string;
  name: string;        // örn. "Küçük Boy (14 cm)", "Standart Boy (20 cm)"
  dimensions?: string;
  price: number;       // TL
  isPopular?: boolean;
}

export interface WorkshopExtraOption {
  id: string;
  name: string;
  price: number;
  category: 'paint' | 'brush' | 'finish' | 'addon';
}

export interface WorkshopItem {
  id: string;
  category: WorkshopCategory;
  title: string;
  description: string;
  image: string;
  images?: string[]; // Çoklu fotoğraf galerisi (ham alçı, boyalı örnek, detaylar)
  badge?: string;
  difficulty: 'Başlangıç' | 'Orta' | 'İleri Düzey';
  estimatedMinutes: number;
  sizes: WorkshopSizeOption[];
  includedKit: string[];
  availableExtras: WorkshopExtraOption[];
  isAvailable?: boolean;
  stockCount: number;
  totalSold?: number;
}

export type CafeCategory = 
  | 'espresso_bar'
  | 'iced_coffee'
  | 'tea_herbal'
  | 'cold_refreshers'
  | 'bakery_dessert';

export interface CafeItemOptionChoice {
  id: string;
  label: string;
  priceDelta: number;
}

export interface CafeItemOption {
  id: string;
  name: string;
  choices: CafeItemOptionChoice[];
}

export interface CafeItem {
  id: string;
  category: CafeCategory;
  name: string;
  description: string;
  price: number;
  image: string;
  badge?: string;
  options?: CafeItemOption[];
  isAvailable?: boolean;
  stockCount: number;
  totalSold?: number;
}

export interface CartWorkshopSelection {
  itemType: 'workshop';
  cartItemId: string;
  workshopItem: WorkshopItem;
  selectedSize: WorkshopSizeOption;
  selectedExtras: WorkshopExtraOption[];
  specialNotes?: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface CartCafeSelection {
  itemType: 'cafe';
  cartItemId: string;
  cafeItem: CafeItem;
  selectedOptions: Record<string, CafeItemOptionChoice>;
  specialNotes?: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export type CartItem = CartWorkshopSelection | CartCafeSelection;

export type OrderStatus = 'received' | 'preparing' | 'served' | 'completed' | 'cancelled';
export type StationProgressStatus = 'hazirlaniyor' | 'yola_cikti' | 'teslim_edildi';
export type WorkshopStationStatus = StationProgressStatus | 'masaya_teslim' | 'boyaniyor' | 'vernik_kurutma' | 'paketlendi';
export type KitchenStationStatus = StationProgressStatus | 'kuyrukta' | 'servis_edildi';

export interface ActiveOrder {
  id: string;
  tableNumber: number;
  customerName: string;
  createdAt: string;
  status: OrderStatus;
  items: CartItem[];
  totalAmount: number;
  workshopStatus: WorkshopStationStatus;
  kitchenStatus: KitchenStationStatus;
  notes?: string;
}

export type StaffRole = 'admin' | 'kitchen' | 'editor' | 'analyst';

export interface StaffUser {
  id: string;
  name: string;
  passcode: string;
  role: StaffRole;
  phone: string;
}

export type ThemePreset = 'terracotta' | 'sage_olive' | 'midnight_espresso';
export type TypographyChoice = 'serif_classic' | 'sans_modern';
export type HeadingFontChoice = 'serif_cormorant' | 'serif_playfair' | 'serif_lora' | 'sans_jakarta' | 'sans_inter';
export type BodyFontChoice = 'sans_inter' | 'sans_jakarta' | 'serif_lora';
export type ThemeTargetScope = 'all' | 'storefront_only' | 'admin_only';

export interface ThemeConfig {
  preset: ThemePreset;
  fontFamily: TypographyChoice;
  headingFont?: HeadingFontChoice;
  bodyFont?: BodyFontChoice;
  scope: ThemeTargetScope;
  primaryColor: string;          // Ana Vurgu Rengi
  secondaryColor?: string;       // İkincil Renk (Rozet, çizgi)
  cardColor?: string;            // Kart / Yüzey Rengi
  textColor?: string;            // Ana Metin & Başlık Rengi
  backgroundColor: string;       // Sayfa Zemini
}

export type StorefrontSectionId = 'steps' | 'featured' | 'hours_location' | 'faq' | 'private_events';

export interface StorefrontSectionItem {
  id: StorefrontSectionId;
  title: string;
  subtitle: string;
  enabled: boolean;
}

export interface StorefrontFaqItem {
  question: string;
  answer: string;
}

export interface StorefrontConfig {
  heroTitle: string;
  heroSubtitle: string;
  heroBadge: string;
  ctaButtonText: string;
  secondaryButtonText?: string;      // İkincil Buton (örn. "3 Adımda Atölye")
  showSecondaryButton?: boolean;
  heroImageUrl?: string;             // Hero görseli / afiş
  showHeroImage?: boolean;
  allMenuButtonText?: string;        // "Tüm Menüyü İncele" butonu
  itemCardButtonText?: string;       // "Sipariş Ver →" butonu
  locationButtonText?: string;       // "Yol Tarifi & Harita" butonu
  googleMapsUrl?: string;            // Google Maps direkt bağlantısı
  fullAddress?: string;              // Tam açık adres
  showSteps: boolean;
  showFeatured: boolean;
  showHoursAndLocation: boolean;
  workingHours: string;
  district: string;
  accentTheme: 'terracotta' | 'olive' | 'espresso';
  sectionsList?: StorefrontSectionItem[];
  faqItems?: StorefrontFaqItem[];
  privateEventText?: string;
  privateEventImageUrl?: string;
}

export interface VenueSettings {
  venueName: string;
  minDrinkRequired: boolean;         // Masada en az 1 içecek zorunluluğu
  requireWorkshopItem: boolean;      // Masada en az 1 atölye/heykel zorunluluğu
  allowCustomNotes: boolean;         // Özel not girişi izni
  tableCount: number;                // Mekandaki toplam masa adedi
  venueNotice: string;               // Müşterilere gösterilen mekan bilgilendirme notu
  storefront: StorefrontConfig;      // Görsel düzenleme konfigürasyonu
  theme: ThemeConfig;                // Şablon, renk ve tipografi konfigürasyonu
}
