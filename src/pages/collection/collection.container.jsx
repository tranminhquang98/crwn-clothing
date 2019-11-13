import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { selectIsCollectionsLoaded } from '../../redux/shop/shop.selectors';
import WithSpinner from '../../components/with-spinner/with-spinner.component';
import CollectionPage from './collection.component';

const mapStateToProps = createStructuredSelector({
  isLoading: state => !selectIsCollectionsLoaded(state) //!isCollectionLoaded because the if no collection then you want the isLoading value to be true so it will render the withSpinner
  //Because we are going to pass this property into our withSpinner, we got to set the property that we want to be named the one that the withSpinner is expecting
});

const CollectionPageContainer = compose(
  connect(mapStateToProps), //This is so we get the isLoading state pass down to the WithSpinner HOC component to determine whether to displaying the loading circle or the component
  WithSpinner
)(CollectionPage);

//By using compose it's essentially currying all of our function, evaluate from right -> left, equivalent to:
//const CollectionPageContainer = connect(mapStateToProps)(WithSpinner(CollectionPage))

export default CollectionPageContainer;
