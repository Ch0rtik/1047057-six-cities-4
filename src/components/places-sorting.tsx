import { MouseEvent, useState } from 'react';
import { SortType } from '../types/types';
import PlacesOptions from './places-options';
import { useAppDispatch, useAppSelector } from '../hooks';
import { changeSort } from '../store/action';


export default function PlacesSorting() {
  const sortType = useAppSelector((state) => state.sortType);
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState<boolean>(false);

  const onSortChoice = (innerSortType: SortType) => (evt: MouseEvent<HTMLLIElement>) => {
    setOpen(false);
    evt.preventDefault();
    dispatch(changeSort(innerSortType));
  };

  return (
    <form className="places__sorting" action="#" method="get" onClick={() => setOpen(!open)}>
      <span className="places__sorting-caption">Sort by </span>
      <span className="places__sorting-type" tabIndex={0}>
        {sortType}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <PlacesOptions open={open} onSortChoice={onSortChoice}></PlacesOptions>
    </form>
  );
}
