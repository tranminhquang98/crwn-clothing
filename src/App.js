import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import { connect } from 'react-redux';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import Header from './components/header/header.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions';

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      //Take a function as the argument! The function has the signature with a prop of userAuth (which is just what we called it, you can call it anything you want) passed as the property into our function definition. This userAuth object we don't assign the value, it's actually what we get from the firestore auth libraries onAuthStateChanged method. Whenever the user auth state changes from logging in or logging out, our function gets invoked with that object (or null if its a sign out).
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth); //If there was a document there just return get back userRef, otherwise create a new document and then still return the ref

        userRef.onSnapshot(snapShot => {
          //onSnapshot it will give us a listener and keep the subscription open also get back the first stage of the data
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          });
        });
      } else {
        setCurrentUser(userAuth); //If no user then equivalent to currentUser: null
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth(); //It is a function we get back from auth.onAuthStateChanged. Because we want to close the channel when we're about to remove our component from the DOM because that's when we don't need the component anymore, therefore we also don't need the subscription listening
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route path="/signin" component={SignInAndSignUpPage} />
        </Switch>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(
  null,
  mapDispatchToProps
)(App);
