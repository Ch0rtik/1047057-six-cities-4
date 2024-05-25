import { createAction } from '@reduxjs/toolkit';
import { City, SortType } from '../types/types';

export const Action = {
  CHANGE_CITY: 'CHANGE_CITY',
  CHANGE_SORT: 'CHANGE_SORT',
  FETCH_OFFERS: 'FETCH_OFFERS',
};

export const changeCity = createAction(Action.CHANGE_CITY, (value: City) =>({payload: value}));
export const changeSort = createAction(Action.CHANGE_SORT, (value: SortType) => ({payload: value}));
export const fetchOffers = createAction(Action.FETCH_OFFERS);
