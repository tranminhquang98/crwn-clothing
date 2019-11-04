import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger'; // nice to use when debugging redux code
import rootReducer from './root-reducer';

const middlewares = [logger]; //just the functions form redux-logger

const store = createStore(rootReducer, applyMiddleware(...middlewares)); //spread in all of the methods or all of the values of the "middlewares" array into the function call as individual arguments

export default store;
