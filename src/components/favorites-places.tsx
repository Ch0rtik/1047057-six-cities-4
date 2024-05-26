import { OfferCardData } from '../types/types';
import FavoritesCard from './favorites-card';


type FavPlacesProps = {
  offers: OfferCardData[];
};

export default function FavoritePlaces({offers}: FavPlacesProps) {
  return(
    <div className="favorites__places">
      {
        offers.map((offer) => (
          <FavoritesCard key={offer.id} offer={offer}/>
        )
        )
      }
    </div>
  );
}
