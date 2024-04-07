import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app';
import { SETTING } from './utils/const';
import { offers } from './mocks/offers';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App placesFound={SETTING.placesFound} offers={offers}/>
  </React.StrictMode>
);
