import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, AuthData, NewReviewData, OfferCardData, OfferData, ReviewData, State, UserData } from '../types/types';
import { AxiosInstance } from 'axios';
import { Action, addEmail, addReview, loadFavorite as loadFavorites, loadOfferPage, loadOffers, requireAuthorization, setError, setOffersLoading } from './action';
import { APIRoute, AuthStatus, TIMEOUT_SHOW_ERROR } from '../utils/const';
import { dropToken, saveToken } from '../services/token';
import { store } from '.';

export const clearErrorAction = createAsyncThunk(
  Action.CLEAR_ERROR,
  () => {
    setTimeout(
      () => store.dispatch(setError(null)),
      TIMEOUT_SHOW_ERROR,
    );
  }
);

export const fetchOffers = createAsyncThunk<void, undefined, {dispatch: AppDispatch;state: State; extra: AxiosInstance}>(Action.FETCH_OFFERS,
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setOffersLoading(true));
    const {data} = await api.get<OfferCardData[]>(APIRoute.Offers);
    dispatch(setOffersLoading(false));
    dispatch(loadOffers(data));
  }
);

export const fetchFavorites = createAsyncThunk<void, undefined, {dispatch: AppDispatch;state: State; extra: AxiosInstance}>(Action.FETCH_FAVORITE,
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<OfferCardData[]>(APIRoute.Favorite);
    dispatch(loadFavorites(data));
  }
);

export const setFavoriteAction = createAsyncThunk<void, {id: string; status: number}, {dispatch: AppDispatch;state: State; extra: AxiosInstance}>(Action.SET_FAVORITE,
  async ({id, status}, {dispatch, extra: api}) => {
    await api.post<OfferCardData>(`${APIRoute.Favorite}/${id}/${status}`);
    dispatch(fetchFavorites());
    dispatch(fetchOffers());
  }
);

export const fetchOfferPageData = createAsyncThunk<void, string, {dispatch: AppDispatch;state: State; extra: AxiosInstance}>(Action.FETCH_OFFER_PAGE,
  async (offerId, {dispatch, extra: api}) => {
    const {data: offerData} = await api.get<OfferData>(`${APIRoute.Offers}/${offerId}`);
    const {data: reviewsData} = await api.get<ReviewData[]>(`${APIRoute.Reviews}/${offerId}`);
    const {data: nearbyData} = await api.get<OfferCardData[]>(`${APIRoute.Offers}/${offerId}${APIRoute.Nearby}`);
    dispatch(loadOfferPage({offerData, reviewsData, nearbyData}));
  }
);

export const sendCommentAction = createAsyncThunk<void, {newReviewData: NewReviewData; id: string}, {dispatch: AppDispatch;state: State; extra: AxiosInstance}>(Action.SEND_REVIEW,
  async ({newReviewData, id}, {dispatch, extra: api}) => {
    const {data: reviewData} = await api.post<ReviewData>(`${APIRoute.Reviews}/${id}`, {comment: newReviewData.comment, rating: newReviewData.rating});
    dispatch(addReview(reviewData));
  }
);

export const checkAuthAction = createAsyncThunk<void, undefined, {dispatch: AppDispatch; state: State; extra: AxiosInstance}>(Action.CHECK_AUTH,
  async(_arg, {dispatch, extra: api}) => {
    try {
      await api.get(APIRoute.Login);
      dispatch(requireAuthorization(AuthStatus.Auth));
    } catch {
      dispatch(requireAuthorization(AuthStatus.NoAuth));
    }
  }
);

export const loginAction = createAsyncThunk<void, AuthData, {dispatch: AppDispatch; state: State; extra: AxiosInstance}>(Action.LOG_IN,
  async ({login: email, password}, {dispatch, extra: api}) => {
    const {data: {token}} = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(token);
    dispatch(requireAuthorization(AuthStatus.Auth));
    dispatch(addEmail(email));
    dispatch(fetchFavorites());
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {dispatch: AppDispatch; state: State; extra: AxiosInstance}>(Action.LOG_OUT,
  async(_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(requireAuthorization(AuthStatus.NoAuth));
    dispatch(addEmail(''));
  }
);
