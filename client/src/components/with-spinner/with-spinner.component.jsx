import React from 'react';
import Spinner from '../spinner/spinner.component';

//Our application is going to be in the state where the data does not exist. The reason is because when our application first boots up, and a component need the collections map that we have, however, because retrieving data from our backend is asynchronous

//WithSpinner is a HOC that takes a component as an argument and gives us back a spinner component that will render the component we passed in when the loading is false
const WithSpinner = WrappedComponent => ({ isLoading, ...otherProps }) => {
  return isLoading ? <Spinner /> : <WrappedComponent {...otherProps} />;
};

export default WithSpinner;
