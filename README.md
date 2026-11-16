# Atelier & Brew — Workshop & Specialty Cafe Ecosystem

[![Next.js 16](https://img.shields.io/badge/Next.js-16.0.3-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Turbopack](https://img.shields.io/badge/Turbopack-Enabled-000000?style=flat-square&logo=vercel)](https://turbo.build/)
[![License: MIT](https://img.shields.io/badge/License-MIT-emerald?style=flat-square)](LICENSE)

> **Zanaat ve Nitelikli Kahvenin Fiziksel Operasyon Ekosistemi:**  
> Ham seramik, heykel boyama, tuval ve koku atölyeleriyle özel demleme kahve barını aynı masa deneyiminde buluşturan; müşteri QR sipariş akışından çok istasyonlu KDS ekranlarına, kodsuz görsel vitrin editöründen akrilik stand baskı motoruna kadar uçtan uca tasarlanmış hibrit işletim sistemi.

---

## 🎨 Tasarım Felsefesi: Anti-Slop & Craft-Floor

Bu proje, geleneksel şablon veya yapay zeka arayüzlerinin aksine **gerçek bir fiziksel atölye-kafe operasyonunun ("craft-floor")** saha ihtiyaçlarına göre inşa edilmiştir:

1. **Craft-Floor Gerçekliği:** Masalarda çamur, boya ve fırça bulunur; müşterinin elleri ıslak veya boyalıdır. Arayüzler göz boyayan süsler değil; tek dokunuşla çalışan, milimetrik ergonomiye sahip butonlar ve net tipografik hiyerarşiler sunar.
2. **Kurumsal & Sakin Tipografi:** Yapay zeka klişesi baloncuklu sans-serif fontlar yerine endüstri standardı nötr sans (`Inter`) ve zanaatkar ruhu yansıtan asil serif (`Cormorant Garamond`) dengesi.
3. **Sıfır Gürültü (Zero-Slop UI):** Anlamsız büyük harf kicker etiketleri (`uppercase tracking-wider`), yanıp sönen neon noktalar ve süslü jargonlar ayıklanmış; her ekranın bir sonraki mantıksal eylemi doğrudan yönlendirmesi sağlanmıştır.
4. **Fiziksel POS Uyumu:** Müşteriden gereksiz kart formu istemek yerine, deneyim sonunda masaya gelecek kablosuz POS veya kasadan ödeme modelini şeffaf şekilde haber verir.

---

## 🚀 Öne Çıkan Özellikler

### 1. Masaya Özel Canlı QR Menü & Sipariş Akışı
- URL parametrelerinden (`?table=4`, `?masa=7`) masa numarasını otomatik algılama ve seans boyunca koruma.
- Heykel ve seramiklerde boy, ebat, dahil edilen kitler ve opsiyonel eklentiler (altın varak kiti, detay fırçaları, mühürlü kraft hediye kutusu).
- İçeceklerde süt türü (yulaf, badem, hindistan cevizi) ve şeker oranı kişiselleştirmeleri.
- **Mekan Kuralları Motoru:** Masada en az 1 içecek ve atölye parçası zorunluluğunu anlık denetleyen nazik rehberlik mantığı.

### 2. Canlı Müşteri Sipariş Takip Ekranı
- Müşterinin telefonundan siparişin anlık ilerlemesini adım adım izlemesi.
- **Atölye İstasyonu:** `Boya Kiti Hazırlanıyor` ➔ `Masaya Çıktı` ➔ `Teslim Edildi`.
- **Kahve Barı:** `Özel Demleme Başladı` ➔ `Servise Çıktı` ➔ `Afiyet Olsun`.

### 3. Çift İstasyonlu Kasiyer & Mutfak KDS (Kitchen Display System)
- Atölye hazırlık masası ve espresso barı için bağımsız veya birleşik filtreleme.
- Tek dokunuşla 3 adımlı çizgisel durum ilerletme.
- Masa kalktığında tek tıkla adisyonu arşivleme ve masayı yeni konuklara açma.

### 4. Kodsuz Görsel Mağaza Düzenleyicisi (Store Customizer)
- Hero afişi, buton metinleri, rozetler ve çalışma saatlerini canlı önizlemeyle düzenleme.
- **Dinamik Bölüm Sıralaması:** Sayfa bloklarını (Rehber, Öne Çıkanlar, Konum, SSS, Özel Etkinlikler) yukarı/aşağı oklarla yeniden sıralama veya tek tıkla gizleme/açma.
- Canlı Masaüstü ve Mobil simülasyon çerçevesi.

### 5. Çoklu Fotoğraf Galerisi & Akıllı Canvas Sıkıştırma
- Yeni model eklerken tekli veya çoklu fotoğraf yükleme.
- `HTML5 Canvas API` ile tarayıcı tarafında otomatik yeniden boyutlandırma ve WebP/JPEG optimizasyonu; depolama ve bant genişliğini korur.

### 6. Akrilik Masa QR Standı Üretim Motoru (Print Engine)
- Kafe masalarındaki akrilik T-standlar için yüksek çözünürlüklü vektörel QR kod ve zanaat tipografili baskı şablonu üretimi.
- Masa numarası seçimiyle doğrudan tarayıcıdan yazdırmaya veya PDF olarak kaydetmeye hazır baskı düzeni.

### 7. Rol Bazlı Yetki Yönetimi (RBAC & Strict Isolation)
- Şifreli tek giriş alanı ile personele özel rol ataması.
- **Yönetici (Admin):** Tam yetki, ürün ekleme/silme, fiyat değiştirme, personel yönetimi, mekan kuralları.
- **Mutfak / KDS:** Yalnızca istasyon sipariş hazırlık ekranı.
- **Vitrin Editörü:** Yalnızca görsel mağaza düzenleyicisi; ciro, fiyat ve müşteri verilerine erişim katı şekilde engellidir.
- **Finans & Analist:** Salt-okunur ciro, sepet ortalaması ve saatlik yoğunluk raporları; ürün silemez, şifreleri göremez.

---

## 🔐 Demo Personel Profilleri

Personel Portalı'na giriş yapmak için aşağıdaki demo profillerini veya paneldeki hızlı kısayolları kullanabilirsiniz:

| Rol | Ad Soyad / Ünvan | Giriş Şifresi | Yetki Kapsamı |
| :--- | :--- | :---: | :--- |
| **Yönetici** | Ahmet Yılmaz (İşletme Yöneticisi) | `yonetici` | Tam Yetki, Envanter, Fiyatlar, Personel, Ayarlar |
| **Mutfak & KDS** | Deniz Kaya (KDS Sorumlusu) | `mutfak` | Atölye & Mutfak Sipariş İlerleme Ekranı |
| **Vitrin Editörü** | Zeynep Demir (Vitrin Editörü) | `editor` | Görsel Mağaza Düzenleyicisi & Sıralama |
| **Finans & Analist** | Can Arslan (Finans & Analist) | `analist` | Salt-Okunur Gelir Raporları & Saatlik Yoğunluk |

---

## 🛠️ Teknoloji Mimarisi

- **Framework:** [Next.js 16 (App Router)](https://nextjs.org/) + [React 19](https://react.dev/)
- **Derleyici & Paketleyici:** [Turbopack](https://turbo.build/)
- **Dil:** [TypeScript](https://www.typescriptlang.org/) (Katı tip güvenliği)
- **Stil & Tasarım Sistemi:** [Tailwind CSS v4](https://tailwindcss.com/)
- **İkonografi:** [Lucide Icons](https://lucide.dev/)
- **Medya İşleme:** HTML5 Canvas API (İstemci taraflı fotoğraf sıkıştırma & QR stand render)
- **Durum Yönetimi:** React Context API + LocalStorage State Machine (Versiyonlu hidrasyon)

---

## 📁 Proje Dizin Yapısı

```
workshop-cafe/
├── public/                 # Statik SVG ve ikon varlıkları
├── src/
│   ├── app/
│   │   ├── favicon.ico
│   │   ├── globals.css     # Tailwind v4 tema değişkenleri ve tipografi
│   │   ├── layout.tsx      # Root layout, meta etiketleri ve fontlar
│   │   └── page.tsx        # Ana durum orkestrasyon sayfası
│   ├── components/
│   │   ├── AdminGuide.tsx          # Operasyonel personel el kitabı & changelog
│   │   ├── AdminPortal.tsx         # Yönetici konsolu, envanter, RBAC ve QR üretici
│   │   ├── AnalyticsDashboard.tsx  # Ciro, atölye/kafe kırılımı ve saatlik yoğunluk
│   │   ├── CafeModal.tsx           # İçecek detay ve süt/tatlılık seçim penceresi
│   │   ├── CartDrawer.tsx          # Sepet çekmecesi ve mekan kuralı doğrulayıcı
│   │   ├── CustomerMenu.tsx        # Kategori filtreli müşteri menüsü
│   │   ├── Header.tsx              # Üst navigasyon barı ve masa rozeti
│   │   ├── OrderTrackingView.tsx   # Canlı müşteri sipariş takip ekranı
│   │   ├── StaffDashboard.tsx      # Kasiyer ve mutfak KDS hazırlık ekranı
│   │   ├── StaffLogin.tsx          # Şifreli personel giriş portali
│   │   ├── StoreCustomizer.tsx     # Kodsuz görsel vitrin düzenleyicisi
│   │   ├── StoreLanding.tsx        # Karşılama, hikaye ve vitrin ekranı
│   │   └── WorkshopModal.tsx       # Atölye boy/eklenti seçim penceresi
│   ├── context/
│   │   └── AppContext.tsx          # Merkezi durum, sepet, siparişler ve auth
│   ├── data/
│   │   ├── guideData.ts            # Sürüm notları ve personel rehber konuları
│   │   └── mockData.ts             # Gerçekçi atölye & kafe envanteri, menü ve siparişler
│   ├── types/
│   │   └── index.ts                # TypeScript arayüz ve tip tanımları
│   └── utils/
│       ├── imageCompression.ts     # Canvas tabanlı istemci resim sıkıştırma
│       └── orderStatus.ts          # KDS sipariş adımları ve rozet stilleri
├── docs/
│   └── DESIGN_SPEC_ANTI_SLOP.md   # Kurumsal tasarım manifestosu ve şartnamesi
├── .env.example            # Örnek çevre değişkenleri
├── .gitignore              # Güvenli git dışlama kuralları
├── package.json
└── README.md
```

---

## ⚡ Hızlı Kurulum & Yerel Çalıştırma

### Gereksinimler
- Node.js 18.18+ veya Node.js 20+
- npm, pnpm veya yarn

### 1. Depoyu Klonlayın
```bash
git clone https://github.com/username/workshop-cafe.git
cd workshop-cafe
```

### 2. Bağımlılıkları Yükleyin
```bash
npm install
```

### 3. Geliştirme Sunucusunu Başlatın
```bash
npm run dev
```

Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresini açarak uygulamayı deneyimleyebilirsiniz.

Masa numarası simülasyonu için URL'ye masa parametresi ekleyebilirsiniz:
- [http://localhost:3000?table=4](http://localhost:3000?table=4) (4 Numaralı Masa)
- [http://localhost:3000?table=12](http://localhost:3000?table=12) (12 Numaralı Masa)

### 4. Üretim Derlemesi (Production Build)
```bash
npm run build
npm run start
```

---

## 📄 Lisans

Bu proje [MIT Lisansı](LICENSE) kapsamında lisanslanmıştır. Kişisel ve ticari portföy kullanımlarına açıktır.
