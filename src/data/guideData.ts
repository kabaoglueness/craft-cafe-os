export interface ChangelogRelease {
  version: string;
  date: string;
  title: string;
  badge?: string;
  changes: string[];
}

export interface GuideTopic {
  id: string;
  title: string;
  category: 'inventory' | 'kds' | 'rules' | 'editor' | 'customer';
  summary: string;
  steps: string[];
  tips?: string;
}

export const CHANGELOG_RELEASES: ChangelogRelease[] = [
  {
    version: 'v2.4.0',
    date: '16 Kasım 2026',
    title: 'Görsel Editör Sıralama, 3 Adımlı KDS & Katı Yetki Ayrımı',
    badge: 'Son Sürüm',
    changes: [
      'Kasiyer KDS ekranı 3 adımlı çizgisel ilerleme doğrusuna (Hazırlanıyor ➔ Masaya Çıktı ➔ Teslim Edildi) kavuşturuldu.',
      'Müşteri Canlı Takip Ekranı entegre edildi; müşteri masasında otururken hazırlık aşamalarını anlık izleyebilir.',
      'Görsel Mağaza Düzenleyicisi için yukarı/aşağı (⬆ ⬇) bölüm sıralama ve SSS/Grup etkinlikleri blokları eklendi.',
      'Cihaz simülasyonundaki kaydırma çubuğu taşması giderildi; çerçeve içi hapsedildi.',
      'Katı rol güvenliği: Editör yetkisiyle giren personelin finansal ve yönetimsel verilere erişimi tamamen engellendi.',
      'Tüm sistemden harici üçüncü parti referans jargonu temizlendi, kurumsal bej/kiremit zanaatkar estetiği pekiştirildi.'
    ]
  },
  {
    version: 'v2.2.0',
    date: '15 Kasım 2026',
    title: 'Hibrit Analitik & Fiziksel POS Ödeme Güvencesi',
    changes: [
      'Atölye ve kafe gelir dağılımı oran çubuğu ve saatlik masa yoğunluğu analitik raporları eklendi.',
      'Online kart girişi yerine "Ödeme deneyim sonunda masada POS veya kasadan tahsil edilir" bilgilendirmesi eklendi.',
      'Raftaki heykel ve kafe ürünleri için doğrudan tıklanabilir fiyat ve stok stepper kontrolleri getirildi.'
    ]
  },
  {
    version: 'v2.0.0',
    date: '12 Kasım 2026',
    title: 'Mekan Kuralları & Şifreli Personel Portalı',
    changes: [
      'Masada en az 1 içecek ve atölye parçası zorunluluğunu denetleyen mekan kuralları motoru devreye alındı.',
      'Yönetici (Ahmet), KDS (Deniz) ve Editör (Zeynep) için tek şifreyle rol ayrımı sağlandı.',
      'Müşteri üst barı mobilde sıfır taşma ile tek satıra sığdırıldı.'
    ]
  }
];

export const OPERATIONAL_GUIDES: GuideTopic[] = [
  {
    id: 'guide-inventory',
    title: '1. Heykel & Kafe Envanterini Yönetme',
    category: 'inventory',
    summary: 'Raftaki ham döküm heykellerin ve kafe içeceklerinin adet ve fiyatlarını güncelleme.',
    steps: [
      'Yönetici panelinde "Atölye Envanteri" veya "Kafe Menüsü" sekmesine gelin.',
      'Her modelin yanındaki [-] ve [+] butonlarını kullanarak raftaki güncel stok adedini artırıp azaltın.',
      'Fiyatın yanındaki düzenleme (✎) simgesine tıklayarak fiyatı anında güncelleyin.',
      'Bir ürün rafta bittiğinde veya geçici olarak durdurulmak istendiğinde özel aç/kapat anahtarını kullanın. Kapalı ürünler müşteri menüsünde otomatik olarak "Tükendi" rozetiyle kilitlenir.',
      'Yeni bir heykel veya kahve geldiğinde "Yeni Model Ekle" butonuna basarak kategori, fiyat ve başlangıç stoğunu kaydedin.'
    ],
    tips: 'Stok adedi 3 veya altına düştüğünde sistem otomatik olarak turuncu "Kritik Stok" uyarısı verir.'
  },
  {
    id: 'guide-kds',
    title: '2. Kasiyer & KDS İstasyon Takibi',
    category: 'kds',
    summary: 'Masalardan gelen siparişlerin atölye ve mutfak hazırlık aşamalarını takip etme.',
    steps: [
      'Mutfak ve servis personeli kendi şifresiyle Personel Portalı\'ndan giriş yapar.',
      'Yeni bir masa siparişi düştüğünde kartta masa numarası, müşteri adı ve sipariş kalemleri listelenir.',
      'Aşamayı güncellemek için "Atölye" veya "Mutfak" satırına bir kez tıklayın.',
      'Açılan çizgideki 3 adımdan uygun olanına (1. Hazırlanıyor, 2. Masaya Çıktı, 3. Teslim Edildi) tıklayın.',
      'Siz tıkladığınız an masada oturan müşterinin telefonundaki canlı takip ekranı saniyesinde güncellenir.',
      'Masa kalktığında ve ödemesi POS cihazıyla alındığında "Masayı Kapat" butonuna basarak adisyonu tamamlayın.'
    ],
    tips: 'Üstteki filtre butonlarıyla sadece Atölye parçalarını veya sadece Mutfak hazırlıklarını ayrı ekranlarda filtreleyebilirsiniz.'
  },
  {
    id: 'guide-rules',
    title: '3. Mekan Sipariş Kurallarını Yapılandırma',
    category: 'rules',
    summary: 'Kafenin ticari kurallarını (masaya içecek şartı vb.) otomatik denetleme.',
    steps: [
      'Yönetici panelinde "Mekan Kuralları" sekmesini açın.',
      '"Masada En Az 1 İçecek Zorunluluğu": Açık olduğunda müşteri sadece heykel seçip içecek seçmediğinde sistem siparişi onaylamaz ve nazikçe içecek seçmeye yönlendirir.',
      '"Her Masaya Atölye Parçası Şartı": Sadece kafe olarak oturulmasını istemiyorsanız bu kuralı aktif edebilirsiniz.',
      '"Masa Bilgilendirme Notu": Müşterinin menüde ve sepetinde göreceği seans süresi (örn. 90 dk) ve boya kiti kurallarını buradan değiştirebilirsiniz.'
    ]
  },
  {
    id: 'guide-editor',
    title: '4. Görsel Mağaza Düzenleyicisi Kullanımı',
    category: 'editor',
    summary: 'Kod yazmadan mağazanın karşılama ekranını, metinleri ve bölüm sıralamasını değiştirme.',
    steps: [
      'Yönetici panelinden "Görsel Mağaza Düzenleyicisi" butonuna tıklayın veya editör şifresiyle doğrudan giriş yapın.',
      'Sol menüden ana manşet başlığını, alt açıklamasını ve seans saatlerini dilediğiniz gibi yazın.',
      '"Sayfa Bölümleri & Sıralama" alanında bölümlerin yanındaki [⬆] ve [⬇] oklarını kullanarak vitrin sıralamasını değiştirin.',
      'Bölüm başlıklarının üzerine tıklayarak doğrudan kendi istediğiniz başlığı yazın.',
      'İstemediğiniz bölümleri aç/kapat anahtarıyla tek tıkla gizleyin; SSS veya Özel Etkinlikler bloğunu açın.',
      'Sağ taraftaki canlı ekranda Masaüstü ve Mobil görünümünü kontrol edip "Değişiklikleri Yayınla" butonuna basın.'
    ],
    tips: 'Editör rolüyle giren personelin ciro ve mekan kurallarına erişimi kısıtlıdır; yalnızca vitrin düzenlemesi yapabilir.'
  },
  {
    id: 'guide-payment',
    title: '5. Ödeme & Kasa Operasyonu',
    category: 'customer',
    summary: 'Fiziksel POS veya kasadan ödeme alma mantığı.',
    steps: [
      'Sistemde müşteriden herhangi bir online kredi kartı bilgisi istenmez.',
      'Müşteriye hem sepet aşamasında hem de takip ekranında ödemesini deneyim sonunda masaya gelecek POS cihazı veya kasadan yapacağı açıkça belirtilir.',
      'Masa boyamasını bitirip verniklemesini aldığında garson kablosuz POS cihazıyla masaya giderek adisyondaki toplam tutarı çeker veya müşteri kasaya gidip ödemesini yapar.',
      'Ödeme alındıktan sonra kasiyer ekranındaki "Masayı Kapat" butonuna basılır.'
    ]
  }
];

export const FAQ_KAFIYE: { q: string; a: string }[] = [
  {
    q: 'Masa numarasını müşteri yanlış girerse ne yapmalı?',
    a: 'Müşteri ekranının sağ üst köşesindeki "Masa [04] ✎" rozetine tıklayarak masa numarasını istediği an düzeltebilir.'
  },
  {
    q: 'Kritik stok uyarısı neye göre çalışır?',
    a: 'Herhangi bir heykel veya atölye parçasının stoğu 3 veya altına düştüğünde yönetici panelinde otomatik olarak turuncu "Kritik Stok" rozeti belirir.'
  },
  {
    q: 'Editör şifresi ile giren kişi finansal ciro verilerini görebilir mi?',
    a: 'Hayır. Sistem katı bir yetki yalıtımına sahiptir. Editör sadece görsel vitrini düzenleyebilir; ciro, siparişler ve mekan kuralları yalnızca Yönetici (Admin) yetkisine açıktır.'
  },
  {
    q: 'Kafe menüsüne yeni kahve veya tatlı ekleyebilir miyiz?',
    a: 'Evet. "Kafe Menüsü" sekmesindeki "Yeni Ürün Ekle" butonunu kullanarak dilediğiniz zaman yeni içecek, tatlı veya atıştırmalık ekleyebilirsiniz.'
  }
];
