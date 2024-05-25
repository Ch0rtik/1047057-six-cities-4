import { MouseEvent } from 'react';
import { SortType } from '../types/types';

type PlacesOptionsProps = {
  sortType: SortType;
  open: boolean;
  onSortChoice: (tabId: string) => (evt: MouseEvent<HTMLLIElement>) => void;
};


export default function PlacesOptions({sortType, open, onSortChoice}: PlacesOptionsProps) {
  return(
    <ul className={`places__options places__options--custom${open ? ' places__options--opened' : ''}`}>
      <li className={`places__option${sortType === SortType.Popular ? ' places__option--active' : ''}`} onMouseDown={onSortChoice('0')} tabIndex={0}>Popular</li>
      <li className={`places__option${sortType === SortType.LowToHigh ? ' places__option--active' : ''}`} onMouseDown={onSortChoice('1')} tabIndex={1}>Price: low to high</li>
      <li className={`places__option${sortType === SortType.HighToLow ? ' places__option--active' : ''}`} onMouseDown={onSortChoice('2')} tabIndex={2}>Price: high to low</li>
      <li className={`places__option${sortType === SortType.TopRated ? ' places__option--active' : ''}`} onMouseDown={onSortChoice('3')} tabIndex={3}>Top rated first</li>
    </ul>
  );
}
