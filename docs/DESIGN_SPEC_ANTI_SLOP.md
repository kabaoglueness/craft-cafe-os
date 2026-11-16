# Workshop & Cafe: Anti-Slop Tasarım Manifestosu & Beceri Şartnamesi
**Belge Türü:** Kurumsal Tasarım Sistemleri, Saha Ergonomisi & Anti-Slop Rehberi  
**Hedef Kitle:** Kıdemli Tasarım Mimarları, Frontend Mühendisleri, Subagent Ağı  
**Referans:** `C:\Projects\workshop-cafe` Canlı Deneyimi, Kullanıcı Direktifleri & Saha İncelemeleri  

---

## 1. Giriş: Anti-Slop & Craft-Floor Tasarım Felsefesi

Modern arayüz üretiminde yapay zeka ajanlarının ve şablon kütüphanelerinin en büyük yanılgısı, bir arayüzün "şık" görünmesini onu "iyi" ve "işlevsel" kılmak için yeterli sanmasıdır. Dribbble veya soyut SaaS mock-up'larında göz boyayan parıltılar, gerçek bir seramik atölyesinde ve kafede ("craft-floor") ilk dakikada çöker:

1. **Craft-Floor Gerçekliği:** Bir seramik atölyesinde masalar çamurludur, müşterinin elleri ıslaktır veya kirlidir, personelin zamanı saniyelerle ölçülür, masaların üzerinde ise akrilik standlarda basılı QR kartları durur. Burada çalışan bir arayüz vitrin süsü değil, fiziksel operasyonun bir uzantısıdır.
2. **Kör Estetik Yanılgısı:** "Burası evet estetik ama işlevsel değil. Bir tasarımda estetikle beraber işlevsellik gerekir, işlevselliğin amacı işlemi bir yere götürmektir. Müşteri ya da işletme yöneticisi girdiğinde bir sonraki adıma yönlendirilmeliler." Kullanıcının bizzat koyduğu bu ilke, tüm tasarım kararlarımızın temel taşıdır.
3. **Anti-Slop Disiplini:** Yapay zekanın "tasarım yapıyorum" hissi vermek için her yere serpiştirdiği eyebrow/kicker hapları, neon yanıp sönen noktalar, anlamsız emojiler, yapay SaaS jargonu ve devasa orantısız başlıklar, kullanıcıya bilişsel yük ve güvensizlik aşılar. Gerçek zanaat, gereksiz her pikseli ayıklayıp kalan unsurları milimetrik bir hassasiyet ve operasyonel niyetle yerleştirmektir.

---

## 2. Ne İstenmedi (Anti-Patterns / Yasaklar) ve Nedenleri

### 2.1. Tipografi: Baloncuklu Geometrik Sans-Serif'ler vs Kurumsal Nötr Tipografi
- **Yasaklanan Model:** Kalın ağırlıklarda (Bold/Black) `Plus Jakarta Sans`, `Poppins` veya aşırı dairesel geometrik fontlar.
- **Kullanıcının Direktifi:** *"Ya mesela neden bu fontlar kurumsal tasarıma uymuyor? Çok AI slop duruyor."*
- **Tasarım Psikolojisi & Nedenleri:**
  - Plus Jakarta Sans gibi fontlar, 'a', 'e', 'g', 'o', 'd' gibi harflerin iç boşluklarında (counters) ve kavislerinde yuvarlak, baloncuksu (bubbly) bir geometriye sahiptir. Normal ağırlıkta temiz görünseler bile, `font-bold` veya `font-extrabold` olduklarında çocuksu, oyuncak vari veya ucuz "kripto/mobil oyun" havası yayarlar.
  - Kurumsal kimlik; denge, ciddiyet, zamansızlık ve okunabilirlik ister. Baloncuklu kalın harfler, butondaki "Siparişi Onayla" veya paneldeki "Kritik Stok" ifadesini gayriciddi bir mobil oyun butonuna çevirir.
- **Doğru Uygulama:** 
  - Gövde metinleri, paneller, formlar ve butonlarda endüstri standardı nötr sans-serif: `Inter`, `SF Pro` veya `-apple-system`.
  - Atölyenin zanaatkar ruhunu temsil eden başlıklarda ise baloncuklu sans yerine zarafeti tescilli asil serif: `Cormorant Garamond` veya `Playfair Display`.

### 2.2. Kicker / Eyebrow Bağırmaları (`uppercase tracking-wider` Felaketi)
- **Yasaklanan Model:** Her başlığın üstüne kondurulan `text-xs font-semibold uppercase tracking-wider text-muted` formatındaki minik haplar ve etiketler.
- **Örnek AI-Slop Hataları:**
  - `StoreLanding.tsx`: `"ATÖLYE & NİTELİKLİ KAHVE ALANI"`
  - `AdminPortal.tsx`: `"ÖZEL QR KOD"`
  - `StoreLanding.tsx`: `"SEANS SAATLERİ & KONUM"`, `"SIKÇA SORULANLAR"`
- **Tasarım Psikolojisi & Nedenleri:**
  - Yapay zeka ajanları, bir bölümün ne olduğunu kullanıcıya anlatamayacağı korkusuyla başlığın tepesine bir de büyük harfli özet etiketi yapıştırır.
  - Bu durum gözün doğal okuma ritmini (F-pattern / Z-pattern) bozar. Göz önce minik büyük harfe çarpar, sonra asıl başlığa iner, ikisi de aynı şeyi söylediği için beyin bunu "gürültü" (noise) olarak algılar.
  - Kullanıcıya bağıran (`uppercase`) mini metinler amatör SaaS şablonlarının bir numaralı parmak izidir.
- **Doğru Uygulama:** Kicker'ları tamamen kaldırın. Başlık kendi başına konuşmalı ve ne olduğunu doğrudan anlatmalıdır:
  ```tsx
  // YANLIŞ (AI Slop Kicker)
  <span className="text-xs uppercase tracking-wider text-[#B3542E]">Sıkça Sorulanlar</span>
  <h2 className="text-2xl font-serif">Merak Edilen Detaylar</h2>

  // DOĞRU (Craft-Floor Nötr Hiyerarşi)
  <h3 className="text-base sm:text-lg font-serif font-bold text-[#211D1A]">Sıkça Sorulan Sorular</h3>
  ```

### 2.3. Punctuation & Copy: Em-Dash (`—`) ve Yapay SaaS Jargonu
- **Yasaklanan Model:** Cümle ortalarında veya liste başlarında yapay zeka imzası olan uzun tire (`—`, em-dash) ve abartılı teknolojik jargonlar.
- **Örnek AI-Slop Hataları:**
  - Masa değiştirirken: `"QR Koruma Kalkanı — Yetkisiz Erişim Engeli"`
  - Sipariş bildiriminde: `"Siber Senkronizasyon ile Canlı Masa Takibi — Aktif"`
- **Tasarım Psikolojisi & Nedenleri:**
  - İngilizce LLM metin üretiminin Türkçe arayüzlere kopyalanması sonucu ortaya çıkan `—` kullanımı, Türkçe web ergonomisinde soğuk, mesafeli ve tamamen makine üretimi hissi verir.
  - Bir kafe/atölye müşterisi "koruma kalkanı" veya "hibrit senkronizasyon" değil; "Masa Değiştir", "Siparişini Takip Et", "Hesabı İste" gibi net, insani ve operasyonel Türkçe cümleler görmek ister.
- **Doğru Uygulama:**
  - Em-dash yerine virgül, nokta veya sade kısa tire (`-`) kullanın.
  - Metinleri gereksiz sıfatlardan arındırın: `"Masa Değiştir: Farklı bir masaya oturduysanız numaranızı güncelleyin."`

### 2.4. Dekoratif İkon Sahteciliği & Yanıp Sönen Neon Işıklar
- **Yasaklanan Model:** 
  - Butonların içine zoraki sokuşturulan rastgele ikonlar (pusula, roket, yıldız).
  - Arayüzde emoji kullanımı (`🎨`, `🛠️`, `💡`).
  - Yanıp sönen yeşil/kırmızı noktalar (`animate-pulse`).
- **Tasarım Psikolojisi & Nedenleri:**
  - **Emoji Ucuza Kaçar:** `🎨 Atölye Seçenekleri` yazmak kurumsal bir markayı WhatsApp mesaj grubu seviyesine düşürür. Emojiler her işletim sisteminde (iOS, Android, Windows) farklı ve kontrolsüz render edilir.
  - **Neon Titreşim Bilişsel Tehdittir:** Masa QR kartında veya sayaç ikonunda yeşil bir noktanın sürekli `animate-pulse` ile yanıp sönmesi kullanıcının dikkatini istemsizce çalar ve acil bir tehlike/aksaklık varmış hissi yaratır. Oysa masa sakince müşterisini beklemektedir.
- **Doğru Uygulama:**
  - Sadece işlevsel anlam taşıyan 1.5px veya 2px stroke kalınlığında nötr SVG ikonlar (`lucide-react`) kullanın.
  - Yanıp sönen animasyonları tamamen silin; durumları dingin rozetlerle (örneğin sakin bir gri/toprak tonu border) gösterin.

### 2.5. Kör Estetik (Non-functional Eye-Candy)
- **Yasaklanan Model:** Ekranda güzel duran ancak tıklandığında hiçbir şey yapmayan, kullanıcıyı bir sonraki eyleme götürmeyen ölü istatistik kutuları.
- **Kullanıcının Direktifi:** *"Burası evet estetik ama işlevsel değil. Bir tasarımda estetikle beraber işlevsellik gerekir, işlevselliğin amacı işlemi bir yere götürmektir. Müşteri ya da işletme yöneticisi girdiğinde bir sonraki adıma yönlendirilmeliler."*
- **Tasarım Psikolojisi & Nedenleri:**
  - Yönetici paneline giren bir işletme sahibi "Kritik Stok: 1 model" yazısını gördüğünde, tasarımcı ona estetik bir kart sunmuş olabilir ama işlevsel olarak onu bir çıkmaza sokmuştur. Yönetici hangi ürünün bittiğini görmek için sekmeleri aramak, listeyi kaydırmak ve filtre bulmak zorunda kalır.
  - Kör estetik kullanıcının zamanını çalar. Her metrik kartı bir aksiyon kapısı (action gateway) olmak zorundadır.
- **Doğru Uygulama:**
  - "Kritik Stok" kartı tıklandığında: Anında envanter listesinde sadece kritik stoktaki ürünü filtreler, stok giriş kutusuna odaklanır ve tepeye net bir yönlendirme banner'ı koyar ("Kritik stoktaki 1 model listelendi — Yeni adedi girip Kaydet'e basın").
  - "Kasa Cirosu" kartı tıklandığında: Anında finansal analitik ve adisyon dökümü sekmesine yönlendirir.

### 2.6. Mikro-Ergonomi ve Orantı Hataları
- **Yasaklanan Model:** 
  - Devasa birincil butonların yanına sıkıştırılmış okunaksız minik çıkış/iptal butonları.
  - Dar ekranlarda (mobilde veya split view'da) satır sonundan taşan, sağ kenarı kesilen üst barlar (topbars).
  - Mobilde (390px viewport) ekran dışına taşan modallar veya sayfa geçişlerinde sayfanın alt kısımda asılı kalması.
- **Tasarım Psikolojisi & Nedenleri:**
  - Bir formda veya ekranda "Kaydet" butonu `h-12 w-full` iken "Vazgeç/Çıkış" butonu `text-[10px]` ve cüce bırakıldığında kullanıcı görsel dengesizlik hisseder ve hata yapmaktan korkar.
  - Dokunmatik ekranlarda parmak alanı en az `44x44px` (Apple HIG standardı) olmalıdır.
  - SPA geçişlerinde sayfanın tepeye kaydırılmaması (`window.scrollTo(0, 0)` eksikliği), kullanıcının boş bir beyaz alana bakmasına ve arayüzün bozulduğunu sanmasına neden olur.
- **Doğru Uygulama:**
  - Tüm üst barlarda `whitespace-nowrap shrink-0` ile taşma koruması.
  - Sayfa/görünüm değişikliklerinde otomatik yumuşak veya anında `scrollTo({ top: 0, behavior: 'instant' })`.
  - Dengeli buton çiftleri: Birincil buton dolgulu (`bg-[#B3542E]`), ikincil buton aynı yükseklikte ancak çerçeveli/nötr (`border border-[#D5C9BC] text-[#211D1A]`).

### 2.7. Terminoloji ve Kimlik Tutarsızlığı
- **Yasaklanan Model:** Proje içinde kahve istasyonuna bir yerde "Barista", bir yerde "Mutfak", sipariş durumuna bir yerde "Hazır", bir yerde "Fırında" denilmesi.
- **Neden:** Tutarsız terimler hem mutfaktaki personelin hem de masadaki müşterinin kafasını karıştırır. İşletmenin kimliği ne ise baştan sona tekilleştirilmelidir. Projemizde kullanıcı kararıyla "Barista" değil, tüm yiyecek/içecek hazırlığı için **"Mutfak"** terimi kural olarak sabitlenmiştir.

---

## 3. Ne İstendi (Best Practices / Kurallar) ve Nedenleri

### 3.1. İşlevsel Yönlendirme (Actionable Next Steps)
Arayüzdeki her bilgi bloğu kullanıcıya şu sorunun cevabını vermelidir: *"Şimdi ne yapmalıyım?"*
- **Tıklanabilir KPI Kartları:**
  ```tsx
  // Örnek: Admin Portal Kritik Stok Butonu
  <button
    onClick={() => {
      setActiveTab('inventory');
      setInventoryFilter('critical');
    }}
    className="text-left p-4 rounded-xl border border-[#E7DFD5] bg-white hover:border-[#B3542E] transition-all group"
  >
    <div className="text-xs text-[#6E655F]">Kritik Stok Uyarısı</div>
    <div className="text-xl font-bold text-[#B3542E] group-hover:underline">1 Model Tükendi →</div>
  </button>
  ```
- **Sonuç:** Kullanıcı bir veriyi gördüğü anda tek tıkla çözüme ulaşır. Arama, gezinme ve kafa karışıklığı sıfırlanır.

### 3.2. Saha Hızı & Floor-First Operasyon (1-Tap KDS / İstasyon Yönetimi)
- **Mutfak & Atölye Personeli:** Yoğun saatlerde personelin sipariş kartlarını açıp detayları okumaya vakti yoktur.
- **1-Tap Quick Advance Mantığı:**
  - Sipariş kartının dış yüzeyinde, akordeonu açmaya gerek bırakmayan tek dokunuşluk bir buton bulunur:
    - Beklemede ise: `Masaya Çıkar →` (Tek tıkla durumu "Servis Edildi"ye geçirir).
    - Masada ise: `Teslim Et ✓` (Tek tıkla siparişi tamamlar).
  - İstasyon personeli önündeki ekrana dokunup işine devam eder; tablet veya POS başında beklemez.

### 3.3. Optik Tipografik Hiyerarşi (Typeset Scale)
Başlık boyutları sadece font boyutundan (`text-2xl` vs `text-4xl`) ibaret değildir; sayfadaki işlevsel önem derecesine göre ölçeklenir:

| Rol | Seviye | Boyut & Stil | Kullanım Yeri | Mantık |
| :--- | :--- | :--- | :--- | :--- |
| **Hero Başlık** | H1 | `text-4xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight` | Yalnızca Vitrin (Landing) Hero Karşılama | Sayfanın ana odak noktasıdır, ilk 3 saniyede ruhu verir. |
| **Sayfa Başlığı** | H1 | `text-2xl sm:text-3xl font-serif font-bold` | Menü Kataloğu, Admin Portalı, Canlı Takip | Operasyonel ekrandır; başlık gereksiz yer kaplamamalıdır. |
| **Ticari Bölüm** | H2 | `text-2xl sm:text-3xl font-serif font-bold` | "Öne Çıkan Modeller" | Müşterinin satın alma kararını tetikleyen ana bölümler. |
| **Süreç Rehberi** | H2 | `text-xl sm:text-2xl font-serif font-semibold` | "3 Adımda Atölye Deneyimi" | Bilgilendirici ama ticari vitrinin önüne geçmeyen rehber. |
| **Destek & Danışma** | H3 | `text-base sm:text-lg font-serif font-bold` | "Sıkça Sorulan Sorular", "Saatler & Konum" | **Kullanıcı kuralı:** SSS bir vitrin başlığıyla aynı boyutta olamaz. Sakin, ikincil bir danışma alanı olarak tasarlanmalıdır. |
| **Soru / Kart** | H4 | `text-xs sm:text-sm font-sans font-semibold` | Akordeon soruları, kart alt başlıkları | Rahat okunabilir, nötr sans-serif tipografi. |

### 3.4. Gerçek Operasyonel Zanaat Detayları
1. **Çoklu Fotoğraf Galerisi:**
   - Bir seramik ürünün tek bir fotoğrafı satış için yetersizdir; müşteri heykelin arkasını, boyutunu ve boyanmış halini görmek ister.
   - Yönetici panelinde dosya seçici (`File input`), URL yapıştırma, "Kapak Görseli Yap" özelliği ve otomatik Base64 sıkıştırma.
   - Müşteri modalında pürüzsüz slider, `1 / 3` fotoğraf sayacı ve sağ altta dokunmatik thumbnail önizleme şeridi.
2. **Akrilik Stand QR Çıktısı (Physical Floor Ready):**
   - Masaya konulacak QR kartı sıradan bir ekran görüntüsü olamaz.
   - HTML5 Canvas mimarisiyle vektörel A4/kart şablonu çizimi: Masa numarası, zarif logo, taranabilir yüksek çözünürlüklü QR kod ve "Nasıl Sipariş Verilir?" adımları.
   - 5000ms zaman aşımı ve hata korumasıyla güvenli tek tıkla `.png` indirme imkanı.
3. **Sessiz Güvenlik ve Depolama Dayanıklılığı:**
   - Personel şifreleri açıkta duramaz; varsayılan olarak `••••••••` şeklinde maskelenmeli, göze tıklanarak açılmalıdır.
   - Yüklenen fotoğraflar doğrudan localStorage'a basılırsa 5 MB kota (`QuotaExceededError`) patlar. Bu sebeple istemci tarafında Canvas ile 800px ve 0.75 kaliteye otomatik sıkıştırma (`compressImageFile`) uygulanmalıdır.

---

## 4. Özel Skill Katkısı (Skill Contribution Snippet)

Bu bölüm, kullanıcının global beceri kütüphanesine (`C:\Users\Lost_\.gemini\config\skills\...` altındaki `impeccable`, `taste` veya `conversion-design`) doğrudan kopyalanıp eklenebilecek kompakt kural özetidir.

```markdown
<!-- START: CRAFT-FLOOR & ANTI-SLOP SPECIFICATION -->
### Craft-Floor & Anti-Slop Tasarım Kuralları (Physical Ops & Action-First UI)

1. **Yasaklı Tipografi (Bubble-Sans Ban):**
   - Kalın ağırlıklarda (Bold/Black) `Plus Jakarta Sans`, `Poppins` veya aşırı dairesel geometrik fontlar KESİNLİKLE KULLANILMAZ. Bu fontlar buton ve etiketlerde çocuksu, baloncuklu ve yapay zeka şablonu (AI slop) havası yaratır.
   - Gövde metinleri, paneller, formlar ve butonlarda standart nötr sans: `Inter`, `SF Pro` veya `-apple-system`.
   - Zanaatkar ve prestijli başlıklarda asil serif: `Cormorant Garamond`, `Newsreader` veya `Playfair Display`.

2. **Kicker / Eyebrow Yasağı:**
   - Başlıkların tepesine `uppercase tracking-wider` formatında özet haplar/etiketler koymak yasaktır. Bu yapay zeka ajanı klişesidir, gözü yorar ve bilişsel gürültü oluşturur. Başlık doğrudan ne olduğunu söylemelidir.

3. **Punctuation & Copywriter Temizliği (Unslop):**
   - Cümle aralarında veya maddelerde em-dash (`—`) kullanılmaz; yerine virgül veya kısa tire (`-`) kullanılır.
   - Yapay SaaS jargonu ("Koruma Kalkanı", "Siber Senkronizasyon", "Hibrit Çözüm") yasaktır. Fiziksel mekan ve saha operasyonuna uygun doğal, net Türkçe ifadeler kullanılır ("Masa Değiştir", "Siparişi Mutfaktan Al").

4. **Kör Estetik Yasağı (Actionable Metrics Only):**
   - Bir arayüzdeki istatistik veya metrik kutusu sadece süs olamaz; kullanıcıyı bir sonraki adıma taşımalıdır.
   - Kritik stok kartı tıklandığında doğrudan biten ürün filtrelenmeli ve stok giriş kutusu açılmalıdır. Kasa cirosu kartı tıklandığında analitik tablosuna gitmelidir.

5. **Floor-First Hız (1-Tap Quick Advance):**
   - KDS ve istasyon ekranlarında siparişleri ilerletmek için akordeon açma zorunluluğu olamaz. Kartın üzerinde tek dokunuşluk ("Masaya Çıkar →", "Teslim Et ✓") aksiyon butonu bulunmalıdır.

6. **Tipografik Hiyerarşi Skalası:**
   - H1 sadece ana vitrin hero'sunda devasadır (`text-4xl` - `text-6xl`).
   - İç sayfa başlıkları operasyoneldir (`text-2xl` - `text-3xl`).
   - SSS, Saatler ve Konum gibi destekleyici bölümler ASLA ana vitrin başlığı boyutunda olamaz; ikincil danışma seviyesinde (`text-base` - `text-lg font-serif`) tutulmalıdır. Soru metinleri nötr sans-serif (`text-sm font-semibold`) olmalıdır.

7. **Dekoratif İkon ve Neon Titreşim Yasağı:**
   - Butonların içine zoraki pusula, roket vb. süs ikonları tıkıştırılamaz. Emojiler (`🎨`, `💡`, `🛠️`) arayüz ikonu olarak kullanılamaz.
   - `animate-pulse` ile yanıp sönen yeşil/kırmızı noktalar acil kriz hissi yarattığı için yasaktır; sakin, sabit rozetler kullanılır.

8. **Üst Bar & Mobil Taşma Koruması:**
   - Yönetici ve editör üst barlarında satır taşması (`wrap`) engellenmeli, `whitespace-nowrap shrink-0` ile butonların ekrandan kesilmesi önlenmelidir.
   - Tek sayfa React geçişlerinde (`activeView` değişimi) anında `window.scrollTo(0, 0)` çalıştırılmalıdır.
<!-- END: CRAFT-FLOOR & ANTI-SLOP SPECIFICATION -->
```

---

## 5. Uygulama ve Doğrulama Matrisi

| Dosya / Bileşen | Eski Hali (AI Slop / Hatalı) | Yeni Hali (Craft-Floor / Düzeltilmiş) | Kullanıcı Geri Bildirimi |
| :--- | :--- | :--- | :--- |
| `globals.css` | `--font-sans: var(--font-jakarta)` (Plus Jakarta Sans bold şişkinliği) | `--font-sans: var(--font-inter)` (Nötr kurumsal denge) | "Neden bu fontlar kurumsal tasarıma uymuyor? Çok AI slop duruyor." |
| `StoreLanding.tsx` | Devasa SSS başlığı (`text-2xl sm:text-3xl font-serif`) & Serif soru metinleri | İkincil danışma başlığı (`text-base sm:text-lg`) & Sans soru metinleri | "Sıkça sorulan sorular neden diğer herhangi bir başlıkla aynı boyutta mesela?" |
| `AdminPortal.tsx` | Tıklanamayan ölü metrik kutuları ve neon `animate-pulse` yeşil nokta | Tıklanabilir KPI kapıları (Kritik stok -> filtre + stok girişi) | "Burası evet estetik ama işlevsel değil... bir sonraki adıma yönlendirmeli." |
| `StaffDashboard.tsx`| Akordeon açmadan sipariş ilerletilemeyen KDS & "Barista" karmaşası | 1-tap "Masaya Çıkar / Teslim Et" butonları & "Mutfak" standardı | "Estetikle beraber işlevsellik gerekir." |
| `StoreCustomizer.tsx`| `T KARŞILAMA METİNLERİ` kicker'ı & sağdan taşan dar üst bar | Sentence case sakin başlıklar & `whitespace-nowrap shrink-0` üst bar | "Üst bar hiç de düzgün yerleşmiyor." |
| `AdminPortal.tsx` | Büyük "Yeni Model Ekle" yanında ezilen minik çıkış butonu | Eşit yükseklik, net kontrast ve dengeli çıkış aksiyonu | "Çıkış neden o kadar küçük?" |

---

## 6. Sonuç

Bu manifesto, tasarımın sadece "nasıl göründüğü" değil, sahada personelin ve masada müşterinin "nasıl hissettiği ve ne kadar hızlı işlem yaptığı" gerçeğini temsil eder. `workshop-cafe` projesinde elde edilen bu ilkeler, gelecekte üretilecek tüm atölye, kafe, e-ticaret ve kurumsal sistemler için tavizsiz bir kalite filtresidir.
