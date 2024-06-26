import PlacesList from '../../components/main-page/places-list/places-list.tsx';
import PlacesSorting from '../../components/main-page/places-sorting/places-sorting.tsx';
import Map from '../../components/map/map.tsx';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/index.ts';
import { OfferCardData, SortType, CityNames } from '../../types/types.ts';
import { changeCity } from '../../store/action.ts';
import { CITY_COORDINATES } from '../../utils/const.ts';
import MainEmpty from '../../components/main-page/main-empty/main-empty.tsx';
import sortOffers from '../../utils/sort-offers.ts';

export default function Main() {
  const allOffers = useAppSelector((state) => state.offers);
  const city = useAppSelector((state) => state.city);
  const sortType = useAppSelector((state) => state.sortType);

  const [initialOffers, setInitialOffer] = useState<OfferCardData[]>([...allOffers].filter((offer: OfferCardData) => offer.city.name === city.name));
  const placesFound = initialOffers.length;

  const [selectedOffer, setSelectedOffer] = useState<OfferCardData | undefined> (undefined);
  const [offers, setOffers] = useState<OfferCardData[]> ([...initialOffers]);

  const onSortChange = (innerSortType: SortType) => {
    setOffers(sortOffers(offers, innerSortType, initialOffers));
  };
  const handleListItemHover = (lsitItemId: string | undefined) => {
    const currentOffer = offers.find((offer) => offer.id.toString() === lsitItemId);
    setSelectedOffer(currentOffer);
  };
  const handleListItemLeave = () => {
    setSelectedOffer(undefined);
  };

  const dispatch = useAppDispatch();
  const generatehandleLocationItemClick = (cityName: CityNames) => () => {
    dispatch(changeCity({name: cityName.toString(), location: CITY_COORDINATES.get(cityName)!}));
    const newInitialOffers = [...allOffers].filter((offer: OfferCardData) => offer.city.name === cityName.toString());
    setInitialOffer(newInitialOffers);
    setOffers(sortOffers(newInitialOffers, sortType, newInitialOffers));
  };
  return (
    <main className={`page__main page__main--index${offers.length === 0 ? ' page__main--index-empty' : ''}`}>
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">
          <ul className="locations__list tabs__list">
            <li className="locations__item">
              <a onClick={generatehandleLocationItemClick(CityNames.Paris)} className={`locations__item-link tabs__item${(city.name === CityNames.Paris.toString()) ? ' tabs__item--active' : ''}`}>
                <span>Paris</span>
              </a>
            </li>
            <li className="locations__item">
              <a onClick={generatehandleLocationItemClick(CityNames.Cologne)} className={`locations__item-link tabs__item${(city.name === CityNames.Cologne.toString()) ? ' tabs__item--active' : ''}`}>
                <span>Cologne</span>
              </a>
            </li>
            <li className="locations__item">
              <a onClick={generatehandleLocationItemClick(CityNames.Brussels)} className={`locations__item-link tabs__item${(city.name === CityNames.Brussels.toString()) ? ' tabs__item--active' : ''}`}>
                <span>Brussels</span>
              </a>
            </li>
            <li className="locations__item">
              <a onClick={generatehandleLocationItemClick(CityNames.Amsterdam)} className={`locations__item-link tabs__item${(city.name === CityNames.Amsterdam.toString()) ? ' tabs__item--active' : ''}`}>
                <span>Amsterdam</span>
              </a>
            </li>
            <li className="locations__item">
              <a onClick={generatehandleLocationItemClick(CityNames.Hamburg)} className={`locations__item-link tabs__item${(city.name === CityNames.Hamburg.toString()) ? ' tabs__item--active' : ''}`}>
                <span>Hamburg</span>
              </a>
            </li>
            <li className="locations__item">
              <a onClick={generatehandleLocationItemClick(CityNames.Dusseldorf)} className={`locations__item-link tabs__item${(city.name === CityNames.Dusseldorf.toString()) ? ' tabs__item--active' : ''}`}>
                <span>Dusseldorf</span>
              </a>
            </li>
          </ul>
        </section>
      </div>
      <div className="cities">
        {offers.length === 0 ? (
          <MainEmpty city={city}></MainEmpty>
        ) : (
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{placesFound} places to stay in {city.name}</b>
              <PlacesSorting onSortChange={onSortChange}></PlacesSorting>
              <PlacesList offers={offers} handleListItemHover={handleListItemHover} handleListItemLeave={handleListItemLeave}/>
            </section>
            <div className="cities__right-section">
              <Map mainPage centerCoordinates={city.location} offers={offers} selectedOffer={selectedOffer}></Map>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
