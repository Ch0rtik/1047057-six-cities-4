import { ReviewData } from '../types/types';

export const reviews: ReviewData[] = [
  {
    id: 0,
    name: 'Angelina',
    avatar: '/img/avatar-angelina.jpg',
    rating: 4.5,
    date: new Date(2019, 4, 24),
    text: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.'
  },
  {
    id: 1,
    name: 'Max',
    avatar: '/img/avatar-max.jpg',
    rating: 5.0,
    date: new Date(2019, 2, 12),
    text: 'Kvartirka tupa top. Sam stroil.'
  },
];
