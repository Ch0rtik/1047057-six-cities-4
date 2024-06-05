import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, AuthData, NewReviewData, OfferCardData, OfferData, ReviewData, State, UserData } from '../types/types';
import { AxiosInstance } from 'axios';
import { Action, addFavorite, addReview, addUser, clearFavorite, loadFavorite as loadFavorites, loadOfferPage, loadOffers, removeFavoriteById, requireAuthorization, setFavoritesLoading, setOfferPageLoading, setOffersLoading } from './action';
import { APIRoute, AuthStatus } from '../utils/const';
import { dropToken, saveToken } from '../services/token';


export const fetchOffers = createAsyncThunk<void, undefined, {dispatch: AppDispatch;state: State; extra: AxiosInstance}>(Action.FETCH_OFFERS,
  async (_arg, {dispatch, extra: api}) => {
    try {
      dispatch(setOffersLoading(true));
      const response = await api.get<OfferCardData[]>(APIRoute.Offers);
      dispatch(loadOffers(response.data));
    } catch {
      dispatch(loadOffers([]));
    } finally {
      dispatch(setOffersLoading(false));
    }
  }
);

export const fetchFavorites = createAsyncThunk<void, undefined, {dispatch: AppDispatch;state: State; extra: AxiosInstance}>(Action.FETCH_FAVORITE,
  async (_arg, {dispatch, extra: api}) => {
    try {
      dispatch(setFavoritesLoading(true));
      const {data} = await api.get<OfferCardData[]>(APIRoute.Favorite);
      dispatch(loadFavorites(data));
    } catch {
      dispatch(loadFavorites([]));
    } finally {
      dispatch(setFavoritesLoading(false));
    }
  }
);

export const fetchOfferPageData = createAsyncThunk<void, string, {dispatch: AppDispatch;state: State; extra: AxiosInstance}>(Action.FETCH_OFFER_PAGE,
  async (offerId, {dispatch, extra: api}) => {
    dispatch(setOfferPageLoading(true));

    try {
      const offerResponse = await api.get<OfferData>(`${APIRoute.Offers}/${offerId}`);
      const reviewsResponse = await api.get<ReviewData[]>(`${APIRoute.Reviews}/${offerId}`);
      const nearbyResponse = await api.get<OfferCardData[]>(`${APIRoute.Offers}/${offerId}${APIRoute.Nearby}`);

      dispatch(loadOfferPage({offerData: offerResponse.data, reviewsData: reviewsResponse.data, nearbyData: nearbyResponse.data}));
    } finally {
      dispatch(setOfferPageLoading(false));
    }
  }
);

export const setFavoriteAction = createAsyncThunk<number, {id: string; status: number}, {dispatch: AppDispatch;state: State; extra: AxiosInstance}>(Action.SET_FAVORITE,
  async ({id, status }, {dispatch, extra: api}) => {
    try {
      const response = await api.post<OfferCardData>(`${APIRoute.Favorite}/${id}/${status}`);
      if (response.status === 201) {
        dispatch(addFavorite(response.data));
      } else if (response.status === 200) {
        dispatch(removeFavoriteById(response.data.id));
      }
      return status;
    } catch {
      return -1;
    }
  }
);

export const sendCommentAction = createAsyncThunk<boolean, {newReviewData: NewReviewData; id: string}, {dispatch: AppDispatch;state: State; extra: AxiosInstance}>(Action.SEND_REVIEW,
  async ({newReviewData, id}, {dispatch, extra: api}) => {
    try {
      const response = await api.post<ReviewData>(`${APIRoute.Reviews}/${id}`, {comment: newReviewData.comment, rating: newReviewData.rating});
      dispatch(addReview(response.data));
      return true;
    } catch {
      return false;
    }
  }
);

export const checkAuthAction = createAsyncThunk<void, undefined, {dispatch: AppDispatch; state: State; extra: AxiosInstance}>(Action.CHECK_AUTH,
  async(_arg, {dispatch, extra: api}) => {
    try {
      const response = await api.get<UserData>(APIRoute.Login);
      dispatch(requireAuthorization(AuthStatus.Auth));
      dispatch(addUser(response.data));
    } catch {
      dispatch(requireAuthorization(AuthStatus.NoAuth));
    }
  }
);

export const loginAction = createAsyncThunk<boolean, AuthData, {dispatch: AppDispatch; state: State; extra: AxiosInstance}>(Action.LOG_IN,
  async ({login: email, password}, {dispatch, extra: api}) => {
    try {
      const response = await api.post<UserData>(APIRoute.Login, {email, password});
      saveToken(response.data.token);
      dispatch(requireAuthorization(AuthStatus.Auth));
      dispatch(addUser(response.data));
      dispatch(fetchFavorites());
      dispatch(fetchOffers());
      return true;
    } catch {
      return false;
    }
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {dispatch: AppDispatch; state: State; extra: AxiosInstance}>(Action.LOG_OUT,
  async(_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(requireAuthorization(AuthStatus.NoAuth));
    dispatch(clearFavorite());
    dispatch(loadFavorites([]));
    dispatch(addUser(undefined));
  }
);
