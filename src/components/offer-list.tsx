import { OfferData } from '../types';
import PlaceCard from './place-card';
import { MouseEvent } from 'react';


type OfferListProps = {
  offers: OfferData[];
  onListItemHover: (listItemId: string | undefined) => void;
};

export default function OfferList({offers, onListItemHover}: OfferListProps) {
  const handleListItemHover = (evt: MouseEvent<HTMLLIElement>) => {
    evt.preventDefault();
    onListItemHover(evt.currentTarget.dataset.id);
  };

  return(
    <div className="cities__places-list places__list tabs__content">
      {
        offers.map((offer) => (
          <PlaceCard key={offer.id} offer={offer} onMouseEnter={handleListItemHover} />
        )
        )
      }
    </div>
  );
}
