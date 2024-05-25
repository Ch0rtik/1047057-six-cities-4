import { useEffect, useRef } from 'react';
import { Icon, Marker, layerGroup} from 'leaflet';
import 'leaflet/dist/leaflet.css';
import useMap from '../hooks/use-map';
import { Location, OfferData} from '../types/types';

type MapProps = {
  mainPage: boolean;
  centerCoordinates: Location;
  offers: OfferData[];
  selectedOffer: OfferData | undefined;
}

const defaultCustomIcom = new Icon({
  iconUrl: 'img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const currentCustomIcom = new Icon({
  iconUrl: 'img/pin-active.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

export default function Map({mainPage, centerCoordinates, offers, selectedOffer}: MapProps) {
  const mapRef = useRef(null);
  const map = useMap(mapRef, centerCoordinates);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);
      offers.forEach((offer) => {
        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude,
        });

        marker.setIcon(selectedOffer !== undefined && offer.id === selectedOffer.id ? currentCustomIcom : defaultCustomIcom).addTo(markerLayer);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }

  }, [map, offers, selectedOffer]);

  return (
    <section className={mainPage ? 'cities__map map' : 'offer__map map'}
      ref={mapRef}
    >

    </section>
  );
}
