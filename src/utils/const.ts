import { City, Coordinates } from '../types/types';

export enum AuthStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const months = [undefined, 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'November', 'October', 'December'];

export const CITY_COORDINATES = new Map<City, Coordinates>([
  [City.Amsterdam, {lat: 52.3676, lng: 4.9041, zoom: 12}],
  [City.Brussels, {lat: 50.8476, lng: 4.3572, zoom: 12}],
  [City.Cologne, {lat: 50.9375, lng: 6.9603, zoom: 12}],
  [City.Dusseldorf, {lat: 51.2230, lng: 6.7825, zoom: 12}],
  [City.Hamburg, {lat: 53.5488, lng: 9.9872, zoom: 12}],
  [City.Paris, {lat: 48.8566, lng: 2.3522, zoom: 12}],
]);
