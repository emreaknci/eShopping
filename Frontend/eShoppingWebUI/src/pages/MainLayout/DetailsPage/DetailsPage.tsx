import { Grid, Typography, Button, Rating, Box, Paper, useTheme, Tab, Tabs, Divider, IconButton } from '@mui/material';

import { useParams } from 'react-router-dom';
import Styled from './DetailsPage.style';
import { useEffect, useState } from 'react';
import { ImageSliderComponent } from '../../../components/common/ImageSliderComponent';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { LoadingComponent } from '../../../components/common/LoadingComponent';


const images = [
  'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60',
  'https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60',
  'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250',
  'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60',
  'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60',
  'https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60',
  'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250',
  'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60',
];
const product = {
  name: 'Ürün Adı',
  images: images,
  description: 'Ürün açıklaması burada yer alacak.',
  price: 1600,
  features: [
    { name: 'Ekran', value: '15.6" FHD' },
    { name: 'İşlemci', value: 'Intel Core i7' },
    { name: 'RAM', value: '16 GB DDR4' },
    { name: 'Depolama', value: '512 GB SSD' },
    { name: 'Ekran Kartı', value: 'NVIDIA GeForce GTX 1650' },
    { name: 'İşletim Sistemi', value: 'Windows 10' },
    { name: 'Ekran', value: '15.6" FHD' },
    { name: 'İşlemci', value: 'Intel Core i7' },
    { name: 'RAM', value: '16 GB DDR4' },
    { name: 'Depolama', value: '512 GB SSD' },
    { name: 'Ekran Kartı', value: 'NVIDIA GeForce GTX 1650' },
    { name: 'İşletim Sistemi', value: 'Windows 10' },
  ],
  comments: [
    {
      userId: 1,
      userName: 'Ahmet',
      comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.Dolores doloremque quasi molestiae suscipit quaerat amet necessitatibus quas obcaecati quo laudantium nemo praesentium maiores molestias pariatur, nihil debitis ex! Blanditiis, minus!  ',
      rating: 4.5
    },
    {
      userId: 2,
      userName: 'Mehmet',
      comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.Dolores doloremque quasi molestiae suscipit quaerat amet necessitatibus quas obcaecati quo laudantium nemo praesentium maiores molestias pariatur, nihil debitis ex! Blanditiis, minus!  ',
      rating: 3.5
    },
    {
      userId: 3,
      userName: 'Ali',
      comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.Dolores doloremque quasi molestiae suscipit quaerat amet necessitatibus quas obcaecati quo laudantium nemo praesentium maiores molestias pariatur, nihil debitis ex! Blanditiis, minus!  ',
      rating: 5
    },
    {
      userId: 4,
      userName: 'Veli',
      comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.Dolores doloremque quasi molestiae suscipit quaerat amet necessitatibus quas obcaecati quo laudantium nemo praesentium maiores molestias pariatur, nihil debitis ex! Blanditiis, minus!  ',
      rating: 2
    },
    {
      userId: 5,
      userName: 'Ayşe',
      comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.Dolores doloremque quasi molestiae suscipit quaerat amet necessitatibus quas obcaecati quo laudantium nemo praesentium maiores molestias pariatur, nihil debitis ex! Blanditiis, minus!  ',
      rating: 1
    },

  ],
  rating: 4.5,
};

const orderAndReturnDetails = [
  {
    title: "Teslimat Bilgileri", details: [
      "Standart teslimat ile hafta içi saat 14:00'a kadar verilen siparişler aynı gün, hafta içi 14:00'dan sonra , hafta sonu ve resmi tatillerde verilen siparişler bir sonraki iş günü kargoya verilir.",
      "1.500 TL ve üzeri siparişlerinizde kargo ücretsizdir, 1.500 TL altı işlemlerde ise 39,90 TL olmaktadır."
    ]
  },
  {
    title: "Ürün İadesi", details: [
      "Yaptığınız alışverişten herhangi bir nedenle memnun kalmadığınız ürünlerinizi (satılabilirliğin kaybetmiş ürünler hariç) kullanılmamış olmak koşuluyla, tüm aksesuarları orijinal ambalajı ve faturası ile birlikte eksiksiz bir şekilde siparişinizi teslim aldığınız andan itibaren 14 gün içerisinde cezai şart ödemeksizin iade edebilirsiniz. Ürününüzü isterseniz anlaşmalı kargo firmaları ile depomuza ücretsiz gönderebilir ya da mağazalarımıza iade edebilirsiniz. İade talebiniz onaylandıktan sonra paranız ödeme yönteminize göre iade edilir.",
      "Mesafeli Sözleşmeler yönetmeliğinde yer alan Cayma Hakkının İstisnaları maddesi uyarınca tüketici aşağıdaki ürünlerde cayma hakkını kullanamaz: a) Satılabilirliğini kaybetmiş ürünler (vakumlu/jelatinli ambalajı açık/yırtık ürünler, sim kart takılmış cep telefonu ve cep bilgisayarları b) kurulumu yapılmış LCD TV, PC, Notebook vb cihazlar c) kartuşu açılmış yazıcı, faks makinesi, ambalajı açılmış tek kullanımlık ürünler, kulaklık, yazılımlar vb, d) satışı Operatör Temlikli/Sözleşmeli yapılan ürünler e) ambalajı açılmış kişisel bakım ve hijyen ürünleri e) tüketicinin istekleri veya kişisel ihtiyaçları doğrultusunda hazırlanan ürünler f) çabuk bozulabilen veya son kullanma tarihi geçebilecek ürünler g) tesliminden sonra ambalaj, bant, mühür, paket gibi koruyucu unsurları açılmış olan ürünlerden; iadesi sağlık ve hijyen açısından uygun olmayan ürünler h) tesliminden sonra başka ürünlerle karışan ve doğası gereği ayrıştırılması mümkün olmayan ürünler ı) malın tesliminden sonra ambalaj, bant, mühür, paket gibi koruyucu unsurları açılmış olması halinde maddi ortamda sunulan kitap, dijital içerik ve bilgisayar sarf malzemeleri k) ambalajı açılmış yazılım ve/veya oyun CD'si l) tek kullanımlık ürünler, kopyalanabilir yazılım ve programlar, DVD, VDC, CD ve kasetler, kişisel bakım ürünleri (traş makinesi, traş köpüğü, epilatör, diş bakım ürünleri,baskül vs.) ile sarf malzemeleri (toner, kartuş...vs) ancak ambalajı açılmamış ve kullanılmamış olmaları halinde iade alınabilmektedir.",
      "İade başvurusu için ‘Siparişlerim’ bölümüne gidip ilgili siparişinizde iade başvurusunu yapabilirsiniz. İşlem sonrasında size özel oluşturulan iade kargo kodunu kullanarak ürünleri ücretsiz olarak gönderebilirsiniz. Horoz Lojistik iade alımları için 0850 222 55 99 numaralı Teknosa müşteri hizmetlerimizden yardım alabilirsiniz."
    ]
  },
  {
    title: "Ürün Değişimi", details: [
      "Değişim işlemlerinizin başlayabilmesi için ürününüzün yetkili servis tarafından incelenmesi gerekmektedir. yetkili servis incelemesi sonucunda 'Değişime Uygundur' ibaresi bulunan raporlar için değişim işlemi yapılır.",
      "Değişim işlemleriniz de size en yakın mağazamızı ziyaret edebilirsiniz. Satın alınan ürünün stoklarda olması halinde birebir değişim yapılmaktadır. Talep edilen ürünün stokta olmaması haline tutar iadesi yapılmaktadır."
    ]
  }
]
const DetailsPage = () => {
  const { id } = useParams();
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleTabChange = (event: any, newValue: any) => {
    setTabValue(newValue);
  };
  const handleAddToFavorites = () => {
    // Favorilere ekleme eylemi burada gerçekleştirilebilir.
    alert('Ürün favorilere eklendi!');
  };
  const generatePaymentPlan = (price: number) => {
    const interestRate = 3.66;

    const calculateInstallment = (price: number, interestRate: number, installment: number) => {
      const installmentRows = [];

      for (let i = 2; i <= installment; i++) {
        const annualInterestRate = interestRate * i;
        const interestAmount = (price * annualInterestRate) / 100;
        const totalAmount = price + interestAmount;
        const monthlyInstallment = totalAmount / i;

        installmentRows.push(
          <tr key={i}>
            <td>{i}</td>
            <td>{monthlyInstallment.toFixed(2)}</td>
            <td>{totalAmount.toFixed(2)}</td>
          </tr>
        );
      }

      return installmentRows;
    };

    return (
      <table>
        <thead>
          <tr>
            <th>Taksit Sayısı</th>
            <th>Taksit Tutarı</th>
            <th>Toplam Fiyat</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Peşin</td>
            <td>{price}</td>
            <td>{price}</td>
          </tr>
          {price <= 1000 && calculateInstallment(price, interestRate, 3)}
          {(price > 1000 && price <= 10000) && calculateInstallment(price, interestRate, 6)}

        </tbody>
      </table>
    );
  };

  const renderDetails = () => {
    return (
      <Box component="main"
        sx={{
          p: { xs: 2, sm: 5, md: 10, lg: 20, xl: 30 },
          pt: { xs: 2, sm: 2, md: 2, lg: 2, xl: 2 }
        }}>
        <Paper style={{
          marginTop: "1rem",
          backgroundColor: theme.palette.background.paper,
          padding: "1rem",
        }}>
          <Grid container >

            <Grid item xs={12} md={5.5} pl={2} pr={2} style={{ display: 'flex', justifyContent: 'center' }}>
              <ImageSliderComponent images={product.images} />
            </Grid>

            <Grid item xs={12} md={6.5} pl={2} pr={2}>
              <Box display="flex" flexDirection="column" justifyContent="space-between" height="100%">
                <Typography variant="h5" gutterBottom>
                  Lorem ipsum dolor sit amet.
                </Typography>
                <Box mb={2}>
                  <Rating value={product.rating} precision={0.5} readOnly />
                </Box>
                <Typography variant="body1" paragraph>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cum maiores natus ab deleniti dolorum delectus alias vero. Ullam, necessitatibus quo!
                </Typography>
                <Styled.Price>
                  $19.99
                </Styled.Price>

                <Box display="flex" justifyContent="space-between" alignItems="center" mt="auto">
                  <Button variant="contained" color="primary">
                    Sepete Ekle
                  </Button>
                  <IconButton color="primary" onClick={handleAddToFavorites}>
                    <FavoriteIcon />
                  </IconButton>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} pt={2} pl={2} pr={2}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider', justifyContent: "center", display: "flex" }}>
                <Tabs
                  value={tabValue}
                  onChange={handleTabChange}
                  textColor="primary"
                  indicatorColor="primary"
                  allowScrollButtonsMobile
                  variant="scrollable"
                  scrollButtons="auto"
                >
                  <Tab label="Teknik Özellikler" />
                  <Tab label="Garanti Bilgileri" />
                  <Tab label="Teslimat ve İade Koşulları" />
                  <Tab label="Ödeme Seçenekleri" />
                  <Tab label="Yorumlar" />
                </Tabs>
              </Box>

              <Box mb={2} mt={2}>
                {tabValue === 0 && (
                  <Typography variant="body1">
                    <Typography variant="h6" fontWeight={"bold"} mb={1} color="primary">
                      Özellikler
                    </Typography>
                    {product.features.map((feature, index) => (
                      <li key={index} style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body1">{feature.name}:</Typography>
                        <Typography variant="body1">{feature.value}</Typography>
                      </li>
                    ))}
                  </Typography>
                )}
                {tabValue === 1 && (
                  <Typography variant="body1">
                    <Typography variant="h6" fontWeight={"bold"} mb={1} color="primary">
                      Garanti Bilgileri
                    </Typography>
                    <Typography variant="body1">
                      xx.com'da satışa sunulan tüm ürünler en az 2 yıl olmak üzere üretici ya da distribütör garantisi altındadır. Bu süre bazı markalar tarafından sunulan ek garantilerle uzatılabilir.

                    </Typography>
                  </Typography>
                )}
                {tabValue === 2 && (
                  <>
                    {orderAndReturnDetails.map((detail) => (
                      <>
                        <Typography variant="h6" fontWeight={"bold"} mb={1} color="primary">
                          {detail.title}
                        </Typography>
                        {detail.details.map((item, index) => (
                          <>
                            <Typography key={index} variant="body1">{item}</Typography>
                            <br />
                          </>
                        ))}
                      </>
                    ))}

                  </>
                )}
                {tabValue === 3 && (
                  <Typography variant="body1">
                    <Typography variant="h6" fontWeight={"bold"} mb={1} color="primary">
                      Ödeme Seçenekleri
                    </Typography>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/MasterCard_Logo.svg/2560px-MasterCard_Logo.svg.png" alt="iyzico" style={{ width: "4rem", height: "auto" }} />
                    {generatePaymentPlan(product.price)}
                  </Typography>

                )}
                {tabValue === 4 && (
                  <Typography variant="body1">
                    {product.comments.map((comment, index) => (
                      <Box key={index} mb={2} mt={2}>
                        <Typography variant="h6" color="textPrimary" style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Rating value={comment.rating} precision={0.5} readOnly />
                          {comment.userName.substring(0, 2).toString() + "***"}
                        </Typography>
                        <Typography variant="body1">{comment.comment}</Typography>
                        <Divider style={{ marginTop: "1rem" }} />
                      </Box>
                    ))}

                  </Typography>
                )}
              </Box>
            </Grid>

          </Grid>
        </Paper>
      </Box >
    )
  }
  return (
    <>
      {isLoading ? <LoadingComponent /> : renderDetails()}
    </>
  );
};

export default DetailsPage;
