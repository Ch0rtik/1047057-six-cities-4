import { createReducer } from '@reduxjs/toolkit';
import { SortType, State } from '../types/types';
import { addEmail, addReview, changeCity, changeSort, loadFavorite, loadOfferPage, loadOffers, requireAuthorization, setError, setOffersLoading } from './action';
import { AuthStatus } from '../utils/const';

const initialState: State = {
  email: '',
  city: {name: 'Paris', location: {latitude: 48.8566, longitude: 2.3522, zoom: 12}},
  offers: [],
  sortType: SortType.Popular,
  authStatus: AuthStatus.Unknown,
  error: null,
  offersLoading: false,
  currentOfferData: {offerData: null, reviewsData: [], nearbyData: []},
  favorites: null
};

export const reducer = createReducer(initialState, (builder) => {
  builder.addCase(changeCity, (state, action) => {
    state.city = action.payload;
  }).addCase(changeSort, (state, action) =>{
    state.sortType = action.payload;
  }).addCase(loadOffers, (state, action) => {
    state.offers = action.payload;
  }).addCase(loadOfferPage, (state, action) => {
    state.currentOfferData = action.payload;
  }).addCase(loadFavorite, (state, action) => {
    state.favorites = action.payload;
  }).addCase(addReview, (state, action) => {
    state.currentOfferData.reviewsData = [...state.currentOfferData.reviewsData, action.payload];
  }).addCase(setOffersLoading, (state, action) => {
    state.offersLoading = action.payload;
  }).addCase(requireAuthorization, (state, action) => {
    state.authStatus = action.payload;
  }).addCase(addEmail, (state, action)=>{
    state.email = action.payload;
  }).addCase(setError, (state, action) =>{
    state.error = action.payload;
  });
});
