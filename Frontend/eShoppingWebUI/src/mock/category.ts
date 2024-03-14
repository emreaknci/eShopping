
const categories = [
  {
    id: "1",
    name: 'Telefon',
    subcategories: ['Akıllı Telefon', 'Klasik Telefon', 'Aksesuarlar'],
    products: [],
    features: [
      { name: 'Ekran Boyutu', values: ['5.5 inç', '6 inç', '6.5 inç', '6.7 inç'] },
      { name: 'RAM Kapasitesi', values: ['4 GB', '6 GB', '8 GB', '12 GB'] },
      { name: 'Depolama Kapasitesi', values: ['64 GB', '128 GB', '256 GB', '512 GB'] }
    ]
  },
  {
    id: 2,
    name: 'Bilgisayar',
    subcategories: ['Laptop', 'Masaüstü', 'Oyun Bilgisayarları'],
    products: [],
    features: [
      { name: 'Ekran Boyutu', values: ['14 inç', '15.6 inç', '17 inç'] },
      { name: 'RAM Kapasitesi', values: ['8 GB', '16 GB', '32 GB', '64 GB'] },
      { name: 'Depolama Türü', values: ['SSD', 'HDD', 'SSD + HDD'] }
    ]
  },
  {
    id: 3,
    name: 'Bilgisayar Parçaları',
    subcategories: ['RAM', 'GPU', 'CPU', 'Anakart'],
    products: [],
    features: [
      { name: 'Bellek Türü', values: ['DDR3', 'DDR4'] },
      { name: 'Grafik Belleği', values: ['4 GB', '6 GB', '8 GB', '12 GB'] },
      { name: 'İşlemci Hızı', values: ['2.5 GHz', '3.0 GHz', '3.5 GHz', '4.0 GHz'] },
      { name: 'Soket Türü', values: ['LGA1151', 'AM4', 'LGA1200'] }
    ]
  },
  {
    id: 4,
    name: 'TV & Ses',
    subcategories: ['Televizyon', 'Soundbar', 'Kulaklık'],
    products: [],
    features: [
      { name: 'Ekran Boyutu', values: ['32 inç', '42 inç', '55 inç', '65 inç'] },
      { name: 'Bağlantı Türü', values: ['HDMI', 'DisplayPort', 'Optik'] },
      { name: 'Ses Gücü', values: ['20W', '40W', '60W', '80W'] }
    ]
  },
  {
    id: 5,
    name: 'Ev Eşyaları',
    subcategories: ['Buzdolabı', 'Çamaşır Makinesi', 'Fırın'],
    products: [],
    features: [
      { name: 'Enerji Sınıfı', values: ['A++', 'A+++', 'A+++-20%'] },
      { name: 'Kapasite', values: ['200 L', '300 L', '400 L', '500 L'] },
      { name: 'Boyutlar', values: ['60x60x150 cm', '70x70x180 cm', '80x80x200 cm'] }
    ]
  },
  {
    id: 6,
    name: 'Kişisel Bakım',
    subcategories: ['Saç Kurutma Makinesi', 'Diş Fırçası', 'Elektrikli Tıraş Makinesi'],
    products: [],
    features: [
      { name: 'Güç Tüketimi', values: ['1000W', '1500W', '2000W', '2500W'] },
      { name: 'Kullanım Süresi', values: ['30 dakika', '45 dakika', '1 saat', '2 saat'] },
      { name: 'Ağırlık', values: ['500 gr', '750 gr', '1 kg', '1.5 kg'] }
    ]
  }
];

const comments = Array.from({ length: 5 }, (_, i) => ({
  userName: `Kullanıcı ${i + 1}`,
  rating: 5,
  comment: `Yorum ${i + 1}`
}));

categories.forEach((category) => {
  category.products = Array.from({ length: 20 }, (_, index) => {
    const productId = `${category.id}-${index + 1}`;
    return {
      id: productId,
      name: `${category.name} ${index + 1}`,
      price: 5000 + (index + 1) * 0.99,
      description: `${category.name} ${index + 1} açıklama`,
      rating: 5,
      features: category.features.map((feature) => ({
        name: feature.name,
        value: feature.values[Math.floor(Math.random() * feature.values.length)]
      })),
      comments: comments
    };
  });
});

export default categories;
