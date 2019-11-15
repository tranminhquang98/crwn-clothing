import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CheckoutPage from './pages/checkout/checkout.component';
import Header from './components/header/header.component';
// import { addCollectionAndDocuments } from './firebase/firebase.utils'; //(1)
import { selectCurrentUser } from './redux/user/user.selectors';
import { checkUserSession } from './redux/user/user.actions';
// import { selectCollectionsForPreview } from './redux/shop/shop.selectors'; //(2)

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    // const { coolectionsArray } = this.props; //(3)
    const { checkUserSession } = this.props;
    checkUserSession();
    // addCollectionAndDocuments(
    //   'collections',
    //   collectionsArray.map(({ title, items }) => ({ title, items }))
    // ); //This collectionsArray.map() will be returning us an arrays of just objects with the values that we want to keep (not id and routeName) //(4)
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth(); //It is a function we get back from auth.onAuthStateChanged. Because we want to close the channel when we're about to remove our component from the DOM because that's when we don't need the component anymore, therefore we also don't need the subscription listening
  }

  render() {
    //For the ShopPage component, If you set it as exact, the moment you add additional route parameters after the exact route specified, it will unmatch and unmount the component!
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/checkout' component={CheckoutPage} />
          <Route
            exact
            path='/signin'
            render={() =>
              //JS invokecation that determines what component to return
              this.props.currentUser ? (
                <Redirect to='/' />
              ) : (
                <SignInAndSignUpPage />
              )
            }
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
  // collectionsArray: selectCollectionsForPreview //(5)
});

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
