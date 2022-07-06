import { FC } from "react";

import { useSelector, useDispatch } from "react-redux";

import { selectCartItems } from "../../store/cart/cart.selector";
import {
  addItemToCart,
  removeItemFromCart,
  clearItemFromCart,
} from "../../store/cart/cart.action";

import {
  CheckoutItemContainer,
  ImageContainer,
  BaseSpan,
  Arrow,
  Value,
  RemoveButton,
  Quantity,
} from "./checkout-item.styles";

import { CartItem } from "../../store/cart/cart.types";

type CheckoutItemProps = {
  cartItem: CartItem;
};

const CheckoutItem: FC<CheckoutItemProps> = ({ cartItem }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const { name, imageUrl, price, quantity } = cartItem;

  // Clear item handler
  const clearItemHandler = () => {
    dispatch(clearItemFromCart(cartItems, cartItem));
  };

  // Add item handler
  const addItemHandler = () => {
    dispatch(addItemToCart(cartItems, cartItem));
  };

  // Remove item handler
  const removeItemHandler = () => {
    dispatch(removeItemFromCart(cartItems, cartItem));
  };

  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <img src={imageUrl} alt={`${name}`} />
      </ImageContainer>
      <BaseSpan>{name}</BaseSpan>
      <Quantity>
        <div className="arrow" onClick={removeItemHandler}>
          &#10094;
        </div>
        <Value>{quantity}</Value>
        <Arrow onClick={addItemHandler}>&#10095;</Arrow>
      </Quantity>
      <BaseSpan>{price}</BaseSpan>
      <RemoveButton onClick={clearItemHandler}>&#10005;</RemoveButton>
    </CheckoutItemContainer>
  );
};

export default CheckoutItem;
