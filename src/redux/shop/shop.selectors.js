import { createSelector } from 'reselect';

const selectShop = state => state.shop;

export const selectCollections = createSelector(
  [selectShop],
  shop => shop.collections
);

export const selectCollectionsForPreview = createSelector(
  [selectCollections],
  collections =>
    collections ? Object.keys(collections).map(key => collections[key]) : [] //Dynamically select the object
  //Object.keys() will return us the array of "keys" of the key value pair (mens, womens, ...), and then we will map over that array return a new array contain those 5 ojects
);

export const selectCollection = collectionUrlParam =>
  createSelector(
    [selectCollections],
    collections => (collections ? collections[collectionUrlParam] : null) //Data normalization, dynamically select the object
  );
