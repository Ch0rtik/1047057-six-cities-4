import { createAction } from '@reduxjs/toolkit';
import { City, OfferData, SortType } from '../types/types';
import { AuthStatus } from '../utils/const';

export const Action = {
  CHANGE_CITY: 'CHANGE_CITY',
  CHANGE_SORT: 'CHANGE_SORT',
  FETCH_OFFERS: 'FETCH_OFFERS',
  LOAD_OFFERS: 'LOAD_OFFERS',
  REQUIRE_AUTH: 'REQUIRE_AUTH',
  CHECK_AUTH: 'CHECK_AUTH',
  LOG_IN: 'LOG_IN',
  LOG_OUT: 'LOG_OUT',
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR',
  SET_OFFERS_LOADING: 'SET_OFFER_LOADING'
};

export const changeCity = createAction(Action.CHANGE_CITY, (value: City) =>({payload: value}));
export const changeSort = createAction(Action.CHANGE_SORT, (value: SortType) => ({payload: value}));
export const loadOffers = createAction<OfferData[]>(Action.LOAD_OFFERS);
export const requireAuthorization = createAction<AuthStatus>(Action.REQUIRE_AUTH);
export const setError = createAction<string | null>(Action.SET_ERROR);
export const setOffersLoading = createAction<boolean>(Action.SET_OFFERS_LOADING);
