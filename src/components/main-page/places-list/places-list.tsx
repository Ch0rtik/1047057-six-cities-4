import { OfferCardData } from '../../../types/types';
import PlaceCard from './place-card';
import { MouseEvent } from 'react';


type OfferListProps = {
  offers: OfferCardData[];
  handleListItemHover: (listItemId: string | undefined) => void;
  handleListItemLeave: () => void;
};

export default function PlacesList({offers, handleListItemHover, handleListItemLeave}: OfferListProps) {
  const onMouseEnter = (evt: MouseEvent<HTMLLIElement>) => {
    evt.preventDefault();
    handleListItemHover(evt.currentTarget.dataset.id);
  };

  const onMouseLeave = (evt: MouseEvent<HTMLLIElement>) => {
    evt.preventDefault();
    handleListItemLeave();
  };

  return(
    <div className="cities__places-list places__list tabs__content">
      {
        offers.map((offer) => (
          <PlaceCard key={offer.id} offer={offer} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} />
        )
        )
      }
    </div>
  );
}
