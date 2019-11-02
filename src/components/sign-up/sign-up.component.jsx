import React from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';

class SignUp extends React.Component {
  constructor() {
    super();

    this.state = {
      displayName: '',
      email: '',
      password: '',
      confirmPassword: ''
    };
  }

  handleSubmit = async event => {
    event.preventDefault(); //Stop default behavior of form submission

    const { displayName, email, password, confirmPassword } = this.state;

    if (password !== confirmPassword) {
      alert("passwords don't match");
      return;
    }

    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      ); //We are simply passing it the email and password values we have stored on our state as the arguments it needs. It will then return us an auth object, which has a user property. It signs the user as well, but it only stores something inside our authentication table.

      await createUserProfileDocument(user, { displayName }); //This user object is a userAuth object that has the uid of our user that we just signed up with from our auth.createUserWithEmailAndPassword method we just called. We pass this user object alongside our object { displayName: "abcWhatsoEver" } into createUserProfileDocument method which will use the uid value to get our userRef object. That userRef object we need in order to make changes to that user in our database, which we need to do, because we need to add a new field displayName to it. We then check if there's a displayName on our userAuth object by destructuring it off and setting it as a property in our userRef.set() but if there is no value, which can happen because we use this same createUserProfileDocument in our sign in as well, we simply then set the displayName by spreading it in through our additionalData prop! The additionalData prop in this case is our { displayName: "abcWhatsoEver" } that we passed as the second argument

      //We are indeed actually calling createUserProfileDocument twice, the first time we are calling it without any additionalData, the second time with { displayName }. While it's kiiiind of a race condition in the sense that we are firing off two requests to update the userRef object, regardless of which one completes first, set() will either create a new object or update an existing object with any additional fields if those fields need to be updated. If the one fired from auth.onAuthStateChanged() completes first without displayName, then the second one from our signUp component will update it with the displayName. If the one from signUp completes first, then the one from auth.onAuthStateChanged() won't update any fields since firebase is smart enough not to remove our fields.

      //Because await userRef.get() is asynchronous, and both createUserProfileDocument() calls end up happening before set() is called in either of them, it means that both will always end up with a DocumentSnapshot that does not exist yet,and thus both will end up running the set().

      this.setState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
      }); //Clear out the form
    } catch (err) {
      console.log(err);
    }
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  //Will get called when setState is called
  render() {
    const { displayName, email, password, confirmPassword } = this.state;

    return (
      <div className="sign-up">
        <h2 className="title">I do not have an account</h2>
        <span>Sign up with your email and password</span>
        <form className="sign-up-form" onSubmit={this.handleSubmit}>
          <FormInput
            type="text"
            name="displayName"
            value={displayName}
            handleChange={this.handleChange}
            label="Display Name"
            required
          />
          <FormInput
            type="email"
            name="email"
            value={email}
            handleChange={this.handleChange}
            label="Email"
            required
          />
          <FormInput
            type="password"
            name="password"
            value={password}
            handleChange={this.handleChange}
            label="Password"
            required
          />
          <FormInput
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            handleChange={this.handleChange}
            label="Confirm Password"
            required
          />
          <CustomButton type="submit">SIGN UP</CustomButton>
        </form>
      </div>
    );
  }
}

export default SignUp;
