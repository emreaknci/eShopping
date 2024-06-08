import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "./AuthContext";
import { BasketItem } from "../models/baskets/basketItem";
import BasketService from "../services/basket.service";
import { JwtHelper } from "../utils/JwtHelper";
import StorageService from "../services/storage.service";
import { ProductListDto } from "../dtos/products/productListDto";
import { ProductDetailDto } from "../dtos/products/productDetailDto";
import { CustomerBasket } from "../models/baskets/customerBasket";
import { BasketCheckout } from "../dtos/baskets/basketCheckout";
import ProductService from "../services/product.service";


export const CartContext = createContext({
  addToCart: (product: any) => { },
  removeFromCart: (product: any) => { },
  clearCart: () => { },
  increaseQuantity: (product: any) => { },
  decreaseQuantity: (product: any) => { },
  checkout: (basketCheckout: BasketCheckout) => { },
  customerCart: undefined as CustomerBasket | undefined,
  cartItemCount: 0,
  totalPrice: 0,
  updatePrice: (productId: number, price: number) => { }
})

export const CartProvider = ({ children }: any) => {
  const [cartItemCount, setCartItemCount] = useState(0);
  const [customerCart, setCustomerBasket] = useState<CustomerBasket>();
  const [totalPrice, setTotalPrice] = useState(0);
  const [quantityChanged, setQuantityChanged] = useState(false);
  const authContext = useContext(AuthContext)



  const getCartById = async (customerId: string) => {
    await BasketService.getBasketById(customerId)
      .then((response) => {
        const data = response.data.data!;
        console.log(data.items.map(x => x.productId))
        setCustomerBasket(data);
        setCartItemCount(data.items.length);
      })
      .catch((error) => {
        console.log(error)
      })

  }
  useEffect(() => {
    if (authContext.isAuthenticated && StorageService.getAccessToken()) {
      const customerId = JwtHelper.getTokenInfos(StorageService.getAccessToken()!).nameidentifier;
      if (customerId) {
        getCartById(customerId);
      }
    }
  }, [authContext]);



  const compareQuantities = useCallback(async (stocks: { [key: number]: number }) => {
    customerCart?.items.forEach(async (item) => {
      if (item.quantity > stocks[item.productId]) {
        item.quantity = stocks[item.productId];
        await BasketService.updateBasket(customerCart!)
          .then((response) => {
            setCustomerBasket(response.data.data!);
            setCartItemCount(response.data.data!.items.length);
            toast.dismiss();
            toast.warning(`Sepetinizdeki '${item.productName}' ürününün stok miktarı azaldığı için sepetinizdeki miktar güncellendi.\n Sepetteki miktar: ${stocks[item.productId]}`)
            setQuantityChanged(true);
          }).catch((error) => {
            console.log(error)
          })
      }
    })
  }, [customerCart]);

  const updatePrice = async (productId: number, price: number) => {
    const basketItem=customerCart?.items.find(x=>x.productId===productId);
    if(basketItem){
      basketItem.unitPrice=price;
      await BasketService.updateBasket(customerCart!)
        .then((response) => {
          setCustomerBasket(response.data.data!);
          setCartItemCount(response.data.data!.items.length);
          toast.info(`'${basketItem.productName}' ürününün fiyatı '${basketItem.unitPrice} TL' olarak güncellendi.`)
        }).catch((error) => {
          console.log(error)
        })
    }

    
  }

  const checkStocks = useCallback(async () => {
    if (customerCart) {
      await ProductService.checkStocks(customerCart!.items.map(x => x.productId))
        .then((response) => {
          const data = response.data.data!;
          compareQuantities(data)
        }).catch((error) => {
          console.log(error)
        })
    }
  }, [customerCart, compareQuantities]);

  useEffect(() => {
    if (customerCart) {
      let total = 0;
      customerCart.items.forEach((item) => {
        total += item.unitPrice * item.quantity;
      })
      setTotalPrice(total);

      checkStocks();
    }
  }, [customerCart, checkStocks, setTotalPrice]);



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

    if ('imageUrl' in product) { //home or category page
      basketItem.pictureUrl = product.imageUrl!;
    }
    if ('images' in product) { //detail page
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

  const checkout = async (basketCheckout: BasketCheckout) => {

    await checkStocks();

    console.log(quantityChanged)
    if (quantityChanged) {

      toast.warning('Sepetinizdeki ürünlerin stok miktarı değiştiği için lütfen sepetinizi kontrol edin')
      return;
    }
    else {
      await BasketService.checkout(basketCheckout)
        .then((response) => {
          toast.loading('Ödeme işlemi gerçekleştiriliyor...')

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
      checkout, updatePrice,
      increaseQuantity, decreaseQuantity,
      totalPrice
    }}>
      {children}
    </CartContext.Provider>
  )
}