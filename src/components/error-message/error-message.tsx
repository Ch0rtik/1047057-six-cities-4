import { useAppSelector } from '../../hooks';

export default function ErrorMessage() {
  const error = useAppSelector((state) => state.error);
  return (error)
    ? <div className='error-message'>{error}</div>
    : null;
}
