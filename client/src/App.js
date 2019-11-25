import React, { useEffect, lazy, Suspense } from 'react'; //Suspense is a new component that react has released that allows you to wrap any part of your application that might be rendering asynchronous components - lazy loading component. It's actually meant to be used with react lazy.
import { Switch, Route, Redirect } from 'react-router-dom';
import { GlobalStyle } from './global.styles';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Header from './components/header/header.component';
import Spinner from './components/spinner/spinner.component';
import ErrorBoundary from './components/error-boundary/error-boundary.component';
import { selectCurrentUser } from './redux/user/user.selectors';
import { checkUserSession } from './redux/user/user.actions';

const HomePage = lazy(() => import('./pages/homepage/homepage.component')); //When the application mount for the first time it won't get this cunk that represents everything except for the homepage
const ShopPage = lazy(() => import('./pages/shop/shop.component'));
const SignInAndSignUpPage = lazy(() =>
  import('./pages/sign-in-and-sign-up/sign-in-and-sign-up.component')
);
const CheckoutPage = lazy(() => import('./pages/checkout/checkout.component'));

const App = ({ checkUserSession, currentUser }) => {
  useEffect(() => {
    //Like componentDidMount
    checkUserSession();
  }, [checkUserSession]); //Fire useEffect when checkUserSession changes otherwise don't, we're not going to fire useEffect more than one time because checkUserSession is an action from our redux. useEffect is not aware that this is coming from our connect function

  return (
    <div>
      <GlobalStyle />
      <Header />
      <ErrorBoundary>
        <Suspense
          fallback={
            <Spinner />
            //Suspense just render our fallback Spinner and waits until the actual component is finished being lazy loaded dynamically imported and then it will automatically switch to the right component for us
          }
        >
          <Switch>
            <Route exact path='/' component={HomePage} />

            {/**For the ShopPage component, If you set it as exact, the moment you add additional route parameters after the exact route specified, it will unmatch and unmount the component! */}
            <Route path='/shop' component={ShopPage} />
            <Route exact path='/checkout' component={CheckoutPage} />
            <Route
              exact
              path='/signin'
              render={() =>
                //JS invokecation that determines what component to return
                currentUser ? <Redirect to='/' /> : <SignInAndSignUpPage />
              }
            />
          </Switch>
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
