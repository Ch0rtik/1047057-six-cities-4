import { useState } from 'react';
import OfferList from '../components/offer-list.tsx';
import { City, OfferData, SortType, State } from '../types/types.ts';
import Map from '../components/map.tsx';
import { CITY_COORDINATES } from '../utils/const.ts';
import { store } from '../store/index.ts';
import { changeCity, changeSort, fetchOffers } from '../store/action.ts';
import PlacesSorting from '../components/places-sorting.tsx';

export default function Main() {
  if(store.getState().offers.length === 0) {
    store.dispatch(fetchOffers());
  }
  if(store.getState().city !== City.Amsterdam) {
    store.dispatch(changeCity(City.Amsterdam));
  }
  let offers = store.getState().offers;
  const placesFound = offers.length;
  const city = City.Amsterdam;

  const [selectedOffer, setSelectedOffer] = useState<OfferData | undefined> (undefined);
  const [sortType, setSortType] = useState<SortType> (store.getState().sortType);

  const updatePlacesSorting = (state: State) => {
    offers = state.offers;
    setSortType(state.sortType);
  };

  const handleSortClick = (optionId: string) => {
    let sortTypeInner: SortType;
    switch(optionId) {
      case '0': {
        sortTypeInner = SortType.Popular;
        break;
      }
      case '1': {
        sortTypeInner = SortType.LowToHigh;
        break;
      }
      case '2': {
        sortTypeInner = SortType.HighToLow;
        break;
      }
      case '3': {
        sortTypeInner = SortType.TopRated;
        break;
      }
    }
    store.dispatch(changeSort(sortTypeInner!));
    updatePlacesSorting(store.getState());
  };

  const handleListItemHover = (lsitItemId: string | undefined) => {
    const currentOffer = offers.find((offer) => offer.id.toString() === lsitItemId);
    setSelectedOffer(currentOffer);
  };
  return(
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link header__logo-link--active">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
              </a>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a className="header__nav-link header__nav-link--profile" href="#">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                    <span className="header__favorite-count">3</span>
                  </a>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="#">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list">
              <li className="locations__item">
                <a className="locations__item-link tabs__item" href="#">
                  <span>Paris</span>
                </a>
              </li>
              <li className="locations__item">
                <a className="locations__item-link tabs__item" href="#">
                  <span>Cologne</span>
                </a>
              </li>
              <li className="locations__item">
                <a className="locations__item-link tabs__item" href="#">
                  <span>Brussels</span>
                </a>
              </li>
              <li className="locations__item">
                <a className="locations__item-link tabs__item tabs__item--active">
                  <span>Amsterdam</span>
                </a>
              </li>
              <li className="locations__item">
                <a className="locations__item-link tabs__item" href="#">
                  <span>Hamburg</span>
                </a>
              </li>
              <li className="locations__item">
                <a className="locations__item-link tabs__item" href="#">
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
              <b className="places__found">{placesFound} places to stay in Amsterdam</b>
              <PlacesSorting sortType={sortType} onSortChange={handleSortClick}></PlacesSorting>
              <OfferList offers={offers} onListItemHover={handleListItemHover}/>
            </section>
            <div className="cities__right-section">
              <Map mainPage centerCoordinates={CITY_COORDINATES.get(city)!} offers={offers} selectedOffer={selectedOffer}></Map>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
