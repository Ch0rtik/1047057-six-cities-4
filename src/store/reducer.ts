import { createReducer } from '@reduxjs/toolkit';
import { City, SortType, State } from '../types/types';
import { offers } from '../mocks/offers';
import { changeCity, changeSort, fetchOffers } from './action';
import sortOffers from '../utils/utils';

const initialState: State = {
  city: City.Paris,
  offers: [],
  sortType: SortType.Popular,
};

export const reducer = createReducer(initialState, (builder) => {
  builder.addCase(changeCity, (state, action) => {
    state.city = action.payload;
  }).addCase(fetchOffers, (state) =>{
    state.offers = offers;
  }).addCase(changeSort, (state, action) =>{
    state.sortType = action.payload;
    if (action.payload === SortType.Popular) {
      state.offers = offers;
    } else {
      sortOffers(state.offers, action.payload);
    }
  });
});
