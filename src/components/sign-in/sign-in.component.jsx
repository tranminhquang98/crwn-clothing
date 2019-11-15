import React from 'react';
import { connect } from 'react-redux';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import './sign-in.styles.scss';
import {
  googleSignInStart,
  emailSignInStart
} from '../../redux/user/user.actions';

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };
  }

  handleSubmit = async event => {
    event.preventDefault();
    const { emailSignInStart } = this.props;
    const { email, password } = this.state;

    emailSignInStart(email, password);
  };

  handleChange = event => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
    //The square brackets allows us to evaluate the value of a variable as the name of a property on our object. This is what allows us to dynamically set the prop, which is how we're to reuse this method for both our form inputs
  };

  render() {
    const { googleSignInStart } = this.props;
    return (
      <div className='sign-in'>
        <h2>I already have an account</h2>
        <span>Sign in with your email and password</span>
        <form onSubmit={this.handleSubmit}>
          <FormInput
            name='email'
            type='email'
            value={this.state.email}
            handleChange={this.handleChange}
            label='email'
            required
          />
          <FormInput
            name='password'
            type='password'
            value={this.state.password}
            handleChange={this.handleChange}
            label='password'
            required
          />
          <div className='buttons'>
            <CustomButton type='submit'>Sign in</CustomButton>
            <CustomButton
              type='button' //Our button will not trigger the submit form
              onClick={googleSignInStart}
              isGoogleSignIn
            >
              Sign in with Google
            </CustomButton>
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  googleSignInStart: () => dispatch(googleSignInStart()),
  emailSignInStart: (email, password) =>
    dispatch(emailSignInStart({ email, password }))
});
//In order for our components to send these actions to our reducers, we need to use a function called dispatch that the connect() function gives us from react-redux. dispatch() receives an action onject that is it going to pass to every reducer. To access this dispatch function, we get it as the parameter of our mapDispatchToProps() function which is the second argument we give to connect(). The keys on this object will end up being part of the props that get passed into the component we are calling our connect on

export default connect(null, mapDispatchToProps)(SignIn);
