import { useParams } from 'react-router-dom';
import NotFound from './not-found';
import { OfferData } from '../types/types';
import NearPlacesList from '../components/near-places-list';
import Map from '../components/map';
import { useAppSelector } from '../hooks';

export default function Offer() {
  const offers: OfferData[] = useAppSelector((state) => state.offers);
  const params = useParams();
  const offer = offers.find((offerInner) => offerInner.id === params.id);
  const nearPlaces = offers.filter((innerOffer) => innerOffer.id !== offer?.id);

  return offer ? (
    <main className="page__main page__main--offer">
      <section className="offer">
        <div className="offer__gallery-container container">
          <div className="offer__gallery">
            {/*
                offer.photos.map((photo) => (
                  <div key={photo} className="offer__image-wrapper">
                    <img className="offer__image" src={photo} alt="Photo studio" />
                  </div>
                )
                )
                */
            }
          </div>
        </div>
        <div className="offer__container container">
          <div className="offer__wrapper">
            {(offer.isPremium) && (
              <div className="offer__mark">
                <span>Premium</span>
              </div>
            )}
            <div className="offer__name-wrapper">
              <h1 className="offer__name">
                {offer.title}
              </h1>
              <button className="offer__bookmark-button button" type="button">
                <svg className="offer__bookmark-icon" width="31" height="33">
                  {offer.isFavorite && <use xlinkHref="#icon-bookmark"></use>}
                </svg>
                <span className="visually-hidden">To bookmarks</span>
              </button>
            </div>
            <div className="offer__rating rating">
              <div className="offer__stars rating__stars">
                <span style={{ width: `${offer.rating * 20}%` }}></span>
                <span className="visually-hidden">Rating</span>
              </div>
              <span className="offer__rating-value rating__value">{offer.rating}</span>
            </div>
            <ul className="offer__features">
              <li className="offer__feature offer__feature--entire">
                {offer.type}
              </li>
              <li className="offer__feature offer__feature--bedrooms">
                {offer.numOfBedrooms} Bedrooms
              </li>
              <li className="offer__feature offer__feature--adults">
                  Max {offer.maxNumOfGuests} adults
              </li>
            </ul>
            <div className="offer__price">
              <b className="offer__price-value">&euro;{offer.price}</b>
              <span className="offer__price-text">&nbsp;night</span>
            </div>
            <div className="offer__inside">
              <h2 className="offer__inside-title">What&apos;s inside</h2>
              <ul className="offer__inside-list">
                {/*
                    offer.household.map((utility) => (
                      <li key={utility} className="offer__inside-item">{utility}</li>
                    )
                    )
                    */
                }
              </ul>
            </div>
            <div className="offer__host">
              <h2 className="offer__host-title">Meet the host</h2>
              <div className="offer__host-user user">
                <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                  <img className="offer__avatar user__avatar" src={/*offer.landlord.avatar*/''} width="74" height="74" alt="Host avatar" />
                </div>
                <span className="offer__user-name">
                  {/*offer.landlord.name*/}
                </span>
                {/*offer.landlord.isPro && <span className="offer__user-status">Pro</span>*/}
              </div>
              <div className="offer__description">
                <p className="offer__text">
                  {offer.desc}
                </p>
              </div>
            </div>

            <section className="offer__reviews reviews">
              <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{/*offer.reviews.length*/}</span></h2>
              {/*<ReviewList reviews={offer.reviews}></ReviewList>
                <ReviewForm></ReviewForm>*/}
            </section>
          </div>
        </div>
        <Map mainPage={false} centerCoordinates={offer.location} offers={offers} selectedOffer={offer}></Map>
      </section>

      <div className="container">
        <section className="near-places places">
          <h2 className="near-places__title">Other places in the neighbourhood</h2>
          <NearPlacesList offers={nearPlaces}></NearPlacesList>
        </section>
      </div>
    </main>
  ) : (
    <NotFound />
  );
}
