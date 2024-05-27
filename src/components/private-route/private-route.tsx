import {Navigate} from 'react-router-dom';
import { AuthStatus } from '../../utils/const';

type PrivateRouteProps = {
  authStatus: AuthStatus;
  children: JSX.Element;
}

export default function PrivateRoute(props: PrivateRouteProps) {
  const {authStatus, children} = props;

  return (
    authStatus === AuthStatus.Auth
      ? children
      : <Navigate to={'/login'} />
  );
}
