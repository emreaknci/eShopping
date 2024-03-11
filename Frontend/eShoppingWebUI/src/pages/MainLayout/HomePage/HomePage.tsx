import './HomePage.css';
import { Grid, Typography } from '@mui/material';
import { ProductCardComponent } from '../../../components/common/ProductCardComponent';
import Divider from '@mui/material/Divider';


const HomePage = () => {
  return (
    <>
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
    </>

  );
};

export default HomePage;
