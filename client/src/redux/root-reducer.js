import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist'; //Persist our reducer
import storage from 'redux-persist/lib/storage'; //Actual local storage object on our window browser
import userReducer from './user/user.reducer';
import cartReducer from './cart/cart.reducer';
import shopReducer from './shop/shop.reducer';
import directoryReducer from './directory/directory.reducer';

const persistConfig = {
  key: 'root', //At what point inside of our reducer object do we want to start storing everything, and want to start from the root
  storage, //This will say the storage key goes to the local storage
  whitelist: ['cart'] //An array containing the string names of any of the reducer that we want to persist
};

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  directory: directoryReducer,
  shop: shopReducer
});

export default persistReducer(persistConfig, rootReducer);
