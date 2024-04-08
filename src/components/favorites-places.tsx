import { OfferData } from '../types/types';
import FavoriteCard from './favorite-card';


type FavPlacesProps = {
  offers: OfferData[];
};

export default function FavoritePlaces({offers}: FavPlacesProps) {
  return(
    <div className="favorites__places">
      {
        offers.map((offer) => (
          <FavoriteCard key={offer.id} offer={offer}/>
        )
        )
      }
    </div>
  );
}
