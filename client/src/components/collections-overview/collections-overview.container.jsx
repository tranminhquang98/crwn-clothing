import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { selectIsCollectionFetching } from '../../redux/shop/shop.selectors';
import WithSpinner from '../with-spinner/with-spinner.component';
import CollectionsOverview from './collections-overview.component';

const mapStateToProps = createStructuredSelector({
  isLoading: selectIsCollectionFetching
  //Because we are going to pass this property into our withSpinner, we got to set the property that we want to be named the one that the withSpinner is expecting
});

const CollectionsOverviewContainer = compose(
  connect(mapStateToProps), //This is so we get the isLoading state pass down to the WithSpinner HOC component to determine whether to displaying the loading circle or the component
  WithSpinner
)(CollectionsOverview);

//By using compose it's essentially currying all of our function, evaluate from right -> left, equivalent to:
//const CollectionPageContainer = connect(mapStateToProps)(WithSpinner(CollectionPage))

export default CollectionsOverviewContainer;
