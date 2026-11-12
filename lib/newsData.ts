export interface NewsItem {
  id: string;
  category: 'siyaset' | 'ekonomi' | 'teknoloji' | 'spor' | 'kultur';
  categoryLabel: string;
  categoryColor: string; // Tailwind color tokens
  headline: string;
  kicker: string;
  location: string;
  timestamp: string;
  image: string;
  readTimeSec: number;
  bullets: string[];
  fullSummary: string;
  keyFigures?: { label: string; value: string }[];
  impactRating?: string;
  expertQuote?: { text: string; author: string };
  audioScript: string;
}

export const INITIAL_NEWS: NewsItem[] = [
  {
    id: 'siyaset-1',
    category: 'siyaset',
    categoryLabel: 'Siyaset & Diplomasi',
    categoryColor: 'rose',
    headline: 'Yeni Meclis Reform Paketi ve Bölgesel Diplomasi Trafiği',
    kicker: 'TBMM GENEL KURULU',
    location: 'ANKARA',
    timestamp: '14 dakika önce',
    image: '/images/news_siyaset.jpg',
    readTimeSec: 12,
    bullets: [
      'TBMM Genel Kurulu\'nda demokratikleşme ve yeni anayasa hazırlıkları kapsamında siyasi partiler arası ilk temaslar hızlandı.',
      'Bölgesel barış girişimleri doğrultusunda Dışişleri Bakanlığı genişletilmiş bir diplomasi heyetini komşu başkentlere gönderdi.',
      'Temel hak ve hürriyetleri güçlendiren 14 maddelik yargı reform teklifinin bu hafta komisyona gelmesi bekleniyor.'
    ],
    fullSummary: 'Ankara kulislerinde yeni anayasa ve kapsamlı yargı reformu paketi üzerinde uzlaşı arayışları yoğunlaştı. Meclis Başkanlığı bünyesinde kurulan çalışma komisyonu, partilerin ortak mutabakat sağlayabileceği maddeleri önceliklendiriyor. Eş zamanlı olarak Türkiye\'nin arabuluculuk rolü üstlendiği bölgesel barış görüşmelerinde yeni bir ateşkes ve ticaret koridoru protokolü masada.',
    keyFigures: [
      { label: 'Reform Maddesi', value: '14 Madde' },
      { label: 'Komisyon Süresi', value: '3 Hafta' },
      { label: 'Katılan Parti', value: '5 Grup' }
    ],
    impactRating: 'Yüksek Politik Etki',
    expertQuote: {
      text: 'Meclis zemininde sağlanacak geniş mutabakat, önümüzdeki 10 yılın anayasal güvencesini oluşturabilir.',
      author: 'Prof. Dr. Ali Erdem, Anayasa Hukukçusu'
    },
    audioScript: 'Siyasette sıcak saatler. TBMM Genel Kurulu yeni reform paketini görüşmek üzere toplanırken, bölgesel barış için Ankara merkezli kritik bir diplomasi trafiği başlatıldı.'
  },
  {
    id: 'ekonomi-1',
    category: 'ekonomi',
    categoryLabel: 'Ekonomi & Piyasalar',
    categoryColor: 'amber',
    headline: 'Merkez Bankası Rezervlerinde Artış ve İhracatçıya 150 Milyar TL Destek',
    kicker: 'İSTANBUL FİNANS MERKEZİ',
    location: 'İSTANBUL',
    timestamp: '28 dakika önce',
    image: '/images/news_ekonomi.jpg',
    readTimeSec: 12,
    bullets: [
      'Merkez Bankası brüt rezervleri son 18 ayın en yüksek seviyesine tırmanırken döviz piyasalarında volatilite azaldı.',
      'İhracatçı KOBİ\'ler ve teknoloji üreticileri için yıllık düşük maliyetli 150 milyar liralık yeni kredi paketi devreye girdi.',
      'Yıllık enflasyon beklentilerindeki düşüş eğilimi yabancı doğrudan yatırım girişlerini yeniden canlandırdı.'
    ],
    fullSummary: 'İstanbul Finans Merkezi\'nde düzenlenen ekonomi zirvesinde para politikası koordinasyonu ve üretim teşvikleri değerlendirildi. Merkez Bankası rezervlerindeki kalıcı artış ve Türk Lirası varlıklara artan talep, kredi derecelendirme kuruluşlarının not artırımı sinyallerini güçlendirdi. Hazine ve Maliye Bakanlığı, reel sektörü canlandıracak 150 milyar TL tutarındaki reeskont ve yeşil dönüşüm fonunu kamuoyuyla paylaştı.',
    keyFigures: [
      { label: 'Kredi Paketi', value: '150 Milyar ₺' },
      { label: 'Rezerv Artışı', value: '+3.4 Milyar $' },
      { label: 'KOBİ Hedefi', value: '25.000 Firma' }
    ],
    impactRating: 'Doğrudan Piyasa Etkisi',
    expertQuote: {
      text: 'Rezerv kompozisyonundaki güçlenme reel sektörün öngörülebilirliğini ve yatırımlarını doğrudan artırıyor.',
      author: 'Selin Karaca, Başekonomist'
    },
    audioScript: 'Ekonomide nefes aldıran gelişmeler. Merkez Bankası rezervleri yükselişini sürdürürken, ihracatçılar ve KOBİ\'ler için 150 milyar liralık dev finansman paketi yürürlüğe girdi.'
  },
  {
    id: 'teknoloji-1',
    category: 'teknoloji',
    categoryLabel: 'Teknoloji & İnovasyon',
    categoryColor: 'cyan',
    headline: 'Yerli Otonom Hava Aracı ve Yapay Zeka İşlemcisinde Küresel Başarı',
    kicker: 'TEKNOLOJİ ÜSSÜ',
    location: 'ANKARA',
    timestamp: '41 dakika önce',
    image: '/images/news_teknoloji.jpg',
    readTimeSec: 12,
    bullets: [
      'Milli imkanlarla geliştirilen yapay zeka işlemcisi, güç tüketimini yüzde 40 düşürerek uluslararası testlerden tam not aldı.',
      'Yeni nesil otonom kargo ve keşif İHA\'sı, rüzgarlı hava simülasyonunda 450 kilometre menzille başarılı iniş gerçekleştirdi.',
      'Yerli çip ve kuantum bilişim laboratuvarı 120 genç araştırmacıyla ilk sivil havacılık siparişini teslim etti.'
    ],
    fullSummary: 'Teknopark Ankara ve Gebze Bilişim Vadisi ortaklığında geliştirilen yapay zeka işlemcisi, uç bilişim (Edge AI) sistemlerinde dünya standartlarını yakaladı. Yeni nesil otonom drone platformu zorlu hava koşullarında GPS bağımsız seyrüsefer yapabilme kabiliyetiyle küresel savunma ve sivil lojistik fuarlarının gözdesi oldu. Proje ile kritik sistemlerdeki dışa bağımlılık sıfıra indiriliyor.',
    keyFigures: [
      { label: 'Enerji Tasarrufu', value: '%40' },
      { label: 'Otonom Menzil', value: '450 km' },
      { label: 'Patent Sayısı', value: '18 Tescil' }
    ],
    impactRating: 'Stratejik İnovasyon',
    expertQuote: {
      text: 'Yazılım ve donanımı bir arada üreten Türkiye, yapay zeka liginde tüketici değil üretici konumuna yükseliyor.',
      author: 'Dr. Mert Ulusoy, Robotik Araştırmacısı'
    },
    audioScript: 'Teknolojide tarihi dönüm noktası. Yerli yapay zeka çipi yüzde 40 daha az güç harcayarak küresel onay aldı; otonom hava aracımız ilk uçuşunu başarıyla tamamladı.'
  },
  {
    id: 'spor-1',
    category: 'spor',
    categoryLabel: 'Spor Dünyası',
    categoryColor: 'emerald',
    headline: 'Süper Lig\'de Zirve Düğümü ve Avrupa Arenasında Kritik Randevu',
    kicker: 'ŞAMPİYONLUK YARIŞI',
    location: 'İSTANBUL',
    timestamp: '52 dakika önce',
    image: '/images/news_spor.jpg',
    readTimeSec: 11,
    bullets: [
      'Ligin bitimine 6 hafta kala lider ile takipçisi arasındaki puan farkı 1\'e düştü; hafta sonu derbi nefesleri kesecek.',
      'Avrupa kupalarında temsilcilerimiz son 16 turu rövanş maçları için deplasmana tam kadro ve yüksek moralle hareket etti.',
      'Milli yüzücümüz 200 metre kurbağalamada Avrupa rekoru kırarak olimpiyat kotasını ilk sırada garantiledi.'
    ],
    fullSummary: 'Futbolseverler hafta sonu oynanacak tarihi derbiye kilitlendi. Ligin zirvesindeki iki ezeli rakip son 10 haftadır mağlubiyet yüzü görmezken, teknik direktörler taktik planlarını sahaya yansıtmaya hazırlanıyor. Diğer yandan temsilcilerimiz Avrupa arenasında çeyrek final biletini kapmak için sahaya çıkarken milli yüzücümüzün rekoru olimpiyat öncesi göğsümüzü kabarttı.',
    keyFigures: [
      { label: 'Puan Farkı', value: '1 Puan' },
      { label: 'Kalan Hafta', value: '6 Hafta' },
      { label: 'Olimpiyat Kotası', value: 'A Barajı' }
    ],
    impactRating: 'Milyonları İlgilendiriyor',
    expertQuote: {
      text: 'Derbinin psikolojik üstünlüğü kalan fikstürde şampiyonluk kupasının sahibini büyük ölçüde tayin edecek.',
      author: 'Rıdvan Demir, Spor Yazarı'
    },
    audioScript: 'Sporda heyecan dorukta. Süper Lig\'de zirvede fark tek puana indi; Avrupa kupalarında temsilcilerimiz kritik rövanşa çıkıyor ve havuzda yeni bir rekor kırıldı.'
  },
  {
    id: 'kultur-1',
    category: 'kultur',
    categoryLabel: 'Kültür & Yaşam',
    categoryColor: 'purple',
    headline: 'Boğaziçi Uluslararası Sanat Bienali ve Gastronomide Yeni Yıldızlar',
    kicker: 'İSTANBUL MODERN & TARİH',
    location: 'İSTANBUL',
    timestamp: '1 saat önce',
    image: '/images/news_kultur.jpg',
    readTimeSec: 12,
    bullets: [
      '38 ülkeden 120 sanatçının katıldığı çağdaş sanat festivali İstanbul Modern ve Karaköy sahil bandında ziyarete açıldı.',
      'Tarihi Yarımada\'da asırlık üç sarnıç ve medrese restore edilerek ücretsiz kültür merkezlerine dönüştürüldü.',
      'Uluslararası gastronomi rehberi Türkiye seçkisinde bu yıl 6 restoran daha Michelin listesine girmeyi başardı.'
    ],
    fullSummary: 'Kültür ve Turizm Bakanlığı desteğiyle düzenlenen çağdaş sanat bienali, Boğaz hattını devasa bir açık hava galerisine dönüştürdü. Dijital sanat enstalasyonları, ses heykelleri ve tarihi mekan performansları yoğun ilgi topladı. Eş zamanlı olarak Türk mutfağının sürdürülebilir yerel lezzetleri uluslararası gastronomi dünyasında hak ettiği yeri bularak yeni yıldızlarla taçlandırıldı.',
    keyFigures: [
      { label: 'Katılımcı Sanatçı', value: '120 Sanatçı' },
      { label: 'Ziyaretçi Beklentisi', value: '350.000 Kişi' },
      { label: 'Yeni Michelin', value: '+6 Restoran' }
    ],
    impactRating: 'Kültürel Prestij',
    expertQuote: {
      text: 'İstanbul, antik mirasıyla çağdaş sanatın dünyadaki en ilham verici buluşma noktalarından biri haline geldi.',
      author: 'Elif Şensoy, Küratör'
    },
    audioScript: 'Kültür ve sanatta bahar rüzgarı. Boğaziçi Sanat Bienali binlerce ziyaretçiyle kapılarını açarken, Türk mutfağı uluslararası arenada yeni yıldızlar kazandı.'
  }
];
