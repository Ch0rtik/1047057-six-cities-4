import PlacesList from '../../components/main-page/places-list/places-list.tsx';
import PlacesSorting from '../../components/main-page/places-sorting/places-sorting.tsx';
import Map from '../../components/map/map.tsx';
import { useState } from 'react';
import { useAppSelector } from '../../hooks/index.ts';
import { OfferCardData, SortType, CityNames } from '../../types/types.ts';
import sortOffers from '../../utils/utils.ts';

export default function Main() {
  const [initialOffers, city] = useAppSelector((state) => [
    [...state.offers].filter((offer: OfferCardData) => offer.city.name === state.city.name),
    state.city,
  ]);
  const placesFound = initialOffers.length;

  const [selectedOffer, setSelectedOffer] = useState<OfferCardData | undefined> (undefined);
  const [offers, setOffers] = useState<OfferCardData[]> ([...initialOffers]);
  const onSortChange = (sortType: SortType) => {
    setOffers(sortOffers(offers, sortType, initialOffers));
  };
  const handleListItemHover = (lsitItemId: string | undefined) => {
    const currentOffer = offers.find((offer) => offer.id.toString() === lsitItemId);
    setSelectedOffer(currentOffer);
  };
  return(
    <main className="page__main page__main--index">
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">
          <ul className="locations__list tabs__list">
            <li className="locations__item">
              <a className={`locations__item-link tabs__item${(city.name === CityNames.Paris.toString()) ? ' tabs__item--active' : ''}`} href="#">
                <span>Paris</span>
              </a>
            </li>
            <li className="locations__item">
              <a className={`locations__item-link tabs__item${(city.name === CityNames.Cologne.toString()) ? ' tabs__item--active' : ''}`} href="#">
                <span>Cologne</span>
              </a>
            </li>
            <li className="locations__item">
              <a className={`locations__item-link tabs__item${(city.name === CityNames.Brussels.toString()) ? ' tabs__item--active' : ''}`} href="#">
                <span>Brussels</span>
              </a>
            </li>
            <li className="locations__item">
              <a className={`locations__item-link tabs__item${(city.name === CityNames.Amsterdam.toString()) ? ' tabs__item--active' : ''}`}>
                <span>Amsterdam</span>
              </a>
            </li>
            <li className="locations__item">
              <a className={`locations__item-link tabs__item${(city.name === CityNames.Hamburg.toString()) ? ' tabs__item--active' : ''}`} href="#">
                <span>Hamburg</span>
              </a>
            </li>
            <li className="locations__item">
              <a className={`locations__item-link tabs__item${(city.name === CityNames.Dusseldorf.toString()) ? ' tabs__item--active' : ''}`} href="#">
                <span>Dusseldorf</span>
              </a>
            </li>
          </ul>
        </section>
      </div>
      <div className="cities">
        <div className="cities__places-container container">
          <section className="cities__places places">
            <h2 className="visually-hidden">Places</h2>
            <b className="places__found">{placesFound} places to stay in {city.name}</b>
            <PlacesSorting onSortChange={onSortChange}></PlacesSorting>
            <PlacesList offers={offers} onListItemHover={handleListItemHover}/>
          </section>
          <div className="cities__right-section">
            <Map mainPage centerCoordinates={city.location} offers={offers} selectedOffer={selectedOffer}></Map>
          </div>
        </div>
      </div>
    </main>
  );
}