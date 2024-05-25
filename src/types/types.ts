import { store } from '../store';
import { AuthStatus } from '../utils/const';

export type City = {
  name: string;
  location: Location;
}

export enum CityNames {
  Paris = 'Paris',
  Cologne = 'Cologne',
  Brussels = 'Brussels',
  Amsterdam = 'Amsterdam',
  Hamburg = 'Hamburg',
  Dusseldorf = 'Dusseldorf'
}

export type Location = {
  latitude: number;
  longitude: number;
  zoom: number | undefined;
}

export type Landlord = {
  avatar: string;
  name: string;
  isPro: boolean;
}

export enum OfferType {
  Apartament = 'Apartament',
  Room = 'Room',
  House = 'House',
  Hotel = 'Hotel'
}

export type OfferData = {
  city: City;
  id: string;
  isFavorite: boolean;
  isPremium: boolean;
  location: Location;
  previewImage: string;
  price: number;
  rating: number;
  title: string;
  type: OfferType;

  photos: string[];
  desc: string;
  numOfBedrooms: number;
  maxNumOfGuests: number;
  household: string[];
  landlord: Landlord;

  reviews: ReviewData[];
}

export type ReviewData = {
  id: number;
  avatar: string;
  name: string;
  rating: number;
  date: Date;
  text: string;
}

export type State = {
  city: City;
  offers: OfferData[];
  sortType: SortType;
  authStatus: AuthStatus;
  error: string | null;
  offersLoading: boolean;
}

export enum SortType {
  Popular = 'Popular',
  LowToHigh = 'Price: low to high',
  HighToLow = 'Price: High to low',
  TopRated = 'Top rated first'
}

export type AppDispatch = typeof store.dispatch;

export type UserData = {
  id: number;
  email: string;
  token: string;
}

export type AuthData = {
  login: string;
  password: string;
};
