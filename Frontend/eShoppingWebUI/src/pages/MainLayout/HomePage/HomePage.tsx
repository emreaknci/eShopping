import './HomePage.css';
import { Box, Grid, Typography } from '@mui/material';
import { ProductCardComponent } from '../../../components/common/ProductCardComponent';
import Divider from '@mui/material/Divider';
import { useEffect, useState } from 'react';
import { LoadingComponent } from '../../../components/common/LoadingComponent';


const HomePage = () => {

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);


  const renderProducts = () => {
    return (
      <Box component="main" sx={{ p: { xs: 2, sm: 5, md: 15, lg: 20, xl: 30 }, pt: { xs: 0, sm: 0, md: 0, lg: 0, xl: 0 } }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            <Typography variant="h4" mt={5} mb={4}>
              Bilgisayarlar
              <span style={{ fontSize: "1rem", marginLeft: "1rem", textDecoration: "underline" }}>Tümünü Gör</span>
            </Typography>

            <Grid container spacing={3}>
              <ProductCardComponent />
              <ProductCardComponent />
              <ProductCardComponent />
              <ProductCardComponent />
              <ProductCardComponent />
              <ProductCardComponent />
            </Grid>
            <Divider style={{ marginTop: "3rem" }} color='white' />
            <Typography variant="h4" mt={5} mb={4}>
              Telefonlar
              <span style={{ fontSize: "1rem", marginLeft: "1rem", textDecoration: "underline" }}>Tümünü Gör</span>
            </Typography>
            <Grid container spacing={3}>
              <ProductCardComponent />
            </Grid>
            <Divider style={{ marginTop: "3rem" }} color='white' />
            <Typography variant="h4" mt={5} mb={4}>
              Tabletler
              <span style={{ fontSize: "1rem", marginLeft: "1rem", textDecoration: "underline" }}>Tümünü Gör</span>
            </Typography>
            <Grid container spacing={3}>
              <ProductCardComponent />
            </Grid>
          </Grid>
        </Grid>
      </Box>
    )
  }
  return (
    <>
      {isLoading ? <LoadingComponent /> : renderProducts()}
    </>

  );
};

export default HomePage;
