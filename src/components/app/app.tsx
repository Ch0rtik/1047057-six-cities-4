import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import LoadingScreen from '../../pages/loading-screen/loading-screen';
import Layout from '../layout/layout';
import { AuthStatus } from '../../utils/const';
import Favorites from '../../pages/favorites/favorites';
import Login from '../../pages/login/login';
import Main from '../../pages/main/main';
import NotFound from '../../pages/not-found';
import Offer from '../../pages/offer/offer';
import PrivateRoute from '../private-route/private-route';

export default function App() {
  const authStatus = useAppSelector((state) => state.authStatus);
  const offersLoading = useAppSelector((state) => state.offersLoading);

  if(offersLoading || authStatus === AuthStatus.Unknown) {
    return(
      <LoadingScreen></LoadingScreen>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout authStatus={authStatus}/>}>
          <Route index element={<Main />} />
          <Route path="login" element={<Login />} />
          <Route path="favorites" element={<PrivateRoute authStatus={authStatus}><Favorites/></PrivateRoute>} />
          <Route path="offer/">
            <Route path=":id" element={<Offer authStatus={authStatus}/>} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
  );
}
