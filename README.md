# Atelier & Brew | Atölye ve Kafe Sipariş Sistemi

[![Next.js 16](https://img.shields.io/badge/Next.js-16.0.3-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Turbopack](https://img.shields.io/badge/Turbopack-Enabled-000000?style=flat-square&logo=vercel)](https://turbo.build/)
[![License: MIT](https://img.shields.io/badge/License-MIT-emerald?style=flat-square)](LICENSE)

Atelier & Brew, heykel ve seramik atölyesi ile kahve barını aynı çatı altında işleten mekanlar için geliştirilmiş bir masa sipariş ve istasyon yönetim sistemidir. Masada oturan müşterinin telefonundan verdiği siparişi atölye ve mutfak hazırlık ekranlarına iletir, durumu canlı takip ettirir ve vitrin düzenini kod yazmadan yönetmeyi sağlar.

---

## Tasarım ilkeleri

1. **Fiziksel zemin gerçekliği.** Seramik ve heykel masalarında boya, su ve fırça bulunur. Buton boyutları parmak alanına göre dengelenmiştir, gereksiz form adımları içermez.
2. **Nötr ve okunaklı tipografi.** Gövde metinleri, butonlar ve tablolarda Inter kullanılır. Başlıklarda zanaat atmosferine uygun Cormorant Garamond tercih edilir. Kalın ağırlıklarda baloncuklu veya oyuncak vari duran geometrik sans fontlar kullanılmaz.
3. **Gereksiz görsel gürültünün engellenmesi.** Büyük harfli üst etiketler (kicker), yanıp sönen noktalar ve anlamsız emojiler arayüzde yer almaz. Her ekran kullanıcıyı doğrudan bir sonraki operasyonel adıma yönlendirir.
4. **Fiziksel ödeme uyumu.** Masada kart formu açmak yerine, hesabın seans sonunda kablosuz POS veya kasadan ödeneceğini şeffaf biçimde belirtir.

---

## Özellikler

### Masaya özel QR menü ve sipariş akışı
- URL parametresinden (`?table=4`) masa numarasını otomatik algılar ve oturum boyunca saklar.
- Heykel ve seramik modellerinde boyut, fırça ve boya seti içeriği ile ek malzeme seçenekleri sunar.
- İçeceklerde süt çeşidi ve tatlılık oranı tercihlerini kaydeder.
- Masada en az bir içecek veya atölye ürünü kuralını sipariş aşamasında denetler.

### Canlı sipariş takip ekranı
- Müşteri, siparişinin atölye ve mutfaktaki durumunu telefonundan canlı izler.
- Atölye hazırlığı: Malzeme toplanıyor, masaya çıktı, teslim edildi.
- Mutfak hazırlığı: Demleme başladı, masaya çıktı, teslim edildi.

### KDS istasyon hazırlık ekranı
- Atölye ve mutfak hazırlıklarını ayrı veya birleşik filtreler.
- Tek dokunuşla siparişi sonraki aşamaya taşır (Masaya Çıkar, Teslim Et).
- Seans bittiğinde masayı tek butonla kapatarak yeni müşteriye açar.

### Vitrin düzenleyicisi
- Manşet afişini, karşılama metinlerini ve buton yazılarını canlı önizleme ile düzenler.
- Sayfa bölümlerini yukarı ve aşağı butonlarıyla sıralar veya gizler.
- Masaüstü ve mobil ekran görünümlerini anlık simüle eder.

### Çoklu fotoğraf galerisi ve görsel sıkıştırma
- Yeni model eklerken dosya seçiciyle birden fazla fotoğraf yüklenmesini sağlar.
- HTML5 Canvas ile görselleri tarayıcıda 800 piksele ve yüzde 75 kaliteye otomatik sıkıştırır, yerel depolama kotasını korur.
- Kapak görselini tek dokunuşla belirleme imkanı verir.

### Akrilik masa QR standı baskı aracı
- Masalara konulacak akrilik standlar için masa numarasına özel vektörel QR kod ve şablon üretir.
- Doğrudan tarayıcıdan yazdırmaya veya PNG olarak kaydetmeye hazır çıktı verir.

### Rol bazlı yetkilendirme (RBAC)
- **Yönetici:** Envanter ekleme ve silme, fiyat güncelleme, personel şifreleri, mekan kuralları ve tam yetki.
- **Mutfak / KDS:** Yalnızca istasyon sipariş ekranı.
- **Vitrin Editörü:** Yalnızca görsel vitrin düzenleyicisi. Ciro, fiyat ve müşteri kayıtlarına erişemez.
- **Finans & Analist:** Salt okunur ciro, sepet ortalaması ve yoğunluk raporları. Ürün silemez, şifreleri değiştiremez.

---

## Demo hesapları

Personel paneline giriş yapmak için aşağıdaki hesaplar kullanılabilir:

| Rol | Yetkili | Şifre | Yetki kapsamı |
| :--- | :--- | :---: | :--- |
| **Yönetici** | Ahmet Yılmaz | `yonetici` | Tam sistem yetkisi, envanter, fiyatlar, ayarlar |
| **Mutfak / KDS** | Deniz Kaya | `mutfak` | Atölye ve mutfak hazırlık ekranı |
| **Vitrin Editörü** | Zeynep Demir | `edit` | Vitrin düzenleyicisi ve bölüm sıralaması |
| **Finans & Analist** | Can Arslan | `analiz` | Salt okunur gelir ve yoğunluk analitiği |

---

## Mimari ve kütüphaneler

- **Çatı:** [Next.js 16 (App Router)](https://nextjs.org/) ve [React 19](https://react.dev/)
- **Paketleyici:** [Turbopack](https://turbo.build/)
- **Tip sistemi:** [TypeScript](https://www.typescriptlang.org/)
- **Stil:** [Tailwind CSS v4](https://tailwindcss.com/)
- **İkonlar:** [Lucide](https://lucide.dev/)
- **Görsel işleme:** HTML5 Canvas API (İstemci taraflı sıkıştırma ve QR stand çıktısı)
- **Durum yönetimi:** React Context API ve LocalStorage senkronizasyonu

---

## Dizin yapısı

```
workshop-cafe/
├── public/                 # Statik SVG ve ikon varlıkları
├── src/
│   ├── app/
│   │   ├── favicon.ico
│   │   ├── globals.css     # Tema değişkenleri ve tipografi
│   │   ├── layout.tsx      # Kök düzen, meta veriler ve font tanımları
│   │   └── page.tsx        # Ana sayfa ve görünüm yönlendirici
│   ├── components/
│   │   ├── AdminGuide.tsx          # Personel kullanım rehberi
│   │   ├── AdminPortal.tsx         # Yönetim paneli, envanter ve QR stand motoru
│   │   ├── AnalyticsDashboard.tsx  # Ciro, ürün kırılımı ve saatlik yoğunluk
│   │   ├── CafeModal.tsx           # İçecek detay ve süt seçimi penceresi
│   │   ├── CartDrawer.tsx          # Adisyon çekmecesi ve kural denetimi
│   │   ├── CustomerMenu.tsx        # Kategori filtreli müşteri menüsü
│   │   ├── Header.tsx              # Üst çubuk ve masa göstergesi
│   │   ├── OrderTrackingView.tsx   # Canlı sipariş takip ekranı
│   │   ├── StaffDashboard.tsx      # İstasyon hazırlık ekranı (KDS)
│   │   ├── StaffLogin.tsx          # Şifreli personel giriş ekranı
│   │   ├── StoreCustomizer.tsx     # Vitrin düzenleyicisi
│   │   ├── StoreLanding.tsx        # Karşılama ve tanıtım sayfası
│   │   └── WorkshopModal.tsx       # Atölye modeli ve boy seçimi penceresi
│   ├── context/
│   │   └── AppContext.tsx          # Durum yönetimi, sepet, siparişler ve kimlik doğrulama
│   ├── data/
│   │   ├── guideData.ts            # Personel el kitabı başlıkları
│   │   └── mockData.ts             # Atölye modelleri, menü ve örnek siparişler
│   ├── types/
│   │   └── index.ts                # Veri modelleri ve tip tanımları
│   └── utils/
│       ├── imageCompression.ts     # Canvas ile istemci görsel sıkıştırma
│       └── orderStatus.ts          # İstasyon aşama adımları yardımcı fonksiyonu
├── docs/
│   └── DESIGN_SPEC_ANTI_SLOP.md   # Tasarım manifestosu ve kural şartnamesi
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

---

## Kurulum ve yerel çalıştırma

### Gereksinimler
- Node.js 18.18 veya üzeri
- npm, pnpm veya yarn

### 1. Depoyu indirin
```bash
git clone https://github.com/username/workshop-cafe.git
cd workshop-cafe
```

### 2. Bağımlılıkları kurun
```bash
npm install
```

### 3. Geliştirme sunucusunu başlatın
```bash
npm run dev
```

Tarayıcıda [http://localhost:3000](http://localhost:3000) adresini açın.

Masa numarası simülasyonu için adres sonuna parametre ekleyebilirsiniz:
- [http://localhost:3000?table=4](http://localhost:3000?table=4) (Masa 4)
- [http://localhost:3000?table=12](http://localhost:3000?table=12) (Masa 12)

### 4. Üretim derlemesi
```bash
npm run build
npm run start
```

---

## Lisans

Bu proje [MIT Lisansı](LICENSE) ile sunulmaktadır.
