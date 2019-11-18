import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchCollectionsStart } from '../../redux/shop/shop.actions';
import CollectionsOverviewContainer from '../../components/collections-overview/collections-overview.container';
import CollectionPageContainer from '../collection/collection.container';

//Create and initialize the asynchronous request for fetching data and then passing components into its route
const ShopPage = ({ fetchCollectionsStart, match }) => {
  useEffect(() => {
    fetchCollectionsStart();
  }, [fetchCollectionsStart]); //So this doesn't get triggered twice when our App component reload to check for user authentication => in turn re-render our shop.component

  return (
    //shop.component in App.js is being nested in a route and route automatically passes match, history, location into our component as props
    <div className='shop-page'>
      <Route
        exact
        path={`${match.path}`}
        component={CollectionsOverviewContainer} //Container pattern
      />
      <Route
        path={`${match.path}/:collectionId`}
        component={CollectionPageContainer} //Container pattern
      />
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
});

export default connect(null, mapDispatchToProps)(ShopPage);
