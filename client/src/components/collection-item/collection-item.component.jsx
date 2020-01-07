import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { addItem } from '../../redux/cart/cart.actions';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import {
  CollectionItemContainer,
  CollectionFooterContainer,
  AddButton,
  BackgroundImage,
  NameContainer,
  PriceContainer
} from './collection-item.styles';

const CollectionItem = ({ item, addItem, currentUser }) => {
  const { name, price, imageUrl } = item;

  return (
    <CollectionItemContainer>
      <BackgroundImage className='image' imageUrl={imageUrl} />
      <CollectionFooterContainer>
        <NameContainer>{name}</NameContainer>
        <PriceContainer>${price}</PriceContainer>
      </CollectionFooterContainer>
      {currentUser ? (
        <AddButton
          onClick={
            () => addItem(item)
            //We can't use onClick={addItem(item)} because the way javascript runs, when it hits this line it's just going to evaluate addItem(item) immediately instead of triggering it whenever element with the onClick is actually clicked.
          }
          inverted
        >
          Add to cart
        </AddButton>
      ) : (
        <AddButton
          onClick={() => alert('Please sign in to add item to cart!')}
          inverted
        >
          Add to cart
        </AddButton>
      )}
    </CollectionItemContainer>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  addItem: item => dispatch(addItem(item))
});

export default connect(mapStateToProps, mapDispatchToProps)(CollectionItem);
