import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateCollections } from '../../redux/shop/shop.actions';
import WithSpinner from '../../components/with-spinner/with-spinner.component';
import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';
import {
  firestore,
  convertCollectionSnapshotToMap
} from '../../firebase/firebase.utils';

//Because our shop.component is going to be the component that actually be able to know whether or not the loading state that we're considering is finished, because it's the one that actually receives and makes the call to update our reducer after getting the data back from the server. Due to this reason, we have to put the logic for determining the with-spinner here

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {
  //React will know if you're in a class component and you write a state property at the top of your component declaration that you are probably just invoking state
  state = {
    loading: true
  };

  unsubscribeFromSnapshot = null; //This snapshot is going to be the snapshot representation of our collections array that we're going to get from firestore and we're going to fetch that inside of our componentDidMount()

  componentDidMount() {
    const { updateCollections } = this.props;
    const collectionRef = firestore.collection('collections');

    //Whenever the collectionRef updates or whenever this code gets run for the first time, this collectionRef will send us the snapshot representing the code of our collection objects array at the time when this code renders
    collectionRef.onSnapshot(snapshot => {
      const collectionsMap = convertCollectionSnapshotToMap(snapshot); //Takes the snapshot array of objects and perform data normalization
      updateCollections(collectionsMap);
      this.setState({ loading: false });
    });
  }

  render() {
    //shop.component in App.js is being nested in a route and route automatically passes match, history, location into our component as props
    const { match } = this.props;
    const { loading } = this.state;
    return (
      <div className="shop-page">
        <Route
          exact
          path={`${match.path}`}
          component={routeProps => (
            <CollectionsOverviewWithSpinner
              isLoading={loading}
              {...routeProps}
            />
          )}
        />
        <Route
          path={`${match.path}/:collectionId`}
          component={routeProps => (
            <CollectionPageWithSpinner isLoading={loading} {...routeProps} />
          )}
        />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  updateCollections: collectionsMap =>
    dispatch(updateCollections(collectionsMap))
});

export default connect(
  null,
  mapDispatchToProps
)(ShopPage);
