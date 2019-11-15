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
// import { selectCollectionsForPreview } from './redux/shop/shop.selectors'; //(2)

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    // const { coolectionsArray } = this.props; //(3)
    // this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
    //   //Take a function as the argument! The function has the signature with a prop of userAuth (which is just what we called it, you can call it anything you want) passed as the property into our function definition. This userAuth object we don't assign the value, it's actually what we get from the firestore auth libraries onAuthStateChanged method. Whenever the user auth state changes from logging in or logging out, our function gets invoked with that object (or null if its a sign out).
    //   if (userAuth) {
    //     const userRef = await createUserProfileDocument(userAuth); //If there was a document there just return get back userRef, otherwise create a new document and then still return the ref
    //     userRef.onSnapshot(snapShot => {
    //       //onSnapshot it will give us a listener and keep the subscription open also get back the first stage of the data and then call the setCurrentUser action creator method
    //       setCurrentUser({
    //         id: snapShot.id,
    //         ...snapShot.data()
    //       });
    //     });
    //   } else {
    //     setCurrentUser(userAuth); //If no user then equivalent to currentUser: null
    //   }
    // });
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

export default connect(mapStateToProps)(App);
