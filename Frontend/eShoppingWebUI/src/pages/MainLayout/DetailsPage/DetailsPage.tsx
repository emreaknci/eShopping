import { Grid, Typography, Button, Rating, Box, Paper, useTheme, Tab, Tabs, Divider, IconButton } from '@mui/material';

import { useParams } from 'react-router-dom';
import Styled from './DetailsPage.style';
import { useContext, useEffect, useState } from 'react';
import { ImageSliderComponent } from '../../../components/common/ImageSliderComponent';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { LoadingComponent } from '../../../components/common/LoadingComponent';
import styles from '../../../styles';
import { CartContext } from '../../../contexts/CartContext';
import { ProductDetailDto } from '../../../dtos/products/productDetailDto';
import ProductService from '../../../services/product.service';
import { toast } from 'react-toastify';


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

const baseImagePath = import.meta.env.VITE_API_GATEWAY + '/' + import.meta.env.VITE_CATALOG_IMAGES + '/';

const DetailsPage = () => {
  const { id } = useParams();
  const [tabValue, setTabValue] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [images, setImages] = useState<string[]>([]);

  const [product, setProduct] = useState<ProductDetailDto>();

  const cartContext = useContext(CartContext);
  const theme = useTheme();

  const getProductById = async (productId: number) => {
    setIsLoading(true);

    await ProductService.getProductById(productId)
      .then((response) => {
        const data = response.data.data!;
        setImages(data.images.map((image) => baseImagePath + image.url));
        setProduct(response.data.data!);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.data.data?.message ?? "Ürün detayları getirilirken bir hata oluştu.");
      }).finally(() => {
        setIsLoading(false);
      })


  };
  useEffect(() => {
    getProductById(Number(id));
  }, [id]);

  const handleTabChange = (event: any, newValue: any) => {
    setTabValue(newValue);
  };
  const handleAddToFavorites = () => {
    toast.success("Favorilere eklendi.");
  };
  const generatePaymentPlan = (price: number) => {
    const calculateInstallment = (price: number, installment: number) => {
      const installmentRows = [];
  
      for (let i = 1; i <= installment; i++) {
        const monthlyInstallment = price / i;
  
        installmentRows.push(
          <tr key={i}>
            <td>{i === 1 ? "Peşin" : `${i} Taksit`}</td>
            <td>{monthlyInstallment.toFixed(2)}</td>
            <td>{(monthlyInstallment * i).toFixed(2)}</td>
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
          {calculateInstallment(price, 6)}
        </tbody>
      </table>
    );
  };

  const renderDetails = () => {
    return (
      <Box component="main" sx={{
        px: { xs: 3, sm:5 , md: 20, lg: 30, xl: 50},
        py: { xs: 3, sm: 5, md: 5, lg: 5}
      }}>
        <Paper style={{
          backgroundColor: theme.palette.background.paper,
          padding: "1rem",
        }}>
          {product &&
            <Grid container >

              <Grid item xs={12} md={5.5} pl={2} pr={2} style={{ display: 'flex', justifyContent: 'center' }}>
                <ImageSliderComponent images={images} />
              </Grid>

              <Grid item xs={12} md={6.5} pl={2} pr={2}>
                <Box display="flex" flexDirection="column" justifyContent="space-between" height="100%">
                  <Typography variant="h5" gutterBottom>
                    {product.name}
                  </Typography>
                  <Box mb={2}>
                    {/* <Rating value={product.rating} precision={0.5} readOnly /> */}
                    <Rating value={3.5} precision={0.5} readOnly />
                  </Box>
                  <Typography variant="body1" paragraph>
                    {product.description}
                  </Typography>
                  <Styled.Price>
                    ₺ {product.price.toFixed(2)}
                  </Styled.Price>

                  <Box display="flex" justifyContent="space-between" alignItems="center" mt="auto">
                    <Button variant="contained"
                      color="primary" onClick={() => cartContext.addToCart(product)}>
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
                   <>
                   <Typography variant="h6" fontWeight="bold" mb={1} color="primary">
                     Özellikler
                   </Typography>
                   <table>
                     <tbody>
                       {product.features.map((feature, index) => (
                         <tr key={index}>
                           <td style={{ fontWeight: 'bold' }}>{feature.name}:</td>
                           <td>{feature.value}</td>
                         </tr>
                       ))}
                     </tbody>
                   </table>
                 </>

                  )}
                  {tabValue === 1 && (
                    <>
                      <Typography variant="h6" fontWeight={"bold"} mb={1} color="primary">
                        Garanti Bilgileri
                      </Typography>
                      <Typography variant="body1">
                        xx.com'da satışa sunulan tüm ürünler en az 2 yıl olmak üzere üretici ya da distribütör garantisi altındadır. Bu süre bazı markalar tarafından sunulan ek garantilerle uzatılabilir.
                      </Typography>
                    </>
                  )}
                  {tabValue === 2 && (
                    <>
                      {orderAndReturnDetails.map((detail, outerIndex) => (
                        <div key={detail.title}>
                          <Typography variant="h6" fontWeight={"bold"} mb={1} color="primary">
                            {detail.title}
                          </Typography>
                          {detail.details.map((item, innerIndex) => (
                            <div key={`${outerIndex}-${innerIndex}`}>
                              <Typography variant="body1">{item}</Typography>
                              <br />
                            </div>
                          ))}
                        </div>
                      ))}
                    </>
                  )}
                  {tabValue === 3 && (
                    <>
                      <Typography variant="h6" fontWeight={"bold"} mb={1} color="primary">
                        Ödeme Seçenekleri
                      </Typography>
                      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/MasterCard_Logo.svg/2560px-MasterCard_Logo.svg.png" alt="iyzico" style={{ width: "4rem", height: "auto" }} />
                      {generatePaymentPlan(product.price)}
                    </>

                  )}
                  {/* {tabValue === 4 && (
                  <>
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

                  </>
                )} */}
                </Box>
              </Grid>
            </Grid>}
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
