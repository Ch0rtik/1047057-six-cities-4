import { OfferCardData } from '../../types/types';
import FavoritesPlaces from './favorites-places';

type FavListProps = {
  cityName: string;
  offers: OfferCardData[];
}

export default function FavoritesList({cityName, offers}: FavListProps) {
  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <a className="locations__item-link" href="#">
            <span>{cityName}</span>
          </a>
        </div>
      </div>
      <FavoritesPlaces offers={offers}/>
    </li>
  );
}
