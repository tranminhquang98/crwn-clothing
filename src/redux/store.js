import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import logger from 'redux-logger'; //Nice to use when debugging redux code
import createSagaMiddleware from 'redux-saga'; //We're now replacing thunk with redux-saga to handle out asynchronous actions inside of redux
import rootReducer from './root-reducer';
import rootSaga from './root-saga';

// import thunk from 'redux-thunk'; //It's a middleware that allows us to fire functions

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware]; //Just the functions from redux-logger

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}
//When we called npm run build it tells the platform that's serving our application that it needs to switch this NODE_ENV over to production whereas normally when we just run our npm start and host it on our local server, it sets this NODE_ENV over to development

export const store = createStore(rootReducer, applyMiddleware(...middlewares)); //Spread in all of the methods or all of the values of the "middlewares" array into the function call as individual arguments
//The actual value of the redux state lives inside of our store object created using createStore that passed into the Provider component in index.js

sagaMiddleware.run(rootSaga); //Just like a root reducer, we're going to make a root saga that issues and calls all of our other sagas, otherwise we have to write sagaMiddleware.run() individually

export const persistor = persistStore(store); //A persisted version of our store
