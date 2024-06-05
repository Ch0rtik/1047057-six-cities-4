import { MouseEvent } from 'react';
import { OfferCardData } from '../../../types/types';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { setFavoriteAction } from '../../../store/api-actions';
import { AuthStatus } from '../../../utils/const';
import { updateFavorite } from '../../../store/action';

type PlaceCardProps = {
  offer: OfferCardData;
  onMouseEnter: (evt: MouseEvent<HTMLLIElement>) => void;
}

export default function PlaceCard({offer, onMouseEnter}: PlaceCardProps) {
  const dispatch = useAppDispatch();
  const authStatus = useAppSelector((state) => state.authStatus);
  const navigate = useNavigate();

  const favoriteStatus: boolean = useAppSelector((state) => {
    const currentOffer = state.offers.find((offerInner) => offerInner.id === offer.id);
    if (currentOffer) {
      return currentOffer.isFavorite;
    }
    return false;
  });

  const handleFavoriteClick = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    if(authStatus === AuthStatus.Auth) {
      const newStatus = (favoriteStatus) ? 0 : 1;
      dispatch(setFavoriteAction({id: offer.id, status: newStatus})).then((result) => {
        dispatch(updateFavorite({id: offer.id, status: result.payload as boolean}));
      });
    } else {
      navigate('/login');
    }
  };

  return(
    <article className="cities__card place-card" onMouseEnter={onMouseEnter} data-id={`${offer.id}`}>
      {offer.isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link to={`/offer/${offer.id}`}>
          <img className="place-card__image" src={offer.previewImage} width="260" height="200" alt="Place image"/>
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button onClick={handleFavoriteClick} className={`place-card__bookmark-button ${favoriteStatus ? 'place-card__bookmark-button--active ' : ''}button`} type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">{(favoriteStatus) ? 'In bookmarks' : 'To bookmarks'}</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${offer.rating * 20}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${offer.id}`}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
}
