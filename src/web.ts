import { WebPlugin } from '@capacitor/core';
import mapboxgl from 'mapbox-gl';

import type { MapboxsdkPlugin } from './definitions';

export class MapboxsdkWeb extends WebPlugin implements MapboxsdkPlugin {
  async echo(options: { value: string }): Promise<{ value: string }> {
    console.log('ECHO', options);
    return options;
  }
  async create(_options: {
    accessToken: string;
    width: number;
    height: number;
    x: number;
    y: number;
    latitude?: number;
    longitude?: number;
    zoom?: number;
    liteMode?: boolean;
  }): Promise<any> {
    mapboxgl.accessToken = _options.accessToken;
    const map = new mapboxgl.Map({
      container: 'map', // container ID
      style: 'mapbox://styles/mapbox/streets-v11', // style URL
      center: [
        _options.longitude ? _options.longitude : 0,
        _options.latitude ? _options.latitude : 0,
      ],
      zoom: _options.zoom ? _options.zoom : 9,
    });
    map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        // When active the map will receive updates to the device's location as it changes.
        trackUserLocation: true,
        // Draw an arrow next to the location dot to indicate which direction the device is heading.
        showUserHeading: true,
      }),
    );
    map.on('load', () => {
      this.notifyListeners('onMapReady', null);
    });
  }
  close(): Promise<any> {
    throw new Error('Method not implemented.');
  }
}
