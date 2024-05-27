import { ReviewData } from '../../../types/types';
import Review from './review';

type ReviewListProps = {
  reviews: ReviewData[];
}


export default function ReviewList({reviews}: ReviewListProps) {
  return (
    <ul className="reviews__list">
      {
        reviews.map((review) => (
          <Review key={review.id} review={review}></Review>
        )
        )
      }
    </ul>
  );
}
