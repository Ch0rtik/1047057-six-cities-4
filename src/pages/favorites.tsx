import { Link } from 'react-router-dom';
import FavoritesList from '../components/favorites-list';
import { OfferData } from '../types/types';
import { useAppSelector } from '../hooks';

export default function Favorites() {
  const offers: OfferData[] = useAppSelector((state) => state.offers);
  const favorites = offers.filter((offer) => offer.isFavorite);

  const parisOffers = favorites.filter((offer) => offer.city.name === 'Paris');
  const cologneOffers = favorites.filter((offer) => offer.city.name === 'Cologne');
  const brusselsOffers = favorites.filter((offer) => offer.city.name === 'Brussels');
  const amsterdamOffers = favorites.filter((offer) => offer.city.name === 'Amsterdam');
  const hamburgOffers = favorites.filter((offer) => offer.city.name === 'Hamburg');
  const dusseldorfOffers = favorites.filter((offer) => offer.city.name === 'Dusseldorf');

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
    </div>
  );
}
