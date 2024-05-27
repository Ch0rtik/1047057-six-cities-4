import React, { useEffect, useState, useRef } from 'react';
import { Location } from '../types/types';
import { Map, TileLayer } from 'leaflet';

function isMapOutDated(map: Map, coords: Location) {
  return (coords.latitude !== map.getCenter().lat) || (coords.longitude !== map.getCenter().lng);
}


export default function useMap(mapRef: React.MutableRefObject<HTMLElement | null>, coords: Location): Map | null {
  const [map, setMap] = useState<Map | null>(null);
  const isRenderedRef = useRef<boolean>(false);

  console.log(map?.getCenter());

  useEffect(() => {
    if(mapRef.current !== null && !isRenderedRef.current) {
      const instance = new Map(mapRef.current, {
        center: {
          lat: coords.latitude,
          lng: coords.longitude,
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
    } else if (map !== null && isMapOutDated(map, coords)){
      map.setView({lat: coords.latitude, lng: coords.longitude}, coords.zoom);
    }

  }, [mapRef, coords]);

  return map;
}
