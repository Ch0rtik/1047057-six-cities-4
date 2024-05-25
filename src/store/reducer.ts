import { createReducer } from '@reduxjs/toolkit';
import { City, State } from '../types/types';
import { offers } from '../mocks/offers';
import { changeCity, fetchOffers } from './action';

const initialState: State = {
  city: City.Brussels,
  offers: [],
};

export const reducer = createReducer(initialState, (builder) => {
  builder.addCase(changeCity, (state, action) => {
    state.city = action.payload;
  }).addCase(fetchOffers, (state) =>{
    state.offers = offers;
  });
});
