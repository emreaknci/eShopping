import Styled from './ProductCardComponent.style';
import { CardContent, Grid, IconButton } from '@mui/material';

import LaunchIcon from '@mui/icons-material/Launch';
import { useNavigate } from 'react-router-dom';



const ProductCardComponent = () => {
  const navigate= useNavigate();

  const navigateToDetails=(id:number)=>{
    navigate(`/Details/${id}`);
  }
  return (
    <Grid item xs={12} sm={6} md={4} lg={3} xl={12/5} >
      <Styled.ProductCard>
        <Styled.Media
          image="https://img-itopya.mncdn.com/cdn/1000/oled-d7aea3.jpg"
        />
        <CardContent>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Styled.Name variant="h5" style={{ flexGrow: 1 }}>
              Ürün Adı
            </Styled.Name>
            <IconButton onClick={()=>navigateToDetails(1)}>
              <LaunchIcon fontSize="medium" />
            </IconButton>
          </div>
          <Styled.Price>
            $19.99
          </Styled.Price>
          <Styled.AddButton
            variant="contained"
            color="primary"
          >
            Sepete Ekle
          </Styled.AddButton>
        </CardContent>
      </Styled.ProductCard>
    </Grid>
  );
};

export default ProductCardComponent;


