export enum City {
  Paris = 'Paris',
  Cologne = 'Cologne',
  Brussels = 'Brussels',
  Amsterdam = 'Amsterdam',
  Hamburg = 'Hamburg',
  Dusseldorf = 'Dusseldorf'
}

export type Coordinates = {
  lat: number;
  lng: number;
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
  id: number;
  img: string;
  isPremium: boolean;
  price: number;
  title: string;
  type: OfferType;
  isFavorite: boolean;
  rating: number;

  photos: string[];
  desc: string;
  numOfBedrooms: number;
  maxNumOfGuests: number;
  household: string[];
  landlord: Landlord;

  city: City;
  coordinates: Coordinates;
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
}

export enum SortType {
  Popular = 'Popular',
  LowToHigh = 'Price: low to high',
  HighToLow = 'Price: High to low',
  TopRated = 'Top rated first'
}
