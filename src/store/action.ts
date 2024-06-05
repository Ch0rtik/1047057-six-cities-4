import { createAction } from '@reduxjs/toolkit';
import { City, CurrentOfferData, OfferCardData, ReviewData, SortType, UserData } from '../types/types';
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
  SET_OFFERS_LOADING: 'SET_OFFER_LOADING',
  SET_FAVORITES_LOADING: 'SET_FAVORITES_LOADING',
  FETCH_OFFER_PAGE: 'FETCH_OFFER_PAGE',
  LOAD_OFFER_PAGE: 'LOAD_OFFER_PAGE',
  SEND_REVIEW: 'SEND_REVIEW',
  ADD_REVIEW: 'ADD_REVIEW',
  FETCH_FAVORITE: 'FETCH_FAVORITE',
  SET_FAVORITE: 'SET_FAVORITE',
  ADD_FAVORITE: 'ADD_FAVORITE',
  REMOVE_FAVORITE: 'REMOVE_FAVORITE',
  LOAD_FAVORITE: 'LOAD_FAVORITE',
  ADD_USER: 'ADD_USER',
  UPDATE_FAVORITE: 'UPDATE_FAVORITE',
  UPDATE_CURRENT_FAVORITE: 'UPDATE_CURRENT_FAVORITE',
  CLEAR_FAVORITE: 'CLEAR_FAVORITE',
  OFFER_PAGE_LOADING: 'OFFER_PAGE_LOADING'
};

export const changeCity = createAction(Action.CHANGE_CITY, (value: City) =>({payload: value}));
export const changeSort = createAction(Action.CHANGE_SORT, (value: SortType) => ({payload: value}));
export const loadOffers = createAction<OfferCardData[]>(Action.LOAD_OFFERS);
export const requireAuthorization = createAction<AuthStatus>(Action.REQUIRE_AUTH);
export const setOffersLoading = createAction<boolean>(Action.SET_OFFERS_LOADING);
export const loadOfferPage = createAction<CurrentOfferData>(Action.LOAD_OFFER_PAGE);
export const addReview = createAction<ReviewData>(Action.ADD_REVIEW);
export const loadFavorite = createAction<OfferCardData[]>(Action.LOAD_FAVORITE);
export const updateFavorite = createAction<{id: string; status: boolean}>(Action.UPDATE_FAVORITE);
export const updateCurrentFavorite = createAction<{status: boolean}>(Action.UPDATE_CURRENT_FAVORITE);
export const clearFavorite = createAction(Action.CLEAR_FAVORITE);
export const addUser = createAction<UserData | undefined>(Action.ADD_USER);
export const setFavoritesLoading = createAction<boolean>(Action.SET_FAVORITES_LOADING);
export const addFavorite = createAction<OfferCardData>(Action.ADD_FAVORITE);
export const removeFavoriteById = createAction<string>(Action.REMOVE_FAVORITE);
export const setOfferPageLoading = createAction<boolean>(Action.OFFER_PAGE_LOADING);
