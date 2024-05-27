import { Link, Outlet, useLocation, Location } from 'react-router-dom';
import { AuthStatus } from '../../utils/const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { AppDispatch, OfferCardData } from '../../types/types';
import { MouseEvent } from 'react';
import { logoutAction } from '../../store/api-actions';
type LayoutProps = {
  authStatus: AuthStatus;
}

function generateLayout(currentLocation: Location, authStatus: AuthStatus, favorites: OfferCardData[] | null, email: string, dispatch: AppDispatch) {

  if (currentLocation.pathname.startsWith('/login')) {
    return (
      <div className="page page--gray page--login">
        <header className="header">
          <div className="container">
            <div className="header__wrapper">
              <div className="header__left">
                <Link className="header__logo-link" to="/">
                  <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
                </Link>
              </div>
            </div>
          </div>
        </header>
        <Outlet/>
      </div>
    );
  }

  const handleSignOutClick = (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    dispatch(logoutAction());
  };

  const divClassName = (currentLocation.pathname === '/') ? 'page page--gray page--main' : 'page';
  const list = authStatus === AuthStatus.Auth ? (
    <ul className="header__nav-list">
      <li className="header__nav-item user">
        <Link to="/favorites" className="header__nav-link header__nav-link--profile">
          <div className="header__avatar-wrapper user__avatar-wrapper">
          </div>
          <span className="header__user-name user__name">{email}</span>
          <span className="header__favorite-count">{(favorites !== null) ? favorites.length : 0}</span>
        </Link>
      </li>
      <li className="header__nav-item">
        <a className="header__nav-link" onClick={handleSignOutClick}>
          <span className="header__signout">Sign out</span>
        </a>
      </li>
    </ul>
  ) : (
    <ul className="header__nav-list">
      <li className="header__nav-item user">
        <Link to="/login" className="header__nav-link header__nav-link--profile">
          <div className="header__avatar-wrapper user__avatar-wrapper">
          </div>
          <span className="header__login">Sign in</span>
        </Link>
      </li>
    </ul>
  );

  return(
    <div className={divClassName}>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link" to="/">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </Link>
            </div>
            <nav className="header__nav">
              {list}
            </nav>
          </div>
        </div>
      </header>
      <Outlet />
    </div>
  );
}

export default function Layout({authStatus}: LayoutProps) {
  const currentLocation = useLocation();
  const [favorites, email] = useAppSelector((state) => [state.favorites, state.email]);

  const dispatch = useAppDispatch();

  return generateLayout(currentLocation, authStatus, favorites, email, dispatch);
}
