import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks';
import { fetchOfferPageData } from '../store/api-actions';
import { useEffect } from 'react';
import Map from '../components/map.tsx';
import LoadingScreen from './loading-screen';
import ReviewList from '../components/review-list';
import ReviewForm from '../components/review-form';
import NearPlacesList from '../components/near-places-list';

export default function Offer() {
  const { id } = useParams();
  const {offerData, reviewsData, nearbyData} = useAppSelector((state) => state.currentOfferData);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchOfferPageData(id));
  }, [id, dispatch]);

  if(!offerData) {
    return(
      <LoadingScreen>
      </LoadingScreen>
    );
  }

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
              <button className="offer__bookmark-button button" type="button">
                <svg className="offer__bookmark-icon" width="31" height="33">
                  {offerData?.isFavorite && <use xlinkHref="#icon-bookmark"></use>}
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
                {offerData?.type}
              </li>
              <li className="offer__feature offer__feature--bedrooms">
                {offerData?.bedrooms} Bedrooms
              </li>
              <li className="offer__feature offer__feature--adults">
                  Max {offerData?.maxAdults} adults
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
              <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{/*offer.reviews.length*/}</span></h2>
              <ReviewList reviews={reviewsData}></ReviewList>
              <ReviewForm id={offerData.id}></ReviewForm>
            </section>
          </div>
        </div>
        <Map mainPage={false} centerCoordinates={offerData.location} offers={nearbyData} selectedOffer={offerData}></Map>
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
