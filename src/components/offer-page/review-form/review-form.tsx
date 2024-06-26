import { FormEvent, SyntheticEvent, useState } from 'react';
import { useAppDispatch } from '../../../hooks';
import { sendCommentAction } from '../../../store/api-actions';
import { MAX_REVIEW_LENGTH, MIN_REVIEW_LENGTH } from '../../../utils/const';

export type ReviewFormProps = {
  id: string;
}

export default function ReviewForm({id}: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [text, setText] = useState('');

  const dispatch = useAppDispatch();

  const isValid = () => text.trim().length >= MIN_REVIEW_LENGTH && text.trim().length <= MAX_REVIEW_LENGTH && rating !== 0;

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(sendCommentAction({newReviewData: {comment: text, rating: rating}, id: id}));
    setText('');
    setRating(0);
  };

  const onTextChangeHandler = (evt: SyntheticEvent<HTMLTextAreaElement>) => {
    setText(evt.currentTarget.value);
  };
  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleFormSubmit}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        <input checked={rating === 5} className="form__rating-input visually-hidden" name="rating" value="5" id="5-stars" type="radio" onChange={() => setRating(5)}/>
        <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title="perfect">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input checked={rating === 4} className="form__rating-input visually-hidden" name="rating" value="4" id="4-stars" type="radio" onChange={() => setRating(4)}/>
        <label htmlFor="4-stars" className="reviews__rating-label form__rating-label" title="good">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input checked={rating === 3} className="form__rating-input visually-hidden" name="rating" value="3" id="3-stars" type="radio" onChange={() => setRating(3)}/>
        <label htmlFor="3-stars" className="reviews__rating-label form__rating-label" title="not bad">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input checked={rating === 2} className="form__rating-input visually-hidden" name="rating" value="2" id="2-stars" type="radio" onChange={() => setRating(2)}/>
        <label htmlFor="2-stars" className="reviews__rating-label form__rating-label" title="badly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input checked={rating === 1} className="form__rating-input visually-hidden" name="rating" value="1" id="1-star" type="radio" onChange={() => setRating(1)}/>
        <label htmlFor="1-star" className="reviews__rating-label form__rating-label" title="terribly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>
      </div>
      <textarea className="reviews__textarea form__textarea" id="review" name="review" value={text} onChange={onTextChangeHandler} placeholder="Tell how was your stay, what you like and what can be improved"></textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={!isValid()}>Submit</button>
      </div>
    </form>
  );
}
