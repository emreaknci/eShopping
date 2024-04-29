import Styled from './ProductCardComponent.style';
import { CardContent, Grid, IconButton } from '@mui/material';

import LaunchIcon from '@mui/icons-material/Launch';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../../contexts/CartContext';
import { useContext } from 'react';
import { ProductListDto } from '../../../dtos/products/productListDto';


const baseImagePath = import.meta.env.VITE_API_GATEWAY + '/' + import.meta.env.VITE_CATALOG_IMAGES + '/';

const ProductCardComponent = ({ product }: { product: ProductListDto }) => {
  
  const cartContext = useContext(CartContext);
  const navigate = useNavigate();

  const navigateToDetails = (id: number) => {
    navigate(`/Details/${id}`);
  }
  return (
    <Styled.ProductCard>
      <Styled.Media
        image={baseImagePath + product.imageUrl ?? 'https://via.placeholder.com/150'}
      />
      <CardContent>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Styled.Name variant="h5">
            {product.brandName} - {product.name}
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
          onClick={() => cartContext.addToCart(product)}
        >
          Sepete Ekle
        </Styled.AddButton>
      </CardContent>
    </Styled.ProductCard>
  );
};

export default ProductCardComponent;


