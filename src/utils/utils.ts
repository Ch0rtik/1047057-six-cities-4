import { SortType, OfferData } from '../types/types';

export default function sortOffers(offers: OfferData[], sortType: SortType){
  switch(sortType) {
    case SortType.LowToHigh: {
      offers.sort((offerA, offerB) => {
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
      offers.sort((offerA, offerB) => {
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
      offers.sort((offerA, offerB) => {
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
}
