import { Link } from 'react-router-dom';
import { CityNames, OfferCardData } from '../../types/types';
import FavoritesPlaces from './favorites-places';
import { useAppDispatch } from '../../hooks';
import { changeCity } from '../../store/action';
import { CITIES } from '../../utils/const';

type FavListProps = {
  cityName: CityNames;
  offers: OfferCardData[];
}

export default function FavoritesList({cityName, offers}: FavListProps) {
  const dispatch = useAppDispatch();
  const handleCityClick = () => {
    dispatch(changeCity(CITIES.find((city) => cityName.toString() === city.name)!));
  };
  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <Link className="locations__item-link" to='/' onClick={handleCityClick}>
            <span>{cityName.toString()}</span>
          </Link>
        </div>
      </div>
      <FavoritesPlaces offers={offers}/>
    </li>
  );
}
