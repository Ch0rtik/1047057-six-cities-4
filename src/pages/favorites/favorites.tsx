import React from 'react';
import FavoritesList from '../../components/favorites-places/favorites-list';
import { useAppSelector } from '../../hooks';
import { OfferCardData } from '../../types/types';

export default function Favorites() {
  const offers: OfferCardData[] = useAppSelector((state) => state.offers);
  const favorites = offers.filter((offer) => offer.isFavorite);

  if (favorites.length === 0) {
    return (
      <React.Fragment>
        <main className="page__main page__main--favorites">
          <div className="page__favorites-container container">
            <section className="favorites favorites--empty">
              <h1 className="visually-hidden">Favorites (empty)</h1>
              <div className="favorites__status-wrapper">
                <b className="favorites__status">Nothing yet saved.</b>
                <p className="favorites__status-description">Save properties to narrow down search or plan your future trips.</p>
              </div>
            </section>
          </div>
        </main>
        <footer className="footer container">
          <a className="footer__logo-link" href="main.html">
            <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
          </a>
        </footer>
      </React.Fragment>
    );
  }

  const parisOffers = favorites.filter((offer) => offer.city.name === 'Paris');
  const cologneOffers = favorites.filter((offer) => offer.city.name === 'Cologne');
  const brusselsOffers = favorites.filter((offer) => offer.city.name === 'Brussels');
  const amsterdamOffers = favorites.filter((offer) => offer.city.name === 'Amsterdam');
  const hamburgOffers = favorites.filter((offer) => offer.city.name === 'Hamburg');
  const dusseldorfOffers = favorites.filter((offer) => offer.city.name === 'Dusseldorf');

  return (
    <React.Fragment>
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {(amsterdamOffers.length > 0) && (
                <FavoritesList cityName={'Amsterdam'} offers={amsterdamOffers}></FavoritesList>
              )}
              {(brusselsOffers.length > 0) && (
                <FavoritesList cityName={'Brussels'} offers={brusselsOffers}></FavoritesList>
              )}
              {(cologneOffers.length > 0) && (
                <FavoritesList cityName={'Cologne'} offers={cologneOffers}></FavoritesList>
              )}
              {(dusseldorfOffers.length > 0) && (
                <FavoritesList cityName={'Dusseldorf'} offers={dusseldorfOffers}></FavoritesList>
              )}
              {(hamburgOffers.length > 0) && (
                <FavoritesList cityName={'Hamburg'} offers={hamburgOffers}></FavoritesList>
              )}
              {(parisOffers.length > 0) && (
                <FavoritesList cityName={'Paris'} offers={parisOffers}></FavoritesList>
              )}
            </ul>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <a className="footer__logo-link" href="main.html">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </a>
      </footer>
    </React.Fragment>
  );
}
