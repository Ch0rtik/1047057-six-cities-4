import { useState } from 'react';
import { CityNames } from '../../../types/types';

export default function MainEmpty() {
  const [city, setCity] = useState<CityNames> (CityNames.Paris);
  const generatehandleLocationItemClick = (cityName: CityNames) => () => {
    setCity(cityName);
  };
  return(
    <main className="page__main page__main--index page__main--index-empty">
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">
          <ul className="locations__list tabs__list">
            <li className="locations__item">
              <a onClick={generatehandleLocationItemClick(CityNames.Paris)} className={`locations__item-link tabs__item${(city === CityNames.Paris) ? ' tabs__item--active' : ''}`}>
                <span>Paris</span>
              </a>
            </li>
            <li className="locations__item">
              <a onClick={generatehandleLocationItemClick(CityNames.Cologne)} className={`locations__item-link tabs__item${(city === CityNames.Cologne) ? ' tabs__item--active' : ''}`}>
                <span>Cologne</span>
              </a>
            </li>
            <li className="locations__item">
              <a onClick={generatehandleLocationItemClick(CityNames.Brussels)} className={`locations__item-link tabs__item${(city === CityNames.Brussels) ? ' tabs__item--active' : ''}`}>
                <span>Brussels</span>
              </a>
            </li>
            <li className="locations__item">
              <a onClick={generatehandleLocationItemClick(CityNames.Amsterdam)} className={`locations__item-link tabs__item${(city === CityNames.Amsterdam) ? ' tabs__item--active' : ''}`}>
                <span>Amsterdam</span>
              </a>
            </li>
            <li className="locations__item">
              <a onClick={generatehandleLocationItemClick(CityNames.Hamburg)} className={`locations__item-link tabs__item${(city === CityNames.Hamburg) ? ' tabs__item--active' : ''}`}>
                <span>Hamburg</span>
              </a>
            </li>
            <li className="locations__item">
              <a onClick={generatehandleLocationItemClick(CityNames.Dusseldorf)} className={`locations__item-link tabs__item${(city === CityNames.Dusseldorf) ? ' tabs__item--active' : ''}`}>
                <span>Dusseldorf</span>
              </a>
            </li>
          </ul>
        </section>
      </div>
      <div className="cities">
        <div className="cities__places-container cities__places-container--empty container">
          <section className="cities__no-places">
            <div className="cities__status-wrapper tabs__content">
              <b className="cities__status">No places to stay available</b>
              <p className="cities__status-description">We could not find any property available at the moment in {city.toString()}</p>
            </div>
          </section>
          <div className="cities__right-section"></div>
        </div>
      </div>
    </main>
  );
}
