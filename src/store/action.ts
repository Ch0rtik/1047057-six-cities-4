import { createAction } from '@reduxjs/toolkit';
import { City } from '../types/types';

export const Action = {
  CHANGE_CITY: 'CHANGE_CITY',
  FETCH_OFFERS: 'FETCH_OFFERS',
};

export const changeCity = createAction(Action.CHANGE_CITY, (value: City) =>({payload: value,}));
export const fetchOffers = createAction(Action.FETCH_OFFERS);
