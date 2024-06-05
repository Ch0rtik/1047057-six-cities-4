import { createReducer } from '@reduxjs/toolkit';
import { SortType, State } from '../types/types';
import { addFavorite, addReview, addUser, changeCity, changeSort, clearFavorite, loadFavorites, loadOfferPage, loadOffers, removeFavoriteById, requireAuthorization, setFavoritesLoading, setOfferPageLoading, setOffersLoading, updateCurrentFavorite, updateFavorite } from './action';
import { AuthStatus } from '../utils/const';

const initialState: State = {
  user: undefined,
  city: {name: 'Paris', location: {latitude: 48.8566, longitude: 2.3522, zoom: 12}},
  offers: [],
  sortType: SortType.Popular,
  authStatus: AuthStatus.Unknown,
  offersLoading: false,
  currentOfferData: {offerData: null, reviewsData: [], nearbyData: []},
  favoritesLoading: false,
  favorites: [],
  offerPageLoading: false,
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
  }).addCase(loadFavorites, (state, action) => {
    state.favorites = action.payload;
  }).addCase(addReview, (state, action) => {
    state.currentOfferData.reviewsData = [...state.currentOfferData.reviewsData, action.payload];
  }).addCase(setOffersLoading, (state, action) => {
    state.offersLoading = action.payload;
  }).addCase(setFavoritesLoading, (state, action) => {
    state.favoritesLoading = action.payload;
  }).addCase(requireAuthorization, (state, action) => {
    state.authStatus = action.payload;
  }).addCase(updateFavorite, (state, action) => {
    const offer = state.offers.find((offerInner) => offerInner.id === action.payload.id);
    if (offer) {
      offer.isFavorite = action.payload.status;
    }
  }).addCase(clearFavorite, (state) => {
    for (const offer of state.offers) {
      offer.isFavorite = false;
    }
  }).addCase(updateCurrentFavorite, (state, action) =>{
    if (state.currentOfferData.offerData) {
      state.currentOfferData.offerData.isFavorite = action.payload.status;
    }
  }).addCase(addUser, (state, action) => {
    state.user = action.payload;
  }).addCase(addFavorite, (state, action) => {
    state.favorites.push(action.payload);
  }).addCase(removeFavoriteById, (state, action) => {
    state.favorites = state.favorites.filter((offer) => offer.id !== action.payload);
  }).addCase(setOfferPageLoading, (state, action) =>{
    state.offerPageLoading = action.payload;
  });
});
