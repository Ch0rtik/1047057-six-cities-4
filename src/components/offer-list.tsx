import { OfferData } from '../types';
import PlaceCard from './place-card';


type OfferListProps = {
  offers: OfferData[];
};

export default function OfferList({offers}: OfferListProps) {
  return(
    <div className="cities__places-list places__list tabs__content">
      {
        offers.map((offer) => (
          <PlaceCard key={offer.id} offer={offer}/>
        )
        )
      }
    </div>
  );
}
