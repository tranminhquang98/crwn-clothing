import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
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
          <Route
            exact
            path="/signin"
            render={() =>
              //js invokecation that determines what component to return
              this.props.currentUser ? (
                <Redirect to="/" />
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

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)) //In order for our components to send these actions to our reducers, we need to use a function called dispatch that the connect() function gives us from react-redux. dispatch() receives an action onject that is it going to pass to every reducer. To access this dispatch function, we get it as the parameter of our mapDispatchToProps() function which is the second argument we give to connect(). The keys on this object will end up being part of the props that get passed into the component we are calling our connect on (setCurrentUser in class App)

  //What we are actually doing is defining a function that takes a user argument as the value for the setCurrentUser function we are defining!The user object we are actually getting from the auth.onAuthStateChanged method or our own firebase utils method which will provide us with some user object that we are passing to this function we have defined. We then want to dispatch() our action using our action creator function that expects a user object. So what we are doing is taking the user object from firebase, passing it into our function that we defined in mapDispatchToProps, which then passes it to our action creator setCurrentUser from our user.actions.js
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

//so you can think mapDispatchToProps that pass redux setState to your props, while mapStateToProps mapping redux state to props
