import { createAction } from '@reduxjs/toolkit';
import { City, CurrentOfferData, OfferCardData, ReviewData, SortType, UserData } from '../types/types';
import { AuthStatus } from '../utils/const';

export const Action = {
  CHANGE_CITY: 'city/change',
  CHANGE_SORT: 'sort/change',
  FETCH_OFFERS: 'offers/fetch',
  LOAD_OFFERS: 'offers/load',
  REQUIRE_AUTH: 'auth/require',
  CHECK_AUTH: 'auth/check',
  LOG_IN: 'auth/logIn',
  LOG_OUT: 'auth/logOut',
  SET_OFFERS_LOADING: 'offers/setLoading',
  SET_FAVORITES_LOADING: 'favorites/setLoading',
  FETCH_OFFER_PAGE: 'offerPage/fetch',
  LOAD_OFFER_PAGE: 'offerPage/load',
  SEND_REVIEW: 'review/send',
  ADD_REVIEW: 'review/add',
  FETCH_FAVORITES: 'favorites/fetch',
  SET_FAVORITE: 'favorites/set',
  ADD_FAVORITE: 'favorites/add',
  REMOVE_FAVORITE: 'favorites/remove',
  LOAD_FAVORITES: 'favorites/load',
  ADD_USER: 'user/add',
  UPDATE_FAVORITES: 'offers/updateFavorites',
  UPDATE_CURRENT_FAVORITE: 'offerPage/updateFavorite',
  CLEAR_FAVORITE: 'offers/clearFavorites',
  OFFER_PAGE_LOADING: 'offerPage/setLoading'
};

export const changeCity = createAction(Action.CHANGE_CITY, (value: City) =>({payload: value}));
export const changeSort = createAction(Action.CHANGE_SORT, (value: SortType) => ({payload: value}));
export const loadOffers = createAction<OfferCardData[]>(Action.LOAD_OFFERS);
export const requireAuthorization = createAction<AuthStatus>(Action.REQUIRE_AUTH);
export const setOffersLoading = createAction<boolean>(Action.SET_OFFERS_LOADING);
export const loadOfferPage = createAction<CurrentOfferData>(Action.LOAD_OFFER_PAGE);
export const addReview = createAction<ReviewData>(Action.ADD_REVIEW);
export const loadFavorites = createAction<OfferCardData[]>(Action.LOAD_FAVORITES);
export const updateFavorite = createAction<{id: string; status: boolean}>(Action.UPDATE_FAVORITES);
export const updateCurrentFavorite = createAction<{status: boolean}>(Action.UPDATE_CURRENT_FAVORITE);
export const clearFavorite = createAction(Action.CLEAR_FAVORITE);
export const addUser = createAction<UserData | undefined>(Action.ADD_USER);
export const setFavoritesLoading = createAction<boolean>(Action.SET_FAVORITES_LOADING);
export const addFavorite = createAction<OfferCardData>(Action.ADD_FAVORITE);
export const removeFavoriteById = createAction<string>(Action.REMOVE_FAVORITE);
export const setOfferPageLoading = createAction<boolean>(Action.OFFER_PAGE_LOADING);
