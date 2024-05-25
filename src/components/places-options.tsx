import { MouseEvent } from 'react';
import { SortType } from '../types/types';
import { useAppSelector } from '../hooks';

type PlacesOptionsProps = {
  open: boolean;
  onSortChoice: (sortType: SortType) => (evt: MouseEvent<HTMLLIElement>) => void;
};


export default function PlacesOptions({open, onSortChoice}: PlacesOptionsProps) {
  const sortType = useAppSelector((state) => state.sortType);

  return(
    <ul className={`places__options places__options--custom${open ? ' places__options--opened' : ''}`}>
      <li className={`places__option${sortType === SortType.Popular ? ' places__option--active' : ''}`} onClick={onSortChoice(SortType.Popular)} tabIndex={0}>Popular</li>
      <li className={`places__option${sortType === SortType.LowToHigh ? ' places__option--active' : ''}`} onClick={onSortChoice(SortType.LowToHigh)} tabIndex={1}>Price: low to high</li>
      <li className={`places__option${sortType === SortType.HighToLow ? ' places__option--active' : ''}`} onClick={onSortChoice(SortType.HighToLow)} tabIndex={2}>Price: high to low</li>
      <li className={`places__option${sortType === SortType.TopRated ? ' places__option--active' : ''}`} onClick={onSortChoice(SortType.TopRated)} tabIndex={3}>Top rated first</li>
    </ul>
  );
}
