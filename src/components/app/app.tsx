import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from '../../pages/main';
import Login from '../../pages/login';
import Offer from '../../pages/offer';
import NotFound from '../../pages/not-found';
import Favorites from '../../pages/favorites';
import PrivateRoute from '../private-route';
import { useAppSelector } from '../../hooks';
import LoadingScreen from '../../pages/loading-screen/loading-screen';
import Layout from '../layout/layout';
import { AuthStatus } from '../../utils/const';

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
