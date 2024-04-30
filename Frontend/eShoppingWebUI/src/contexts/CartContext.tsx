import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "./AuthContext";
import { BasketItem } from "../models/baskets/basketItem";
import BasketService from "../services/basket.service";
import { JwtHelper } from "../utils/JwtHelper";
import StorageService from "../services/storage.service";
import { ProductListDto } from "../dtos/products/productListDto";
import { ProductDetailDto } from "../dtos/products/productDetailDto";
import { CustomerBasket } from "../models/baskets/customerBasket";


export const CartContext = createContext({
  addToCart: (product: any) => { },
  removeFromCart: (product: any) => { },
  clearCart: () => { },
  increaseQuantity: (product: any) => { },
  decreaseQuantity: (product: any) => { },
  customerCart: undefined as CustomerBasket | undefined,
  cartItemCount: 0,
  totalPrice: 0
})

export const CartProvider = ({ children }: any) => {
  const [cartItemCount, setCartItemCount] = useState(0);
  const [customerCart, setCustomerBasket] = useState<CustomerBasket>();
  const [totalPrice, setTotalPrice] = useState(0);
  const authContext = useContext(AuthContext)


  useEffect(() => {
    const getCartById = async (customerId: string) => {
      await BasketService.getBasketById(customerId)
        .then((response) => {
          const data = response.data.data!;
          console.log(data)
          setCustomerBasket(data);
          setCartItemCount(data.items.length);
        })
        .catch((error) => {
          console.log(error)
        })
    }
    if (authContext.isAuthenticated && StorageService.getAccessToken()) {
      const customerId = JwtHelper.getTokenInfos(StorageService.getAccessToken()!).nameidentifier;
      if (customerId) {
        getCartById(customerId);
      }
    }
  }, [authContext]);

  useEffect(()=>{
    if(customerCart){
      let total = 0;
      customerCart.items.forEach((item)=>{
        total += item.unitPrice * item.quantity;
      })
      setTotalPrice(total);
    }

  },[customerCart])



  const addToCart = async (product: ProductListDto | ProductDetailDto) => {
    if (!authContext.isAuthenticated) {
      toast.info('Sepete ürün eklemek için giriş yapmalısınız.')
      return;
    }

    const checkIfProductExists = customerCart?.items.find(x => x.productId === product.id);
    if (checkIfProductExists) {
      increaseQuantity(checkIfProductExists);
      return;
    }

    const basketItem: BasketItem = {
      productId: product.id,
      productName: product.name!,
      unitPrice: product.price,
      quantity: 1,
    }

    if ('imageUrl' in product) {
      basketItem.pictureUrl = product.imageUrl!;
    }
    if ('images' in product) {
      basketItem.pictureUrl = product.images.filter((x) => x.isCoverImage)[0].url;
    }

    await BasketService.addItemToBasket(basketItem)
      .then((response) => {
        setCustomerBasket(response.data.data!);
        setCartItemCount(response.data.data!.items.length);
        toast.success(`'${product.name}' ürünü sepete eklendi.`)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const removeFromCart = async (basketItem: BasketItem) => {
    const getCurrentItems = customerCart?.items;
    const getCurrentItem = getCurrentItems?.find(x => x.productId === basketItem.productId);
    if (getCurrentItem) {
      getCurrentItems?.splice(getCurrentItems.indexOf(getCurrentItem), 1);
      customerCart && await BasketService.updateBasket(customerCart)
        .then((response) => {
          setCustomerBasket(response.data.data!);
          setCartItemCount(response.data.data!.items.length);
        }).catch((error) => {
          console.log(error)
        })
    }

  }

  const increaseQuantity = async (basketItem: BasketItem) => {
    const getCurrentItems = customerCart?.items;
    const getCurrentItem = getCurrentItems?.find(x => x.productId === basketItem.productId);
    if (getCurrentItem) {
      getCurrentItem.quantity++;
      customerCart && await BasketService.updateBasket(customerCart)
        .then((response) => {
          setCustomerBasket(response.data.data!);
          setCartItemCount(response.data.data!.items.length);
        }).catch((error) => {
          console.log(error)
        })
    }
  }

  const decreaseQuantity = async (basketItem: BasketItem) => {
    const getCurrentItems = customerCart?.items;
    const getCurrentItem = getCurrentItems?.find(x => x.productId === basketItem.productId);
    if (getCurrentItem) {
      getCurrentItem.quantity--;
      if (getCurrentItem.quantity === 0) {
        getCurrentItems?.splice(getCurrentItems.indexOf(getCurrentItem), 1);
      }
      const checkIfAllItemsQuantityZero = getCurrentItems?.every(x => x.quantity === 0);
      if (checkIfAllItemsQuantityZero) {
        clearCart();
        return;
      }
      customerCart && await BasketService.updateBasket(customerCart)
        .then((response) => {
          setCustomerBasket(response.data.data!);
          setCartItemCount(response.data.data!.items.length);
        }).catch((error) => {
          console.log(error)
        })
    }
  }

  const clearCart = async () => {
    await BasketService.deleteBasket(customerCart!.buyerId.toString())
      .then((response) => {
        setCustomerBasket(undefined);
        setCartItemCount(0);
        setTotalPrice(0);
      }).catch((error) => {
        console.log(error)
      })
  }
  return (
    <CartContext.Provider value={{
      addToCart, removeFromCart,
      clearCart, cartItemCount,
      customerCart,
      increaseQuantity, decreaseQuantity,
      totalPrice
    }}>
      {children}
    </CartContext.Provider>
  )
}