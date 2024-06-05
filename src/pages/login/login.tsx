import { FormEvent, useRef } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { loginAction } from '../../store/api-actions';
import { AuthStatus, CITIES } from '../../utils/const';
import { changeCity } from '../../store/action';

export default function Login() {
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const authStatus = useAppSelector((state) => state.authStatus);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (loginRef.current !== null && passwordRef.current !== null && passwordRef.current.value.length !== 0) {
      if(passwordRef.current.value.match(/[A-z0-9]*(([A-z]+[0-9]+)|([0-9]+[A-z]+))[A-z0-9]*/)){
        dispatch(loginAction({
          login: loginRef.current.value,
          password: passwordRef.current.value
        }));
        navigate('/');
      }
    }
  };

  const randomCity = CITIES[Math.floor(Math.random() * CITIES.length)];

  const handleCityClick = () => {
    dispatch(changeCity(randomCity));
  };

  if (authStatus === AuthStatus.Auth) {
    return (
      <Navigate to="/" />
    );
  }

  return(
    <main className="page__main page__main--login">
      <div className="page__login-container container">
        <section className="login">
          <h1 className="login__title">Sign in</h1>
          <form className="login__form form" action="#" method="post" onSubmit={handleSubmit}>
            <div className="login__input-wrapper form__input-wrapper">
              <label className="visually-hidden">E-mail</label>
              <input className="login__input form__input" ref={loginRef} type="email" name="email" placeholder="Email" required={false}/>
            </div>
            <div className="login__input-wrapper form__input-wrapper">
              <label className="visually-hidden">Password</label>
              <input className="login__input form__input" ref={passwordRef} type="password" name="password" placeholder="Password" required={false}/>
            </div>
            <button className="login__submit form__submit button" type="submit">Sign in</button>
          </form>
        </section>
        <section className="locations locations--login locations--current">
          <div className="locations__item" onClick={handleCityClick}>
            <Link to='/' className="locations__item-link">
              <span>{randomCity.name}</span>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
