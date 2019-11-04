import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'; //The connect function is a higher order component that lets us modify our component to have access to things related to redux
import { auth } from '../../firebase/firebase.utils';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import { ReactComponent as Logo } from '../../assets/crown.svg';
import './header.styles.scss';

const Header = ({ currentUser, hidden }) => (
  <div className="header">
    <Link className="logo-container" to="/">
      <Logo className="logo" />
    </Link>
    <div className="options">
      <Link className="option" to="/shop">
        SHOP
      </Link>
      <Link className="option" to="/shop">
        CONTACT
      </Link>
      {currentUser ? (
        <div className="option" onClick={() => auth.signOut()}>
          SIGN OUT
        </div>
      ) : (
        <Link className="option" to="/signin">
          SIGN IN
        </Link>
      )}
      <CartIcon />
    </div>
    {hidden ? null : <CartDropdown />}
  </div>
);

//When we pass connect our mapStateToProps function, it's expecting that we will have declared the parameter of state, and connect will give it our entire redux state (which is what gets returned by our root reducer)
//state is mapped to component props by mapStateToProps
const mapStateToProps = ({ user: { currentUser }, cart: { hidden } }) => ({
  //Nested destructuring
  currentUser,
  hidden
});

export default connect(mapStateToProps)(Header);
//The currentUser argument above in the Header function is what passed in from the mapStateToProps
