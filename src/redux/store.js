import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import logger from 'redux-logger'; //Nice to use when debugging redux code
import rootReducer from './root-reducer';

const middlewares = [logger]; //Just the functions from redux-logger

export const store = createStore(rootReducer, applyMiddleware(...middlewares)); //Spread in all of the methods or all of the values of the "middlewares" array into the function call as individual arguments
//The actual value of the redux state lives inside of our store object created using createStore that passed into the Provider component in index.js

export const persistor = persistStore(store); //A persisted version of our store
