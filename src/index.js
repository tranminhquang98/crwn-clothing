import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';

import store from './redux/store';

ReactDOM.render(
  //This provider is a component that is the parent of everything inside of our application. And as the parent it allows us to get access to all of the things related to the store that we're going to put all of the actual code we want to store on our redux stage.
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,

  document.getElementById('root')
);
