import React from 'react';
import { connect } from 'react-redux';
import CustomButton from '../custom-button/custom-button.component';
import { addItem } from '../../redux/cart/cart.actions';
import './collection-item.styles.scss';

const CollectionItem = ({ item, addItem }) => {
  const { name, price, imageUrl } = item;
  return (
    <div className="collection-item">
      <div className="image" style={{ backgroundImage: `url(${imageUrl})` }} />
      <div className="collection-footer">
        <span className="name">{name}</span>
        <span className="price">${price}</span>
      </div>
      <CustomButton
        className="custom-button" //Pass "custom-button" so it's the base style
        onClick={() => addItem(item)}
        inverted
      >
        Add to cart
      </CustomButton>
    </div>
    //We can't use onClick={addItem(item)} because the way javascript runs, when it hits this line it's just going to evaluate addItem(item) immediately instead of triggering it whenever element with the onClick is actually clicked.
  );
};

const mapDispatchToProps = dispatch => ({
  addItem: item => dispatch(addItem(item))
});

export default connect(
  null,
  mapDispatchToProps
)(CollectionItem);
