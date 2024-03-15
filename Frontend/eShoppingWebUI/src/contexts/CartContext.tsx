import { createContext, useEffect, useState } from "react";
import { number } from "yup";


export const CartContext = createContext({
  addToCart: (product: any) => { },
  removeFromCart: (product: any) => { },
  clearCart: () => { },
  increaseQuantity: (product: any) => { },
  decreaseQuantity: (product: any) => { },
  cartItems: [],
  cartItemCount: 0,
  totalPrice: 0
})

export const CartProvider = ({ children }: any) => {
  const [cartItemCount, setCartItemCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(existingCart);
    setCartItemCount(existingCart.length);
    calculateTotalPrice()
  }, [localStorage.getItem('cart')]);

  const calculateTotalPrice = () => {
    let total = 0;
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    existingCart.forEach((item: any) => {
      total += item.price * item.quantity;
    });
    setTotalPrice(total);
  }


  const addToCart = (product: any) => {
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    let updatedCart = [...existingCart];
    let found = false;
    const { id, price, name } = product;


    updatedCart = updatedCart.map((item: any) => {
      if (item.id === product.id) {
        found = true;
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });

    if (!found) {
      updatedCart.push({ id, price, name, quantity: 1 });
      setCartItemCount(cartItemCount + 1);
    }

    localStorage.setItem('cart', JSON.stringify(updatedCart));

  }

  const removeFromCart = (product: any) => {
    console.log(product)
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const updatedCart = existingCart.filter((item: any) => item.id !== product.id);

    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCartItemCount(updatedCart.length);

  }

  const increaseQuantity = (product: any) => {
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const updatedCart = existingCart.map((item: any) => {
      if (item.id === product.id) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });

    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCartItems(updatedCart);
  }

  const decreaseQuantity = (product: any) => {
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    let updatedCart;

    if (product.quantity === 1) {
      updatedCart = existingCart.filter((item: any) => item.id !== product.id);
    } else {
      updatedCart = existingCart.map((item: any) => {
        if (item.id === product.id) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      });

    }
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCartItems(updatedCart);
  }

  const clearCart = () => {
    localStorage.setItem('cart', JSON.stringify([]));
    setCartItemCount(0);
    setCartItems([]);
  }
  return (
    <CartContext.Provider value={{
      addToCart, removeFromCart,
      clearCart, cartItemCount,
      cartItems,
      increaseQuantity, decreaseQuantity,
      totalPrice
    }}>
      {children}
    </CartContext.Provider>
  )
}