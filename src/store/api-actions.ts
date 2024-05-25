import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, AuthData, OfferData, State, UserData } from '../types/types';
import { AxiosInstance } from 'axios';
import { Action, loadOffers, requireAuthorization, setError, setOffersLoading } from './action';
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
    const {data} = await api.get<OfferData[]>(APIRoute.Offers);
    dispatch(setOffersLoading(false));
    dispatch(loadOffers(data));
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
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {dispatch: AppDispatch; state: State; extra: AxiosInstance}>(Action.LOG_OUT,
  async(_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(requireAuthorization(AuthStatus.NoAuth));
  }
);
