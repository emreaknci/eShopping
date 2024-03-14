import Styled from './ProductCardComponent.style';
import { CardContent, Grid, IconButton } from '@mui/material';

import LaunchIcon from '@mui/icons-material/Launch';
import { useNavigate } from 'react-router-dom';



const ProductCardComponent = ({ product }: { product: any }) => {
  const navigate = useNavigate();

  const navigateToDetails = (id: number) => {
    navigate(`/Details/${id}`);
  }
  return (
    <Styled.ProductCard>
      <Styled.Media
        image="https://img-itopya.mncdn.com/cdn/1000/oled-d7aea3.jpg"
      />
      <CardContent>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Styled.Name variant="h5" style={{ flexGrow: 1 }}>
            {product.name}
          </Styled.Name>
          <IconButton onClick={() => navigateToDetails(product.id)}>
            <LaunchIcon fontSize="medium" />
          </IconButton>
        </div>
        <Styled.Price>
          ₺ {product.price.toFixed(2)}
        </Styled.Price>
        <Styled.AddButton
          variant="contained"
          color="primary"
        >
          Sepete Ekle
        </Styled.AddButton>
      </CardContent>
    </Styled.ProductCard>
  );
};

export default ProductCardComponent;


