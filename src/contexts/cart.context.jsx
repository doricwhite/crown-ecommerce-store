import { createContext, useReducer } from "react";
import { createAction } from "../utils/reducer/reducer.utils";

// addCartItem helper function
const addCartItem = (cartItems, productToAdd) => {
  // Find cartItems contains the productToAdd
  const existingCartItem = cartItems.find((cartItem) => {
    return cartItem.id === productToAdd.id;
  });

  // If found, increment quantity
  if (existingCartItem) {
    return cartItems.map((cartItem) => {
      return cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem;
    });
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

// removeCartItem helper function
const removeCartItem = (cartItems, cartItemToRemove) => {
  // Find existing cart item
  const existingCartItem = cartItems.find((cartItem) => {
    return cartItem.id === cartItemToRemove.id;
  });

  // If quantity is equal to 1, if it is remove the item
  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  }

  // Return cartItems with matching cart item with reduced amount
  return cartItems.map((cartItem) => {
    return cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem;
  });
};

// Clear cart item helper function
const clearCartItem = (cartItems, cartItemToClear) => {
  return cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);
};

// Cart Context
export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  cartCount: 0,
  cartTotal: 0,
});

// Reducer Initial State Object
const INITIAL_STATE = {
  cartCount: 0,
  cartTotal: 0,
  isCartOpen: false,
  cartItems: [],
};

const CART_ITEMS_ACTION_TYPES = {
  SET_CART_ITEMS: "SET_CART_ITEMS",
  SET_IS_CART_OPEN: "SET_IS_CART_OPEN",
};

// Cart Reducer
const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ITEMS_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload,
      };

    case CART_ITEMS_ACTION_TYPES.SET_IS_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload,
      };

    default:
      throw new Error(`Unhandled type ${type} in cartReducer`);
  }
};

// Cart Provider
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);
  const { isCartOpen, cartItems, cartTotal, cartCount } = state;

  // Update cart items Reducer
  const updateCartItemsReducer = (newCartItems) => {
    // Cart Total
    const newCartTotal = newCartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0
    );

    // Cart Count
    const newCartCount = newCartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );

    // dispatch({
    //   type: CART_ITEMS_ACTION_TYPES.SET_CART_ITEMS,
    // payload: {
    //   cartCount: newCartCount,
    //   cartTotal: newCartTotal,
    //   cartItems: newCartItems,
    // },
    // });

    // Using Reducer util function
    dispatch(
      createAction(CART_ITEMS_ACTION_TYPES.SET_CART_ITEMS, {
        cartCount: newCartCount,
        cartTotal: newCartTotal,
        cartItems: newCartItems,
      })
    );
  };

  // Add item to cart
  const addItemToCart = (productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    updateCartItemsReducer(newCartItems);
  };

  // Remove item from cart
  const removeItemToCart = (cartItemToRemove) => {
    const newCartItems = removeCartItem(cartItems, cartItemToRemove);
    updateCartItemsReducer(newCartItems);
  };

  //Clear item from cart
  const clearItemFromCart = (cartItemToClear) => {
    const newCartItems = clearCartItem(cartItems, cartItemToClear);
    updateCartItemsReducer(newCartItems);
  };

  const setIsCartOpen = (bool) => {
    // dispatch({ type: CART_ITEMS_ACTION_TYPES.SET_IS_CART_OPEN, payload: bool });
    dispatch(createAction(CART_ITEMS_ACTION_TYPES.SET_IS_CART_OPEN, bool));
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    removeItemToCart,
    clearItemFromCart,
    cartItems,
    cartCount,
    cartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
