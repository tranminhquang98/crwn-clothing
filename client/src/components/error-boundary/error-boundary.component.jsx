import React from 'react';
import {
  ErrorImageOverlay,
  ErrorImageContainer,
  ErrorImageText
} from './error-boundary.styles';

class ErrorBoundary extends React.Component {
  constructor() {
    super();

    this.state = {
      hasErrored: false
    };
  }

  //Inside of this first static lifecycle method, what this does is it essentially catches any error that gets thrown in any of the children of this ErrorBoundary component. Any of those wrapped components inside get an error or throw an error, that error gets passed in as the parameter of getDerivedStateFromError. This method allows us to catch the error ahead of time when it gets thrown inside of any children nested in this ErrorBoundary component
  static getDerivedStateFromError(error) {
    //Process the error
    return { hasErrored: true };
  }

  componentDidCatch(error, info) {
    console.log(error);
  }

  render() {
    if (this.state.hasErrored)
      return (
        <ErrorImageOverlay>
          <ErrorImageContainer imageUrl='https://i.imgur.com/A040Lxr.png' />
          <ErrorImageText>Sorry this page is broken</ErrorImageText>
        </ErrorImageOverlay>
      );
    return this.props.children;
  }
}

export default ErrorBoundary;
