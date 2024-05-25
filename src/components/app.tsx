import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from '../pages/main';
import Login from '../pages/login';
import Offer from '../pages/offer';
import NotFound from '../pages/not-found';
import Favorites from '../pages/favorites';
import PrivateRoute from './private-route';
import { AuthStatus} from '../utils/const';
import { OfferData } from '../types/types';

type AppScreenProps = {
  offers: OfferData[];
}

export default function App({offers}: AppScreenProps) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Main />} />
          <Route path="login" element={<Login />} />
          <Route path="favorites" element={<PrivateRoute authStatus={AuthStatus.Auth}><Favorites offers={offers} /></PrivateRoute>} />
          <Route path="offer/">
            <Route path=":id" element={<Offer offers={offers} />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
  );
}
