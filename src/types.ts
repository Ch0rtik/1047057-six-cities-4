export enum City {
  Paris = 'Paris',
  Cologne = 'Cologne',
  Brussels = 'Brussels',
  Amsterdam = 'Amsterdam',
  Hamburg = 'Hamburg',
  Dusseldorf = 'Dusseldorf'
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
}
