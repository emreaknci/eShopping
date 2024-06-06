import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../../../contexts/CartContext';
import { Box, Typography, TableContainer, Table, TableHead, TableRow, TableCell, IconButton, TableBody, useTheme } from '@mui/material';
import { BasketItem } from '../../../models/baskets/basketItem';
import { DialogComponent } from '../../common/DialogComponent';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { useNavigate } from 'react-router-dom';
import LaunchIcon from '@mui/icons-material/Launch';
import ProductService from '../../../services/product.service';

const Step1 = ({ setCanContinue }: { setCanContinue: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const cartContext = useContext(CartContext);
  const theme = useTheme();
  const navigate = useNavigate();
  const [isloading, setIsLoading] = useState(true);
  const [cartItems, setCartItems] = useState<BasketItem[]>([]);
  const [openAlert, setOpenAlert] = useState(false);
  const [currentItem, setCurrentItem] = useState<BasketItem>();
  const [confirmAction, setConfirmAction] = useState('');
  const [confirmText, setConfirmText] = useState('');

  useEffect(() => {
    const getCartItems = (ids: number[]) => {
      ProductService.getByIds(ids).then(res => {
        const data = res.data; // { id: number, name: string, price: number }[]
        //check if the product is in the cart and check if the price is the same if not equal update the price and notify the user
        data.forEach((product) => {
          const item = cartItems.find(x => x.productId === product.id);
          if (item && item.unitPrice !== product.price) {
            cartContext.updatePrice(product.id, product.price);
            setCartItems(prev => {
              return prev.map(x => x.productId === product.id ? { ...x, unitPrice: product.price } : x)
            })
          }
        });
      }).catch(err => {
        console.log(err)
      })
    }
    setIsLoading(true);
    setCartItems(cartContext.customerCart?.items || []);
    setIsLoading(false);
    setCanContinue(true)
    getCartItems(cartContext.customerCart?.items.map(x => x.productId) || []);
  }, [cartContext, cartContext.customerCart, cartItems, setCanContinue]);




  const handleIncreaseQuantity = (item: BasketItem) => {
    cartContext.increaseQuantity(item);
  }

  const handleDecreaseQuantity = (item: BasketItem) => {
    if (item.quantity === 1) {
      setCurrentItem(item);
      setConfirmAction('remove');
      setConfirmText('Ürünü sepetten kaldırmak istediğinize emin misiniz?');
      setOpenAlert(true);
    } else {
      cartContext.decreaseQuantity(item);
    }
  };

  const handleRemoveItem = (item: any) => {
    setConfirmAction('removeItem');
    setConfirmText('Tüm ürünleri sepetten kaldırmak istediğinize emin misiniz?');
    setOpenAlert(true);
    setCurrentItem(item)
  };

  const handleClearCart = () => {
    setConfirmAction('clearCart');
    setConfirmText('Sepeti boşaltmak istediğinize emin misiniz?');
    setOpenAlert(true);
  };

  const handleConfirm = (item: any) => {
    setOpenAlert(false);

    if (confirmAction === 'remove') {
      cartContext.decreaseQuantity(item);
    } else if (confirmAction === 'removeItem') {
      cartContext.removeFromCart(item);
    } else if (confirmAction === 'clearCart') {
      cartContext.clearCart();
    }
  };
  const baseImagePath = import.meta.env.VITE_API_GATEWAY + '/' + import.meta.env.VITE_CATALOG_IMAGES + '/';

  return (
    <Box>
      <Typography fontWeight={"bold"} variant="h5" gutterBottom>
        Sepetim
      </Typography>

      {!isloading && <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">#</TableCell>
              <TableCell align="center">Ürün Resmi</TableCell>
              <TableCell align="center">Ürün Adı</TableCell>
              <TableCell align="center">Ürün Adeti</TableCell>
              <TableCell align="center">Toplam Fiyat</TableCell>
              <TableCell align="center">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span>Hepsini Kaldır</span>
                  <IconButton disabled={cartContext.cartItemCount <= 0} onClick={() => handleClearCart()}>
                    <DeleteForeverOutlinedIcon color='primary' />
                  </IconButton>
                </div>
              </TableCell>
            </TableRow>

          </TableHead>
          <TableBody>
            {cartItems && cartItems.map((item, index) => (
              <React.Fragment key={index}>
                <TableRow sx={{ "&:hover": { backgroundColor: theme.palette.action.hover } }}>
                  <TableCell align="center">
                    <IconButton onClick={() => navigate(`/details/${item.productId}`)}>
                      <LaunchIcon fontSize="medium" />
                    </IconButton></TableCell>
                  <TableCell align="center"><img src={baseImagePath + item.pictureUrl} alt="Ürün Resmi" style={{ width: "2.5rem" }} /></TableCell>
                  <TableCell align="center">{item.productName}</TableCell>
                  <TableCell align="center">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <IconButton onClick={() => handleDecreaseQuantity(item)}>
                        {item.quantity === 1
                          ? <DeleteForeverOutlinedIcon color='primary' />
                          : <RemoveCircleOutlineOutlinedIcon color='primary' />}
                      </IconButton>
                      <span>{item.quantity}</span>
                      <IconButton onClick={() => handleIncreaseQuantity(item)}>
                        <AddCircleOutlineOutlinedIcon color='success' />
                      </IconButton>
                    </div>
                  </TableCell>
                  <TableCell align="center">₺{(item.unitPrice * item.quantity).toFixed(2)}</TableCell>
                  <TableCell align="center">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span>Ürünü Kaldır</span>
                      <IconButton onClick={() => handleRemoveItem(item)}>
                        <DeleteForeverOutlinedIcon color='primary' />
                      </IconButton>
                    </div>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}

          </TableBody>
        </Table>
      </TableContainer>
      }
      {openAlert && (
        <DialogComponent
          open={openAlert}
          handleClose={() => setOpenAlert(false)}
          handleConfirm={() => handleConfirm(currentItem)}
          text={confirmText}
        />
      )}
    </Box>
  );
}

export default Step1