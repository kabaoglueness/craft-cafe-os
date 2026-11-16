# Workshop & Cafe: Anti-slop tasarım manifestosu ve şartname
**Belge türü:** Kurumsal tasarım sistemleri, saha ergonomisi ve anti-slop rehberi  
**Hedef kitle:** Kıdemli tasarım mimarları, frontend mühendisleri, subagent ağı  
**Referans:** `C:\Projects\workshop-cafe` canlı deneyimi, kullanıcı direktifleri ve saha incelemeleri  

---

## 1. Giriş: Anti-slop ve fiziksel mekan ilkeleri

Modern arayüz üretiminde yapay zeka ajanlarının ve şablon kütüphanelerinin en büyük yanılgısı, bir arayüzün "şık" görünmesini onu "iyi" ve "işlevsel" kılmak için yeterli sanmasıdır. Dribbble veya soyut SaaS tasarımlarında göz boyayan parıltılar, gerçek bir seramik atölyesinde ve kafede ("craft-floor") ilk dakikada çöker:

1. **Fiziksel zemin gerçekliği:** Seramik atölyesinde masalar çamurludur, müşterinin elleri ıslaktır veya kirlidir, personelin zamanı saniyelerle ölçülür, masaların üzerinde ise akrilik standlarda basılı QR kartları durur. Burada çalışan bir arayüz vitrin süsü değil, fiziksel operasyonun bir parçasıdır.
2. **Kör estetik yanılgısı:** "Burası evet estetik ama işlevsel değil. Bir tasarımda estetikle beraber işlevsellik gerekir, işlevselliğin amacı işlemi bir yere götürmektir. Müşteri ya da işletme yöneticisi girdiğinde bir sonraki adıma yönlendirilmeliler." Kullanıcının koyduğu bu ilke, tüm tasarım kararlarımızın temel taşıdır.
3. **Anti-slop disiplini:** Yapay zekanın "tasarım yapıyorum" hissi vermek için her yere serpiştirdiği etiket hapları, yanıp sönen noktalar, anlamsız emojiler, yapay SaaS jargonu ve orantısız başlıklar, kullanıcıya bilişsel yük bindirir. Gerçek zanaat, gereksiz her pikseli ayıklayıp kalan unsurları operasyonel niyetle yerleştirmektir.

---

## 2. İstenmeyen desenler ve nedenleri

### 2.1. Tipografi: Baloncuklu geometrik sans fontlar yerine nötr tipografi
- **Yasaklanan model:** Kalın ağırlıklarda (Bold/Black) `Plus Jakarta Sans`, `Poppins` veya aşırı dairesel geometrik fontlar.
- **Kullanıcının direktifi:** *"Ya mesela neden bu fontlar kurumsal tasarıma uymuyor? Çok AI slop duruyor."*
- **Tasarım psikolojisi ve nedenleri:**
  - Plus Jakarta Sans gibi fontlar, 'a', 'e', 'g', 'o', 'd' gibi harflerin iç boşluklarında ve kavislerinde yuvarlak, baloncuksu bir geometriye sahiptir. Normal ağırlıkta temiz görünseler bile, `font-bold` veya `font-extrabold` olduklarında çocuksu, oyuncak vari veya ucuz mobil oyun havası verir.
  - Kurumsal kimlik denge, ciddiyet ve okunabilirlik ister. Baloncuklu kalın harfler, butondaki "Siparişi Onayla" veya paneldeki "Kritik Stok" ifadesini gayriciddi bir oyun butonuna çevirir.
- **Doğru uygulama:** 
  - Gövde metinleri, paneller, formlar ve butonlarda standart nötr sans-serif: `Inter`, `SF Pro` veya `-apple-system`.
  - Başlıklarda ise baloncuklu sans yerine atölye kimliğine uygun serif: `Cormorant Garamond` veya `Playfair Display`.

### 2.2. Kicker etiketleri ve büyük harf gürültüsü
- **Yasaklanan model:** Her başlığın üstüne eklenen `text-xs font-semibold uppercase tracking-wider text-muted` formatındaki minik haplar ve etiketler.
- **Örnek hatalar:**
  - `StoreLanding.tsx`: `"ATÖLYE & NİTELİKLİ KAHVE ALANI"`
  - `AdminPortal.tsx`: `"ÖZEL QR KOD"`
  - `StoreLanding.tsx`: `"SEANS SAATLERİ & KONUM"`, `"SIKÇA SORULANLAR"`
- **Tasarım psikolojisi ve nedenleri:**
  - Yapay zeka ajanları, bir bölümün ne olduğunu anlatamayacağı korkusuyla başlığın tepesine bir de büyük harfli özet etiketi yapıştırır.
  - Bu durum gözün doğal okuma ritmini bozar. Göz önce minik büyük harfe çarpar, sonra asıl başlığa iner, ikisi de aynı şeyi söylediği için beyin bunu gürültü olarak algılar.
  - Kullanıcıya bağıran büyük harfli mini metinler amatör şablonların belirgin bir işaretidir.
- **Doğru uygulama:** Kicker etiketlerini tamamen kaldırın. Başlık ne olduğunu doğrudan anlatmalıdır:
  ```tsx
  // YANLIŞ (AI slop kicker)
  <span className="text-xs uppercase tracking-wider text-[#B3542E]">Sıkça Sorulanlar</span>
  <h2 className="text-2xl font-serif">Merak Edilen Detaylar</h2>

  // DOĞRU (Doğal tipografik hiyerarşi)
  <h3 className="text-base sm:text-lg font-serif font-bold text-[#211D1A]">Sıkça Sorulan Sorular</h3>
  ```

### 2.3. Noktalama ve dil: Uzun tire ve yapay jargon
- **Yasaklanan model:** Cümle ortalarında veya liste başlarında uzun tire (`—`, em-dash) ve abartılı teknolojik jargonlar.
- **Örnek hatalar:**
  - Masa değiştirirken: `"QR Koruma Kalkanı — Yetkisiz Erişim Engeli"`
  - Sipariş bildiriminde: `"Siber Senkronizasyon ile Canlı Masa Takibi — Aktif"`
- **Tasarım psikolojisi ve nedenleri:**
  - İngilizce LLM metin üretiminin Türkçe arayüzlere kopyalanması sonucu ortaya çıkan uzun tire kullanımı, Türkçe web ergonomisinde yapay ve makine üretimi hissi verir.
  - Kafe ve atölye müşterisi soyut terimler yerine "Masa Değiştir", "Siparişini Takip Et", "Hesabı İste" gibi net, insani ve operasyonel Türkçe cümleler görmek ister.
- **Doğru uygulama:**
  - Uzun tire yerine virgül, nokta veya sade kısa tire (`-`) kullanın.
  - Metinleri gereksiz sıfatlardan arındırın: `"Masa Değiştir: Farklı bir masaya oturduysanız numaranızı güncelleyin."`

### 2.4. Dekoratif ikonlar ve yanıp sönen animasyonlar
- **Yasaklanan model:** 
  - Butonların içine zoraki sokuşturulan rastgele ikonlar (pusula, roket, yıldız).
  - Arayüz metinlerinde emoji kullanımı.
  - Yanıp sönen yeşil veya kırmızı noktalar (`animate-pulse`).
- **Tasarım psikolojisi ve nedenleri:**
  - Arayüzde emoji kullanmak kurumsal bir markanın ciddiyetini zedeler. Emojiler her işletim sisteminde farklı render edilir.
  - QR kartında veya sayaç ikonunda yeşil bir noktanın sürekli `animate-pulse` ile yanıp sönmesi kullanıcının dikkatini istemsizce çalar ve acil bir aksaklık varmış hissi yaratır. Oysa masa sakince müşterisini beklemektedir.
- **Doğru uygulama:**
  - Sadece işlevsel anlam taşıyan 1.5px veya 2px çizgi kalınlığında nötr SVG ikonlar (`lucide-react`) kullanın.
  - Yanıp sönen animasyonları kaldırın, durumları dingin rozetlerle gösterin.

### 2.5. Eylemsiz estetik ve ölü veri kutuları
- **Yasaklanan model:** Ekranda güzel duran ancak tıklandığında hiçbir şey yapmayan, kullanıcıyı bir sonraki eyleme götürmeyen ölü istatistik kutuları.
- **Kullanıcının direktifi:** *"Burası evet estetik ama işlevsel değil. Bir tasarımda estetikle beraber işlevsellik gerekir, işlevselliğin amacı işlemi bir yere götürmektir. Müşteri ya da işletme yöneticisi girdiğinde bir sonraki adıma yönlendirilmeliler."*
- **Tasarım psikolojisi ve nedenleri:**
  - Yönetici paneline giren bir işletme sahibi "Kritik Stok: 1 model" yazısını gördüğünde, tasarımcı ona estetik bir kart sunmuş olabilir ama işlevsel olarak onu bir çıkmaza sokmuştur. Yönetici hangi ürünün bittiğini görmek için sekmeleri aramak ve filtre bulmak zorunda kalır.
  - Kör estetik kullanıcının zamanını çalar. Her metrik kartı bir aksiyon kapısı olmak zorundadır.
- **Doğru uygulama:**
  - "Kritik Stok" kartı tıklandığında: Envanter listesinde kritik stoktaki ürünü anında filtreler, stok giriş kutusuna odaklanır ve tepeye net bir yönlendirme banner'ı koyar ("Kritik stoktaki 1 model listelendi, yeni adedi girip Kaydet'e basın").
  - "Kasa Cirosu" kartı tıklandığında: Finansal analitik ve adisyon dökümü sekmesine yönlendirir.

### 2.6. Mikro-ergonomi ve orantı dengesi
- **Yasaklanan model:** 
  - Devasa birincil butonların yanına sıkıştırılmış okunaksız minik çıkış veya iptal butonları.
  - Dar ekranlarda satır sonundan taşan, sağ kenarı kesilen üst barlar.
  - Mobilde (390px ekran genişliği) dışarı taşan pencereler veya sayfa geçişlerinde sayfanın alt kısımda asılı kalması.
- **Tasarım psikolojisi ve nedenleri:**
  - Bir formda "Kaydet" butonu büyükken "Vazgeç" butonu okunaksız ve cüce bırakıldığında kullanıcı görsel dengesizlik hisseder.
  - Dokunmatik ekranlarda parmak alanı en az `44x44px` (Apple HIG standardı) olmalıdır.
  - Tek sayfa geçişlerinde sayfanın tepeye kaydırılmaması, kullanıcının boş bir alana bakmasına ve arayüzün bozulduğunu sanmasına neden olur.
- **Doğru uygulama:**
  - Tüm üst barlarda `whitespace-nowrap shrink-0` ile taşma koruması.
  - Sayfa ve görünüm değişikliklerinde anında `window.scrollTo({ top: 0, behavior: 'instant' })`.
  - Dengeli buton çiftleri: Birincil buton dolgulu (`bg-[#B3542E]`), ikincil buton aynı yükseklikte ancak çerçeveli (`border border-[#D5C9BC] text-[#211D1A]`).

### 2.7. Terminoloji ve kimlik tutarlılığı
- **Yasaklanan model:** Proje içinde kahve istasyonuna bir yerde "Barista", bir yerde "Mutfak", sipariş durumuna bir yerde "Hazır", bir yerde "Fırında" denilmesi.
- **Neden:** Tutarsız terimler hem mutfaktaki personelin hem de masadaki müşterinin kafasını karıştırır. İşletmenin kimliği ne ise baştan sona tekilleştirilmelidir. Projemizde kullanıcı kararıyla "Barista" değil, tüm yiyecek ve içecek hazırlığı için **"Mutfak"** terimi kural olarak sabitlenmiştir.

### 2.8. Giriş ekranına tek tıkla bypass butonu ekleme hatası
- **Yasaklanan model:** Müşterinin ve personelin erişebileceği giriş ekranlarına "Ahmet (Yönetici)", "Deniz (Mutfak)", "Zeynep (Editör)" gibi tek tıkla şifresiz giriş yapan test ve demo kısayol butonları koymak.
- **Tasarım psikolojisi ve nedenleri:**
  - Gerçek işletme operasyonlarında ve müşterinin erişebileceği bir ekranda bypass butonları bırakmak amatörlük ve ucuz şablon göstergesidir.
  - Şifre alanı saygındır, ciddidir ve gizlidir. Müşteri arayüzünden "Personel Portalı"na tıklandığında işletme ciddiyetine uygun, güven veren, temiz ve yalın bir parola girişi karşılamalıdır. Test amaçlı geçici araçlar canlı kullanıcı deneyimine sızdırılmamalıdır.
- **Doğru uygulama:** Giriş ekranında yalnızca işlevsel ve ergonomik bir şifre alanı, şifre görünürlük anahtarı ve "Panele Giriş Yap" birincil butonu yer almalıdır.

---

## 3. İstenen standartlar ve gerekçeleri

### 3.1. İşlevsel yönlendirme ve doğrudan aksiyon
Arayüzdeki her bilgi bloğu kullanıcıya şu sorunun cevabını vermelidir: *"Şimdi ne yapmalıyım?"*
- **Tıklanabilir KPI kartları:**
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
- **Sonuç:** Kullanıcı bir veriyi gördüğü anda tek tıkla çözüme ulaşır. Arama ve gezinme süresi kısalır.

### 3.2. Saha hızı ve tek dokunuşla istasyon yönetimi
- **Mutfak ve atölye personeli:** Yoğun saatlerde personelin sipariş kartlarını açıp detayları okumaya vakti yoktur.
- **Tek dokunuşla ilerletme mantığı:**
  - Sipariş kartının dış yüzeyinde, akordeonu açmaya gerek bırakmayan tek dokunuşluk bir buton bulunur:
    - Beklemede ise: `Masaya Çıkar →` (Tek tıkla durumu "Servis Edildi"ye geçirir).
    - Masada ise: `Teslim Et ✓` (Tek tıkla siparişi tamamlar).
  - İstasyon personeli ekrana dokunup işine devam eder, tablet başında beklemez.

### 3.3. Optik tipografik hiyerarşi
Başlık boyutları sadece font sınıfından ibaret değildir; sayfadaki işlevsel önem derecesine göre ölçeklenir:

| Rol | Seviye | Boyut ve stil | Kullanım yeri | Mantık |
| :--- | :--- | :--- | :--- | :--- |
| **Hero başlık** | H1 | `text-4xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight` | Yalnızca vitrin karşılama alanı | Sayfanın ana odak noktasıdır, ilk 3 saniyede atmosferi verir. |
| **Sayfa başlığı** | H1 | `text-2xl sm:text-3xl font-serif font-bold` | Menü kataloğu, yönetim paneli, canlı takip | Operasyonel ekrandır, başlık gereksiz yer kaplamaz. |
| **Ticari bölüm** | H2 | `text-2xl sm:text-3xl font-serif font-bold` | "Öne Çıkan Modeller" | Müşterinin satın alma kararını tetikleyen ana bölümler. |
| **Süreç rehberi** | H2 | `text-xl sm:text-2xl font-serif font-semibold` | "3 Adımda Atölye Deneyimi" | Bilgilendirici rehber. |
| **Destek ve danışma** | H3 | `text-base sm:text-lg font-serif font-bold` | "Sıkça Sorulan Sorular", "Saatler & Konum" | SSS bir vitrin başlığıyla aynı boyutta olamaz, sakin bir danışma alanı olarak kalmalıdır. |
| **Soru ve kart metni** | H4 | `text-xs sm:text-sm font-sans font-semibold` | Akordeon soruları, kart alt başlıkları | Rahat okunabilir, nötr sans-serif tipografi. |

### 3.4. Operasyonel detaylar ve dayanıklılık
1. **Çoklu fotoğraf galerisi:**
   - Bir seramik ürünün tek bir fotoğrafı yetersizdir; müşteri heykelin arkasını, boyutunu ve boyanmış halini görmek ister.
   - Yönetici panelinde dosya seçici, bağlantı ekleme, "Kapak Görseli Yap" özelliği ve otomatik Base64 sıkıştırma bulunur.
   - Müşteri penceresinde kaydırıcı, `1 / 3` fotoğraf sayacı ve sağ altta küçük önizleme şeridi yer alır.
2. **Akrilik masa QR çıktısı:**
   - Masaya konulacak QR kartı ekran görüntüsü olamaz.
   - HTML5 Canvas ile masa numarası, logo, yüksek çözünürlüklü QR kod ve adımları içeren baskı şablonu çizilir.
   - Hata ve zaman aşımı korumasıyla tek dokunuşla PNG çıktısı alınır.
3. **Sessiz güvenlik ve depolama dayanıklılığı:**
   - Personel şifreleri açıkta duramaz, varsayılan olarak `••••••••` şeklinde maskelenir ve göze tıklanarak açılır.
   - Yüklenen fotoğrafların yerel depolama kotasını aşmaması için istemci tarafında Canvas ile 800 piksel ve 0.75 kaliteye otomatik sıkıştırma (`compressImageFile`) uygulanır.

### 3.5. Giriş ergonomisi: Şifre görünürlüğü ve otomatik alan temizleme
1. **Şifre görünürlüğü (`Eye / EyeOff`):**
   - Şifre alanlarında gizle ve göster anahtarının bulunmaması kullanıcıda belirsizlik ve klavye şüphesi yaratır.
   - İkincil tıklama odağını bozmamak için anahtar butonu `tabIndex={-1}`, `aria-label` tanımlı ve sağ kenara hizalı olmalıdır.
2. **Hata anında otomatik temizleme ve odak:**
   - Kullanıcı yanlış şifre girdiğinde eski hatalı metni elle silmek zorunda kalmamalıdır.
   - Doğrulama başarısız olduğunda alan anında sıfırlanmalı (`setPasscode('')`) ve tekrar `inputRef.current?.focus()` ile odaklanmalıdır.

---

## 4. Beceri kütüphanesine aktarılacak kural özeti

Bu bölüm, global beceri kütüphanesine (`impeccable`, `taste` veya `conversion-design`) doğrudan kopyalanabilecek kuralları içerir.

```markdown
<!-- START: CRAFT-FLOOR & ANTI-SLOP SPECIFICATION -->
### Craft-floor ve anti-slop tasarım kuralları

1. **Yasaklı tipografi (Baloncuklu font yasağı):**
   - Kalın ağırlıklarda `Plus Jakarta Sans`, `Poppins` veya aşırı dairesel geometrik fontlar kullanılmaz. Bu fontlar buton ve etiketlerde çocuksu bir hava yaratır.
   - Gövde metinleri, paneller, formlar ve butonlarda standart nötr sans: `Inter`, `SF Pro` veya `-apple-system`.
   - Başlıklarda atölye ve mekan kimliğine uygun serif: `Cormorant Garamond`, `Newsreader` veya `Playfair Display`.

2. **Kicker etiket yasağı:**
   - Başlıkların tepesine `uppercase tracking-wider` formatında özet haplar koymak yasaktır. Gözü yorar ve bilişsel gürültü oluşturur. Başlık doğrudan ne olduğunu söyler.

3. **Noktalama ve dil temizliği:**
   - Cümle aralarında veya maddelerde uzun tire (`—`) kullanılmaz; yerine virgül, nokta veya kısa tire (`-`) kullanılır.
   - Yapay SaaS jargonu yasaktır. Mekan ve saha operasyonuna uygun doğal Türkçe ifadeler kullanılır ("Masa Değiştir", "Siparişi Mutfaktan Al").

4. **Kör estetik yasağı (Doğrudan aksiyon):**
   - Arayüzdeki istatistik veya metrik kutusu süs olamaz; kullanıcıyı bir sonraki adıma taşımalıdır.
   - Kritik stok kartı tıklandığında doğrudan biten ürün filtrelenmeli ve stok giriş kutusu açılmalıdır. Kasa cirosu kartı tıklandığında analitik tablosuna gitmelidir.

5. **Saha hızı (Tek dokunuşla KDS yönetimi):**
   - KDS ekranlarında siparişleri ilerletmek için akordeon açma zorunluluğu olamaz. Kartın üzerinde tek dokunuşluk ("Masaya Çıkar →", "Teslim Et ✓") aksiyon butonu bulunur.

6. **Tipografik hiyerarşi skalası:**
   - H1 sadece ana vitrin karşılama alanında büyüktür (`text-4xl` - `text-6xl`).
   - İç sayfa başlıkları operasyoneldir (`text-2xl` - `text-3xl`).
   - SSS, Saatler ve Konum gibi destekleyici bölümler ana vitrin başlığı boyutunda olamaz; ikincil danışma seviyesinde (`text-base` - `text-lg font-serif`) tutulur. Soru metinleri nötr sans-serif (`text-sm font-semibold`) olur.

7. **Dekoratif ikon ve neon titreşim yasağı:**
   - Butonların içine zoraki süs ikonları konulamaz. Arayüzde emoji kullanılmaz.
   - `animate-pulse` ile yanıp sönen noktalar kriz hissi yarattığı için yasaktır; sakin rozetler kullanılır.

8. **Üst bar ve mobil taşma koruması:**
   - Yönetici ve editör üst barlarında satır taşması engellenmeli, `whitespace-nowrap shrink-0` ile butonların ekrandan kesilmesi önlenmelidir.
   - Tek sayfa geçişlerinde anında `window.scrollTo(0, 0)` çalıştırılmalıdır.

9. **Giriş güvenliği ve saygınlık standardı:**
   - Kamuya veya müşteriye açık ekranlarda personel girişine tek tıkla bypass butonları koymak yasaktır. Şifre alanı sade ve gizlidir.

10. **Şifre ergonomisi:**
    - Şifre alanlarında göz ikonu bulunmalıdır (`Eye / EyeOff`).
    - Hatalı şifre girişinde alan otomatik temizlenmeli (`setPasscode('')`) ve anında `inputRef.focus()` alarak kullanıcının zahmetsizce tekrar denemesi sağlanmalıdır.
<!-- END: CRAFT-FLOOR & ANTI-SLOP SPECIFICATION -->
```

---

## 5. Uygulama ve doğrulama matrisi

| Dosya / Bileşen | Eski hali | Yeni hali | Kullanıcı geri bildirimi |
| :--- | :--- | :--- | :--- |
| `globals.css` | `--font-sans: var(--font-jakarta)` (Plus Jakarta Sans kalın şişkinliği) | `--font-sans: var(--font-inter)` (Nötr kurumsal denge) | "Neden bu fontlar kurumsal tasarıma uymuyor? Çok AI slop duruyor." |
| `StoreLanding.tsx` | Devasa SSS başlığı ve serif soru metinleri | İkincil danışma başlığı (`text-base sm:text-lg`) ve sans soru metinleri | "Sıkça sorulan sorular neden diğer herhangi bir başlıkla aynı boyutta mesela?" |
| `AdminPortal.tsx` | Tıklanamayan ölü metrik kutuları ve neon yeşil nokta | Tıklanabilir KPI kapıları (Kritik stok -> filtre + stok girişi) | "Burası evet estetik ama işlevsel değil... bir sonraki adıma yönlendirmeli." |
| `StaffDashboard.tsx`| Akordeon açmadan sipariş ilerletilemeyen KDS ve "Barista" karmaşası | Tek dokunuşla "Masaya Çıkar / Teslim Et" butonları ve "Mutfak" standardı | "Estetikle beraber işlevsellik gerekir." |
| `StoreCustomizer.tsx`| Büyük harfli karşılama etiketi ve sağdan taşan dar üst bar | Sentence case sakin başlıklar ve `whitespace-nowrap shrink-0` üst bar | "Üst bar hiç de düzgün yerleşmiyor." |
| `AdminPortal.tsx` | Büyük "Yeni Model Ekle" yanında ezilen minik çıkış butonu | Eşit yükseklik, net kontrast ve dengeli çıkış butonu | "Çıkış neden o kadar küçük?" |
| `StaffLogin.tsx` | Tek tıkla giriş bypass butonları, göz ikonu olmayan şifre alanı, hatalı girişte eski şifrenin silinmemesi | Demo bypass butonları kaldırıldı, Eye/EyeOff toggle eklendi, hatalı girişte otomatik temizleme ve anında odak sağlandı | "Personel portalında şifre alanına tek tıkla giriş koymak tam bir AI slop göstergesi, şifre alanı saygın olmalı." |

---

## 6. Sonuç

Bu manifesto, tasarımın sadece "nasıl göründüğü" değil, sahada personelin ve masada müşterinin "nasıl işlem yaptığı" gerçeğini temsil eder. `workshop-cafe` projesinde elde edilen bu ilkeler, gelecekte üretilecek atölye, kafe, e-ticaret ve kurumsal sistemler için doğrudan referans standardıdır.
