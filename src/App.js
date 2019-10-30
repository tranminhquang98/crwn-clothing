import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import Header from './components/header/header.component';
import { auth } from './firebase/firebase.utils';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: null
    };
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(user => {
      //return a function we can call to close this subscription
      this.setState({ currentUser: user });
      console.log(user);
    }); //this is a method on the auth library that we get from firebase, the auth will send that user authenticated object everytime unti they sign out
    //the moment we call this method on the auth library and pass it a function, the observer has been initialized with the function we've passed, and the auth library is going to call this function whenever a new subscription "event" occurs (whether its a login, or logout). We are indeed setting the code for subscribing, but we are also initializing/opening the subscription at the same time.
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth(); //close subscription
  }

  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route path="/signin" component={SignInAndSignUpPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
