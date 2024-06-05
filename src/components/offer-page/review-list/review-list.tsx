import { ReviewData } from '../../../types/types';
import Review from './review';

type ReviewListProps = {
  reviews: ReviewData[];
}


export default function ReviewList({reviews}: ReviewListProps) {
  const sortedReviews = [...reviews];
  sortedReviews.reverse();
  const newestSortedReviews = sortedReviews.slice(0, 10);
  return (
    <ul className="reviews__list">
      {
        newestSortedReviews.map((review) => (
          <Review key={review.id} review={review}></Review>
        )
        )
      }
    </ul>
  );
}
