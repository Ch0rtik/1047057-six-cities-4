import { City, OfferData } from '../types/types';
import FavoritePlaces from './favorites-places';

type FavListProps = {
  city: City;
  offers: OfferData[];
}

export default function FavoritesList({city, offers}: FavListProps) {
  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <a className="locations__item-link" href="#">
            <span>{city}</span>
          </a>
        </div>
      </div>
      <FavoritePlaces offers={offers}/>
    </li>
  );
}
