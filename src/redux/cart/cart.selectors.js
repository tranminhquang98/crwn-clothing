import { createSelector } from 'reselect';

const selectCart = state => state.cart; //Input selector, only return a piece of the state

export const selectCartItems = createSelector(
  [selectCart],
  cart => cart.cartItems
); //Output selector

export const selectCartItemsCount = createSelector(
  [selectCartItems],
  cartItems =>
    cartItems.reduce(
      (accumalatedQuantity, cartItem) =>
        accumalatedQuantity + cartItem.quantity,
      0
    )
);
