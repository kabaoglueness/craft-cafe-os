import { WorkshopItem, CafeItem, ActiveOrder, VenueSettings } from '../types';

export const INITIAL_VENUE_SETTINGS: VenueSettings = {
  venueName: 'Atelier & Brew',
  minDrinkRequired: true,
  requireWorkshopItem: false,
  allowCustomNotes: true,
  tableCount: 18,
  venueNotice: 'Masa süresi 90 dakikadır. Boya kiti, fırçalar, su kabı ve önlük siparişinizle masanıza ücretsiz getirilir.',
  storefront: {
    heroTitle: 'Sanatını Seç, Kahveni Yudumla',
    heroSubtitle: 'Ham heykel ve seramik modellerini seçin; boya seti, fırçalar ve kahveniz masanıza servis edilsin.',
    heroBadge: 'Atölye & Nitelikli Kahve Alanı',
    ctaButtonText: 'Masa Menüsünü Aç & Sipariş Ver',
    secondaryButtonText: '3 Adımda Rehber',
    showSecondaryButton: true,
    heroImageUrl: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1200&auto=format&fit=crop&q=80',
    showHeroImage: true,
    allMenuButtonText: 'Tüm Menüyü İncele',
    itemCardButtonText: 'Sipariş Ver',
    locationButtonText: 'Haritada Göster',
    fullAddress: 'Caferağa Mah. Moda Cad. No: 42/A, Kadıköy, İstanbul',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Moda+Caddesi+Kadikoy+Istanbul',
    showSteps: true,
    showFeatured: true,
    showHoursAndLocation: true,
    workingHours: 'Her gün 10:00 - 22:00',
    district: 'Kadıköy, Moda',
    accentTheme: 'terracotta',
    sectionsList: [
      { id: 'steps', title: '3 Adımda Atölye Rehberi', subtitle: 'Nasıl çalışır kartları', enabled: true },
      { id: 'featured', title: 'Öne Çıkan Modeller Vitrini', subtitle: 'Popüler heykeller bölümü', enabled: true },
      { id: 'hours_location', title: 'Seans Saatleri & Konum', subtitle: 'Adres ve çalışma saatleri', enabled: true },
      { id: 'faq', title: 'Sıkça Sorulan Sorular', subtitle: 'Boya, kuruma ve rezervasyon bilgileri', enabled: true },
      { id: 'private_events', title: 'Grup & Doğum Günü Atölyeleri', subtitle: 'Toplu etkinlik duyuru kartı', enabled: false }
    ],
    faqItems: [
      { question: 'Önceden heykel boyama deneyimim olması gerekir mi?', answer: 'Kesinlikle gerekmez. Masanıza fırçalar, 6 renk akrilik set ve başlangıç rehberiyle birlikte tüm malzemeler eksiksiz getirilir.' },
      { question: 'Boyadığım heykeli hemen yanımda götürebilir miyim?', answer: 'Evet, su bazlı akrilik boyalarımız yaklaşık 15-20 dakikada kurur. Çıkmadan önce masanıza vernik sıkılıp özel kraft kutusunda teslim edilir.' },
      { question: 'Rezervasyon yaptırmadan gelebilir miyiz?', answer: 'Hafta içi genellikle çat kapı yer bulunur; hafta sonu pik saatler için önceden aramanızı öneririz.' }
    ],
    privateEventText: 'Doğum günü, şirket içi motivasyon veya arkadaş gruplarınız için 10 kişiden 25 kişiye kadar kapalı atölye seansları düzenliyoruz. Detaylar ve rezervasyon için iletişime geçebilirsiniz.'
  },
  theme: {
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
  }
};

export const WORKSHOP_CATEGORIES = [
  { id: 'all', label: 'Tüm Atölyeler' },
  { id: 'sculpture', label: 'Heykel Boyama' },
  { id: 'ceramic', label: 'Seramik & Çini' },
  { id: 'canvas', label: 'Tuval & Akrilik' },
  { id: 'candle', label: 'Soya Mum & Koku' },
] as const;

export const CAFE_CATEGORIES = [
  { id: 'all', label: 'Tüm İçecek ve Tatlılar' },
  { id: 'espresso_bar', label: 'Sıcak Kahveler' },
  { id: 'iced_coffee', label: 'Soğuk Kahveler' },
  { id: 'tea_herbal', label: 'Bitki Çayları & Matcha' },
  { id: 'cold_refreshers', label: 'Ev Yapımı İçecekler' },
  { id: 'bakery_dessert', label: 'Fırın & Tatlı' },
] as const;

export const INITIAL_WORKSHOP_ITEMS: WorkshopItem[] = [
  {
    id: 'sculpt-david',
    category: 'sculpture',
    title: 'David Büstü',
    description: 'Beyaz döküm alçı büst. 6 renk akrilik tüp, 2 fırça, ahşap palet ve vernikle teslim edilir.',
    image: 'https://images.unsplash.com/photo-1576014131341-fe1486fb2475?w=600&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1576014131341-fe1486fb2475?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&auto=format&fit=crop&q=80'
    ],
    badge: 'Çok Satan',
    difficulty: 'Orta',
    estimatedMinutes: 60,
    isAvailable: true,
    stockCount: 14,
    totalSold: 42,
    sizes: [
      { id: 's-small', name: 'Küçük Boy (14 cm)', dimensions: '14 x 9 cm', price: 340 },
      { id: 's-med', name: 'Standart Boy (20 cm)', dimensions: '20 x 13 cm', price: 460, isPopular: true },
      { id: 's-large', name: 'Büyük Boy (28 cm)', dimensions: '28 x 18 cm', price: 620 },
    ],
    includedKit: [
      '6 Renk Akrilik Boya Tüpü',
      '2 Adet Sanat Fırçası (Detay ve Yassı)',
      'Vernik Süngeri',
      'Ahşap Boya Paleti ve Pamuklu Önlük'
    ],
    availableExtras: [
      { id: 'ext-gold', name: 'Altın Varak ve Yapıştırıcı Kiti', price: 85, category: 'paint' },
      { id: 'ext-neon', name: 'Ekstra 3’lü Neon Boya', price: 65, category: 'paint' },
      { id: 'ext-finebrush', name: '00 Numara İnce Detay Fırçası', price: 45, category: 'brush' },
      { id: 'ext-giftbox', name: 'Kraft Hediye Kutusu', price: 50, category: 'addon' }
    ]
  },
  {
    id: 'sculpt-balloon-dog',
    category: 'sculpture',
    title: 'Balon Köpek Heykeli',
    description: 'Pürüzsüz beyaz alçı figür. Tek renk veya geçişli zemin boyamalarına uygundur.',
    image: 'https://images.unsplash.com/photo-1569173112611-52a7cd38bea9?w=600&auto=format&fit=crop&q=80',
    badge: 'Favori',
    difficulty: 'Başlangıç',
    estimatedMinutes: 45,
    isAvailable: true,
    stockCount: 8,
    totalSold: 31,
    sizes: [
      { id: 'bd-small', name: 'Küçük Boy (12 cm)', dimensions: '12 x 10 cm', price: 310 },
      { id: 'bd-med', name: 'Orta Boy (18 cm)', dimensions: '18 x 15 cm', price: 430, isPopular: true },
    ],
    includedKit: [
      '6 Renk Akrilik Boya',
      'Fırça Seti',
      'Parlak Vernik Süngeri',
      'Masa Matı ve Önlük'
    ],
    availableExtras: [
      { id: 'ext-chrome', name: 'Gümüş Metalik Boya', price: 75, category: 'paint' },
      { id: 'ext-giftbox', name: 'Kraft Hediye Kutusu', price: 50, category: 'addon' }
    ]
  },
  {
    id: 'sculpt-venus',
    category: 'sculpture',
    title: 'Venüs Heykeli',
    description: 'Klasik döküm büst. Detaylı kumaş kıvrımları ve pastel tonlara uygun pürüzsüz yüzey.',
    image: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=600&auto=format&fit=crop&q=80',
    difficulty: 'İleri Düzey',
    estimatedMinutes: 75,
    isAvailable: true,
    stockCount: 3,
    totalSold: 18,
    sizes: [
      { id: 'v-small', name: 'Küçük Boy (16 cm)', dimensions: '16 x 8 cm', price: 360 },
      { id: 'v-med', name: 'Büyük Boy (24 cm)', dimensions: '24 x 12 cm', price: 490, isPopular: true },
    ],
    includedKit: [
      'Toprak ve Pastel 6 Akrilik Boya',
      'İki Farklı Boy Sanat Fırçası',
      'İpek Mat Vernik',
      'Palet ve Koruyucu Önlük'
    ],
    availableExtras: [
      { id: 'ext-gold', name: 'Altın Varak Seti', price: 85, category: 'paint' },
      { id: 'ext-finebrush', name: 'İnce Detay Fırçası', price: 45, category: 'brush' }
    ]
  },
  {
    id: 'sculpt-bearbrick',
    category: 'sculpture',
    title: 'Sokak Sanatı Figürü',
    description: 'Akıtma veya serbest fırça desenleri uygulamak için pürüzsüz zeminli ayıcık figürü.',
    image: 'https://images.unsplash.com/photo-1582560475093-ba66accbc424?w=600&auto=format&fit=crop&q=80',
    badge: 'Trend',
    difficulty: 'Başlangıç',
    estimatedMinutes: 40,
    isAvailable: true,
    stockCount: 12,
    totalSold: 26,
    sizes: [
      { id: 'bb-s', name: 'Masa Boyu (15 cm)', dimensions: '15 x 8 cm', price: 330 },
      { id: 'bb-m', name: 'Büyük Boy (23 cm)', dimensions: '23 x 12 cm', price: 470, isPopular: true },
    ],
    includedKit: [
      '3 Hazır Akıtma Boyası',
      'Boya Paleti',
      'Döküm Tepsisi ve Eldiven',
      'Vernik'
    ],
    availableExtras: [
      { id: 'ext-neon', name: 'Fosforlu Döküm Boya Seti', price: 80, category: 'paint' }
    ]
  },
  {
    id: 'ceramic-mug',
    category: 'ceramic',
    title: 'Ham Seramik Kupa',
    description: 'Çarkta çekilmiş bisküvi pişirimi kupa. Fırınlama ve sırlama hizmeti fiyata dahildir.',
    image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600&auto=format&fit=crop&q=80',
    badge: 'Yeni',
    difficulty: 'Başlangıç',
    estimatedMinutes: 50,
    isAvailable: true,
    stockCount: 6,
    totalSold: 22,
    sizes: [
      { id: 'cm-250', name: 'Fincan (220 ml)', price: 320 },
      { id: 'cm-350', name: 'Geniş Kupa (350 ml)', price: 390, isPopular: true }
    ],
    includedKit: [
      'Gıdaya Uygun Seramik Alt Boyaları',
      'Fırça Seti ve Çizim Şablonları',
      'Fırınlama ve Şeffaf Sırlama (1 hafta sonra teslim)'
    ],
    availableExtras: [
      { id: 'ext-stamp', name: 'Harf Damgası Kullanımı', price: 35, category: 'addon' }
    ]
  },
  {
    id: 'canvas-sip-paint',
    category: 'canvas',
    title: 'Kare Tuval ve Şövale',
    description: '30x30 cm pamuklu şasi tuval. Masaüstü şövale ve akrilik palet ile masanıza kurulur.',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&auto=format&fit=crop&q=80',
    difficulty: 'Orta',
    estimatedMinutes: 90,
    isAvailable: true,
    stockCount: 16,
    totalSold: 35,
    sizes: [
      { id: 'cv-30', name: 'Kare Tuval (30x30 cm)', price: 350, isPopular: true },
      { id: 'cv-40', name: 'Geniş Tuval (40x50 cm)', price: 480 }
    ],
    includedKit: [
      'Gerilmiş Pamuklu Tuval',
      'Masaüstü Ahşap Şövale',
      '8 Renk Akrilik Paleti',
      'Fırça Seti ve Önlük'
    ],
    availableExtras: [
      { id: 'ext-texture', name: '3D Doku Harcı (Rölyef)', price: 70, category: 'addon' }
    ]
  },
  {
    id: 'candle-botanical',
    category: 'candle',
    title: 'Botanik Soya Mumu & Koku Atölyesi',
    description: '%100 doğal soya mumu, ahşap fitil, kurutulmuş çiçek yaprakları ve amber cam kavanoz ile masanızda koku tasarımı.',
    image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=600&auto=format&fit=crop&q=80',
    badge: 'Yeni',
    difficulty: 'Başlangıç',
    estimatedMinutes: 45,
    isAvailable: true,
    stockCount: 10,
    totalSold: 29,
    sizes: [
      { id: 'cd-200', name: 'Standart Amber Kavanoz (200 ml)', dimensions: '8 x 7 cm', price: 340, isPopular: true },
      { id: 'cd-350', name: 'Geniş Çift Fitilli Kase (350 ml)', dimensions: '11 x 8 cm', price: 460 },
    ],
    includedKit: [
      'Eritilmiş Doğal Soya Mumu Tabanı',
      'Çıtırtılı Ahşap Fitil ve Metal Sabitleyici',
      'Lavanta ve Sedir Ağacı Esansiyel Yağları',
      'Kurutulmuş Portakal Dilimleri ve Lavanta Başakları',
      'Kişiselleştirilebilir Kraft Etiket'
    ],
    availableExtras: [
      { id: 'ext-vanilla', name: 'Ekstra Vanilya & Tarçın Esansı', price: 50, category: 'addon' },
      { id: 'ext-giftbox', name: 'Kraft Hediye Kutusu ve Mühür', price: 50, category: 'addon' }
    ]
  }
];

export const INITIAL_CAFE_ITEMS: CafeItem[] = [
  {
    id: 'cafe-flat-white',
    category: 'espresso_bar',
    name: 'Flat White',
    description: 'Çift shot espresso ve mikro köpüklü sıcak süt.',
    price: 135,
    stockCount: 50,
    totalSold: 88,
    image: 'https://images.unsplash.com/photo-1577968897966-3d4325b36b61?w=600&auto=format&fit=crop&q=80',
    isAvailable: true,
    options: [
      {
        id: 'milk-choice',
        name: 'Süt Tercihi',
        choices: [
          { id: 'whole', label: 'Tam Yağlı İnek Sütü', priceDelta: 0 },
          { id: 'oat', label: 'Yulaf Sütü (Bitkisel)', priceDelta: 25 },
          { id: 'almond', label: 'Badem Sütü', priceDelta: 30 }
        ]
      }
    ]
  },
  {
    id: 'cafe-iced-spanish-latte',
    category: 'iced_coffee',
    name: 'Soğuk İspanyol Lattesi',
    description: 'Karamelize süt, çift shot espresso ve buz.',
    price: 155,
    stockCount: 35,
    totalSold: 64,
    badge: 'Favori',
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=600&auto=format&fit=crop&q=80',
    isAvailable: true,
    options: [
      {
        id: 'sweetness',
        name: 'Tatlılık Seviyesi',
        choices: [
          { id: 'regular', label: 'Standart', priceDelta: 0 },
          { id: 'less-sweet', label: 'Az Tatlı', priceDelta: 0 }
        ]
      }
    ]
  },
  {
    id: 'cafe-matcha-latte',
    category: 'tea_herbal',
    name: 'Soğuk Matcha Latte',
    description: 'Japonya Uji bölgesi birinci hasat yeşil çay, vanilya ve soğuk süt.',
    price: 165,
    stockCount: 22,
    totalSold: 39,
    badge: 'Özel Karışım',
    image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=600&auto=format&fit=crop&q=80',
    isAvailable: true,
    options: [
      {
        id: 'milk-choice',
        name: 'Süt Tercihi',
        choices: [
          { id: 'oat', label: 'Yulaf Sütü', priceDelta: 0 },
          { id: 'coconut', label: 'Hindistan Cevizi Sütü', priceDelta: 20 },
          { id: 'whole', label: 'İnek Sütü', priceDelta: 0 }
        ]
      }
    ]
  },
  {
    id: 'cafe-berry-hibiscus',
    category: 'cold_refreshers',
    name: 'Orman Meyveli Hibiskus Çayı',
    description: 'Kafeinsiz, taze nane ve böğürtlen taneleriyle demlenmiş soğuk çay.',
    price: 140,
    stockCount: 30,
    totalSold: 47,
    isAvailable: true,
    image: 'https://images.unsplash.com/photo-1556881286-fc6915169721?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'cafe-san-sebastian',
    category: 'bakery_dessert',
    name: 'San Sebastian Cheesecake',
    description: 'Akışkan iç doku, sıcak Belçika çikolatası ile servis edilir.',
    price: 185,
    stockCount: 8,
    totalSold: 34,
    badge: 'Şefin Seçimi',
    isAvailable: true,
    image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'cafe-croissant-pistachio',
    category: 'bakery_dessert',
    name: 'Antep Fıstıklı Kruvasan',
    description: 'Tereyağlı çıtır kruvasan, ev yapımı fıstık kreması dolgusuyla.',
    price: 175,
    stockCount: 4,
    totalSold: 28,
    isAvailable: true,
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&auto=format&fit=crop&q=80'
  }
];

export const INITIAL_ORDERS: ActiveOrder[] = [
  {
    id: 'SIP-401',
    tableNumber: 4,
    customerName: 'Melis & Berk',
    createdAt: '12 dk önce',
    status: 'preparing',
    workshopStatus: 'teslim_edildi',
    kitchenStatus: 'teslim_edildi',
    items: [
      {
        itemType: 'workshop',
        cartItemId: 'c-1',
        workshopItem: INITIAL_WORKSHOP_ITEMS[0],
        selectedSize: INITIAL_WORKSHOP_ITEMS[0].sizes[1],
        selectedExtras: [INITIAL_WORKSHOP_ITEMS[0].availableExtras[0]],
        quantity: 1,
        unitPrice: 545,
        totalPrice: 545
      },
      {
        itemType: 'cafe',
        cartItemId: 'c-3',
        cafeItem: INITIAL_CAFE_ITEMS[1],
        selectedOptions: {
          'sweetness': { id: 'less-sweet', label: 'Az Tatlı', priceDelta: 0 }
        },
        quantity: 2,
        unitPrice: 155,
        totalPrice: 310
      }
    ],
    totalAmount: 855,
    notes: 'Boya kiti için ekstra peçete rica edildi.'
  },
  {
    id: 'SIP-402',
    tableNumber: 7,
    customerName: 'Zeynep Kaya',
    createdAt: '4 dk önce',
    status: 'received',
    workshopStatus: 'hazirlaniyor',
    kitchenStatus: 'hazirlaniyor',
    items: [
      {
        itemType: 'workshop',
        cartItemId: 'c-4',
        workshopItem: INITIAL_WORKSHOP_ITEMS[4],
        selectedSize: INITIAL_WORKSHOP_ITEMS[4].sizes[1],
        selectedExtras: [INITIAL_WORKSHOP_ITEMS[4].availableExtras[0]],
        quantity: 1,
        unitPrice: 425,
        totalPrice: 425
      },
      {
        itemType: 'cafe',
        cartItemId: 'c-5',
        cafeItem: INITIAL_CAFE_ITEMS[0],
        selectedOptions: {
          'milk-choice': { id: 'oat', label: 'Yulaf Sütü', priceDelta: 25 }
        },
        quantity: 1,
        unitPrice: 160,
        totalPrice: 160
      }
    ],
    totalAmount: 585
  }
];
