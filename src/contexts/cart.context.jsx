import { createContext, useState, useEffect } from "react";

const addCartItem = (cartItems, productToAdd) => {
  // 0. check if there is already that item
  const existingCartItem = cartItems.some(
    (cartItem) => cartItem.id === productToAdd.id
  );
  // if found, increment quantity

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const decrementItem = (cartItems, item) => {
  //find the cart item tp remove
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === item.id
  );

  //if the quantity is 1, remove the item
  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== item.id);
  }

  //else, decrement the quantity
  return cartItems.map((cartItem) =>
    cartItem.id === item.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

const clearCartItem = (cartItems, productToDelete) =>
  cartItems.filter((currentItem) => currentItem.id !== productToDelete.id);

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  decrementCartItem: () => {},
  clearItemFromCart: () => {},
  cartCount: 0,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (accumulator, item) => accumulator + item.quantity,
      0
    );
    setCartCount(newCartCount);
  }, [cartItems]);

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  const decrementCartItem = (productToDecrement) => {
    setCartItems(decrementItem(cartItems, productToDecrement));
  };

  const clearItemFromCart = (productToDelete) => {
    setCartItems(clearCartItem(cartItems, productToDelete));
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
    decrementCartItem,
    clearItemFromCart,
    cartCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
