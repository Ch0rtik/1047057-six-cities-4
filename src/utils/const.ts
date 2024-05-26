import { CityNames, Location } from '../types/types';

export const TIMEOUT_SHOW_ERROR = 2000;

export enum AuthStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const months = [undefined, 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'November', 'October', 'December'];

export const CITY_COORDINATES = new Map<CityNames, Location>([
  [CityNames.Amsterdam, {latitude: 52.3676, longitude: 4.9041, zoom: 12}],
  [CityNames.Brussels, {latitude: 50.8476, longitude: 4.3572, zoom: 12}],
  [CityNames.Cologne, {latitude: 50.9375, longitude: 6.9603, zoom: 12}],
  [CityNames.Dusseldorf, {latitude: 51.2230, longitude: 6.7825, zoom: 12}],
  [CityNames.Hamburg, {latitude: 53.5488, longitude: 9.9872, zoom: 12}],
  [CityNames.Paris, {latitude: 48.8566, longitude: 2.3522, zoom: 12}],
]);

export enum APIRoute {
  Offers = '/offers',
  Reviews = '/comments',
  Nearby = '/nearby',
  Login = '/login',
  Logout = '/logout',
}
