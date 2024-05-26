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

export type OfferCardData = {
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
}

export type OfferData = {
  id: string;
  title: string;
  type: string;
  price: number;
  city: City;
  location: Location;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  description: string;
  bedrooms: number;
  goods: [string];
  host: {
    name: string;
    avatarUrl: string;
    isPro: boolean;
  };
  images: [string];
  maxAdults: number;
}

export type ReviewData = {
    id: string;
    date: string;
    user: {
      name: string;
      avatarUrl: string;
      isPro: boolean;
    };
    comment: string;
    rating: number;
}

export type NewReviewData = {
  comment: string;
  rating: number;
}

export type State = {
  city: City;
  offers: OfferCardData[];
  sortType: SortType;
  authStatus: AuthStatus;
  error: string | null;
  offersLoading: boolean;
  currentOfferData: CurrentOfferData;
}

export type CurrentOfferData = {
  offerData: OfferData | null;
  reviewsData: ReviewData[];
  nearbyData: OfferCardData[];
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
