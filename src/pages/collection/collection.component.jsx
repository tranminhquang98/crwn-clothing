import React from 'react';
import { connect } from 'react-redux';
import CollectionItem from '../../components/collection-item/collection-item.component';
import { selectCollection } from '../../redux/shop/shop.selectors';
import './collection.styles.scss';

const CollectionPage = ({ collection }) => {
  const { title, items } = collection;
  return (
    <div className="collection-page">
      <h2 className="title">{title}</h2>
      <div className="items">
        {items.map(item => (
          <CollectionItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

//ownProps is the props of the component that we're wrapping in our CollectionPage including 3 objects we get from Route component on our shop.component
const mapStateToProps = (state, ownProps) => ({
  collection: selectCollection(ownProps.match.params.collectionId)(state)
  //Because this selectCollection is returning our createSelector call, our selector call pretty much returns a function that takes the state and then runs it through the selector flow
  //The difference from this one and all others is all others use createStructuredSelector()
});

export default connect(mapStateToProps)(CollectionPage);
