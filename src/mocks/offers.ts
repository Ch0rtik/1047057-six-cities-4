import { City, OfferData, OfferType } from '../types/types';

const Landlords = {
  Max: {avatar: '/img/avatar-max.jpg', name: 'Max', isPro: true},
  Angelina: {avatar: '/img/avatar-angelina.jpg', name: 'Angelina', isPro: false},
};

export const offers: OfferData[] = [
  {
    id: 0,
    img: '/img/apartment-01.jpg',
    isPremium: true,
    price: 690,
    title: 'Krutaya hata',
    type: OfferType.Apartament,
    isFavorite: false,
    rating: 4.2,

    photos: [],
    desc: 'Super puper krutoy domik',
    numOfBedrooms: 2,
    maxNumOfGuests: 4,
    household: ['Wi-Fi', 'Heating', 'Kitchen'],
    landlord: Landlords.Max,

    city: City.Amsterdam,
    coordinates: {lat: 52.3909553943508, lng: 4.85309666406198, zoom: undefined}
  },

  {
    id: 1,
    img: '/img/room.jpg',
    isPremium: false,
    price: 120,
    title: 'Nicho takaya komnatka',
    type: OfferType.Room,
    isFavorite: true,
    rating: 3.9,

    photos: [],
    desc: 'Top za svoi dengi. S pivom poydyot',
    numOfBedrooms: 1,
    maxNumOfGuests: 2,
    household: ['WiFi', 'Free Beer'],
    landlord: Landlords.Max,
    city: City.Amsterdam,
    coordinates: {lat: 52.3609553943508, lng: 4.85309666406198, zoom: undefined}
  },

  {
    id: 2,
    img: '/img/apartment-02.jpg',
    isPremium: true,
    price: 420,
    title: 'Zholtaya kvartitr',
    type: OfferType.Apartament,
    isFavorite: false,
    rating: 4.7,

    photos: [],
    desc: 'Ona hotya by ne seraya, kak vse ostalniye',
    numOfBedrooms: 3,
    maxNumOfGuests: 5,
    household: ['Wi-Fi', 'Heating', 'Kitchen', 'TV', 'Dishwasher'],
    landlord: Landlords.Angelina,

    city: City.Amsterdam,
    coordinates: {lat: 52.3909553943508, lng: 4.929309666406198, zoom: undefined}
  },
  {
    id: 3,
    img: '/img/apartment-03.jpg',
    isPremium: false,
    price: 230,
    title: 'Seraya kvartira',
    type: OfferType.Apartament,
    isFavorite: true,
    rating: 4.5,

    photos: [],
    desc: 'Eshyo odna seraya kvartira',
    numOfBedrooms: 1,
    maxNumOfGuests: 3,
    household: ['WiFi', 'Heating', 'Kitchen'],
    landlord: Landlords.Angelina,

    city: City.Amsterdam,
    coordinates: {lat: 52.3809553943508, lng: 4.939309666406198, zoom: undefined}
  },
];
