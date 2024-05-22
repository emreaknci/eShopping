import { Grid, Typography, Button, Rating, Box, Paper, useTheme, Tab, Tabs } from '@mui/material';
import { useParams } from 'react-router-dom';
import Styled from './DetailsPage.style';
import { useContext, useEffect, useState } from 'react';
import { ImageSliderComponent } from '../../../components/common/ImageSliderComponent';
import { LoadingComponent } from '../../../components/common/LoadingComponent';
import styles from '../../../styles';
import { CartContext } from '../../../contexts/CartContext';
import { ProductDetailDto } from '../../../dtos/products/productDetailDto';
import ProductService from '../../../services/product.service';
import { toast } from 'react-toastify';
import Features from '../../../components/mainLayout/detailsPage/Features';
import WarrantyInformations from '../../../components/mainLayout/detailsPage/WarrantyInformations';
import DeliveryInformations from '../../../components/mainLayout/detailsPage/DeliveryInformations';
import PaymentOptions from '../../../components/mainLayout/detailsPage/PaymentOptions';
import Comments from '../../../components/mainLayout/detailsPage/Comments';




const baseImagePath = import.meta.env.VITE_API_GATEWAY + '/' + import.meta.env.VITE_CATALOG_IMAGES + '/';

const DetailsPage = () => {
  const { id } = useParams();
  const [tabValue, setTabValue] = useState(4);
  const [isLoading, setIsLoading] = useState(true);
  const [images, setImages] = useState<string[]>([]);

  const [product, setProduct] = useState<ProductDetailDto>();
  const [averageRating, setAverageRating] = useState<number>(0);

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

  const renderDetails = () => {

    return (
      <Box component="main" sx={{
        px: { xs: 3, sm: 5, md: 20, lg: 30, xl: 50 },
        py: { xs: 3, sm: 5, md: 5, lg: 5 }
      }}>
        <Paper style={{
          backgroundColor: theme.palette.background.paper,
          padding: "1rem",
        }}>
          {product && <Grid container >

            <Grid item xs={12} md={5.5} pl={2} pr={2} style={{ display: 'flex', justifyContent: 'center' }}>
              <ImageSliderComponent images={images} />
            </Grid>

            <Grid item xs={12} md={6.5} pl={2} pr={2}>
              <Box display="flex" flexDirection="column" justifyContent="space-between" height="100%">

                <Typography variant="h5" gutterBottom> {product.name} </Typography>
                <Box mb={2} display="flex" alignItems="center">
                  <Rating value={averageRating} precision={0.5} readOnly />
                  {averageRating > 0 && <Typography fontWeight={"bold"} ml={1}>{averageRating}/5</Typography>}
                  {averageRating === 0 && <Typography fontWeight={"bold"} ml={1}>(0 Yorum)</Typography>}
                </Box>
                <Typography variant="body1" paragraph>{product.description}</Typography>
                <Styled.Price>₺ {product.price.toFixed(2)}</Styled.Price>

                <Box display="flex" justifyContent="space-between" alignItems="center" mt="auto">
                  <Button variant="contained"
                    color="primary" onClick={() => cartContext.addToCart(product)}>
                    Sepete Ekle
                  </Button>
                </Box>

              </Box>
            </Grid>

            <Grid item xs={12} pt={2} pl={2} pr={2}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider', justifyContent: "center", display: "flex" }}>
                <Tabs
                  value={tabValue} onChange={handleTabChange}
                  textColor="primary" indicatorColor="primary"
                  allowScrollButtonsMobile variant="scrollable"
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
                {tabValue === 0 && (<Features productFeatures={product.features} />)}
                {tabValue === 1 && (<WarrantyInformations />)}
                {tabValue === 2 && (<DeliveryInformations />)}
                {tabValue === 3 && (<PaymentOptions productPrice={product.price} />)}
                {tabValue === 4 && (<Comments productId={product.id} averageRating={averageRating} setAverageRating={setAverageRating} />)}
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