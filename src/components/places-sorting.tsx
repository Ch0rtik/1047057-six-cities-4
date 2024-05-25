import { MouseEvent, useState } from 'react';
import { SortType } from '../types/types';
import PlacesOptions from './places-options';

type PlacesSortingProps = {
  sortType: SortType;
  onSortChange: (optionId: string) => void;
};


export default function PlacesSorting({sortType, onSortChange}: PlacesSortingProps) {
  let tabIndex = '0';

  const [open, setOpen] = useState<boolean>(false);
  const onListOpen = (evt: MouseEvent<HTMLUListElement>) => {
    evt.preventDefault();
    setOpen(true);
  };
  const onSortChoice = (tabId: string) => (evt: MouseEvent<HTMLLIElement>) => {
    tabIndex = tabId;
    setOpen(false);
    evt.preventDefault();
    onSortChange(tabId);
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by </span>
      <span className="places__sorting-type" tabIndex={+tabIndex} onMouseDown={onListOpen}>
        {sortType}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <PlacesOptions sortType={sortType} open={open} onSortChoice={onSortChoice}></PlacesOptions>
    </form>
  );
}
