import React, { useEffect, useState, useRef } from 'react';
import { Coordinates } from '../types/types';
import { Map, TileLayer } from 'leaflet';

export default function useMap(mapRef: React.MutableRefObject<HTMLElement | null>, coords: Coordinates): Map | null {
  const [map, setMap] = useState<Map | null>(null);
  const isRenderedRef = useRef<boolean>(false);

  useEffect(() => {
    if(mapRef.current !== null && !isRenderedRef.current) {
      const instance = new Map(mapRef.current, {
        center: {
          lat: coords.lat,
          lng: coords.lng,
        },
        zoom: coords.zoom,
      });

      const layer = new TileLayer(
        'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        {
          attribution:  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        },
      );

      instance.addLayer(layer);

      setMap(instance);
      isRenderedRef.current = true;
    }

  }, [mapRef, coords]);

  return map;
}