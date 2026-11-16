# Impeccable Tasarım Temizliği & AI Slop Ayıklama Planı

Bu plan, projede yapay zeka klişesi (AI slop) oluşturan görsel gürültüleri, kural ihlallerini (eyebrow/kicker etiketleri, emoji kullanımı, yanıp sönen neon noktalar, yapay SaaS jargonu) ayıklamak ve tüm sayfaları saf bir seramik & kahve atölyesi zanaat seviyesine (`craft-floor`) ulaştırmak için hazırlanmıştır.

---

## Tespit Edilen AI Slop Unsurları (Envanter)

1. **Gereksiz Başlık Üstü Hap / Eyebrow (Kicker) Etiketleri:**
   - `StoreLanding.tsx`: Hero başlığının tepesindeki `"Atölye & Nitelikli Kahve Alanı"` hapı.
   - `StoreLanding.tsx`: `"SEANS SAATLERİ & KONUM"` ve `"Sıkça Sorulanlar"` tekrarlayan mini etiketleri.
   - `AdminPortal.tsx`: QR kartlarının üzerindeki `"ÖZEL QR KOD"` etiketi.
2. **Emoji İkon Sahteciliği (Emoji instead of crafted SVG):**
   - `CustomerMenu.tsx`: Bilgilendirme kutusundaki `🎨` emojisi.
   - `StaffLogin.tsx`: Kısayol butonundaki `🛠️` emojisi.
   - `AdminPortal.tsx`: Rol güvenliği kutusundaki `💡` emojisi.
3. **Yapay Zeka Tekno-Gürültüsü (Pulsing Neon Dots & Blinking):**
   - `AdminPortal.tsx`: Masa QR kartlarındaki yeşil yanıp sönen `animate-pulse` neon noktası.
   - `Header.tsx` & `OrderTrackingView.tsx`: `Clock animate-pulse` yanıp sönen sayaç efektleri.
4. **Yapay SaaS Jargonu & Şişirilmiş Metinler:**
   - `CartDrawer.tsx`: Masa değiştirme açılır kutusundaki `"QR Koruma Kalkanı"` teknolojik etiketi.
   - `CartDrawer.tsx`: Aşırı uzun buton ve dipnot metinleri.
5. **Gereksiz Kutu / Bilgilendirme Şeritleri (Notice Banner Clutter):**
   - `CustomerMenu.tsx`: Menünün hemen üstüne yığılmış sarı/bej açıklama bandı.
   - `StoreLanding.tsx`: Hero görselinin altına serpiştirilmiş kopuk uyarı şeridi.
6. **Çift Yükseklik (Ghost Cards - Border + Shadow Katmanlanması):**
   - Kartlarda hem sert 1px kenarlık hem de dağınık shadow efektleri (tek bir derinlik sistemine indirgenecek).

---

## Faz Planı

- [x] **Faz 1: Müşteri Vitrini (`StoreLanding.tsx` & `Header.tsx`)**
  - Hero başlığı üstündeki yapay hapı (`heroBadge`) ve bölüm içi kicker etiketlerini kaldır.
  - Header'daki yanıp sönen saat ikonunu sakin, zarif nötr bir stile çek.
  - Saat & konum ve SSS başlıklarını sadeleştir.

- [x] **Faz 2: Masa Menüsü & Seçim Ekranı (`CustomerMenu.tsx`)**
  - `🎨` emojisini ve tepedeki gereksiz açıklama kutusunu kaldır; menü doğrudan ürünlerle konuşsun.
  - Sekme ve filtre butonlarının aralıklarını ve tipografisini sakinleştir.

- [x] **Faz 3: Masa Adisyonu Çekmecesi (`CartDrawer.tsx`)**
  - `"QR Koruma Kalkanı"` ibaresini doğal ve sade "Masa Değiştir" formuna çevir.
  - Sepet altı buton ve metin kalabalığını temizle.

- [x] **Faz 4: Sipariş Takibi & Mutfak Ekranı (`OrderTrackingView.tsx` & `StaffDashboard.tsx`)**
  - `animate-pulse` yanıp sönen tekno-ikonları kaldır.
  - İstasyon ve durum takip çizgilerini sade ve güven veren bir ritme oturt.

- [x] **Faz 5: Yönetici & Personel Panelleri (`AdminPortal.tsx` & `StaffLogin.tsx`)**
  - Masa QR kartlarındaki neon `animate-pulse` yeşil noktaları ve `"ÖZEL QR KOD"` etiketini kaldır.
  - `🛠️` ve `💡` emojilerini kaldır, profesyonel SVG ikonlarla değiştir.
  - Ghost card (border + shadow) çatışmalarını temizle.

- [x] **Faz 6: Bütünsel Doğrulama & Görsel Kontrol**
  - `npm run build` ile derleme doğrulaması.
  - Sayfaların render testlerini tamamlayıp ekran görüntüleriyle kontrol et.

---

## Faz 7: tasteskill 2.5 + Impeccable Zanaat Standardı (Anti-Slop Place Kuralları)

- [x] **7.1: Görsel Altı Metin Yasağı (`Rule 1: No caption under visual`)**
  - `StoreLanding.tsx`: Hero görselinin altına sıkıştırılmış metin şeridini kaldır; fotoğraf bağımsız ve kusursuz nefes alsın.
- [x] **7.2: Mikro-Etkileşimler & Derinlik Sistemi (`Rule 5: Hover micro-interactions`)**
  - Kartlarda +2px zarif yükselme (`hover:-translate-y-0.5`), fotoğraflarda `group-hover:scale-[1.02]`, butonlarda `active:scale-[0.98]`.
  - Tek derinlik kuralı: Çift katmanlı ghost card (border + shadow) yerine sıcak sınır çizgisi (`border-[#E7DFD5]`) ve pürüzsüz taş rengi yüzey.
- [x] **7.3: Eşit Kenarlar & Ritim (`Rule 3 & 4: Equal edges & 1 section per screen focus`)**
  - Bütün bileşenlerde `max-w-5xl mx-auto px-4 sm:px-6` kenar hizasını sabitle.
- [x] **7.4: Doğrulama & Görsel Kanıt**
  - `npm run build` doğrulaması ve canlı tarayıcı render görseli.

---

## Faz 8: İşlevsellik & Operasyonel Yönlendirme (Admin Portal & İş Akışı Mimarisi)

- [x] **8.1: Header & Aksiyonel Başlık Alanı Yeniden Tasarımı (`AdminPortal.tsx`)**
  - Basık, hizasız metrik kutularını kaldır; tek satırda net işletme bilgisi kur.
  - "Canlı Mağazayı Önizle" (`setActiveView('store')`) ve "Görsel Mağaza Düzenleyicisi" (`setActiveView('editor')`) butonlarını başlığın doğal birincil aksiyonları olarak sağ üste al.
- [x] **8.2: Tıklanabilir / Yönlendirici KPI Çubuğu (Actionable Next-Steps)**
  - "Kritik Stok: 1 model" kartını tıklanabilir yap: Tıklandığında anında kritik ürünü filtreleyip stok güncelleme adımına götürsün.
  - "Kasa Cirosu" kartını tıklanabilir yap: Tıklandığında anında "Analitik & Raporlar" sekmesine yönlendirsin.
  - "Toplam Stok" kartı tıklandığında tüm envantere dönsün.
- [x] **8.3: Sekmelerin Mantıksal Gruplanması & Temiz Navigasyon**
  - İki satıra dökülen 7 dağınık sekmeyi mantıksal çalışma alanlarına ayır veya tek satırda pürüzsüz yatay segmented control haline getir.
- [x] **8.4: Sayfa İçi Doğrudan İlerleme ve Yönlendirme Bildirimleri**
  - Kritik stok filtresi aktifken "Kritik stoktaki ürünler gösteriliyor — Yeni stok sayısını yazıp Kaydet'e basın" banner'ı ve filtreyi temizleme butonu sun.
- [x] **8.5: Doğrulama & Test**
  - Derleme kontrolü ve canlı tarayıcı ekran görüntüsü ile yeni yönlendirmelerin doğrulanması.

---

## Faz 9: Tipografik Hiyerarşi & Rol Ölçeği Düzenlemesi (`impeccable typeset`)

- [x] **9.1: Tipografi Ölçek ve Rol Sisteminin Kurulması (`typeset scale`)**
  - **H1 (Hero):** `text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight` (Yalnızca ana karşılama vitrini).
  - **H1 (Sayfa Başlığı):** `text-2xl sm:text-3xl font-bold tracking-tight` (Menü, Admin, Takip).
  - **H2 (Birincil Ticari Bölüm):** `text-2xl sm:text-3xl font-bold` (Öne Çıkan Modeller) ve `text-xl sm:text-2xl` (3 Adımda Rehber).
  - **H3 (İkincil Destek & Bilgi):** `text-base sm:text-lg font-bold` (Sıkça Sorulan Sorular, Çalışma Saatleri & Konum, Özel Etkinlikler).
  - **H4 / Soru & Kart:** `text-xs sm:text-sm font-semibold` (Soru metinleri sans ve sakin, kart başlıkları ölçülü).
- [x] **9.2: Vitrin Sayfası Hiyerarşisi (`StoreLanding.tsx`)**
  - "Sıkça Sorulan Sorular" bölümünün devasa `text-2xl` başlığı ve kalın ayıracı sakinleştirilerek ikincil danışma seviyesine (`text-base sm:text-lg`) çekildi.
  - SSS soru metinlerindeki abartılı serif display fontu yerine net ve okunabilir `font-sans font-semibold text-xs sm:text-sm` uygulandı.
  - Adım numaraları ve kart başlıkları ürün başlıklarının önüne geçmeyecek şekilde orantılandı.
- [x] **9.3: Menü & Katalog Hiyerarşisi (`CustomerMenu.tsx`)**
  - `text-4xl` devasa başlık yerine operasyonel sayfa başlığı standardı olan `text-2xl sm:text-3xl` uygulandı.
- [x] **9.4: Doğrulama & Görsel Kanıt**
  - `npm run build` ile TypeScript doğrulaması.
  - Canlı tarayıcı render'ları: `45_hiyerarsi_landing_hero_ve_one_cikanlar.png`, `46_hiyerarsi_faq_ve_konum_alt_bolumler.png`, `47_hiyerarsi_menu_katalogu.png`.

---

## Faz 10: Mutfak & Atölye İstasyon Takibi (`StaffDashboard.tsx`)

- [x] **10.1: Hiyerarşi & Kural Ayıklaması (`impeccable operate`)**
  - Başlık üstündeki yapay eyebrow etiketi kaldırıldı; net ve sakin sayfa başlığı (`text-2xl sm:text-3xl font-bold`) ve görevli alt bilgisi kuruldu.
  - "Barista" ibareleri kullanıcı kuralına uygun şekilde "Mutfak" olarak tekilleştirildi.
- [x] **10.2: Tıklanabilir KPI Filtre Geçitleri (Interactive Gateways)**
  - "Aktif Masa", "Bekleyen Atölye" ve "Bekleyen Mutfak" metrikleri tıklanabilir filtre butonlarına dönüştürüldü. Personel tek dokunuşla kendi istasyonunun bekleyen siparişlerine odaklanabiliyor.
- [x] **10.3: Tek Dokunuşla Hızlı İlerleme (1-Tap Quick Advance Action)**
  - Sipariş kartlarına akordeonu açmaya gerek kalmadan doğrudan sonraki aşamaya geçiren pratik aksiyon butonları (`Masaya Çıkar →` ve `Teslim Et ✓`) eklendi.
- [x] **10.4: Doğrulama & Canlı Test**
  - `npm run build` başarıyla tamamlandı.
  - Ekran görüntüleriyle doğrulandı: `48_istasyon_takibi_mutfak_ve_atolye.png`, `49_istasyon_atolye_filtresi.png`, `50_hizli_masaya_cikar_tetiklendi.png`.

---

## Faz 11: Mobil Ergonomi & Uçtan Uca Sipariş-Adisyon Akışı (`CartDrawer.tsx` & `OrderTrackingView.tsx`)

- [x] **11.1: Mobil Sayfa Geçişlerinde Otomatik Tepeye Kaydırma (`auto scroll to top`)**
  - Tek sayfa React mimarisinde görünüm değiştiğinde (`activeView`) sayfanın aşağıda kalması sorunu çözüldü; her geçişte anında tepeye (`scrollTo(0,0)`) kaydırılıyor.
- [x] **11.2: Mobil Adisyon & Sepet Ergonomisi (390px Viewport)**
  - Masa numarası, mekan kuralları (zorunlu içecek/atölye uyarısı), ürün adet stepper'ları ve sipariş sahibi input'u 390px dikey ekrana tam oturacak şekilde optimize edildi.
- [x] **11.3: Sipariş Onayı ve Canlı Takip Geçişi**
  - Sipariş onay ekranı (`createdOrder`) üzerinden "Siparişimi Canlı Takip Et" aksiyonu doğrudan `order_tracking` ekranını açarak Atölye ve Mutfak durumunu canlı gösterir.
- [x] **11.4: Doğrulama & Canlı Test**
  - Mobil emülasyon ile test edildi ve kaydedildi:
    - `51_mobil_qr_landing.png` (Masa #12 QR karşılaması)
    - `53_mobil_workshop_modal.png` (Mobil heykel boyutu & kiti seçimi)
    - `54_mobil_cart_drawer.png` (Mobil adisyon çekmecesi)
    - `55_mobil_siparis_onaylandi.png` (Sipariş iletildi ekranı)
    - `56_mobil_canli_takip_ekrani.png` (Mobil canlı istasyon takip ekranı).

---

## Faz 12: Çoklu Fotoğraf Galerisi, Yönetici Başlığı & Vitrin Editörü Üst Bar Düzeltmeleri

- [x] **12.1: Yönetici Paneli Başlığındaki İşletme İsmi Tekrarının Kaldırılması (`AdminPortal.tsx`)**
  - `• {venueSettings.venueName}` ibaresi kaldırıldı; yalnızca `YÖNETİCİ PANELİ` ve yönetici profil hapı bırakıldı.
- [x] **12.2: Çoklu Fotoğraf & Dosya Yükleme Desteği (`AdminPortal.tsx` & `types/index.ts`)**
  - `WorkshopItem` modeline `images?: string[]` galerisi eklendi.
  - "Yeni Model Ekle" formuna dosya yükleme (File picker/Base64), URL yapıştırma ve hazır atölye önayarları eklendi.
  - Yüklenen fotoğraflar küçük kartlar halinde listelenip "Kapak Görseli Yap" ve "Kaldır" butonlarıyla yönetilebilir kılındı.
- [x] **12.3: Müşteri Modalında Çoklu Fotoğraf Galerisi (`WorkshopModal.tsx`)**
  - Çoklu görseller için önceki/sonraki okları (`<` `>`), fotoğraf sayacı (`1 / 3`) ve sağ altta küçük thumbnail önizleme şeridi eklendi.
- [x] **12.4: Mağaza Editörü Üst Barının Yeniden Tasarımı (`StoreCustomizer.tsx`)**
  - Satır taşması (wrapping) ve butonların sağ kenardan kesilmesi engellendi; `whitespace-nowrap shrink-0` ve sadeleştirilmiş başlık (`Vitrin Editörü`) ile kusursuz yatay hizalama sağlandı.
- [x] **12.5: Doğrulama & Canlı Test**
  - `npm run build` ile TypeScript doğrulaması tamamlandı.
  - Ekran görüntüleri alındı: `57_admin_header_temizlendi.png`, `58_yeni_model_coklu_fotograf_galerisi.png`, `59_editor_ust_bar_duzeltildi.png`, `60_musteri_coklu_fotograf_galerisi.png`.

---

## Faz 13: Kurumsal Tipografi, Buton & AI Slop Kapsamlı Ayıklama (Tester Audit Fix)

- [x] **13.1: Font Arındırma & Kurumsal Sans Tipografisi (`globals.css`)**
  - Plus Jakarta Sans'ın baloncuk/çizgi film vari kalın harflerini birincil sans'tan çıkarıp yerine kurumsal ve nötr `Inter` + Apple/Blink sistem fontlarını (`--font-sans`) birincil yapıldı.
  - Butonlar, haplar ve sayılardaki gereksiz şişkinlik ve AI-slop tipografi havası giderildi.
- [x] **13.2: Kural & Terminoloji Düzeltmesi (`CafeModal.tsx`, `OrderTrackingView.tsx`, `AppContext.tsx`)**
  - "Barista" ibareleri kullanıcı kuralına uygun şekilde "Mutfak" / "Sipariş" olarak tekilleştirildi.
  - Modal form etiketlerindeki `uppercase tracking-wider` bağıran stiller zarif sentence case `text-xs font-medium text-[#6E655F]` standardına çekildi.
- [x] **13.3: Vitrin Editörü & Panellerdeki Kicker/Uppercase Temizliği (`StoreCustomizer.tsx`, `AdminPortal.tsx`, `CartDrawer.tsx`)**
  - `T KARŞILAMA METİNLERİ` gibi büyük harfli AI kicker etiketleri temizlendi, sentence case ve sakin formata kavuşturuldu.
  - Em dash (`—`) karakterleri `unslop` kuralı gereği tire `-` veya virgüle çevrildi.
- [x] **13.4: Bütünsel Derleme & Playwright ile Tester Doğrulaması**
  - `npm run build` Turbopack ile sıfır hatayla derlendi.
  - Playwright testi (`verify_all_fixes.py`) 6 farklı ekranda başarıyla tamamlandı ve `audit_fixed_*.png` görselleri üretildi.

---

## Faz 14: Code Review Bulgularının Düzeltilmesi & Güvenilirlik Artırımı

- [x] **14.1: İstemci Tarafı Görsel Sıkıştırma (`imageCompression.ts`) & LocalStorage Quota Koruması**
  - Yüklenen ham fotoğrafları otomatik olarak Canvas ile max 800px boyutuna ve 0.75 JPEG kalitesine indirgeyen `compressImageFile` yardımcı fonksiyonu yazıldı.
  - `AppContext.tsx` içerisindeki tüm depolama yazımları `safeSetStorage` ile `try/catch` korumasına alındı; 5 MB kota aşımı (`QuotaExceededError`) engellendi.
- [x] **14.2: QR Akrilik Kart Canvas Çiziminde Zaman Aşımı ve Hata Koruması (`AdminPortal.tsx`)**
  - `handleDownloadStandCard` içindeki görsel yükleme Promise'ına `img.onerror` ve 5000ms zaman aşımı koruması eklendi; butonun sonsuz askıda kalması çözüldü.
- [x] **14.3: Şifre Maskeleme & Hardcoded Bypass Temizliği (`AdminPortal.tsx`, `AppContext.tsx`, `StaffLogin.tsx`)**
  - Personel tablosundaki açık şifreler varsayılan olarak `••••••••` şeklinde maskelendi, göze tıklanarak açılıp kapanabilir hale getirildi.
  - `AppContext.tsx:loginWithPasscode` içindeki hardcoded takma ad bypass'ları (`clean === 'ayşe'` vb.) silindi.
  - `StaffLogin.tsx` hızlı giriş butonlarında açık şifre metinleri kaldırılarak operasyonel rollere dönüştürüldü.
- [x] **14.4: Hydration Yarış Durumu & Sepet (Cart) Kalıcılığı (`AppContext.tsx`)**
  - `isHydrated` bayrağı eklendi; mount efekti storage'ı okuyana kadar yazma efektleri bloke edildi.
  - Müşteri sepeti `ab_cart_v1` ile storage'a bağlandı; sayfa yenilendiğinde seçilen heykel ve içeceklerin silinmesi önlendi.
- [x] **14.5: Çakışmasız Sipariş Kimliği & Dinamik Saat Formatı (`AppContext.tsx`)**
  - `SIP-${Date.now().slice(-4)}${random}` ile benzersiz ID üretimi ve `new Date().toLocaleTimeString('tr-TR', ...)` ile gerçek saat formatı sağlandı.
- [x] **14.6: DRY Refactoring & Masa Sınır Kontrolü (`orderStatus.ts`, `AdminPortal.tsx`)**
  - `normalizeStatus` fonksiyonu `src/utils/orderStatus.ts` altında tekilleştirildi.
  - Masa numarası seçiminde `Math.min(Math.max(1, tbl), maxTables)` sınırlandırması getirildi.
  - Pano kopyalama (`navigator.clipboard`) için güvensiz ortamlarda çalışan fallback eklendi.
