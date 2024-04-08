import { useEffect, useRef } from 'react';
import { Icon, Marker, layerGroup} from 'leaflet';
import 'leaflet/dist/leaflet.css';
import useMap from '../hooks/use-map';
import { Coordinates, OfferData} from '../types';
import { URL_MARKER_DEFAULT, URL_MARKER_CURRENT } from '../utils/const';

type MapProps = {
  cityCoordinates: Coordinates;
  offers: OfferData[];
  selectedOffer: OfferData | undefined;
}

const defaultCustomIcom = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const currentCustomIcom = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

export default function Map({cityCoordinates, offers, selectedOffer}: MapProps) {
  const mapRef = useRef(null);
  const map = useMap(mapRef, cityCoordinates);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);
      offers.forEach((offer) => {
        const marker = new Marker({
          lat: offer.coordinates.lat,
          lng: offer.coordinates.lng,
        });

        marker.setIcon(selectedOffer !== undefined && offer.id === selectedOffer.id ? currentCustomIcom : defaultCustomIcom).addTo(markerLayer);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }

  }, [map, offers, selectedOffer]);

  return (
    <div
      style={{height: '500px'}}
      ref={mapRef}
    >

    </div>
  );
}
