import { Link } from 'react-router-dom';
import FavoritesList from '../components/favorites-list';
import { City, OfferData } from '../types/types';

type FavProps = {
  offers: OfferData[];
};

export default function Favorites({offers}: FavProps) {
  const favorites = offers.filter((offer) => offer.isFavorite);

  const parisOffers = favorites.filter((offer) => offer.city === City.Paris);
  const cologneOffers = favorites.filter((offer) => offer.city === City.Cologne);
  const brusselsOffers = favorites.filter((offer) => offer.city === City.Brussels);
  const amsterdamOffers = favorites.filter((offer) => offer.city === City.Amsterdam);
  const hamburgOffers = favorites.filter((offer) => offer.city === City.Hamburg);
  const dusseldorfOffers = favorites.filter((offer) => offer.city === City.Dusseldorf);

  return (
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link" to="/">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </Link>
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

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {(amsterdamOffers.length > 0) && (
                <FavoritesList city={City.Amsterdam} offers={amsterdamOffers}></FavoritesList>
              )}
              {(brusselsOffers.length > 0) && (
                <FavoritesList city={City.Brussels} offers={brusselsOffers}></FavoritesList>
              )}
              {(cologneOffers.length > 0) && (
                <FavoritesList city={City.Cologne} offers={cologneOffers}></FavoritesList>
              )}
              {(dusseldorfOffers.length > 0) && (
                <FavoritesList city={City.Dusseldorf} offers={dusseldorfOffers}></FavoritesList>
              )}
              {(hamburgOffers.length > 0) && (
                <FavoritesList city={City.Hamburg} offers={hamburgOffers}></FavoritesList>
              )}
              {(parisOffers.length > 0) && (
                <FavoritesList city={City.Paris} offers={parisOffers}></FavoritesList>
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
    </div>
  );
}
