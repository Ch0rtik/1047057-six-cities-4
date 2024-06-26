import { MouseEvent } from 'react';
import { useAppDispatch} from '../../hooks';
import { setFavoriteAction } from '../../store/api-actions';
import { OfferCardData } from '../../types/types';
import { Link} from 'react-router-dom';
import { updateFavorite } from '../../store/action';

type FavCardProps = {
  offer: OfferCardData;
}

export default function FavoritesCard({offer}: FavCardProps) {
  const dispatch = useAppDispatch();

  const handleFavoriteClick = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    const newStatus = (offer.isFavorite) ? 0 : 1;
    dispatch(setFavoriteAction({id: offer.id, status: newStatus})).then((result) => {
      dispatch(updateFavorite({id: offer.id, status: result.payload as boolean}));
    });
  };

  return (
    <article className="favorites__card place-card">
      {offer.isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className="favorites__image-wrapper place-card__image-wrapper">
        <Link to={`/offer/${offer.id}`}>
          <img className="place-card__image" src={offer.previewImage} width="150" height="110" alt="Place image" />
        </Link>
      </div>
      <div className="favorites__card-info place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button onClick={handleFavoriteClick} className="place-card__bookmark-button place-card__bookmark-button--active button" type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              {offer.isFavorite && <use xlinkHref="#icon-bookmark"></use>}
            </svg>
            <span className="visually-hidden">In bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${Math.round(offer.rating) * 20}%` }}></span>
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
