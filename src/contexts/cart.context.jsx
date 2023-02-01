import { createContext, useState } from "react";

const addCartItem = (cartItems, productToAdd) => {
  // 0. check if there is already that item
  const existingCartItem = cartItems.some(
    (cartItem) => cartItem.id === productToAdd.id
  );
  //   console.log("existingCartItem checked", cartItems);
  // if found, increment quantity

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }
  //   else {
  return [...cartItems, { ...productToAdd, quantity: 1 }];
  //   }
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  const value = { isCartOpen, setIsCartOpen, cartItems, addItemToCart };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
