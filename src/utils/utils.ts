import { SortType, OfferCardData } from '../types/types';

export default function sortOffers(offers: OfferCardData[], sortType: SortType, initialOffers: OfferCardData[]){
  if (sortType === SortType.Popular) {
    return [...initialOffers];
  }
  const newOffers = [...offers];
  switch(sortType) {
    case SortType.LowToHigh: {
      newOffers.sort((offerA, offerB) => {
        if (offerA.price > offerB.price) {
          return 1;
        }
        if (offerB.price > offerA.price) {
          return -1;
        }
        return 0;
      });
      break;
    }
    case SortType.HighToLow: {
      newOffers.sort((offerA, offerB) => {
        if (offerA.price < offerB.price) {
          return 1;
        }
        if (offerB.price < offerA.price) {
          return -1;
        }
        return 0;
      });
      break;
    }
    case SortType.TopRated: {
      newOffers.sort((offerA, offerB) => {
        if (offerA.rating < offerB.rating) {
          return 1;
        }
        if (offerB.rating < offerA.rating) {
          return -1;
        }
        return 0;
      });
    }
  }
  return newOffers;
}
