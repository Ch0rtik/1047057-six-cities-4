import { OfferCardData } from '../types/types';
import NearPlacesCard from './near-places-card';

type NearPlacesProps = {
  offers: OfferCardData[];
}

export default function NearPlacesList({offers}: NearPlacesProps) {
  return(
    <div className="near-places__list places__list">
      {
        offers.map((offer) => (
          <NearPlacesCard key={offer.id} offer={offer}/>
        )
        )
      }
    </div>
  );
}
