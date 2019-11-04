import React from 'react';
import { connect } from 'react-redux';
import { toggleCartHidden } from '../../redux/cart/cart.actions';
import { selectCartItemsCount } from '../../redux/cart/cart.selectors';
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import './cart-icon.styles.scss';

const CartIcon = ({ toggleCartHidden, itemCount }) => (
  <div className="cart-icon" onClick={toggleCartHidden}>
    <ShoppingIcon className="shopping-icon" />
    <span className="item-count">{itemCount}</span>
  </div>
);

const maptDispatchToProps = dispatch => ({
  toggleCartHidden: () => dispatch(toggleCartHidden())
});

const mapStateToProps = state => ({
  // itemCount: cartItems.reduce(
  //   (accumalatedQuantity, cartItem) => accumalatedQuantity + cartItem.quantity,
  //   0
  // )
  itemCount: selectCartItemsCount(state)
  //Since when state change, store will run every mounted component's mapStateToProps. To prevent unnecessary rendering, use selector
});

export default connect(
  mapStateToProps,
  maptDispatchToProps
)(CartIcon);
