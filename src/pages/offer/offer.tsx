import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, MouseEvent } from 'react';
import Map from '../../components/map/map.tsx';
import NearPlacesList from '../../components/offer-page/near-places-list/near-places-list.tsx';
import ReviewForm from '../../components/offer-page/review-form/review-form.tsx';
import ReviewList from '../../components/offer-page/review-list/review-list.tsx';
import { useAppSelector, useAppDispatch } from '../../hooks/index.ts';
import { fetchOfferPageData, setFavoriteAction } from '../../store/api-actions.ts';
import { AuthStatus } from '../../utils/const.ts';
import Spinner from '../loading-screen/loading-screen.tsx';
import { updateCurrentFavorite, updateFavorite } from '../../store/action.ts';

type OfferProps = {
  authStatus: AuthStatus;
}

export default function Offer({authStatus}: OfferProps) {
  const { id } = useParams();
  const {offerData, reviewsData, nearbyData} = useAppSelector((state) => state.currentOfferData);
  const offerPageLoading = useAppSelector((state) => state.offerPageLoading);

  const firstNearbyData = nearbyData.slice(0,3);

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchOfferPageData(id!));
  }, [id, dispatch]);

  if(!offerData || offerPageLoading) {
    return(
      <Spinner/>
    );
  }

  const handleFavoriteClick = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    if(authStatus === AuthStatus.Auth) {
      const newStatus = (offerData.isFavorite) ? 0 : 1;
      dispatch(setFavoriteAction({id: offerData.id, status: newStatus})).then((result) => {
        dispatch(updateFavorite({id: offerData.id, status: result.payload as boolean}));
        dispatch(updateCurrentFavorite({status: result.payload as boolean}));
      });
    } else {
      navigate('/login');
    }
  };

  return (
    <main className="page__main page__main--offer">
      <section className="offer">
        <div className="offer__gallery-container container">
          <div className="offer__gallery">
            {
              offerData?.images.map((photo) => (
                <div key={photo} className="offer__image-wrapper">
                  <img className="offer__image" src={photo} alt="Photo studio" />
                </div>
              ))
            }
          </div>
        </div>
        <div className="offer__container container">
          <div className="offer__wrapper">
            {(offerData.isPremium) && (
              <div className="offer__mark">
                <span>Premium</span>
              </div>
            )}
            <div className="offer__name-wrapper">
              <h1 className="offer__name">
                {offerData.title}
              </h1>
              <button onClick={handleFavoriteClick} className={`offer__bookmark-button ${(authStatus === AuthStatus.Auth && offerData.isFavorite) ? 'offer__bookmark-button--active ' : ''}button`} type="button">
                <svg className="offer__bookmark-icon" width="31" height="33">
                  <use xlinkHref="#icon-bookmark"></use>
                </svg>
                <span className="visually-hidden">To bookmarks</span>
              </button>
            </div>
            <div className="offer__rating rating">
              <div className="offer__stars rating__stars">
                <span style={{ width: `${offerData.rating * 20}%` }}></span>
                <span className="visually-hidden">Rating</span>
              </div>
              <span className="offer__rating-value rating__value">{offerData.rating}</span>
            </div>
            <ul className="offer__features">
              <li className="offer__feature offer__feature--entire">
                {offerData?.type.charAt(0).toUpperCase() + offerData?.type.slice(1)}
              </li>
              <li className="offer__feature offer__feature--bedrooms">
                {offerData?.bedrooms} Bedroom{offerData?.bedrooms > 1 ? 's' : ''}
              </li>
              <li className="offer__feature offer__feature--adults">
                  Max {offerData?.maxAdults} adult{offerData?.maxAdults > 1 ? 's' : ''}
              </li>
            </ul>
            <div className="offer__price">
              <b className="offer__price-value">&euro;{offerData?.price}</b>
              <span className="offer__price-text">&nbsp;night</span>
            </div>
            <div className="offer__inside">
              <h2 className="offer__inside-title">What&apos;s inside</h2>
              <ul className="offer__inside-list">
                {
                  offerData?.goods.map((utility) => (
                    <li key={utility} className="offer__inside-item">{utility}</li>
                  ))
                }
              </ul>
            </div>
            <div className="offer__host">
              <h2 className="offer__host-title">Meet the host</h2>
              <div className="offer__host-user user">
                <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                  <img className="offer__avatar user__avatar" src={offerData?.host.avatarUrl} width="74" height="74" alt="Host avatar" />
                </div>
                <span className="offer__user-name">
                  {offerData?.host.name}
                </span>
                {offerData?.host.isPro && <span className="offer__user-status">Pro</span>}
              </div>
              <div className="offer__description">
                <p className="offer__text">
                  {offerData?.description}
                </p>
              </div>
            </div>

            <section className="offer__reviews reviews">
              <h2 className="reviews__title">Reviews &middot; {reviewsData.length}<span className="reviews__amount">{/*offer.reviews.length*/}</span></h2>
              <ReviewList reviews={reviewsData}></ReviewList>
              {authStatus === AuthStatus.Auth ? (<ReviewForm id={offerData.id}></ReviewForm>) : ''}
            </section>
          </div>
        </div>
        <Map mainPage={false} centerCoordinates={offerData.location} offers={[...firstNearbyData, offerData]} selectedOffer={offerData}></Map>
      </section>

      <div className="container">
        <section className="near-places places">
          <h2 className="near-places__title">Other places in the neighbourhood</h2>
          <NearPlacesList offers={nearbyData}></NearPlacesList>
        </section>
      </div>
    </main>
  );
}
