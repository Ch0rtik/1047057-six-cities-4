import { createReducer } from '@reduxjs/toolkit';
import { SortType, State } from '../types/types';
import { offers } from '../mocks/offers';
import { changeCity, changeSort, loadOffers, requireAuthorization, setError, setOffersLoading } from './action';
import sortOffers from '../utils/utils';
import { AuthStatus } from '../utils/const';

const initialState: State = {
  city: {name: 'Paris', location: {latitude: 48.8566, longitude: 2.3522, zoom: 12}},
  offers: [],
  sortType: SortType.Popular,
  authStatus: AuthStatus.Unknown,
  error: null,
  offersLoading: false,
};

export const reducer = createReducer(initialState, (builder) => {
  builder.addCase(changeCity, (state, action) => {
    state.city = action.payload;
  }).addCase(changeSort, (state, action) =>{
    state.sortType = action.payload;
    if (action.payload === SortType.Popular) {
      state.offers = offers;
    } else {
      sortOffers(state.offers, action.payload);
    }
  }).addCase(loadOffers, (state, action) => {
    state.offers = action.payload;
  }).addCase(setOffersLoading, (state, action) => {
    state.offersLoading = action.payload;
  }).addCase(requireAuthorization, (state, action) => {
    state.authStatus = action.payload;
  }).addCase(setError, (state, action) =>{
    state.error = action.payload;
  });
});
