import { OfferData } from '../types/types';
import FavoritePlaces from './favorites-places';

type FavListProps = {
  cityName: string;
  offers: OfferData[];
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
      <FavoritePlaces offers={offers}/>
    </li>
  );
}
